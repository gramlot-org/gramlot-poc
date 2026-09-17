// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import {ReadAdapter, DataError, requireRequest as valid, checkAbort, normalizeError} from '../common/read-adapter.mjs';

const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
function keys(value, allowed) {
    valid(object(value) && Object.keys(value).every(key => allowed.includes(key)), 'Unknown or invalid request properties');
}
function typed(value, field) {
    return value === null ? field.nullable : ({T: () => typeof value === 'string',
        L: () => Number.isSafeInteger(value), R: () => typeof value === 'number' && Number.isFinite(value),
        B: () => typeof value === 'boolean'}[field.dtype]?.() ?? false);
}
function compare(a, b) { return a === b ? 0 : a === null ? -1 : b === null ? 1 : a < b ? -1 : 1; }

/** Read-only facade; the injected BagDB remains owned by the fixture creator. */
export class BagDbReadAdapter extends ReadAdapter {
    #db; #tables;
    constructor(db, {tables}) {
        super();
        valid(object(tables), 'An explicit logical table registry is required');
        this.#db = db;
        this.#tables = structuredClone(tables);
    }
    async capabilities() {
        return {read: true, metadata: true, equality: true, literalText: true,
            ordering: true, cursor: false, totalCount: false, writes: false, dtypes: ['T','L','R','B']};
    }
    async #run(signal, action) {
        checkAbort(signal);
        try { const result = action(this.#db.bag); checkAbort(signal); return result; }
        catch (error) { throw normalizeError(error); }
    }
    #descriptor(snapshot, table) {
        valid(typeof table === 'string' && Object.hasOwn(this.#tables, table), 'Unknown table');
        const config = this.#tables[table];
        const schema = snapshot.node('struct')?.value.node(config.table)?.value;
        valid(schema, 'Registry table missing from schema');
        const fields = Object.fromEntries([...schema].map(node => [node.label, {
            dtype: node.attr.dtype, nullable: !node.attr.primaryKey && node.attr.nullable !== false,
            label: node.attr.label ?? node.label}]));
        const identity = [...schema].filter(node => node.attr.primaryKey).map(node => node.label);
        valid(identity.length === 1, 'A single primary key is required');
        const selector = config.selector ?? null;
        if (selector) valid(selector.key === identity[0] && fields[selector.caption]?.dtype === 'T' &&
            fields[selector.search]?.dtype === 'T', 'Invalid selector configuration');
        const relations = [];
        for (const [source, entry] of Object.entries(this.#tables)) {
            const sourceSchema = snapshot.node('struct')?.value.node(entry.table)?.value;
            valid(sourceSchema, 'Registry table missing from schema');
            for (const node of sourceSchema) {
                if (!node.attr.references) continue;
                const [targetTable, targetField] = node.attr.references.split('.');
                for (const [target, targetEntry] of Object.entries(this.#tables)) {
                    if (targetEntry.table !== targetTable) continue;
                    const id = `${source}.${node.label}->${target}.${targetField}`;
                    if (source === table) relations.push({id, source, target, sourceFields: [node.label],
                        targetFields: [targetField], cardinality: 'one', inverse: false});
                    if (target === table) relations.push({id: `${id}:inverse`, source: target, target: source,
                        sourceFields: [targetField], targetFields: [node.label], cardinality: 'many', inverse: true});
                }
            }
        }
        return {table, identity, fields, relations, selector: structuredClone(selector)};
    }
    #projection(descriptor, fields) {
        valid(fields === undefined || Array.isArray(fields), 'fields must be an array');
        const selected = fields ?? Object.keys(descriptor.fields);
        valid(selected.every(field => typeof field === 'string' && Object.hasOwn(descriptor.fields, field)), 'Unknown projection field');
        return [...new Set([...descriptor.identity, ...selected])];
    }
    #rows(snapshot, table) {
        return [...snapshot.node('data').value.node(this.#tables[table].table).value].map(node => node.value.asDict());
    }
    async describeTable(table, {signal} = {}) {
        return this.#run(signal, snapshot => this.#descriptor(snapshot, table));
    }
    async readRecord(table, identity, {fields, signal} = {}) {
        return this.#run(signal, snapshot => {
            const descriptor = this.#descriptor(snapshot, table), key = descriptor.identity[0];
            keys(identity, [key]);
            valid(Object.hasOwn(identity, key) && typed(identity[key], descriptor.fields[key]), 'Invalid identity');
            const selected = this.#projection(descriptor, fields);
            const row = this.#rows(snapshot, table).find(row => row[key] === identity[key]);
            return {found: !!row, identity: {...identity}, record: row ? Object.fromEntries(selected.map(f => [f,row[f]])) : null};
        });
    }
    async query(table, request = {}, {signal} = {}) {
        return this.#run(signal, snapshot => {
            keys(request, ['fields','where','text','orderBy','limit','cursor','totalCount']);
            if (request.cursor !== undefined || request.totalCount !== undefined)
                throw new DataError('unsupported_capability', 'Cursor and exact counts are unavailable');
            const descriptor = this.#descriptor(snapshot, table);
            const selected = this.#projection(descriptor, request.fields);
            const {where = {}, text = null, limit = 50, orderBy = []} = request;
            valid(Number.isSafeInteger(limit) && limit > 0 && limit <= 1000, 'limit must be 1..1000');
            keys(where, Object.keys(descriptor.fields));
            for (const [field, value] of Object.entries(where)) valid(typed(value, descriptor.fields[field]), `Invalid dtype for ${field}`);
            if (text !== null) {
                keys(text, ['field','value','match','caseSensitive']);
                valid(Object.hasOwn(descriptor.fields, text.field) && descriptor.fields[text.field].dtype === 'T' &&
                    typeof text.value === 'string' && ['prefix','contains'].includes(text.match) &&
                    typeof text.caseSensitive === 'boolean', 'Invalid literal text predicate');
            }
            valid(Array.isArray(orderBy), 'orderBy must be an array');
            for (const order of orderBy) {
                keys(order, ['field','direction']);
                valid(Object.hasOwn(descriptor.fields, order.field) && ['asc','desc'].includes(order.direction), 'Invalid ordering');
            }
            const effectiveOrder = structuredClone(orderBy);
            for (const field of descriptor.identity) if (!effectiveOrder.some(o => o.field === field)) effectiveOrder.push({field, direction:'asc'});
            const fold = value => text.caseSensitive ? value : value.toLowerCase();
            const rows = this.#rows(snapshot, table).filter(row =>
                Object.entries(where).every(([field,value]) => row[field] === value) &&
                (!text || (row[text.field] !== null && (text.match === 'prefix' ?
                    fold(row[text.field]).startsWith(fold(text.value)) : fold(row[text.field]).includes(fold(text.value))))));
            rows.sort((a,b) => {
                for (const {field,direction} of effectiveOrder) {
                    const result = compare(a[field],b[field]);
                    if (result) return direction === 'asc' ? result : -result;
                }
                return 0;
            });
            return {rows: rows.slice(0,limit).map(row => Object.fromEntries(selected.map(f => [f,row[f]]))),
                orderBy: effectiveOrder, hasMore: rows.length > limit};
        });
    }
}
