// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import test from 'node:test';
import assert from 'node:assert/strict';
import {setupDom} from './dom.js';
import {Application} from '../src/application.js';
import {HtmlBuilder} from '../src/contrib/html/html-builder.js';
import '../src/collections/frame-channel.js';


test('receiver accepts only its same-origin parent and writes through normal input', () => {
    setupDom().reconfigure({url:'https://showcase.test/'});
    class Child extends HtmlBuilder {
        static wc_requires = ['frameChannel'];
        setup() { this.setData('tools', true); }
        main(root) {
            root.frameChannel({mode: 'receiver', channel: 'showcase-tools', value: '^tools'});
        }
    }
    const host = document.body.appendChild(document.createElement('main'));
    const app = new Application(host, new Child('main'));
    const bridge = host.querySelector('gnr-framechannel');
    const deliver = (value, overrides = {}) => window.dispatchEvent(new window.MessageEvent(
        'message', {data: {protocol: 'gramlot-frame-channel/v1',
            channel: 'showcase-tools', value}, origin: window.location.origin,
            source: window.parent, ...overrides},
    ));
    deliver(false, {origin: 'https://other.invalid'});
    assert.equal(app.data.getItem('main.tools'), true);
    deliver(false, {data: {protocol: 'other', channel: 'showcase-tools', value: false}});
    assert.equal(app.data.getItem('main.tools'), true);
    deliver(false);
    assert.equal(bridge.value, false);
    assert.equal(app.data.getItem('main.tools'), false);
    app.dispose();
    deliver(true);
    assert.equal(app.data.getItem('main.tools'), false, 'dispose removes the message listener');
});


test('sender targets one named same-origin iframe and resyncs after load', () => {
    setupDom().reconfigure({url:'https://showcase.test/'});
    class Parent extends HtmlBuilder {
        static wc_requires = ['frameChannel'];
        setup() { this.setData('active', 'lesson-a'); this.setData('tools', true); }
        main(root) {
            root.iframe({name: 'lesson-a', src: '/lesson-a/'});
            root.frameChannel({mode: 'sender', channel: 'showcase-tools',
                target: '^active', value: '^tools'});
        }
    }
    const messages = [];
    const host = document.body.appendChild(document.createElement('main'));
    const app = new Application(host, new Parent('main'));
    const frame = host.querySelector('iframe');
    const original = frame.contentWindow.postMessage;
    frame.contentWindow.postMessage = (message, origin) => messages.push({message, origin});
    frame.dispatchEvent(new Event('load'));
    app.live(() => app.data.setItem('main.tools', false));
    assert.equal(messages.at(-1).message.value, false);
    assert.equal(messages.at(-1).message.channel, 'showcase-tools');
    assert.equal(messages.at(-1).origin, window.location.origin);
    const count = messages.length;
    app.dispose();
    frame.dispatchEvent(new Event('load'));
    assert.equal(messages.length, count, 'dispose removes the iframe load listener');
    frame.contentWindow.postMessage = original;
});
