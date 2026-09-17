// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import test from 'node:test';
import assert from 'node:assert/strict';
import {BagDbReadAdapter} from '../src/database/fake/bagdb-read-adapter.mjs';
import {CollectionStore, SelectorStore, RecordStore, ModelCatalog} from '../src/database/common/stores.mjs';
import {Bag} from 'genro-bag-js';
import {BagDB} from '../src/database/common/bagdb.js';
function fixture() {
    const bag = new Bag();
    bag.setItem('struct.people.id',null,{dtype:'T',primaryKey:true});
    bag.setItem('struct.people.name',null,{dtype:'T',nullable:false});
    bag.setItem('struct.orders.id',null,{dtype:'L',primaryKey:true});
    bag.setItem('struct.orders.person',null,{dtype:'T',references:'people.id'});
    bag.setItem('struct.orders.paid',null,{dtype:'B'});
    bag.setItem('data.people',new Bag()); bag.setItem('data.orders',new Bag());
    const db = new BagDB(bag);
    for (const [id,name] of [['001','Alice'],['002','Malice'],['003','ALICE'],['004','Bob'],['','Empty key']]) db.insertRow('people',{id,name});
    db.insertRow('orders',{id:0,person:'001',paid:false});
    const adapter = new BagDbReadAdapter(db,{tables:{'app.people':{table:'people',selector:{key:'id',caption:'name',search:'name'}},'app.orders':{table:'orders'}}});
    return {db,adapter};
}
const make = (Type, adapter, table = 'app.people') => new Type({adapter,table,data:new Bag()});
const errorCode = code => error => error.code === code;
const tick = () => new Promise(resolve => setImmediate(resolve));
function delayed(adapter) {
    const pending = [];
    return {pending, adapter:{describeTable:(...args) => adapter.describeTable(...args), readRecord:(...args) => adapter.readRecord(...args),
        query:(table,request) => new Promise((resolve,reject) => pending.push({request,resolve:async () => resolve(await adapter.query(table,request)),reject}))}};
}

test('metadata preserves FK dtype, inverse edges and registry exposure',async () => {
    const {adapter,db} = fixture(); const catalog = new ModelCatalog(adapter);
    assert.equal((await catalog.field('app.orders','person')).dtype,'T');
    assert.equal((await catalog.relations('app.people'))[0].cardinality,'many');
    assert.equal((await catalog.relations('app.orders'))[0].target,'app.people');
    const descriptor = await catalog.table('app.people'); descriptor.fields.id.dtype = 'B';
    assert.equal((await catalog.field('app.people','id')).dtype,'T');
    db.setTable('people').setColumn('extra',{dtype:'T'});
    assert.equal((await catalog.table('app.people')).fields.extra,undefined);
    catalog.invalidate(); assert.equal((await catalog.field('app.people','extra')).dtype,'T');
    await assert.rejects(adapter.describeTable('people'),errorCode('invalid_request'));
    const limited = new BagDbReadAdapter(db,{tables:{people:{table:'people'}}});
    assert.deepEqual((await limited.describeTable('people')).relations,[]);
});

test('read identity, projection, missing and strict scalar types',async () => {
    const {adapter} = fixture();
    assert.deepEqual(await adapter.readRecord('app.orders',{id:0},{fields:['paid']}),{found:true,identity:{id:0},record:{id:0,paid:false}});
    assert.equal((await adapter.readRecord('app.people',{id:'001'})).record.name,'Alice');
    assert.equal((await adapter.readRecord('app.people',{id:''})).found,true);
    assert.equal((await adapter.readRecord('app.people',{id:'missing'})).record,null);
    for (const identity of [{id:'0'},{id:null},{},{id:0,other:1}]) await assert.rejects(adapter.readRecord('app.orders',identity),errorCode('invalid_request'));
    await assert.rejects(adapter.query('app.orders',{where:{paid:0}}),errorCode('invalid_request'));
    assert.equal((await adapter.query('app.orders',{where:{paid:false}})).rows.length,1);
});

