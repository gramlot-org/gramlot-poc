import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Bag} from 'genro-bag-js';
import {BagDB} from '../src/database/common/bagdb.js';
import {BagDbReadAdapter} from '../src/database/fake/bagdb-read-adapter.mjs';
import {ModelCatalog} from '../src/database/common/model.mjs';

const base = new URL('../../../docs/examples/bagdb/mydb/', import.meta.url);
const read = path => JSON.parse(readFileSync(new URL(path, base), 'utf8'));

test('complete legacy snapshot validates PK/FK integrity and serves customer invoices and metadata', async () => {
    const manifest = read('manifest.json'), bag = new Bag(), tables = {};
    let count = 0;
    for (const [table, evidence] of Object.entries(manifest.tables)) {
        const schema = read(`struct/${table}.json`), rows = read(`data/${table}.json`);
        assert.equal(rows.length, evidence.rows); count += rows.length;
        for (const [field, attrs] of Object.entries(schema.fields)) bag.setItem(`struct.${table}.${field}`, null, attrs);
        bag.setItem(`data.${table}`, new Bag()); tables[table] = {table};
        for (const row of rows) {
            const converted = Object.fromEntries(Object.entries(row).map(([field, value]) => [field,
                value === '' ? null : schema.fields[field].dtype === 'L' ? Number(value) :
                schema.fields[field].dtype === 'B' ? ['true','t','1'].includes(value.toLowerCase()) : value]));
            const key = encodeURIComponent(String(converted[schema.primaryKey])).replaceAll('.', '%2E');
            bag.setItem(`data.${table}.r_${key}`, new Bag(converted));
        }
    }
    assert.equal(Object.keys(tables).length, 18); assert.equal(count, 17538);
    const start = performance.now();
    const db = new BagDB(bag);
    const initialized = performance.now();
    tables.customer.selector = {key:'id',caption:'account_name',search:'account_name'};
    const adapter = new BagDbReadAdapter(db, {tables});
    const invoices = read('data/invoice.json');
    const identity = invoices[0].customer_id;
    const record = await adapter.readRecord('customer', {id:identity});
    assert.equal(record.found, true);
    const selection = await adapter.query('invoice', {where:{customer_id:identity}, limit:1000});
    assert.deepEqual(selection.rows.map(r=>r.id).sort(), invoices.filter(r=>r.customer_id===identity).map(r=>r.id).sort());
    assert.equal(selection.rows[0].gross_total, invoices.find(r=>r.id===selection.rows[0].id).gross_total);
    const results = await adapter.query('customer', {text:{field:'account_name',value:record.record.account_name,match:'prefix',caseSensitive:true}});
    assert.ok(results.rows.some(r=>r.id===identity));
    const catalog = new ModelCatalog(adapter);
    const tree = await catalog.relationTree('customer', {maxDepth:3,maxNodes:50});
    assert.ok(tree);
    const state = await adapter.describeTable('state');
    assert.ok(state.relations.some(r=>r.target==='region' && !r.inverse));
    assert.ok(state.relations.some(r=>r.target==='postcode' && r.inverse));
    console.log(JSON.stringify({rows:count,initializeMs:Math.round(initialized-start),readsAndModelMs:Math.round(performance.now()-initialized)}));
});
