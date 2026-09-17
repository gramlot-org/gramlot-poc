import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Bag} from 'genro-bag-js';
import {UrlResolver, OpenApiResolver} from '../src/resolvers/http.js';
import {setupDom} from './dom.js';
import {Application, HtmlBuilder} from '../src/index.js';
import {ResolverService} from '../src/resolvers/service.js';

test('polling waits for completion, recovers from errors and cancels its timer', async t => {
 t.mock.timers.enable({apis:['setTimeout']});
 const pending=[];
 t.mock.method(globalThis,'fetch',()=>new Promise(resolve=>pending.push(resolve)));
 const app={data:new Bag(),live:fn=>fn(),_disposed:false};
 const service=new ResolverService(app),node={absDatapath:path=>path};
 const options={url:'https://example.test/live',destination:'snapshot',status:'state',pollInterval:2,timeout:0};
 const first=service.load(node,'url',options);
 await Promise.resolve();
 t.mock.timers.tick(10000);
 assert.equal(pending.length,1,'no overlapping poll while a request is pending');
 pending.shift()(response({count:1}));await first;
 t.mock.timers.tick(1999);await Promise.resolve();assert.equal(pending.length,0);
 t.mock.timers.tick(1);await Promise.resolve();assert.equal(pending.length,1);
 pending.shift()(new Response('unavailable',{status:503}));
 for(let i=0;i<15;i++)await Promise.resolve();
 assert.equal(app.data.getItem('state.state'),'error');
 assert.equal(app.data.getItem('snapshot.count'),1,'failed polls preserve the last snapshot');
 t.mock.timers.tick(2000);await Promise.resolve();assert.equal(pending.length,1);
 service.cancel(node);pending.shift()(response({count:2}));
 for(let i=0;i<15;i++)await Promise.resolve();
 t.mock.timers.tick(10000);await Promise.resolve();
 assert.equal(pending.length,0);assert.equal(app.data.getItem('snapshot.count'),1);
 const once=service.load(node,'url',{...options,pollInterval:0});await Promise.resolve();
 pending.shift()(response({count:3}));await once;
 t.mock.timers.tick(10000);await Promise.resolve();assert.equal(pending.length,0);
 service.dispose();
});

const spec = {openapi:'3.0.3',info:{title:'Example',version:'1'},servers:[{url:'/v1'}],
 tags:[{name:'people',description:'Contacts'}],paths:{'/people/{id}':{
 parameters:[{name:'id',in:'path',required:true},{name:'q',in:'query'}],
 get:{operationId:'people.read',tags:['people'],summary:'Read contact',responses:{200:{description:'OK'}}},
 post:{operationId:'write',tags:['people'],requestBody:{content:{'application/json':{schema:{$ref:'#/components/schemas/Person'}}}}}}},
 components:{schemas:{'Person.v1':{type:'object'}}}};
const response = value => new Response(JSON.stringify(value), {headers:{'Content-Type':'application/json'}});

test('explicit POST reload samples fresh passive body bindings after a previous response', async t => {
 setupDom();
 const bodies=[];
 t.mock.method(globalThis,'fetch',async (_url,init)=>{bodies.push(JSON.parse(init.body));return response({error:'missing'});});
 class Page extends HtmlBuilder {main(root){
  root.dataSetter({destination:'identity',value:''});root.dataSetter({destination:'password',value:''});
  root.urlResolver('result','https://example.test/login',{method:'POST',body:{identity:'=identity',password:'=password'},reload:'^submit',_on_start:false});
  root.button('Submit',{fire:'submit'});
 }}
 const host=document.body.appendChild(document.createElement('div'));
 const app=new Application(host,new Page('main'),{inspector:false});
 host.querySelector('button').click();await new Promise(resolve=>setTimeout(resolve,220));
 app.live(()=>{app.data.setItem('main.identity','monitor');app.data.setItem('main.password','example');});
 host.querySelector('button').click();
 await new Promise(resolve=>setTimeout(resolve,0));
 assert.deepEqual(bodies,[{identity:'',password:''},{identity:'monitor',password:'example'}]);
 app.dispose();host.remove();
});

