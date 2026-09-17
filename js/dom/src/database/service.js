// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import {Bag} from 'genro-bag-js';
import {BagDB} from './common/bagdb.js';
import {BagDbReadAdapter} from './fake/bagdb-read-adapter.mjs';
import {RecordStore, CollectionStore, SelectorStore, ModelCatalog} from './common/stores.mjs';
import {DataError} from './common/read-adapter.mjs';
import {modelTreeBag} from './model-tree-bag.js';
import {selectionBag} from '../stores/collection-stores.js';

/** Experimental Source-owned database services. No network or host dependency. */
export class DatabaseService {
    constructor(application) {
        this.application = application;
        this.adapters = new Map();
        this.owners = new Map();
        this.generations = new WeakMap();
        this.models = new Map();
    }
    register(node) {
        const [, attributes] = node.builder.runtimeValues(node);
        const {adapter: name, tables, source} = attributes;
        if (this.adapters.has(name)) throw new Error(`Duplicate database adapter: ${name}`);
        const fixture = source instanceof Bag ? source : node.getRelativeData(source);
        const db = new BagDB(fixture);
        const adapter = new BagDbReadAdapter(db, {tables});
        this.adapters.set(name, {node, db, adapter, catalog:new ModelCatalog(adapter)});
    }
    get(name) {
        const entry = this.adapters.get(name);
        if (!entry) throw new DataError('invalid_request', `Unknown database adapter: ${name}`);
        return entry;
    }
    _store(owner, name, table, Type) {
        const registered = this.get(name);
        let entry = this.owners.get(owner);
        if (entry && (entry.name !== name || entry.table !== table || entry.Type !== Type)) {
            entry.store.dispose(); this.owners.delete(owner); entry = null;
        }
        if (!entry) {
            // Dedicated Data Bag; the controller publishes a separate consumer Bag.
            const data = new Bag();
            entry = {name, table, Type, store:new Type({adapter:registered.adapter,table,data}), version:0};
            this.owners.set(owner, entry);
        }
        return entry;
    }
    invoke(node) {
        const generation = (this.generations.get(node) || 0) + 1;
        this.generations.set(node, generation);
        const current = () => !this.application._disposed && this.generations.get(node) === generation;
        const [, attr] = node.builder.runtimeValues(node);
        const Type = node.nodeTag === 'dataRecord' ? RecordStore : CollectionStore;
        let entry;
        const execute = async () => {
            await Promise.resolve(); // Source startup precedes handler activation.
            if (!current()) return {status:'obsolete'};
            try {
                entry = this._store(node, attr.adapter, attr.dbtable, Type);
                const version = ++entry.version;
                const active = () => !this.application._disposed && this.owners.get(node) === entry && entry.version === version;
                const status = state => {
                    if (active() && attr.statuspath) this.application.live(() => node.setRelativeData(attr.statuspath, new Bag(state)));
                };
                status({loading:true, stale:entry.store.snapshot().stale, error:null});
                const descriptor = await this.get(attr.adapter).catalog.table(attr.dbtable);
                if (!active()) return {status:'obsolete'};
                let result;
                if (Type === RecordStore) {
                    // Null means no selected identity, distinct from an unknown key.
                    result = attr.pkey === null || attr.pkey === undefined
                        ? {found:false,record:null,identity:null}
                        : await entry.store.load({[descriptor.identity[0]]:attr.pkey}, {fields:attr.fields});
                } else {
                    const request = Object.fromEntries(['fields','where','orderBy','limit'].filter(key => attr[key] != null).map(key => [key,attr[key]]));
                    result = await entry.store.load(request);
                }
                if (!active()) return {status:'obsolete'};
                const value = Type === RecordStore ? (result.found ? new Bag(result.record) : null)
                    : selectionBag({...result, identifier:descriptor.identity[0]}, descriptor.identity[0]);
                this.application.live(() => {
                    node.setRelativeData(attr.destination, value);
                    if (attr.statuspath) node.setRelativeData(attr.statuspath, new Bag({loading:false,stale:false,error:null,
                        ...(Type === RecordStore ? {found:result.found} : {hasMore:result.hasMore})}));
                });
                return {status:'ready',result};
            } catch (error) {
                // Replaced requests must not alter status or the current Data result.
                if (error.code === 'abort' || !current() || (entry && this.owners.get(node) !== entry)) return {status:'obsolete'};
                if (attr.statuspath) this.application.live(() => node.setRelativeData(attr.statuspath,
                    new Bag({loading:false,stale:true,error:new Bag({code:error.code || 'backend_failure',message:error.message})})));
                return {status:'error',error};
            }
        };
        node._databasePromise = execute();
        return node._databasePromise;
    }
    invokeModel(node) {
        this.models.get(node)?.controller.abort();
        const [, attr] = node.builder.runtimeValues(node);
        const entry = {controller:new AbortController(), name:attr.adapter};
        this.models.set(node, entry);
        const current = () => !this.application._disposed && this.models.get(node) === entry;
        const execute = async () => {
            await Promise.resolve();
            if (!current()) return {status:'obsolete'};
            try {
                if (attr.statuspath) this.application.live(() => node.setRelativeData(attr.statuspath,
                    new Bag({loading:true,error:null})));
                const tree = await this.get(attr.adapter).catalog.relationTree(attr.dbtable, {
                    maxDepth:attr.maxDepth ?? 3, maxNodes:attr.maxNodes ?? 100, signal:entry.controller.signal});
                if (!current()) return {status:'obsolete'};
                this.application.live(() => {
                    node.setRelativeData(attr.destination, modelTreeBag(tree));
                    if (attr.statuspath) node.setRelativeData(attr.statuspath,new Bag({loading:false,stale:false,error:null}));
                });
                return {status:'ready',result:tree};
            } catch (error) {
                if (!current() || error.code === 'abort') return {status:'obsolete'};
                if (attr.statuspath) this.application.live(() => node.setRelativeData(attr.statuspath,
                    new Bag({loading:false,stale:true,error:new Bag({code:error.code || 'backend_failure',message:error.message})})));
                return {status:'error',error};
            }
        };
        node._databasePromise = execute();
        return node._databasePromise;
    }
    async select(owner, attr, params) {
        const entry = this._store(owner, attr.dbadapter, attr.dbtable, SelectorStore);
        const descriptor = await this.get(attr.dbadapter).catalog.table(attr.dbtable);
        let options;
        if (params._id !== undefined && params._id !== null) {
            let identity = params._id;
            const dtype = descriptor.fields[descriptor.identity[0]].dtype;
            // Existing dbSelect stringifies identities. Bridge only canonical integers.
            if (dtype === 'L' && typeof identity === 'string') {
                const number = Number(identity);
                if (!Number.isSafeInteger(number) || String(number) !== identity) throw new DataError('invalid_request','Invalid integer identity');
                identity = number;
            }
            const result = await entry.store.resolveValue(identity);
            options = result.found ? [result.option] : [];
        } else {
            options = (await entry.store.search(params._querystring ?? '', {
                limit:attr.limit ?? 10,caseSensitive:attr.ignoreCase === false})).options;
        }
        return {rows:options.map(option => ({id:option.value,caption:option.caption})),identifier:'id',caption:'caption'};
    }
    release(owner) {
        this.models.get(owner)?.controller.abort(); this.models.delete(owner);
        this.generations.set(owner, (this.generations.get(owner) || 0) + 1);
        const entry = this.owners.get(owner);
        entry?.store.dispose(); this.owners.delete(owner);
        for (const [name, registered] of this.adapters) {
            if (registered.node !== owner) continue;
            for (const [consumer, state] of this.owners) if (state.name === name) {
                state.store.dispose(); this.owners.delete(consumer);
            }
            for (const [consumer, state] of this.models) if (state.name === name) {
                state.controller.abort(); this.models.delete(consumer);
            }
            registered.catalog.invalidate(); this.adapters.delete(name);
        }
    }
    dispose() {
        for (const state of this.models.values()) state.controller.abort();
        this.models.clear();
        for (const entry of this.owners.values()) entry.store.dispose();
        this.owners.clear(); this.adapters.clear();
    }
}
