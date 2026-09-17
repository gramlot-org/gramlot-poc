// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {setupDom} from '../../gramlot-dom/tests/dom.js';
import {Application} from 'gramlot-dom';
import {fromTytx} from 'genro-tytx';
setupDom();
const {GramlotBuilder} = await import('/_assets/pages/builder.js');
const builder = new GramlotBuilder('main');
builder.loadSource(fromTytx(readFileSync(0, 'utf8'), 'json'));
const host = document.body.appendChild(document.createElement('main'));
const errors = [];
const originalError = console.error;
console.error = (...args) => errors.push(args.map(String).join(' '));
let app;
try {
    app = new Application(host, builder, {inspector:false});
    await Promise.resolve();
    const tree = host.querySelector('gnr-storetree');
    const tabs = host.querySelector('gnr-tabcontainer');
    const frames = () => [...host.querySelectorAll('iframe')];
    const selected = () => builder.data.getItem('showcase.active');
    assert.equal(selected(), 'overview');
    const overview = frames()[0];
    // Expand groups using their own controls before choosing lesson leaves.
    for (const row of [...tree.shadowRoot.querySelectorAll('summary')]) row.click();
    await Promise.resolve();
    const leaves = [...tree.shadowRoot.querySelectorAll('.leaf')];
    assert.ok(leaves.length >= 7, 'catalog must exercise the tab limit');
    const choose = async index => { leaves[index].click(); await Promise.resolve(); };
    await choose(1);
    const second = frames()[1];
    assert.equal(frames().length, 2);
    tabs.closePage(1);
    assert.equal(frames().length, 1);
    await choose(1);
    assert.equal(frames().length, 2, 'same leaf reopens closed page');
    assert.notEqual(frames()[1], second, 'reopening creates a fresh iframe');
    await choose(0);
    assert.equal(frames()[0], overview, 'selecting an open page preserves it');
    for (let index=2; index<6; index++) await choose(index);
    assert.equal(frames().length, 6);
    const retained = frames()[1];
    await choose(0); // revisiting does not change opening age
    await choose(6);
    assert.equal(frames().length, 6);
    assert.ok(!frames().includes(overview), 'seventh page closes oldest opened page');
    assert.ok(frames().includes(retained), 'remaining iframe instances survive eviction');
    assert.ok(!errors.some(message => message.includes('reactive execution cycle')), errors.join('\n'));
} finally {
    console.error = originalError;
    app?.dispose();
}
console.log('Showcase shell navigation settles without controller cycles.');