test('OpenApiResolver discovers metadata without invoking endpoints; calls are explicit', async t => {
 const calls=[];t.mock.method(globalThis,'fetch',async(url,opts)=>{calls.push([String(url),opts]);return response(spec);});
 const resolver=new OpenApiResolver('https://example.test/openapi.json');
 const bag=await resolver.resolve();
 assert.ok(bag instanceof Bag); assert.equal(bag.getNode('info').attr.title,'Example');
 const op=bag.getItem('api.people').getItem(['people.read']);
 assert.equal(op.getItem('url'),'https://example.test/v1/people/{id}');
 assert.equal(op.getItem('qs').getNodes()[0].label,'q');
 assert.ok(bag.getItem('components.schemas').getNode(['Person.v1']));
 assert.equal(calls.length,1);
 assert.equal(await resolver.resolve(),bag); assert.equal(calls.length,1,'cached schema');
 const call=resolver.operationResolver(op,{pathParams:{id:'a/b'},qs:{q:'hello world'}});
 await call.resolve();
 assert.match(calls[1][0],/people\/a%2Fb\?q=hello\+world$/);
});

test('URL resolver query, JSON Bag, HTTP failures and timeout', async t=>{
 t.mock.method(globalThis,'fetch',async(url)=>{assert.match(String(url),/q=a%26b/);return response({'literal.key':{ok:true}});});
 const result=await new UrlResolver('https://example.test/data',{qs:{q:'a&b'}}).resolve();
 assert.equal(result.getItem(['literal.key']).getItem('ok'),true);
 globalThis.fetch=async()=>new Response('bad',{status:500});
 await assert.rejects(new UrlResolver('https://example.test').resolve(),/HTTP 500/);
 globalThis.fetch=async(url,{signal})=>new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(signal.reason)));
 await assert.rejects(new UrlResolver('https://example.test',{timeout:0.001}).resolve(),/timed out/);
});

test('declarations resolve nested bindings, reject stale completions and stop on removal', async t=>{
 setupDom();
 const pending=[]; t.mock.method(globalThis,'fetch',(url,opts)=>new Promise(resolve=>pending.push({url:String(url),opts,resolve})));
 class Page extends HtmlBuilder {main(root){root.dataSetter({destination:'url',value:'https://example.test/data'});root.dataSetter({destination:'q',value:'first'});root.urlResolver('result','^url',{qs:{q:'^q'},status:'state'});}}
 const host=document.body.appendChild(document.createElement('div'));
 const app=new Application(host,new Page('main'),{inspector:false});
 await new Promise(resolve=>setTimeout(resolve,0));
 assert.equal(pending.length,1); assert.match(pending[0].url,/q=first/);
 app.live(()=>app.data.setItem('main.q','second'));
 await Promise.resolve();
 assert.equal(pending.length,2); assert.equal(pending[0].opts.signal.aborted,true);
 pending[1].resolve(response({answer:2}));await new Promise(resolve=>setTimeout(resolve,0));
 assert.equal(app.data.getItem('main.result.answer'),2);
 pending[0].resolve(response({answer:1}));await new Promise(resolve=>setTimeout(resolve,0));
 assert.equal(app.data.getItem('main.result.answer'),2);
 assert.equal(app.data.getItem('main.state.state'),'ready');
 app.live(()=>app.data.setItem('main.q','third'));
 await Promise.resolve();
 const source=app.builder.source.getNodes().find(n=>n.nodeTag==='dataController');
 app.live(()=>app.builder.source.popNode(source.label));
 assert.equal(pending[2].opts.signal.aborted,true);
 pending[2].resolve(response({answer:3}));await new Promise(resolve=>setTimeout(resolve,0));
 assert.equal(app.data.getItem('main.result.answer'),2);
 app.dispose();host.remove();
});

test('JSON Bag roundtrip preserves arrays including empty nested arrays', async()=>{
 const {jsonBag,plainJson}=await import('../src/resolvers/http.js');
 const input={items:[{empty:[],nested:[1,false,null]}],empty:[],object:{}};
 assert.deepEqual(plainJson(jsonBag(input)),input);
});
test('resolver supports source text and HTTP error envelopes as Bags', async t=>{
 t.mock.method(globalThis,'fetch',async()=>new Response('const value = 1;', {status:200}));
 assert.equal(await new UrlResolver('https://example.test/app.js',{responseType:'text'}).resolve(),'const value = 1;');
 globalThis.fetch=async()=>new Response('unavailable',{status:503,headers:{'x-example':'test'}});
 const result=await new UrlResolver('https://example.test/api',{responseType:'auto',envelope:true}).resolve();
 assert.equal(result.getItem('status'),503);assert.equal(result.getItem('body'),'unavailable');
 assert.equal(result.getItem('headers.x-example'),'test');assert.equal(result.getItem('ok'),false);
});
