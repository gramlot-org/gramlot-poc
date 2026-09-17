import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Bag} from 'genro-bag-js';
import {Application, HtmlBuilder} from '../src/index.js';
import {setupDom} from './dom.js';
import {BagDB} from '../src/database/common/bagdb.js';
setupDom();
await import('../src/collections/inputs.js');
await import('../src/collections/grid.js');
function fixture() {
    const db = new BagDB();
    const people = db.setTable('people');
    people.setColumn('id',{dtype:'L',primaryKey:true}); people.setColumn('name',{dtype:'T'});
    for (const [id,name] of [[0,'Alice'],[1,'Malice'],[2,'Bob']]) db.insertRow('people',{id,name});
    return db.bag;
}
const tables = {people:{table:'people',selector:{key:'id',caption:'name',search:'name'}}};
class Page extends HtmlBuilder {
    static wc_requires = ['inputs','grid'];
    main(root) {
        root.dataSetter({destination:'fixture',value:fixture()});
        root.dataSetter({destination:'key',value:0});
        root.bagDb({adapter:'local',source:'=fixture',tables});
        root.dataRelationTree({destination:'model',adapter:'local',dbtable:'people',_on_start:true});
        root.dataRecord({destination:'record',adapter:'local',dbtable:'people',pkey:'^key',statuspath:'recordStatus',_on_start:true});
        root.dataSelection({destination:'rows',adapter:'local',dbtable:'people',limit:2,statuspath:'rowsStatus',_on_start:true});
        root.dbSelect({dbadapter:'local',dbtable:'people',value:'^key',searchdelay:0});
        root.grid({store:'^rows',columns:[{field:'id'},{field:'name'}],identifier:'id',datamode:'attr'});
    }
}
function mount() {
    const host = document.body.appendChild(document.createElement('div'));
    const app = new Application(host, new Page('main'));
    return {app,host};
}
const tick = () => new Promise(resolve => setTimeout(resolve,15));
const provider = (app,tag) => app.builder.source.getNodes().find(node => node.nodeTag === tag);

test('Source-owned BagDB feeds record, selection, grid and original dbSelect without RPC',async () => {
    const {app,host} = mount();
    try {
        const record = provider(app,'dataRecord'), selection = provider(app,'dataSelection');
        assert.equal((await record._databasePromise).status,'ready');
        assert.equal((await selection._databasePromise).status,'ready'); await tick();
        assert.equal((await provider(app,'dataRelationTree')._databasePromise).status,'ready');
        assert.equal(app.data.getItem('main.model').getNode('f_0').attr.dtype,'L');
        assert.equal(app.data.getItem('main.record.name'),'Alice');
        assert.equal(app.data.getItem('main.rows').length,2);
        assert.equal(app.data.getItem('main.rowsStatus.hasMore'),true);
        const select = host.querySelector('gnr-dbselect');
        assert.ok(select); await select._resolvePromise;
        assert.equal(select.shadowRoot.querySelector('input').value,'Alice');
        const grid = host.querySelector('gnr-grid'); assert.ok(grid);
        assert.ok(grid.shadowRoot.querySelector('.body').textContent.includes('Alice'));
        app.live(() => app.data.setItem('main.key',2));
        assert.equal((await record._databasePromise).status,'ready');
        assert.equal(app.data.getItem('main.record.name'),'Bob');
        app.live(() => app.data.setItem('main.key',999)); await record._databasePromise;
        assert.equal(app.data.getItem('main.record'),null);
        assert.equal(app.data.getItem('main.recordStatus.found'),false);
        assert.equal(app.server.endpoint,null);
    } finally {app.dispose();host.remove();}
});

test('controller reloads preserve latest Data and disposal releases stores',async () => {
    const {app,host} = mount();
    const record = provider(app,'dataRecord'); await record._databasePromise;
    const adapter = app.database.get('local').adapter;
    const read = adapter.readRecord.bind(adapter); const pending = [];
    adapter.readRecord = (...args) => new Promise(resolve => pending.push(async () => resolve(await read(args[0],args[1],{fields:args[2]?.fields}))));
    app.live(() => app.data.setItem('main.key',1)); const old = record._databasePromise; await tick();
    app.live(() => app.data.setItem('main.key',2)); const latest = record._databasePromise; await tick();
    await pending[1](); await latest; await pending[0](); await old;
    assert.equal(app.data.getItem('main.record.name'),'Bob');
    app.dispose(); assert.equal(app.database.owners.size,0); assert.equal(app.database.adapters.size,0); host.remove();
});

test('removing Source providers and adapters prevents late writes and releases consumers',async () => {
    const {app,host} = mount();
    const record = provider(app,'dataRecord'); await record._databasePromise;
    const adapter = app.database.get('local').adapter;
    const original = adapter.readRecord.bind(adapter); let finish;
    adapter.readRecord = (...args) => new Promise(resolve => {finish = async () => resolve(await original(args[0],args[1],{}));});
    app.live(() => app.data.setItem('main.key',1)); const pending = record._databasePromise; await tick();
    app.live(() => app.builder.source.popNode(record.label));
    await finish(); await pending;
    assert.equal(app.data.getItem('main.record.name'),'Alice');
    const registration = provider(app,'bagDb');
    app.live(() => app.builder.source.popNode(registration.label));
    assert.equal(app.database.adapters.size,0); assert.equal(app.database.owners.size,0); assert.equal(app.database.models.size,0);
    app.dispose(); host.remove();
});
