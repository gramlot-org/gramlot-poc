// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import {DataError, requireRequest as valid, checkAbort, normalizeError} from './read-adapter.mjs';
const copy = value => structuredClone(value);
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const name = value => typeof value === 'string' && value.length > 0;

/** Validate neutral metadata. Dtypes are identifiers, not a BagDB-specific enum. */
export function validateTable(value, table) {
    valid(object(value) && value.table === table, 'Model table identity mismatch');
    valid(object(value.fields) && Array.isArray(value.identity) && value.identity.length > 0,
        'Model fields and identity are required');
    const hasField = field => name(field) && Object.hasOwn(value.fields, field);
    valid(new Set(value.identity).size === value.identity.length && value.identity.every(hasField), 'Invalid model identity');
    for (const [field, descriptor] of Object.entries(value.fields)) {
        valid(name(field) && object(descriptor) && name(descriptor.dtype) &&
            typeof descriptor.nullable === 'boolean', `Invalid field descriptor: ${field}`);
    }
    valid(Array.isArray(value.relations), 'Model relations must be explicit');
    const ids = new Set();
    for (const edge of value.relations) {
        valid(object(edge) && name(edge.id) && !ids.has(edge.id) && edge.source === table && name(edge.target), 'Invalid relation identity');
        ids.add(edge.id);
        valid(Array.isArray(edge.sourceFields) && edge.sourceFields.length > 0 && edge.sourceFields.every(hasField) &&
            Array.isArray(edge.targetFields) && edge.sourceFields.length === edge.targetFields.length && edge.targetFields.every(name), 'Invalid relation field mapping');
        valid(['one','many'].includes(edge.cardinality) && typeof edge.inverse === 'boolean', 'Invalid relation multiplicity');
    }
    return copy(value);
}

/** Schema-only catalog; provider needs describeTable, never query/readRecord. */
export class ModelCatalog {
    #provider; #cache = new Map(); #generation = 0;
    constructor(provider) {
        valid(typeof provider?.describeTable === 'function', 'Model provider requires describeTable');
        this.#provider = provider;
    }
    invalidate() { this.#generation++; this.#cache.clear(); }
    async table(table, {signal} = {}) {
        valid(name(table), 'A logical table name is required'); checkAbort(signal);
        if (this.#cache.has(table)) return copy(this.#cache.get(table));
        const generation = this.#generation;
        let result;
        try { result = await this.#provider.describeTable(table, {signal}); }
        catch (error) { throw normalizeError(error); }
        checkAbort(signal);
        const descriptor = validateTable(result, table);
        if (generation === this.#generation) this.#cache.set(table, copy(descriptor));
        return descriptor;
    }
    async field(table, field, options) {
        const descriptor = await this.table(table, options);
        valid(Object.hasOwn(descriptor.fields, field), 'Unknown field');
        return descriptor.fields[field];
    }
    async relations(table, options) { return (await this.table(table, options)).relations; }
    async #target(edge, options) {
        const target = await this.table(edge.target, options);
        valid(edge.targetFields.every(field => Object.hasOwn(target.fields, field)), 'Unknown relation target field');
        return target;
    }
    /** Follow explicit relation IDs; no ORM expressions, joins or inferred paths. */
    async resolvePath(root, relationIds = [], options = {}) {
        valid(Array.isArray(relationIds) && relationIds.length <= 32 && relationIds.every(name), 'Invalid model path');
        let descriptor = await this.table(root, options);
        const relations = [];
        for (const id of relationIds) {
            const edge = descriptor.relations.find(relation => relation.id === id);
            valid(edge, `Unknown relation: ${id}`);
            descriptor = await this.#target(edge, options); relations.push(edge);
        }
        return {root, path:[...relationIds], table:descriptor, relations};
    }
    /** Bounded materialization for inspection. This is not a lazy record tree. */
    async relationTree(root, {maxDepth = 3, maxNodes = 100, signal} = {}) {
        valid(Number.isInteger(maxDepth) && maxDepth >= 0 && maxDepth <= 8, 'maxDepth must be 0..8');
        valid(Number.isInteger(maxNodes) && maxNodes >= 1 && maxNodes <= 1000, 'maxNodes must be 1..1000');
        const generation = this.#generation;
        let remaining = maxNodes;
        const visit = async (descriptor, path, ancestors, relation = null) => {
            checkAbort(signal);
            if (generation !== this.#generation) throw new DataError('abort','Model changed during traversal');
            remaining--;
            const cycle = ancestors.includes(descriptor.table);
            const node = {table:descriptor.table, identity:descriptor.identity, fields:descriptor.fields,
                path, relation, cycle, truncated:false, children:[]};
            if (cycle) return node;
            if (path.length >= maxDepth) { node.truncated = descriptor.relations.length > 0; return node; }
            for (const edge of descriptor.relations) {
                if (remaining <= 0) { node.truncated = true; break; }
                const target = await this.#target(edge, {signal});
                node.children.push(await visit(target, [...path,edge.id], [...ancestors,descriptor.table], edge));
            }
            return node;
        };
        const result = await visit(await this.table(root, {signal}), [], []);
        checkAbort(signal);
        if (generation !== this.#generation) throw new DataError('abort','Model changed during traversal');
        return result;
    }
}
