// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
/** Inspector origins expose and edit only the configured live Bag branches. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {setupDom} from '../js/dom/tests/dom.js';

setupDom();
const {Application} = await import('gramlot-dom');
const {GramlotBuilder} = await import('../js/pages/src/builder.js');
const recipe = readFileSync(0, 'utf8');
globalThis.fetch = async url => {
    assert.match(String(url), /inspector.tytx$/);
    return {ok: true, text: async () => recipe};
};

class Example extends GramlotBuilder {
    setup() {
        this.setData('data_root.count', 1);
        this.setData('private_value', 99);
        this.setData('example.sourceVisible', true);
    }
    main(root) {
        const scoped = root.div({node_id: 'source_root'});
        scoped.div('^data_root.count', {node_id: 'inside_source'});
        root.div('^private_value', {node_id: 'outside_source'});
    }
}

function application(inspector) {
    const host = document.createElement('div');
    document.body.append(host);
    const options = inspector === undefined ? {} : {inspector};
    return new Application(host, new Example('page'), options);
}

function inspectorParts(app) {
    const root = app.inspector.element.shadowRoot;
    const tool = app.inspector.element.tool;
    const tree = kind => root.querySelector(`[data-inspector="${kind}"]`);
    const editor = kind => root.querySelector(`[data-inspector="${kind}-editor"]`);
    const rows = kind => editor(kind).querySelector('[data-field="rows"]').shadowRoot;
    const value = kind => rows(kind).querySelector('[data-property="value"] [data-cell="value"]');
    const detail = kind => root.querySelector(`[data-inspector="${kind}-detail"]`).textContent;
    const select = (kind, path) => tool.app.live(
        () => tool.app.builder.data.setItem(`${kind}Path`, path));
    const commit = (kind, text) => {
        const input = value(kind);
        input.value = text;
        input.dispatchEvent(new window.Event('input', {bubbles: true, composed: true}));
        input.dispatchEvent(new window.FocusEvent('focusout', {bubbles: true, composed: true}));
    };
    return {tool, tree, editor, detail, select, commit};
}

const app = application({
    launcher: false,
    data_root: 'data_root',
    source_root: 'source_root',
});
await app.inspector.open();
const scoped = inspectorParts(app);
const liveData = app.builder.data.getItem('data_root');
const sourceOwner = app.builder.source.getNodeByAttr('node_id', 'source_root');
const liveSource = sourceOwner.getValue();
assert.equal(scoped.tree('data').storeBag, liveData);
assert.equal(scoped.tree('source').storeBag, liveSource);
assert.deepEqual(liveData.keys(), ['count']);
assert.equal(scoped.tree('data').storeBag.getNode('private_value'), null);
assert.equal(scoped.tree('data').storeBag.getNode('example'), null);
assert.equal(scoped.tree('source').storeBag.getNodeByAttr('node_id', 'outside_source'), null);

scoped.select('data', 'count');
scoped.commit('data', '7');
assert.equal(app.builder.data.getItem('data_root.count'), 7);
assert.equal(app.builder.data.getItem('private_value'), 99);
assert.equal(app.target.root.querySelector('[data-gnr-target-id]').textContent.includes('7'), true);

const inside = liveSource.getNodeByAttr('node_id', 'inside_source');
scoped.select('source', inside.label);
scoped.commit('source', 'Scoped source');
assert.equal(inside.getValue(), 'Scoped source');
assert.equal(app.builder.source.getNodeByAttr('node_id', 'outside_source').getValue(), '^private_value');
assert.match(app.target.root.textContent, /Scoped source/);
assert.match(app.target.root.textContent, /99/);

await app.inspector.open({data_root: 'missing.data', source_root: 'missing_source'});
const closed = inspectorParts(app);
assert.notEqual(closed.tree('data').storeBag, app.builder.data);
assert.notEqual(closed.tree('source').storeBag, app.builder.source);
assert.equal(closed.tree('data').storeBag.length, 0);
assert.equal(closed.tree('source').storeBag.length, 0);
assert.match(closed.detail('data'), /Configured data root not found: missing\.data/);
assert.match(closed.detail('source'), /Configured source root not found: missing_source/);
closed.select('data', 'private_value');
assert.equal(closed.editor('data').disabled, true);
assert.equal(app.builder.data.getItem('private_value'), 99);
app.dispose();

for (const inspector of [undefined, true]) {
    const full = application(inspector);
    await full.inspector.open();
    const parts = inspectorParts(full);
    assert.equal(parts.tree('data').storeBag, full.builder.data);
    assert.equal(parts.tree('source').storeBag, full.builder.source);
    full.dispose();
}

console.log('Inspector scoped origins, live writeback, fail-closed roots and full defaults passed.');
