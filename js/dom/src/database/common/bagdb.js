// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import { Bag } from 'genro-bag-js';

/**
 * Small, single-owner database: Bag(struct, data), scalar columns and PK/FK checks.
 * Column attributes declare dtype, primaryKey, nullable and references (table.pk).
 * Owns its Bag; CRUD and validated schema calls write it. Reads return detached rows.
 * Queries apply explicit equality/text parameters in insertion order, without ranking.
 * close() awaits an injected save(TYTX) callback; failed saves leave the DB usable.
 * No SQL, cascades, concurrency, host I/O or component/adapter behavior.
 */
export class BagDB {
    #bag;
    #tables = new Map();
    #save;
    #closing = null;
    #closed = false;

    constructor(bag = new Bag({struct: new Bag(), data: new Bag()}), {save = null} = {}) {
        if (!(bag instanceof Bag)) throw new TypeError('Expected a Bag');
        if (save !== null && typeof save !== 'function') throw new TypeError('Invalid save callback');
        this.#save = save;
        // TYTX reconstruction merges repeated labels; reject them before copying.
        this.#checkLabels(bag);
        this.#bag = Bag.fromTytx(bag.toTytx());
        const struct = this.#bag.node('struct')?.value;
        const data = this.#bag.node('data')?.value;
        if (!(struct instanceof Bag) || !(data instanceof Bag) || this.#bag.length !== 2) {
            throw new Error('Expected only struct and data Bags');
        }
        for (const table of struct) {
            this.#checkName(table.label);
            if (!(table.value instanceof Bag)) throw new Error('Invalid table structure');
            const fields = new Map();
            let primaryKey;
            for (const field of table.value) {
                this.#checkName(field.label);
                const attr = {...field.attr};
                if (fields.has(field.label)) throw new Error('Duplicate field');
                if (!['T', 'L', 'R', 'B'].includes(attr.dtype)) throw new Error('Unsupported dtype');
                if (attr.primaryKey) {
                    if (primaryKey || !['T', 'L'].includes(attr.dtype)) throw new Error('Invalid primary key');
                    primaryKey = field.label;
                }
                fields.set(field.label, attr);
            }
            const rows = data.node(table.label)?.value;
            if (!(rows instanceof Bag) || (!primaryKey && rows.length)) {
                throw new Error('Missing primary key or data table');
            }
            if (this.#tables.has(table.label)) throw new Error('Duplicate table');
            this.#tables.set(table.label, {fields, primaryKey, rows});
        }
        if (data.length !== this.#tables.size) throw new Error('Unknown data table');
        for (const table of this.#tables.values()) {
            for (const field of table.fields.values()) {
                if (field.references === undefined) continue;
                const parts = typeof field.references === 'string' ? field.references.split('.') : [];
                const target = this.#tables.get(parts[0]);
                if (parts.length !== 2 || !target || target.primaryKey !== parts[1] ||
                    target.fields.get(parts[1]).dtype !== field.dtype) throw new Error('Invalid reference');
            }
            const seen = new Set();
            for (const node of table.rows) {
                if (!(node.value instanceof Bag)) throw new Error('Expected a row Bag');
                const row = node.value.asDict();
                this.#validateRow(table, row);
                if (node.label !== this.#key(row[table.primaryKey])) throw new Error('Invalid row label');
                if (seen.has(node.label)) throw new Error('Duplicate primary key');
                seen.add(node.label);
                node.value = new Bag(row);
            }
        }
    }

    /** Declare one table and return a handle; existing declarations are preserved. */
    setTable(name) {
        if (arguments.length !== 1) throw new Error('setTable expects only a table name');
        this.#checkWritable();
        this.#checkName(name);
        if (!this.#tables.has(name)) this.#changeSchema(bag => {
            bag.setItem(`struct.${name}`, new Bag());
            bag.setItem(`data.${name}`, new Bag());
        });
        return {
            setColumn: (column, attributes) => {
                if (!attributes || typeof attributes !== 'object' || Array.isArray(attributes)) {
                    throw new TypeError('Expected column attributes');
                }
                if (Object.hasOwn(attributes, 'references')) throw new Error('Use setRelation');
                this.#setColumn(name, column, attributes);
            },
            setRelation: (column, target, key) => {
                this.#checkName(target);
                this.#checkName(key);
                if (!this.#getTable(name).fields.has(column)) throw new Error('Unknown field');
                this.#setColumn(name, column, {references: `${target}.${key}`});
            },
        };
    }

    #setColumn(tableName, column, attributes) {
        this.#checkWritable();
        this.#checkName(column);
        const previous = this.#getTable(tableName).fields.get(column);
        const merged = {...previous, ...attributes};
        if (previous?.primaryKey && (!merged.primaryKey || merged.dtype !== previous.dtype)) {
            throw new Error('Primary key declaration is immutable');
        }
        this.#changeSchema(bag => {
            bag.setItem(`struct.${tableName}.${column}`, null, merged);
        });
    }

