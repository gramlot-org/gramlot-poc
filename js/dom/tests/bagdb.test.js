// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
// Contract tests: generic in-memory relational behavior and persistence.
import test from 'node:test';
import assert from 'node:assert/strict';
import { Bag } from 'genro-bag-js';
import { BagDB } from '../src/database/common/bagdb.js';

function fixture() {
    const bag = new Bag();
    bag.setItem('struct.customers.id', null, { dtype: 'T', primaryKey: true });
    bag.setItem('struct.customers.name', null, { dtype: 'T', nullable: false });
    bag.setItem('struct.orders.id', null, { dtype: 'L', primaryKey: true });
    bag.setItem('struct.orders.customer', null, { dtype: 'T', references: 'customers.id' });
    bag.setItem('struct.orders.total', null, { dtype: 'R' });
    bag.setItem('struct.orders.paid', null, { dtype: 'B' });
    bag.setItem('data.customers', new Bag());
    bag.setItem('data.orders', new Bag());
    return bag;
}

test('duplicate input labels are rejected before TYTX can collapse them', () => {
    for (const path of ['data.customers', 'struct.customers', 'struct', 'data', '']) {
        const bag = fixture();
        const branch = path ? bag.getNode(path).value : bag;
        branch.setItem('duplicate_one', new Bag({id: 'a', name: 'First'}));
        branch.setItem('duplicate_two', new Bag({id: 'a', name: 'Last'}));
        branch.node('duplicate_one').label = 'r_a';
        branch.node('duplicate_two').label = 'r_a';
        const before = bag.toTytx();
        assert.throws(() => new BagDB(bag), /Duplicate label/, path || 'root');
        assert.equal(bag.toTytx(), before, 'rejected input must remain unchanged');
    }
    const bag = fixture();
    const row = new Bag({id: 'a', name: 'First', extra: 'Last'});
    row.node('extra').label = 'name';
    bag.setItem('data.customers.r_a', row);
    assert.throws(() => new BagDB(bag), /Duplicate label/);
});

test('CRUD preserves PK/FK integrity and rejected operations leave data intact', () => {
    const db = new BagDB(fixture());
    db.insertRow('customers', { id: 'a', name: 'Alice' });
    db.insertRow('orders', { id: 1, customer: 'a', total: 1.5, paid: false });
    const before = db.bag.toTytx();
    assert.throws(() => db.insertRow('customers', { id: 'a', name: 'Other' }), /Duplicate/);
    assert.throws(() => db.insertRow('orders', { id: 2, customer: 'missing' }), /Foreign key/);
    assert.throws(() => db.updateRow('orders', 1, { customer: 'missing' }), /Foreign key/);
    assert.throws(() => db.updateRow('customers', 'a', { id: 'b' }), /immutable/);
    assert.throws(() => db.deleteRow('customers', 'a'), /referenced/);
    assert.equal(db.bag.toTytx(), before);
    db.updateRow('customers', 'a', { name: 'Alicia' });
    assert.equal(db.getRow('customers', 'a').name, 'Alicia');
    db.deleteRow('orders', 1);
    db.deleteRow('customers', 'a');
    assert.equal(db.getRow('customers', 'a'), null);
    assert.throws(() => db.updateRow('orders', 123, {}), /Missing/);
    assert.throws(() => db.deleteRow('orders', 123), /Missing/);
});

test('types, fields, nullability and safe keys are checked without coercion', () => {
    const db = new BagDB(fixture());
    for (const row of [{id: 1}, {id: 'a'}, {id: 'a', name: null}, {id: 'a', name: 2},
        {id: 'a', name: 'A', extra: 1}]) {
        assert.throws(() => db.insertRow('customers', row));
    }
    for (const row of [{id: 1.5}, {id: Number.MAX_SAFE_INTEGER + 1}, {id: 1, total: Infinity},
        {id: 1, paid: 1}]) assert.throws(() => db.insertRow('orders', row));
    for (const id of ['a.b', '#0', '__proto__', '']) {
        db.insertRow('customers', {id, name: id});
        assert.equal(db.getRow('customers', id).id, id);
    }
    db.insertRow('orders', {id: 0});
    assert.equal(db.getRow('orders', 0).customer, null);
    assert.throws(() => db.getRow('orders', '0'), /dtype/);
});