test('full snapshot sorted before limit, stable key ties, detached rows and bounded requests',async () => {
    const {adapter,db} = fixture();
    for (let i = 0; i < 80; i++) db.insertRow('people',{id:`z${i}`,name:`Z${String(80-i).padStart(2,'0')}`});
    const result = await adapter.query('app.people',{orderBy:[{field:'name',direction:'desc'}],limit:2,fields:['name']});
    assert.deepEqual(result.rows.map(r => r.name),['Z80','Z79']);
    const ascending = await adapter.query('app.people',{where:{},text:{field:'name',value:'Z',match:'prefix',caseSensitive:true},orderBy:[{field:'name',direction:'asc'}],limit:1});
    assert.equal(ascending.rows[0].name,'Z01'); // beyond BagDB's default first 50
    assert.equal(result.hasMore,true); result.rows[0].name = 'changed';
    assert.equal((await adapter.readRecord('app.people',{id:'z0'})).record.name,'Z80');
    for (const request of [{limit:0},{limit:1001},{fields:['missing']},{where:{constructor:1}},{orderBy:[{field:'bad',direction:'asc'}]},{text:{field:'name',value:'x',match:'regex',caseSensitive:false}},{surprise:true}]) await assert.rejects(adapter.query('app.people',request),errorCode('invalid_request'));
    await assert.rejects(adapter.query('app.people',{cursor:'x'}),errorCode('unsupported_capability'));
    assert.equal((await adapter.capabilities()).writes,false);
});

test('selector prefix/fallback, case modes, empty search and off-page resolution',async () => {
    const {adapter} = fixture(); const store = make(SelectorStore,adapter);
    assert.deepEqual((await store.search('Ali')).options.map(o => o.value),['003','001']);
    assert.deepEqual((await store.search('Ali',{caseSensitive:true})).options,[{value:'001',caption:'Alice'}]);
    assert.equal((await store.search('lic',{caseSensitive:true})).options.length,2);
    assert.equal((await store.search('',{limit:1})).options.length,1);
    const before = store.snapshot();
    assert.deepEqual(await store.resolveValue('004'),{found:true,option:{value:'004',caption:'Bob'}});
    assert.deepEqual(store.snapshot(),before);
    assert.deepEqual(await store.resolveValue(null),{found:false,option:null});
    assert.equal((await store.resolveValue('')).option.value,'');
    assert.equal((await store.search('%')).options.length,0);
});

test('stores publish to Data Bag, isolate queries and protect snapshots',async () => {
    const {adapter} = fixture(); const data = new Bag();
    const store = new CollectionStore({adapter,table:'app.people',data,path:'selection'});
    const other = make(SelectorStore,adapter); let calls = 0;
    const off = store.subscribe(() => calls++);
    await store.load({where:{id:'004'}}); await tick();
    assert.equal(data.getItem('selection').result.rows[0].name,'Bob');
    const snapshot = store.snapshot(); snapshot.result.rows.length = 0;
    assert.equal(store.snapshot().result.rows.length,1);
    await other.search('Ali'); assert.equal(store.snapshot().result.rows[0].name,'Bob');
    off(); const count = calls; await store.load(); await tick(); assert.equal(calls,count);
    const record = make(RecordStore,adapter,'app.orders');
    assert.equal((await record.load({id:0})).found,true);
    assert.equal((await record.load({id:12})).found,false);
    assert.equal(record.snapshot().error,null);
});

test('new search cancels old results even if provider ignores cancellation; lookup is independent',async () => {
    const {adapter} = fixture(); const backend = delayed(adapter); const store = make(SelectorStore,backend.adapter);
    const old = store.search('Ali'); const cancelled = assert.rejects(old,errorCode('abort')); await tick();
    const latest = store.search('Bob'); await tick();
    assert.equal((await store.resolveValue('001')).found,true);
    await backend.pending[1].resolve(); await latest;
    await backend.pending[0].resolve(); await cancelled; await tick();
    assert.equal(store.snapshot().result.options[0].caption,'Bob');
});