    #changeSchema(change) {
        const candidate = this.bag;
        change(candidate);
        const validated = new BagDB(candidate);
        this.#bag = validated.#bag;
        this.#tables = validated.#tables;
    }

    /** Detached full snapshot, suitable for inspection or native Bag serialization. */
    get bag() { return Bag.fromTytx(this.#bag.toTytx()); }

    getRow(tableName, key) {
        const table = this.#getTable(tableName);
        if (!table.primaryKey) throw new Error('Missing primary key');
        this.#checkType(key, table.fields.get(table.primaryKey).dtype);
        return table.rows.node(this.#key(key))?.value.asDict() ?? null;
    }

    /** Equality filters are ANDed; optional text matching is literal, never ranked. */
    getRows(tableName, {where = {}, text = null, limit = 50} = {}) {
        const table = this.#getTable(tableName);
        if (!Number.isSafeInteger(limit) || limit < 0) throw new Error('Invalid limit');
        for (const field of Object.keys(where)) {
            if (!table.fields.has(field)) throw new Error(`Unknown field: ${field}`);
        }
        let needle;
        if (text) {
            if (table.fields.get(text.field)?.dtype !== 'T' || typeof text.value !== 'string' ||
                !['contains', 'startsWith'].includes(text.match ?? 'contains')) throw new Error('Invalid text filter');
            needle = text.caseSensitive === false ? text.value.toLowerCase() : text.value;
        }
        const result = [];
        for (const node of table.rows) {
            if (result.length === limit) break;
            const row = node.value.asDict();
            if (!Object.entries(where).every(([field, value]) => row[field] === value)) continue;
            if (text) {
                let value = row[text.field];
                if (value === null) continue;
                if (text.caseSensitive === false) value = value.toLowerCase();
                if (!(text.match === 'startsWith' ? value.startsWith(needle) : value.includes(needle))) continue;
            }
            result.push(row);
        }
        return result;
    }

    insertRow(tableName, values) {
        this.#checkWritable();
        const table = this.#getTable(tableName);
        const row = this.#validateRow(table, {...values});
        const key = this.#key(row[table.primaryKey]);
        if (table.rows.node(key)) throw new Error('Duplicate primary key');
        table.rows.setItem(key, new Bag(row));
        return {...row};
    }

    updateRow(tableName, key, changes) {
        this.#checkWritable();
        const table = this.#getTable(tableName);
        const previous = this.getRow(tableName, key);
        if (!previous) throw new Error('Missing row');
        if (Object.hasOwn(changes, table.primaryKey) && changes[table.primaryKey] !== key) {
            throw new Error('Primary key is immutable');
        }
        const row = this.#validateRow(table, {...previous, ...changes});
        table.rows.setItem(this.#key(key), new Bag(row));
        return {...row};
    }

    deleteRow(tableName, key) {
        this.#checkWritable();
        const table = this.#getTable(tableName);
        if (!this.getRow(tableName, key)) throw new Error('Missing row');
        const reference = `${tableName}.${table.primaryKey}`;
        for (const other of this.#tables.values()) {
            for (const [field, attr] of other.fields) {
                if (attr.references !== reference) continue;
                for (const node of other.rows) {
                    if (other === table && node.label === this.#key(key)) continue;
                    if (node.value.node(field)?.value === key) throw new Error('Row is referenced');
                }
            }
        }
        table.rows.popNode(this.#key(key));
    }

    close() {
        if (this.#closed) return Promise.resolve();
        if (this.#closing) return this.#closing;
        this.#closing = Promise.resolve().then(() => this.#save?.(this.#bag.toTytx()))
            .then(() => { this.#closed = true; })
            .finally(() => { this.#closing = null; });
        return this.#closing;
    }

    #validateRow(table, row) {
        if (!table.primaryKey) throw new Error('Missing primary key');
        for (const field of Object.keys(row)) {
            if (!table.fields.has(field)) throw new Error(`Unknown field: ${field}`);
        }
        for (const [name, attr] of table.fields) {
            const value = row[name] ?? null;
            row[name] = value;
            if (value === null) {
                if (attr.primaryKey || attr.nullable === false) throw new Error(`Required field: ${name}`);
                continue;
            }
            this.#checkType(value, attr.dtype);
            if (attr.references) {
                const [targetName] = attr.references.split('.');
                const target = this.#tables.get(targetName);
                const selfReference = target === table && value === row[table.primaryKey];
                if (!selfReference && !target.rows.node(this.#key(value))) throw new Error(`Foreign key: ${name}`);
            }
        }
        return row;
    }

    #checkLabels(bag) {
        const seen = new Set();
        for (const node of bag) {
            if (seen.has(node.label)) throw new Error(`Duplicate label: ${node.label}`);
            seen.add(node.label);
            if (node.value instanceof Bag) this.#checkLabels(node.value);
        }
    }

    #checkType(value, dtype) {
        const valid = dtype === 'T' ? typeof value === 'string' :
            dtype === 'L' ? Number.isSafeInteger(value) :
            dtype === 'R' ? typeof value === 'number' && Number.isFinite(value) :
            typeof value === 'boolean';
        if (!valid) throw new TypeError(`Invalid value for dtype ${dtype}`);
    }

    #checkName(name) {
        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw new Error('Invalid table or field name');
    }

    #key(value) { return `r_${encodeURIComponent(String(value)).replaceAll('.', '%2E')}`; }

    #getTable(name) {
        const table = this.#tables.get(name);
        if (!table) throw new Error(`Unknown table: ${name}`);
        return table;
    }

    #checkWritable() {
        if (this.#closed || this.#closing) throw new Error('Database is closed or closing');
    }
}