test('parameterized queries keep insertion order and apply only requested filtering', () => {
    const db = new BagDB(fixture());
    for (const [id, name] of [['a','Malice'], ['b','Alice'], ['c','ALICE'], ['d','Bob']]) {
        db.insertRow('customers', {id, name});
    }
    assert.deepEqual(db.getRows('customers', {text: {field: 'name', value: 'ali', caseSensitive: false}})
        .map(r => r.id), ['a', 'b', 'c']);
    assert.deepEqual(db.getRows('customers', {text: {field: 'name', value: 'Ali', match: 'startsWith'}})
        .map(r => r.id), ['b']);
    assert.deepEqual(db.getRows('customers', {where: {id: 'd'}}).map(r => r.name), ['Bob']);
    assert.equal(db.getRows('customers', {limit: 1}).length, 1);
    assert.equal(db.getRows('customers', {limit: 0}).length, 0);
    assert.throws(() => db.getRows('customers', {limit: -1}));
    assert.throws(() => db.getRows('customers', {where: {missing: 'x'}}));
    assert.throws(() => db.getRows('customers', {text: {field: 'name', value: 'a', match: 'regex'}}));
});

test('constructor checks schema and loaded rows; snapshots cannot bypass constraints', () => {
    const bag = fixture();
    const db = new BagDB(bag);
    bag.setItem('struct.customers.id', null, {dtype: 'B'});
    db.insertRow('customers', {id: 'a', name: 'Alice'});
    const row = db.getRow('customers', 'a'); row.id = 'b';
    const copy = db.bag; copy.setItem('data.customers', new Bag());
    assert.equal(db.getRow('customers', 'a').name, 'Alice');
    assert.throws(() => new BagDB(bag));
    const bad = fixture();
    bad.setItem('struct.orders.customer', null, {dtype: 'L', references: 'customers.id'});
    assert.throws(() => new BagDB(bad), /reference/);
    const loaded = db.bag;
    loaded.setItem('data.customers.wrong', new Bag({id: 'missing', name: 'X'}));
    assert.throws(() => new BagDB(loaded), /label/);
    const orphan = db.bag;
    orphan.setItem('data.orders.r_1', new Bag({id: 1, customer: 'absent', total: null, paid: null}));
    assert.throws(() => new BagDB(orphan), /Foreign key/);
});

test('close saves TYTX once, awaits persistence and can retry after failure', async () => {
    let release, calls = 0, saved;
    const db = new BagDB(fixture(), {save: async payload => {
        calls++; saved = payload;
        await new Promise(resolve => { release = resolve; });
    }});
    db.insertRow('customers', {id: 'a', name: 'Alice'});
    const closing = db.close();
    await Promise.resolve();
    assert.throws(() => db.insertRow('customers', {id: 'b', name: 'Bob'}), /closed|closing/);
    const closingAgain = db.close();
    release(); await Promise.all([closing, closingAgain]);
    assert.equal(calls, 1);
    await db.close(); assert.equal(calls, 1);
    const restored = new BagDB(Bag.fromTytx(saved));
    assert.equal(restored.getRow('customers', 'a').name, 'Alice');
    let fail = true;
    const retry = new BagDB(fixture(), {save: async () => { if (fail) throw Error('disk'); }});
    await assert.rejects(retry.close(), /disk/);
    retry.insertRow('customers', {id: 'x', name: 'X'});
    fail = false; await retry.close();
});

test('loaded omissions normalize to null; self references and incoming references work', () => {
    const bag = fixture();
    bag.setItem('struct.customers.parent', null, {dtype: 'T', references: 'customers.id'});
    bag.setItem('data.customers.r_a', new Bag({id: 'a', name: 'A'}));
    const db = new BagDB(bag);
    assert.equal(db.getRow('customers', 'a').parent, null);
    db.updateRow('customers', 'a', {parent: 'a'});
    db.insertRow('customers', {id: 'b', name: 'B', parent: 'a'});
    assert.throws(() => db.deleteRow('customers', 'a'), /referenced/);
    db.deleteRow('customers', 'b');
    db.deleteRow('customers', 'a');
    db.insertRow('customers', {id: 'c', name: 'C', parent: 'c'});
    assert.equal(db.getRow('customers', 'c').parent, 'c');
});

