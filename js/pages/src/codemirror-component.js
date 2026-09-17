// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import {registerComponentCollection, builtinComponents, getCollection} from 'gramlot-dom';
import {WidgetLabel} from '/_assets/dom/widget-label.js';
import {loadCodeMirror} from '/_assets/dom/editor-dependencies.js';
import {loadCodeMirrorFromCdn} from '/_assets/dom/codemirror-cdn.js';
import '/_assets/dom/collections/storetree.js';
import '/_assets/dom/collections/layout.js';
import {defineGramlotIde} from '/_assets/dom/collections/gramlot-ide.js';

registerComponentCollection('labEditors', {
    components: builtinComponents('labEditors'),
    defineComponents() {
        getCollection('storeTree').defineComponents();
        getCollection('layout').defineComponents();
        defineGramlotIde();
        if (customElements.get('gnr-codemirror')) { return; }
        class CodeMirrorElement extends HTMLElement {
            static get observedAttributes() { return ['value', 'language', 'readonly', 'provider']; }
            constructor() {
                super();
                this.attachShadow({mode: 'open'});
                this._value = '';
                this._content = document.createElement('div');
                this._content.style.height = '100%';
                const style = document.createElement('style');
                style.textContent = ':host{display:block;border:1px solid var(--gray-300,#d8d8dc);border-radius:3px;background:white}.cm-editor{height:var(--code-editor-height,280px);font-size:var(--code-editor-font-size,12px)}.cm-scroller{overflow:auto}textarea{box-sizing:border-box;width:100%;height:var(--code-editor-height,280px);font:var(--code-editor-font-size,13px) monospace}';
                this.shadowRoot.append(style, this._content);
                this._widgetLabel = new WidgetLabel(this, null, this._content);
            }
            get value() { return this.editor ? this.editor.state.doc.toString() : this._value; }
            set value(value) {
                this._value = value == null ? '' : String(value);
                if (this.fallback) { this.fallback.value = this._value; }
                if (this.editor && this.editor.state.doc.toString() !== this._value) {
                    this.editor.dispatch({changes: {from: 0, to: this.editor.state.doc.length, insert: this._value}});
                }
            }
            attributeChangedCallback(name, old, value) {
                if (name === 'value') this.value = value;
                else if (old !== value && this.isConnected) { this.disconnectedCallback(); this.connectedCallback(); }
            }
            async connectedCallback() {
                const generation = this.generation = (this.generation || 0) + 1;
                this.fallback = document.createElement('textarea');
                this.fallback.value = this._value;
                this.fallback.readOnly = this.hasAttribute('readonly');
                this.fallback.setAttribute('aria-label', this.getAttribute('aria-label') || 'Code');
                this.fallback.addEventListener('input', () => {
                    this._value = this.fallback.value;
                    this.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
                });
                this._content.replaceChildren(this.fallback);
                this._widgetLabel.connect();
                try {
                    const {EditorView, basicSetup, EditorState, oneDark, languageExtension}
                        = await (this.getAttribute('provider') === 'cdn' ? loadCodeMirrorFromCdn : loadCodeMirror)(this.getAttribute('language'));
                    if (!this.isConnected || this.generation !== generation) { return; }
                    const readonly = this.hasAttribute('readonly');
                    this.editor = new EditorView({parent: this._content, doc: this._value,
                        extensions: [basicSetup, oneDark, ...(languageExtension ? [languageExtension] : []),
                            EditorState.readOnly.of(readonly), EditorView.editable.of(!readonly),
                            EditorView.lineWrapping,
                            EditorView.contentAttributes.of({tabindex: '0', 'aria-label': this.getAttribute('aria-label') || 'Code'}),
                            EditorView.updateListener.of(update => {
                                if (update.docChanged && !readonly) {
                                    this._value = update.state.doc.toString();
                                    this.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
                                }
                            })]});
                    this.fallback.remove();
                } catch (error) {
                    console.warn('CodeMirror unavailable; textarea retained', error);
                }
            }
            disconnectedCallback() {
                this._value = this.value;
                this.generation++;
                this._widgetLabel.disconnect();
                this.editor?.destroy();
                this.editor = null;
            }
        }
        customElements.define('gnr-codemirror', CodeMirrorElement);
    }
});
