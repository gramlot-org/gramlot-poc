// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
export class DataError extends Error {
    constructor(code, message, options) { super(message, options); this.code = code; }
}
export function requireRequest(condition, message) {
    if (!condition) throw new DataError('invalid_request', message);
}
export function checkAbort(signal) {
    if (signal?.aborted) throw new DataError('abort', 'Operation aborted');
}
export function normalizeError(error) {
    if (error instanceof DataError) return error;
    return new DataError(error?.name === 'AbortError' ? 'abort' : 'backend_failure',
        error?.message ?? 'Read failed', {cause: error});
}
export class ModelProvider {
    async describeTable() { throw new DataError('unsupported_capability', 'Metadata unavailable'); }
}
export class ReadAdapter extends ModelProvider {
    async capabilities() { return {cursor: false, totalCount: false}; }
    async readRecord() { throw new DataError('unsupported_capability', 'Record reads unavailable'); }
    async query() { throw new DataError('unsupported_capability', 'Queries unavailable'); }
}
