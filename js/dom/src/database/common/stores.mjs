// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import {DataError, checkAbort, normalizeError, requireRequest} from './read-adapter.mjs';
const copy = value => structuredClone(value);

// Cancellation races the provider even when that provider ignores AbortSignal.
async function abortable(action, signal) {
    checkAbort(signal);
    let listener;
    const aborted = new Promise((resolve, reject) => {
        listener = () => reject(new DataError('abort', 'Operation aborted'));
        signal.addEventListener('abort', listener, {once:true});
    });
    try { return await Promise.race([Promise.resolve().then(() => {checkAbort(signal); return action();}), aborted]); }
    finally { signal.removeEventListener('abort', listener); }
}

/** One designated Data Bag node is the only stored public state. */
export class BaseStore {
    #data; #path; #listeners = new Set(); #lanes = new Map(); #disposed = false; #queued = false;
    constructor({data, path = 'store', onListenerError = error => console.error(error)}) {
        requireRequest(data?.setItem && data?.getItem && typeof path === 'string' && path.length > 0, 'A Data Bag and path are required');
        this.#data = data; this.#path = path; this.onListenerError = onListenerError;
        this.#data.setItem(path, {loading:false, stale:false, error:null, result:null});
    }
    snapshot() { return copy(this.#data.getItem(this.#path)); }
    assertActive() { if (this.#disposed) throw new DataError('unavailable', 'Store disposed'); }
    subscribe(listener) {
        this.assertActive(); this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }
    #publish(patch) {
        if (this.#disposed) return;
        this.#data.setItem(this.#path, {...this.snapshot(), ...copy(patch)});
        if (this.#queued) return;
        this.#queued = true;
        queueMicrotask(() => {
            this.#queued = false;
            if (this.#disposed) return;
            for (const listener of this.#listeners) {
                try { listener(this.snapshot()); } catch (error) { this.onListenerError(error); }
            }
        });
    }
    async run(lane, action, {publish = true, signal} = {}) {
        this.assertActive(); checkAbort(signal);
        this.#lanes.get(lane)?.abort();
        const controller = new AbortController();
        this.#lanes.set(lane, controller);
        const cancel = () => controller.abort();
        signal?.addEventListener('abort', cancel, {once:true});
        if (publish) this.#publish({loading:true, error:null});
        try {
            const result = await abortable(() => action(controller.signal), controller.signal);
            checkAbort(controller.signal);
            if (publish) this.#publish({result, loading:false, error:null, stale:false});
            return copy(result);
        } catch (failure) {
            const error = normalizeError(failure);
            if (publish && this.#lanes.get(lane) === controller) this.#publish({loading:false, stale:true,
                error:error.code === 'abort' ? null : {code:error.code, message:error.message}});
            throw error;
        } finally {
            signal?.removeEventListener('abort', cancel);
            if (this.#lanes.get(lane) === controller) this.#lanes.delete(lane);
        }
    }
    invalidate() {
        this.assertActive();
        for (const controller of this.#lanes.values()) controller.abort();
        this.#lanes.clear(); this.#publish({loading:false, stale:true});
    }
    dispose() {
        if (this.#disposed) return;
        this.invalidate(); this.#disposed = true; this.#listeners.clear();
    }
}
export class CollectionStore extends BaseStore {
    constructor({adapter, table, ...options}) { super(options); Object.defineProperties(this, {adapter:{value:adapter}, table:{value:table}}); }
    async load(request = {}, {signal} = {}) {
        const frozen = copy(request);
        return this.run('load', signal => this.adapter.query(this.table, frozen, {signal}), {signal});
    }
    async lookup(identity, {fields, signal} = {}) {
        const key = copy(identity), projection = copy(fields);
        return this.run('lookup', signal => this.adapter.readRecord(this.table, key, {fields:projection, signal}), {publish:false, signal});
    }
    async loadMore() { this.assertActive(); throw new DataError('unsupported_capability', 'Continuation is not implemented'); }
}
export class SelectorStore extends CollectionStore {
    async search(value, {limit = 50, caseSensitive = false, where = {}, signal} = {}) {
        const filters = copy(where);
        return this.run('load', async signal => {
            requireRequest(typeof value === 'string', 'Search text must be a string');
            const descriptor = await this.adapter.describeTable(this.table, {signal});
            checkAbort(signal);
            const selector = descriptor.selector;
            requireRequest(selector, 'No selector configured');
            const request = {fields:[selector.key,selector.caption], where:filters, limit,
                orderBy:[{field:selector.caption,direction:'asc'}]};
            if (value) request.text = {field:selector.search,value,match:'prefix',caseSensitive};
            let result = await this.adapter.query(this.table, request, {signal});
            checkAbort(signal);
            if (value && result.rows.length === 0) {
                request.text.match = 'contains';
                result = await this.adapter.query(this.table, request, {signal});
                checkAbort(signal);
            }
            return {...result, options:result.rows.map(row => ({value:row[selector.key],caption:row[selector.caption]}))};
        }, {signal});
    }
    async resolveValue(value, {signal} = {}) {
        return this.run('lookup', async signal => {
            const descriptor = await this.adapter.describeTable(this.table, {signal});
            checkAbort(signal);
            const selector = descriptor.selector;
            requireRequest(selector, 'No selector configured');
            if (value === null) return {found:false, option:null};
            const result = await this.adapter.readRecord(this.table, {[selector.key]:value},
                {fields:[selector.key,selector.caption],signal});
            return {found:result.found, option:result.found ? {value:result.record[selector.key], caption:result.record[selector.caption]} : null};
        }, {publish:false, signal});
    }
}
export class RecordStore extends BaseStore {
    constructor({adapter, table, ...options}) { super(options); Object.defineProperties(this, {adapter:{value:adapter}, table:{value:table}}); }
    async load(identity, {fields,signal} = {}) {
        const key = copy(identity), projection = copy(fields);
        return this.run('load', signal => this.adapter.readRecord(this.table, key, {fields:projection,signal}), {signal});
    }
}
// Preserve the experimental import path while separating model and row responsibilities.
export {ModelCatalog} from './model.mjs';
