// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
/** Mount a Python recipe and attach real page Bags without reparenting/copying. */
import {Application} from 'gramlot-dom';
import {Bag} from 'genro-bag-js';
import {GramlotBuilder} from './builder.js';
import {DeveloperTools} from './dev.js';
import {Shortcuts} from './shortcuts.js';
import {InspectorEditor} from './inspector-editor.js';

import {normalizeInspectorOrigins} from './inspector-origins.js';

function resolveOrigin(page, kind, origins) {
    const key = `${kind}_root`;
    const full = page.builder[kind];
    if (!Object.hasOwn(origins, key)) return {bag: full, error: null};
    const requested = origins[key];
    let bag = null;
    if (kind === 'data') {
        const value = full.getItem(requested);
        if (value instanceof Bag) bag = value;
    } else {
        const node = full.getNodeByAttr('node_id', requested)
            || full.getNodeByAttr('nodeId', requested);
        const value = node?.getValue();
        if (value instanceof Bag) bag = value;
    }
    return bag
        ? {bag, error: null}
        : {bag: new Bag(), error: `Configured ${kind} root not found: ${requested}`};
}

export function mountInspector(host, source, page, {
    shortcuts: enableShortcuts = true,
    origins = {},
} = {}) {
    if (page._disposed || page.dev?.disposed) return null;
    page.dev ||= new DeveloperTools();
    page.dev.inspector?.dispose();
    const builder = new GramlotBuilder('inspector');
    builder.loadSource(source);
    const mount = document.createElement('div');
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = new URL('./inspector.css', import.meta.url).href;
    host.append(mount);
    const app = new Application(mount, builder, {inspector: false});
    mount.append(stylesheet);
    const shortcuts = new Shortcuts(host.ownerDocument);
    const toggle = () => app.live(() => builder.data.setItem('opened', !builder.data.getItem('opened')));
    if (enableShortcuts) shortcuts.register('inspector.toggle', 'ctrl+shift+d', toggle, {allowEditing: true});
    const button = mount.querySelector('[data-inspector="toggle"]');
    button.addEventListener('click', toggle);
    const subscriptions = [];
    const scopes = {};
    for (const kind of ['data', 'source']) {
        const tree = mount.querySelector(`[data-inspector="${kind}"]`);
        const editor = new InspectorEditor(
            mount.querySelector(`[data-inspector="${kind}-editor"]`), new Bag(), page);
        subscriptions.push(() => editor.dispose());
        const scope = {bag: null, error: null, tree, editor};
        scopes[kind] = scope;
        const refresh = () => {
            const path = builder.data.getItem(kind + 'Path');
            editor.refresh(path);
            const node = path ? scope.bag.getNode(path) : null;
            const value = node?.getValue();
            const seen = new WeakSet();
            const text = !node ? (scope.error || 'Select a node') : 'Path: ' + path + '\n' + JSON.stringify({
                value: value instanceof Bag ? '[Bag]' : value,
                attributes: node?.attr,
            }, (_key, item) => {
                if (item instanceof Bag) return '[Bag]';
                if (typeof item === 'bigint' || typeof item === 'function') return String(item);
                if (item && typeof item === 'object') {
                    if (seen.has(item)) return '[Circular reference]';
                    seen.add(item);
                }
                return item;
            }, 2);
            if (builder.data.getItem(kind + 'Detail') !== text) {
                app.live(() => builder.data.setItem(kind + 'Detail', text));
            }
        };
        const id = 'inspector-detail-' + kind;
        scope.refresh = refresh;
        scope.id = id;
        builder.data.subscribe(id, {any: refresh});
        subscriptions.push(() => builder.data.unsubscribe(id, {any: true}));
    }
    let disposed = false;
    const tool = {app, shortcuts, origins: {}, setOrigins(next = {}) {
        const normalized = normalizeInspectorOrigins(next);
        for (const kind of ['data', 'source']) {
            const scope = scopes[kind];
            const resolved = resolveOrigin(page, kind, normalized);
            if (scope.bag === resolved.bag && scope.error === resolved.error) continue;
            if (scope.bag) scope.bag.unsubscribe(scope.id, {any: true});
            scope.bag = resolved.bag;
            scope.error = resolved.error;
            scope.tree.storeBag = scope.bag;
            scope.editor.setBag(scope.bag);
            scope.bag.subscribe(scope.id, {any: scope.refresh});
            app.live(() => builder.data.setItem(kind + 'Path', null));
            scope.refresh();
        }
        tool.origins = normalized;
    }, dispose() {
        if (disposed) return;
        disposed = true;
        shortcuts.dispose();
        for (const scope of Object.values(scopes)) {
            scope.bag?.unsubscribe(scope.id, {any: true});
        }
        subscriptions.forEach(dispose => dispose());
        button.removeEventListener('click', toggle);
        app.dispose();
        mount.remove();
    }};
    tool.setOrigins(origins);
    page.dev.inspector = tool;
    return tool;
}
