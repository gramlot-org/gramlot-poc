// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
const ORIGIN_KEYS = ['data_root', 'source_root'];

export function normalizeInspectorOrigins(options = {}) {
    if (options === null || typeof options !== 'object' || Array.isArray(options)) {
        throw new TypeError('Inspector origins must be an object');
    }
    const origins = {};
    for (const key of ORIGIN_KEYS) {
        if (!Object.hasOwn(options, key)) continue;
        const value = options[key];
        if (typeof value !== 'string' || !value.trim()) {
            throw new TypeError(`Inspector ${key} must be a non-empty string`);
        }
        origins[key] = value;
    }
    return origins;
}