test('failure retains stale data; explicit abort is not an application error',async () => {
    const {adapter} = fixture(); const backend = delayed(adapter); const store = make(CollectionStore,backend.adapter);
    const initial = store.load(); await tick(); await backend.pending[0].resolve(); await initial;
    const before = store.snapshot().result;
    const failure = store.load(); const rejected = assert.rejects(failure,errorCode('backend_failure')); await tick();
    backend.pending[1].reject(new Error('Unavailable fixture')); await rejected;
    assert.deepEqual(store.snapshot().result,before); assert.equal(store.snapshot().stale,true);
    const controller = new AbortController(); const aborted = store.load({}, {signal:controller.signal});
    const check = assert.rejects(aborted,errorCode('abort')); controller.abort(); await check;
    assert.equal(store.snapshot().error,null); assert.equal(store.snapshot().loading,false);
});

test('invalidation and disposal prevent late publication and reject new work',async () => {
    const {adapter} = fixture(); const backend = delayed(adapter); const store = make(CollectionStore,backend.adapter);
    let calls = 0; store.subscribe(() => calls++);
    const pending = store.load(); const check = assert.rejects(pending,errorCode('abort')); await tick();
    store.dispose(); const count = calls; await backend.pending[0].resolve(); await check; await tick();
    assert.equal(calls,count); assert.equal(store.snapshot().result,null);
    await assert.rejects(store.load(),errorCode('unavailable'));
    await assert.rejects(store.lookup({id:'001'}),errorCode('unavailable'));
});

test('pre-aborted adapter operations reject with normalized abort',async () => {
    const {adapter} = fixture(); const controller = new AbortController(); controller.abort();
    for (const call of [() => adapter.query('app.people',{}, {signal:controller.signal}),
        () => adapter.describeTable('app.people',{signal:controller.signal}),
        () => adapter.readRecord('app.people',{id:'001'},{signal:controller.signal})]) await assert.rejects(call(),errorCode('abort'));
});

test('fallback stays in the same generation and cannot replace a newer search',async () => {
    const {adapter} = fixture(); const backend = delayed(adapter); const store = make(SelectorStore,backend.adapter);
    const old = store.search('lic'); const cancelled = assert.rejects(old,errorCode('abort')); await tick();
    await backend.pending[0].resolve(); await tick();
    assert.equal(backend.pending[1].request.text.match,'contains');
    const latest = store.search('Bob'); await tick();
    await backend.pending[2].resolve(); await latest;
    await backend.pending[1].resolve(); await cancelled;
    assert.equal(store.snapshot().result.options[0].value,'004');
});

test('stable key ordering for equal captions and null equality without coercion',async () => {
    const {adapter,db} = fixture();
    db.insertRow('people',{id:'z',name:'Same'}); db.insertRow('people',{id:'a',name:'Same'});
    const result = await adapter.query('app.people',{where:{name:'Same'},orderBy:[{field:'name',direction:'asc'}]});
    assert.deepEqual(result.rows.map(r => r.id),['a','z']);
    db.insertRow('orders',{id:1});
    assert.deepEqual((await adapter.query('app.orders',{where:{person:null}})).rows.map(r => r.id),[1]);
    const record = make(RecordStore,adapter,'app.orders'); await record.load({id:0});
    await assert.rejects(record.load({id:'0'}),errorCode('invalid_request'));
    assert.equal(record.snapshot().result.record.id,0); assert.equal(record.snapshot().stale,true);
});

test('catalog invalidation does not repopulate cache from an earlier request',async () => {
    const {adapter} = fixture(); let release; let count = 0;
    const catalog = new ModelCatalog({describeTable:async (...args) => {
        count++; const descriptor = await adapter.describeTable(...args);
        if (count === 1) await new Promise(resolve => {release = resolve;});
        return descriptor;
    }});
    const pending = catalog.table('app.people'); await tick(); catalog.invalidate(); release(); await pending;
    await catalog.table('app.people'); assert.equal(count,2);
});
