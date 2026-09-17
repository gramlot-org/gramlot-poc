import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ModelProvider} from '../src/database/common/read-adapter.mjs';
import {ModelCatalog} from '../src/database/common/model.mjs';
import {modelTreeBag} from '../src/database/model-tree-bag.js';
const fk = {id:'invoice.customer',source:'invoices',target:'customers',sourceFields:['customer'],targetFields:['id'],cardinality:'one',inverse:false};
const inverse = {id:'customer.invoices',source:'customers',target:'invoices',sourceFields:['id'],targetFields:['customer'],cardinality:'many',inverse:true};
function fixture() {
    const fields = {id:{dtype:'T',nullable:false}};
    const tables = {
        customers:{table:'customers',identity:['id'],fields,relations:[inverse]},
        invoices:{table:'invoices',identity:['id'],fields:{...fields,customer:{dtype:'T',nullable:false},amount:{dtype:'N',nullable:true}},relations:[fk]}
    };
    const calls=[];
    class Provider extends ModelProvider {
        async describeTable(table) {calls.push(table); return structuredClone(tables[table]);}
    }
    return {catalog:new ModelCatalog(new Provider()),calls,tables};
}
const code = expected => error => error.code === expected;

test('abstract model works with metadata-only provider and non-BagDB dtype',async () => {
    const {catalog,calls} = fixture();
    assert.equal((await catalog.field('invoices','amount')).dtype,'N');
    const path = await catalog.resolvePath('customers',['customer.invoices','invoice.customer']);
    assert.equal(path.table.table,'customers'); assert.equal(path.relations[0].cardinality,'many');
    assert.deepEqual(calls,['invoices','customers']);
    const changed = await catalog.table('customers');changed.fields.id.dtype = 'B';
    assert.equal((await catalog.field('customers','id')).dtype,'T');
});

test('relation tree includes reverse edges, paths and finite cycle leaves',async () => {
    const {catalog} = fixture(); const tree = await catalog.relationTree('customers');
    assert.equal(tree.children[0].table,'invoices');
    const cycle = tree.children[0].children[0];
    assert.equal(cycle.cycle,true);assert.deepEqual(cycle.children,[]);
    assert.deepEqual(cycle.path,['customer.invoices','invoice.customer']);
    const bag = modelTreeBag(tree);
    assert.equal(bag.getNode('r_0.r_0').attr.cycle,true);
    assert.equal(bag.getNode('r_0.f_2').attr.dtype,'N');
    assert.equal(bag.getNode('r_0').attr.relation_direction,'descending');
    assert.equal(bag.getNode('r_0.r_0').attr.relation_direction,'ascending');
    assert.equal(bag.getNode('r_0').attr.dtype,'T');
    assert.equal(bag.getNode('f_0').attr.caption,'id');
});

test('depth and node budgets are explicit and bounded',async () => {
    const {catalog,calls} = fixture();
    const shallow = await catalog.relationTree('customers',{maxDepth:0});
    assert.equal(shallow.truncated,true);assert.deepEqual(calls,['customers']);
    const limited = await catalog.relationTree('customers',{maxNodes:1});
    assert.deepEqual(limited.children,[]);assert.equal(limited.truncated,true);
    assert.equal(modelTreeBag(limited).getNode('limit').attr.kind,'limit');
    await assert.rejects(catalog.relationTree('customers',{maxDepth:99}),code('invalid_request'));
});

test('invalid schema, paths and missing target fields fail explicitly',async () => {
    const {catalog,tables} = fixture();
    await assert.rejects(catalog.resolvePath('customers',['invented']),code('invalid_request'));
    tables.invoices.fields.customer = undefined;
    await assert.rejects(catalog.resolvePath('customers',['customer.invoices']),code('invalid_request'));
    const another = fixture();delete another.tables.invoices.fields.customer;
    another.tables.invoices.relations=[];
    await assert.rejects(another.catalog.resolvePath('customers',['customer.invoices']),code('invalid_request'));
    const broken = fixture();broken.tables.customers.relations.push({...inverse});
    await assert.rejects(broken.catalog.table('customers'),code('invalid_request'));
});

test('abort and invalidation stop an in-flight model traversal',async () => {
    const sample = fixture();let release;
    const catalog = new ModelCatalog({describeTable:async table => {
        await new Promise(resolve => {release = resolve;});return sample.tables[table];
    }});
    const traversal = catalog.relationTree('customers');
    catalog.invalidate();release();
    await assert.rejects(traversal,code('abort'));
    const controller = new AbortController();controller.abort();
    await assert.rejects(sample.catalog.relationTree('customers',{signal:controller.signal}),code('abort'));
});