test('builder declares tables, columns and separate relations; handles remain usable', () => {
    const db = new BagDB();
    const customers = db.setTable('customers');
    customers.setColumn('id', {dtype: 'T', primaryKey: true});
    customers.setColumn('name', {dtype: 'T', nullable: false});
    const orders = db.setTable('orders');
    assert.deepEqual(db.getRows('orders'), []);
    assert.throws(() => db.insertRow('orders', {}), /primary key/);
    orders.setColumn('id', {dtype: 'L', primaryKey: true});
    orders.setColumn('customer_id', {dtype: 'T'});
    orders.setRelation('customer_id', 'customers', 'id');
    db.insertRow('customers', {id: 'a', name: 'Alice'});
    db.insertRow('orders', {id: 1, customer_id: 'a'});
    assert.throws(() => db.deleteRow('customers', 'a'), /referenced/);
    db.setTable('orders');
    assert.equal(db.getRow('orders', 1).customer_id, 'a');
    customers.setColumn('name', {label: 'Customer name'});
    const attr = db.bag.getNode('struct.customers.name').attr;
    assert.equal(attr.dtype, 'T');
    assert.equal(attr.nullable, false);
    assert.equal(attr.label, 'Customer name');
    assert.equal(db.getRow('customers', 'a').name, 'Alice');
    assert.throws(() => db.setTable('invalid', {id: {dtype: 'T'}}), /setTable/);
    assert.throws(() => orders.setColumn('customer_id', {references: 'customers.id'}), /setRelation/);
});

test('schema changes validate all data atomically and never alter established PKs', () => {
    const db = new BagDB(fixture());
    const customers = db.setTable('customers');
    const orders = db.setTable('orders');
    db.insertRow('customers', {id: 'a', name: 'Alice'});
    db.insertRow('orders', {id: 1, customer: 'a'});
    customers.setColumn('note', {dtype: 'T'});
    assert.equal(db.getRow('customers', 'a').note, null);
    const before = db.bag.toTytx();
    for (const change of [
        () => customers.setColumn('required', {dtype: 'T', nullable: false}),
        () => customers.setColumn('note', {nullable: false}),
        () => customers.setColumn('name', {dtype: 'L'}),
        () => customers.setColumn('id', {primaryKey: false}),
        () => customers.setColumn('id', {dtype: 'L'}),
        () => orders.setColumn('customer', {dtype: 'L'}),
        () => orders.setRelation('customer', 'absent', 'id'),
        () => orders.setRelation('customer', 'customers', 'name'),
        () => orders.setRelation('absent', 'customers', 'id'),
        () => customers.setColumn('missingType', {}),
    ]) {
        assert.throws(change);
        assert.equal(db.bag.toTytx(), before);
    }
    const empty = db.setTable('empty');
    empty.setColumn('id', {dtype: 'T', primaryKey: true});
    assert.throws(() => empty.setColumn('id', {dtype: 'L'}), /immutable/);
    orders.setColumn('unlinked', {dtype: 'T'});
    db.updateRow('orders', 1, {unlinked: 'absent'});
    const beforeRelation = db.bag.toTytx();
    assert.throws(() => orders.setRelation('unlinked', 'customers', 'id'), /Foreign key/);
    assert.equal(db.bag.toTytx(), beforeRelation);
});

test('builder changes obey close lifecycle and incomplete empty schema round trips', async () => {
    const db = new BagDB();
    const table = db.setTable('draft');
    table.setColumn('name', {dtype: 'T'});
    const restored = new BagDB(db.bag);
    restored.setTable('draft').setColumn('id', {dtype: 'L', primaryKey: true});
    restored.insertRow('draft', {id: 1});
    assert.equal(restored.getRow('draft', 1).name, null);
    const closing = db.close();
    assert.throws(() => table.setColumn('id', {dtype: 'T', primaryKey: true}), /closed|closing/);
    assert.throws(() => db.setTable('another'), /closed|closing/);
    await closing;
    assert.throws(() => table.setRelation('name', 'draft', 'name'), /closed|closing/);
});
