// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
/** Opt-in, same-origin boolean state shared with one named child iframe. */
import {registerComponentCollection} from '../components/registry.js';

const PROTOCOL = 'gramlot-frame-channel/v1';
const CHANNEL = /^[a-z][a-z0-9-]{0,63}$/;
const components = [{
    name: 'frameChannel',
    tag: 'gnr-framechannel',
    subTags: '',
    meta: {propertyAttributes: ['value', 'target']},
}];

export function defineComponents() {
    if (customElements.get('gnr-framechannel')) return;
    class FrameChannel extends HTMLElement {
    constructor() {
        super();
        this._value = true;
        this._target = null;
        this._frame = null;
        this._observer = null;
        this._receive = event => this._onMessage(event);
        this._loaded = () => this._post();
    }

    get mode() { return this.getAttribute('mode') || 'receiver'; }
    get channel() { return this.getAttribute('channel') || ''; }
    get value() { return this._value; }
    set value(value) {
        const next = value !== false && value !== 'false' && value != null;
        if (next === this._value) return;
        this._value = next;
        if (this.isConnected && this.mode === 'sender') this._post();
    }
    get target() { return this._target; }
    set target(value) {
        const next = value == null ? null : String(value);
        if (next === this._target) return;
        this._target = next;
        if (this.isConnected && this.mode === 'sender') this._attachFrame();
    }

    connectedCallback() {
        this.hidden = true;
        if (!CHANNEL.test(this.channel)) {
            throw new TypeError('frameChannel requires a lowercase channel name');
        }
        if (!['sender', 'receiver'].includes(this.mode)) {
            throw new TypeError('frameChannel mode must be sender or receiver');
        }
        this.ownerDocument.defaultView.addEventListener('message', this._receive);
        if (this.mode === 'receiver') {
            const view = this.ownerDocument.defaultView;
            if (view.parent !== view) view.parent.postMessage({protocol: PROTOCOL, channel: this.channel, ready: true}, view.location.origin);
            return;
        }
        this._observer = new this.ownerDocument.defaultView.MutationObserver(() => this._attachFrame());
        this._observer.observe(this.ownerDocument.documentElement, {childList: true, subtree: true});
        this._attachFrame();
    }

    disconnectedCallback() {
        this.ownerDocument.defaultView.removeEventListener('message', this._receive);
        this._observer?.disconnect();
        this._observer = null;
        this._detachFrame();
    }

    _detachFrame() {
        this._frame?.removeEventListener('load', this._loaded);
        this._frame = null;
    }

    _attachFrame() {
        const escaped = globalThis.CSS?.escape
            ? globalThis.CSS.escape(this._target || '') : (this._target || '').replace(/"/g, '\\"');
        const frame = this._target
            ? this.ownerDocument.querySelector('iframe[name="' + escaped + '"]') : null;
        if (frame === this._frame) return;
        this._detachFrame();
        this._frame = frame;
        frame?.addEventListener('load', this._loaded);
        this._post();
    }

    _sameOriginFrame() {
        if (!this._frame?.contentWindow) return false;
        const source = this._frame.getAttribute('src') || 'about:blank';
        if (source === 'about:blank') return true;
        try {
            return new URL(source, this.ownerDocument.baseURI).origin === this.ownerDocument.defaultView.location.origin;
        } catch {
            return false;
        }
    }

    _post() {
        if (!this._sameOriginFrame()) return;
        this._frame.contentWindow.postMessage({
            protocol: PROTOCOL,
            channel: this.channel,
            value: this._value,
        }, this.ownerDocument.defaultView.location.origin);
    }

    _onMessage(event) {
        const message = event.data;
        if (this.mode === 'sender') {
            if (this._sameOriginFrame() && event.origin === this.ownerDocument.defaultView.location.origin
                    && event.source === this._frame.contentWindow && message?.protocol === PROTOCOL
                    && message.channel === this.channel && message.ready === true) this._post();
            return;
        }
        if (event.origin !== this.ownerDocument.defaultView.location.origin || event.source !== this.ownerDocument.defaultView.parent
                || !message || message.protocol !== PROTOCOL
                || message.channel !== this.channel || typeof message.value !== 'boolean') {
            return;
        }
        if (message.value === this._value) return;
        this._value = message.value;
        this.dispatchEvent(new Event('input', {bubbles: true, composed: true}));
        this.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
    }
}

    customElements.define('gnr-framechannel', FrameChannel);
}

registerComponentCollection('frameChannel', {components, defineComponents});
