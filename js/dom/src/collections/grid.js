// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
/** Bounded-viewport grid over a resident Bag store, with optional measured row heights. */
import {GridBands} from './grid-bands.js';
import {GridStatus} from './grid-status.js';
import {GridEditor} from './grid-editor.js';
import {registerComponentCollection} from '../components/registry.js';
import {builtinComponents} from '../components/builtin-components.js';
import {formatDisplay} from '../display-format.js';
import {BagGridStore} from './grid-store.js';
import {GridChangeManager} from './grid-formulas.js';
import {gridCellValue, gridTemplate, normalizeGridColumns, layoutGridColumns, gridColumnsFromStruct, gridColumnDefinitionsFromStruct} from './grid-structure.js';
import {GridInteractions} from './grid-interactions.js';
let structureSerial = 0;

const CSS = `
.group-band .band-cell{border:0;padding:2px 7px;line-height:18px}.group-band .columnset-title{margin:3px 1px 0;border-radius:9px 9px 0 0;background:var(--grid-columnset-bg,#354b62);color:var(--grid-columnset-color,#fff);font-weight:600}.group-band .columnset-empty{background:var(--grid-header-bg,#eef1f4)}
.grid-band{flex:none;overflow:hidden;border:1px solid #c9d1d9;background:#eef2f6}.grid-band[hidden]{display:none}.group-band{border-bottom:0;font-weight:600;text-align:center}.footer-band{border-top:0;font-weight:600;background:#f0f5fa}.band-row{display:grid;width:max-content;min-width:100%}.band-cell{padding:5px 7px;box-sizing:border-box;border-right:1px solid #d7dfe7;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.band-cell.numeric{text-align:right;font-variant-numeric:tabular-nums}.band-pinned{position:sticky;z-index:2;background:inherit}.band-row{background:inherit}

.grid-status{display:flex;gap:8px;padding:7px 10px;flex:none;border:1px solid #c9d1d9;border-top:0;background:#f5f7fa}
.grid-status button,.grid-status-popup button{font:inherit;border:1px solid #d5dde5;border-radius:5px;background:white;padding:5px 10px;cursor:pointer;color:inherit;text-align:left}
.grid-status button:hover,.grid-status-popup button:hover{background:#edf3f9}
.grid-status-popup{font:13px/1.5 system-ui,sans-serif;color:#283340;border:1px solid #c9d1d9;border-radius:8px;padding:14px;box-shadow:0 8px 30px #0002;max-height:50vh;max-width:650px;overflow:auto}
.grid-status-popup button{display:block;width:100%;margin-top:6px}.grid-status-popup p{color:#68737d}

:host{position:relative;display:flex;flex-direction:column;contain:layout style;font:var(--grid-font,13px/1.35 system-ui,sans-serif);color:var(--grid-color,#283340);height:var(--grid-height,260px);--grid-row-height:26px}
.cell-editor{position:absolute;z-index:5;background:white;--field-border:transparent;--field-focus-border:transparent;--form-field-radius:0px;--field-tools-display:none}
.cell-editor:focus-within{--field-tools-display:flex}
.cell.invalidCell,.cell-editor.invalidCell{background:var(--field-invalid-bg,#fff0f0);--field-bg:var(--field-invalid-bg,#fff0f0)}
.cell-editor:focus-within::after{content:"";position:absolute;inset:2px;pointer-events:none;box-shadow:inset 0 0 0 1px #527fa2}.cell-editor[hidden]{display:none}
.cell-editor.cell-popup{position:fixed;inset:auto;margin:0;padding:12px;border:1px solid #bdc9d5;border-radius:8px;box-shadow:0 8px 28px #172a4533;box-sizing:border-box;max-height:calc(100vh - 24px);overflow:auto;--field-border:#c8c8c8;--field-focus-border:#4a90d9;--field-tools-display:flex;--form-field-radius:3px}
.cell-editor.cell-popup:focus-within::after{display:none}
.cell-popup-title{display:block;margin-bottom:10px;font-size:13px;color:#344456}
.cell-popup-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}
.cell-popup-actions button{font:inherit;padding:5px 12px;border:1px solid #bdc9d5;border-radius:4px;background:#f5f7fa;color:#263a50;cursor:pointer}
.cell-popup-actions button:last-child{background:#345c80;color:white;border-color:#345c80}
.cell-popup-title[hidden],.cell-popup-actions[hidden]{display:none}
.frame{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;border:1px solid #c9d1d9;background:var(--grid-bg,transparent);position:relative;box-sizing:border-box}
.horizontal-scroll{flex:none;height:16px;overflow-x:scroll;overflow-y:hidden;background:var(--grid-bg,transparent)}
.horizontal-scroll[hidden]{display:none}.horizontal-track{height:1px}
.header{position:sticky;top:0;z-index:3;display:grid;width:max-content;min-width:100%;background:var(--grid-header-bg,#eef1f4);border-bottom:1px solid #c3ccd5;font-weight:600;text-align:center}
.header [role=columnheader],.cell{box-sizing:border-box;padding:3px 7px;border-right:1px solid #e1e6eb;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.body{position:relative;width:max-content;min-width:100%}.row{position:absolute;left:0;display:grid;width:max-content;min-width:100%;height:var(--grid-row-height);border-bottom:1px solid #edf0f2;box-sizing:border-box}
.row{--row-bg:var(--grid-row-bg,#fff);background:var(--row-bg)}
.row.alternate{--row-bg:var(--grid-stripe-bg,#f5f7f9)}
.row:hover{--row-bg:var(--grid-hover-bg,#edf3f8)}.row.selected{--row-bg:var(--grid-selected-bg,#dcebf7)}.row:focus-visible{outline:2px solid #527fa2;outline-offset:-2px}
.row-heading{position:sticky;left:0;z-index:3;background:#eef1f4;color:#687887;border-right:1px solid #c9d1d9;box-sizing:border-box;text-align:right;padding:4px 8px;font-size:12px;user-select:none}.row-height-handle{position:absolute;bottom:0;left:0;right:0;height:7px;cursor:row-resize}.row-height-handle:hover,.row-height-handle:focus-visible{background:#527fa255;outline:none}
.cell.numeric{text-align:right;font-variant-numeric:tabular-nums}.cell.boolean{text-align:center}
.cell.frozen{position:sticky;z-index:1;background:var(--row-bg)}
.header [role=columnheader].frozen{position:sticky;z-index:2;background:var(--grid-header-bg,#eef1f4)}
.header [role=columnheader].frozen-edge,.cell.frozen-edge{border-right-color:#bdc8d2}
.cell.null{color:#88929c}.error{padding:12px;color:#9b2929}.empty{padding:12px;color:#68737d}
.header [role=columnheader]{position:relative;padding:4px 7px}
.header .row-heading{position:sticky;left:0;z-index:4}
.resize{position:absolute;right:0;top:0;bottom:0;width:8px;cursor:col-resize;touch-action:none;user-select:none}
.resize:hover::after,.resize:focus-visible::after{content:'';position:absolute;right:0;top:0;bottom:0;width:2px;background:#527fa2}
`;

function defineComponents() {
    if (typeof customElements === 'undefined' || customElements.get('gnr-grid')) return;
    class GnrGrid extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({mode:'open'});
            const style = document.createElement('style'); style.textContent = CSS; shadow.append(style);
            this._frame = document.createElement('div'); this._frame.className = 'frame'; this._frame.setAttribute('role','grid');
            this._header = document.createElement('div'); this._header.className = 'header'; this._header.setAttribute('role','row');
            this._body = document.createElement('div'); this._body.className = 'body';
            this._frame.append(this._header, this._body); shadow.append(this._frame);
            this._horizontal = document.createElement('div'); this._horizontal.className = 'horizontal-scroll';
            this._horizontal.tabIndex = 0; this._horizontal.setAttribute('aria-label', 'Scroll unfrozen columns');
            this._horizontalTrack = document.createElement('div'); this._horizontalTrack.className = 'horizontal-track';
            this._horizontal.append(this._horizontalTrack); shadow.append(this._horizontal);
            this._horizontal.addEventListener('scroll', () => {this._frame.scrollLeft = this._horizontal.scrollLeft;});
            this._frame.addEventListener('wheel', event => {
                const delta = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
                if (!delta || this._horizontal.hidden) return;
                this._horizontal.scrollLeft += delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? this._horizontal.clientWidth : 1);
                if (event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) event.preventDefault();
            }, {passive:false});
            this._columns = [];
            this._columnDefinitions = [];
            this._structureSubscriptions = [];
            this._structureId = `grid-structure-${++structureSerial}`;
            this._selectedKey = null;
            this.interactions = new GridInteractions(this);
            this._rowHeight = 26;
            this._frozenColumns = 0;
            this._overscan = 3;
            this._manualRowHeights = new Map();
            this.bands = new GridBands(this);
            this._frame.addEventListener('scroll', () => this._renderRows());
        }

        get footer() { return this._footer || false; }
        set footer(value) { this._footer = value === 'false' ? false : value; if (this.isConnected) this.bands.render(); }
        set statusBar(value) {
            this._statusBar = value !== false && value !== 'false' && value != null;
            this.editingStatus?.dispose();
            this.editingStatus = null;
            if (this._statusBar) {
                this.gridEditor ||= new GridEditor(this);
                this.editingStatus = new GridStatus(this);
            }
        }
        get statusBar() { return this._statusBar; }
        get rowHeaders() { return Boolean(this._rowHeaders); }
        set rowHeaders(value) { this._rowHeaders = value === true || value === 'true'; if (this.isConnected) this._render(); }
        get rowResize() { return Boolean(this._rowResize); }
        set rowResize(value) { this._rowResize = value === true || value === 'true'; if (this.isConnected) this._render(); }
        get rowHeaderWidth() { return this.rowHeaders || this.rowResize ? 44 : 0; }
        _template(columns = this._columns) { return `${this.rowHeaderWidth ? '44px ' : ''}${gridTemplate(columns)}`; }
        multilineMaxHeight(column) {
            const value = column.edit?.maxHeight;
            if (value == null) return Infinity;
            const height = Number(String(value).replace(/px$/, ''));
            return Number.isFinite(height) && height > 0 ? Math.max(this.rowHeight, height) : Infinity;
        }
        _rowHeading(row, index) {
            const heading = this.ownerDocument.createElement('div');
            heading.className = 'row-heading';
            heading.setAttribute('role', row ? 'rowheader' : 'columnheader');
            heading.textContent = row ? String(index + 1) : '#';
            if (row && this.rowResize) {
                const handle = this.ownerDocument.createElement('span');
                handle.className = 'row-height-handle'; handle.tabIndex = 0;
                handle.setAttribute('role', 'separator'); handle.setAttribute('aria-orientation', 'horizontal');
                handle.setAttribute('aria-label', `Resize row ${index + 1}`);
                handle.setAttribute('aria-valuenow', String(this.rowSize(index)));
                handle.setAttribute('aria-valuemin', String(this.rowHeight));
                handle.addEventListener('pointerdown', event => {
                    event.preventDefault(); event.stopPropagation(); this._cancelRowResize?.();
                    const start = event.clientY, height = this.rowSize(index), original = this._manualRowHeights.get(row.key);
                    const controller = new this.ownerDocument.defaultView.AbortController();
                    const options = {signal:controller.signal};
                    const finish = cancel => {
                        controller.abort(); this._cancelRowResize = null;
                        if (cancel) { if (original == null) this._manualRowHeights.delete(row.key); else this._manualRowHeights.set(row.key, original); }
                        this._renderRows(); this.gridEditor?.resizeMultiline();
                    };
                    this._cancelRowResize = () => finish(true);
                    this.ownerDocument.addEventListener('pointermove', e => {
                        if (e.pointerId !== event.pointerId) return;
                        this._manualRowHeights.set(row.key, Math.max(this.rowHeight, Math.round(height + e.clientY - start)));
                        this._renderRows(); this.gridEditor?.resizeMultiline();
                    }, options);
                    this.ownerDocument.addEventListener('pointerup', e => { if (e.pointerId === event.pointerId) finish(false); }, options);
                    this.ownerDocument.addEventListener('pointercancel', () => finish(true), options);
                    this.ownerDocument.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); finish(true); } }, options);
                });
                handle.addEventListener('dblclick', event => { event.stopPropagation(); this._manualRowHeights.delete(row.key); this._renderRows(); this.gridEditor?.resizeMultiline(); });
                handle.addEventListener('keydown', event => {
                    if (!['ArrowUp','ArrowDown','Home'].includes(event.key)) return;
                    event.preventDefault(); event.stopPropagation();
                    if (event.key === 'Home') this._manualRowHeights.delete(row.key);
                    else this._manualRowHeights.set(row.key, Math.max(this.rowHeight, this.rowSize(index) + (event.key === 'ArrowDown' ? 10 : -10)));
                    this._renderRows(); this.gridEditor?.resizeMultiline();
                    [...this._body.children].find(r=>r._gridKey===row.key)?.querySelector('.row-height-handle')?.focus();
                });
                heading.append(handle);
            }
            return heading;
        }
        get autoRowHeight() { return Boolean(this._autoRowHeight); }
        set autoRowHeight(value) {
            this._autoRowHeight = value === true || value === 'true';
            if (this.isConnected) this._renderRows();
        }
        rowTop(index) { return this._rowOffsets?.[index] ?? index * this._rowHeight; }
        rowSize(index) { return this._rowSizes?.[index] ?? this._rowHeight; }
        _measureRows() {
            const sizes = [], offsets = [0], measurements = new Map();
            const font = this.ownerDocument.defaultView.getComputedStyle(this).font;
            const multiline = this._columns.filter(c => !c.edit?.modal && String(c.edit?.tag).toLowerCase() === 'textboxarea');
            const measure = this.ownerDocument.createElement('div');
            measure.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;white-space:pre-wrap;overflow-wrap:anywhere;box-sizing:border-box;padding:3px 7px;border-right:1px solid transparent;';
            if (this.autoRowHeight && multiline.length) this.shadowRoot.append(measure);
            const sessions = [...(this.gridEditor?.drafts || [])].map(d => d.active);
            if (this.gridEditor?.active) sessions.push(this.gridEditor.active);
            for (let i=0; i<this._store.size; i++) {
                const row = this._store.rowAt(i);
                let height = this._rowHeight;
                if (this.autoRowHeight) {
                    for (const column of multiline) {
                        measure.style.width = `${column.width}px`;
                        measure.textContent = formatDisplay(gridCellValue(row,column,this._store), {...column,locale:column.locale || this.locale}) || ' ';
                        const token = JSON.stringify([font,column.width,measure.textContent]);
                        const measured = measurements.get(token) ?? this._textMeasurements?.get(token) ?? Math.ceil(measure.getBoundingClientRect().height) + 1;
                        measurements.set(token, measured);
                        height = Math.max(height, Math.min(measured, this.multilineMaxHeight(column)));
                    }
                    for (const session of sessions) if (session.key === row.key) height = Math.max(height, session.editorHeight || 0);
                }
                height = this._manualRowHeights.get(row.key) ?? height;
                sizes.push(height); offsets.push(offsets[i] + height);
            }
            measure.remove();
            this._textMeasurements = measurements;
            this._rowSizes = sizes; this._rowOffsets = offsets;
        }
        _rowAtOffset(offset) {
            let low=0, high=this._store.size;
            while (low<high) { const mid=(low+high)>>1; if(this.rowTop(mid+1)<=offset) low=mid+1; else high=mid; }
            return low;
        }
        get storeBag() { return this._store?.getData() || this._storeBag || null; }
        get structBag() { return this._structBag || null; }
        structbag() { return this.structBag; }
        set structBag(value) {
            if (value === this._structBag) return;
            this._structBag = value;
            this._structureChanged();
        }
        _clearStructureSubscriptions() {
            for (const bag of this._structureSubscriptions) bag.unsubscribe(this._structureId, {any:true});
            this._structureSubscriptions = [];
        }
        _structureChanged() {
            this._clearStructureSubscriptions();
            this.columns = gridColumnsFromStruct(this.structBag);
            if (this.isConnected && this.structBag) {
                const visit = bag => {
                    if (!bag?.getNodes || this._structureSubscriptions.includes(bag)) return;
                    this._structureSubscriptions.push(bag);
                    bag.subscribe(this._structureId, {any:() => this._structureChanged()});
                    for (const node of bag.getNodes()) visit(node.getValue());
                };
                visit(this.structBag);
            }
            this.changeManager?.configure(gridColumnDefinitionsFromStruct(this.structBag));
        }
        get datamode() { return this._datamode || 'bag'; }
        set datamode(value) { this.configureStore(this._storeBag, {identifier:this.identifier, datamode:value}); }
        collectionStore() { return this._store || null; }
        useCollectionStore(store) {
            if (store === this._sharedStore) return;
            this.changeManager?.dispose();
            this._unsubscribe?.();
            if (this._store && !this._sharedStore) this._store.dispose();
            this._sharedStore = store;
            this._store = store;
            this._storeBag = store?.getData() || null;
            this._identifier = store?.identifier || null;
            this._datamode = store?.datamode || 'bag';
            this._unsubscribe = this.isConnected && store ? store.subscribe(() => this._storeChanged()) : null;
            if (this.isConnected) {
                this.changeManager = new GridChangeManager(this);
                this.changeManager.configure(this.structBag ? gridColumnDefinitionsFromStruct(this.structBag) : this._columnDefinitions);
                this._storeChanged();
            }
        }
        configureStore(bag, {identifier = null, datamode = 'bag'} = {}) {
            if (bag !== this._storeBag) this._manualRowHeights.clear();
            if (this._sharedStore) this.useCollectionStore(null);
            if (!['bag','attr'].includes(datamode)) throw new TypeError('datamode must be bag or attr');
            if (this._store) this._store.configure(bag, {identifier, datamode});
            else if (this.isConnected) {
                this._store = new BagGridStore(bag, {identifier, datamode});
                this._unsubscribe = this._store.subscribe(() => this._storeChanged());
            }
            this._storeBag = bag; this._identifier = identifier; this._datamode = datamode;
        }
        _syncHorizontal(columns = this._columns) {
            const frozenWidth = this.rowHeaderWidth + columns.slice(0, this._frozenColumns).reduce((sum, column) => sum + column.width, 0);
            const totalWidth = this.rowHeaderWidth + columns.reduce((sum, column) => sum + column.width, 0);
            const viewport = this._frame.clientWidth;
            this._horizontal.style.marginLeft = `${frozenWidth + 1}px`;
            this._horizontal.style.marginRight = `${Math.max(1, this._frame.offsetWidth - viewport - 1)}px`;
            this._horizontalTrack.style.width = `${Math.max(0, totalWidth - frozenWidth)}px`;
            this._horizontal.hidden = totalWidth <= viewport || frozenWidth >= viewport;
            if (totalWidth <= viewport) this._frame.scrollLeft = 0;
            if (this._horizontal.scrollLeft !== this._frame.scrollLeft) this._horizontal.scrollLeft = this._frame.scrollLeft;
        }
        set storeBag(bag) {
            if (bag === this._storeBag) return;
            if (this._store) this._store.replace(bag);
            this._storeBag = bag;
            if (this.isConnected) this._storeChanged();
        }
        get columns() { return this._columnDefinitions; }
        set columns(value) {
            const next = normalizeGridColumns(value);
            if (JSON.stringify(next) === JSON.stringify(this._columnDefinitions)) return;
            this._cancelResize?.();
            this._columnDefinitions = next;
            this._columns = layoutGridColumns(next, this._frame.clientWidth - this.rowHeaderWidth);
            if (this.isConnected) this._render();
        }
        get identifier() { return this._identifier || null; }
        get frozenColumns() { return this._frozenColumns; }
        set frozenColumns(value) {
            const count = Number(value);
            if (!Number.isInteger(count) || count < 0) throw new RangeError('frozenColumns must be a nonnegative integer');
            if (count === this._frozenColumns) return;
            this._cancelResize?.();
            this._frozenColumns = count;
            if (this.isConnected) this._render();
        }
        _pinCells(container, columns = this._columns) {
            let left = this.rowHeaderWidth;
            Array.from(container.children).filter(cell => !cell.classList.contains('row-heading')).forEach((cell, index) => {
                const frozen = index < this._frozenColumns;
                cell.classList.toggle('frozen', frozen);
                cell.classList.toggle('frozen-edge', frozen && index === Math.min(this._frozenColumns, columns.length) - 1);
                cell.style.left = frozen ? `${left}px` : '';
                left += columns[index].width;
            });
        }
        set identifier(value) {
            const next=value || null;
            if (next === this._identifier) return;
            if (this._store) this._store.identifier = next;
            this._identifier = next;
        }
        get selectionMode() { return this.interactions.mode; }
        set selectionMode(value) {
            if(value===this.selectionMode)return;
            this.interactions.setMode(value);
            this._selectedKey=this.interactions.keys.at(-1)??null;
            if(this.isConnected)this._renderRows();
        }
        get selectedKeys() { return [...this.interactions.keys]; }
        set selectedKeys(value) {
            const keys=Array.isArray(value)?value:[];
            this.interactions.keys=this.selectionMode==='none'?[]:keys.filter(k=>this._store?.row(k));
            if(this.selectionMode==='single')this.interactions.keys=this.interactions.keys.slice(-1);
            this._selectedKey=this.interactions.keys.at(-1)??null;
            if(this.isConnected)this._renderRows();
        }
        get selectedKey() { return this._selectedKey; }
        set selectedKey(value) {
            let next = value == null || value === '' ? null : value;
            if (next != null && this._store && !this._store.row(next)) next = null;
            if (next === this._selectedKey) return;
            this._selectedKey = this.selectionMode==='none'?null:next;
            this.interactions.keys=this._selectedKey==null?[]:[this._selectedKey];
            if (this.isConnected) this._renderRows();
        }
        get rowHeight() { return this._rowHeight; }
        set rowHeight(value) {
            const height = Number(value);
            if (!Number.isFinite(height) || height < 18) throw new RangeError('Grid rowHeight must be at least 18');
            if (height === this._rowHeight) return;
            this._rowHeight = height; this.style.setProperty('--grid-row-height', `${height}px`);
            if (this.isConnected) this._renderRows();
        }
        set height(value) { this.style.setProperty('--grid-height', typeof value === 'number' ? `${value}px` : String(value)); }

        connectedCallback() {
            if (!this._store) {
                this._store = new BagGridStore(this._storeBag, {identifier:this._identifier, datamode:this.datamode});
                this._unsubscribe = this._store.subscribe(() => this._storeChanged());
            }
            if (!this._unsubscribe) this._unsubscribe = this._store.subscribe(() => this._storeChanged());
            this.changeManager = new GridChangeManager(this);
            if (this.structBag) this._structureChanged();
            else this.changeManager.configure(this._columnDefinitions);
            this._render();
            const ResizeObserver = this.ownerDocument.defaultView.ResizeObserver;
            if (ResizeObserver) {
                this._resizeObserver = new ResizeObserver(() => this._render());
                this._resizeObserver.observe(this._frame);
            }
        }
        disconnectedCallback() { this.interactions.drag=null; this._cancelRowResize?.(); this.editingStatus?.dispose(); this.editingStatus = null; this.gridEditor?.dispose(); this.gridEditor = null; this._clearStructureSubscriptions(); this._cancelResize?.(); this._resizeObserver?.disconnect(); this.changeManager?.dispose(); this.changeManager = null; this._unsubscribe?.(); this._unsubscribe = null; if (!this._sharedStore) this._store?.dispose(); this._store = this._sharedStore || null; }

        _storeChanged() {
            this._storeBag = this._store?.getData() || null;
            if (!this._store) return;
            for (const key of this._manualRowHeights.keys()) if (!this._store.row(key)) this._manualRowHeights.delete(key);
            if (this._formulaMutationDepth) { this._formulaRenderPending = true; return; }
            if (this._store.error) { this._renderError(this._store.error); return; }
            this.interactions.keys=this.interactions.keys.filter(key=>this._store.row(key));
            if (this._selectedKey != null && !this._store.row(this._selectedKey)) this._choose(this.interactions.keys.at(-1)??null, 'reconcile');
            this._renderRows();
        }
        _renderError(error) {
            this._body.textContent = '';
            const message=document.createElement('div'); message.className='error'; message.textContent=error.message;
            this._body.append(message);
        }
        _render() {
            this._columns = layoutGridColumns(this._columnDefinitions, this._frame.clientWidth - this.rowHeaderWidth);
            this._renderHeader();
            this._renderRows();
        }
        _renderHeader() {
            this._header.textContent = '';
            if (!this._columns.length) return;
            this._header.style.gridTemplateColumns = this._template();
            if (this.rowHeaderWidth) this._header.append(this._rowHeading());
            for (const column of this._columns) {
                const cell = document.createElement('div'); cell.setAttribute('role','columnheader');
                cell.dataset.columnId = column.id; cell.textContent = column.name; this._header.append(cell);
                if (column.headerClasses) cell.classList.add(...column.headerClasses.split(/\s+/).filter(Boolean));
                if (column.headerStyles) cell.style.cssText = column.headerStyles;
                const handle = document.createElement('span'); handle.className = 'resize'; handle.tabIndex = 0;
                handle.setAttribute('role', 'separator'); handle.setAttribute('aria-orientation', 'vertical');
                handle.setAttribute('aria-label', `Resize ${column.name}`);
                handle.setAttribute('aria-valuemin', '24'); handle.setAttribute('aria-valuenow', String(column.width));
                handle.setAttribute('aria-valuemax', String(Math.max(10000, column.width)));
                handle.addEventListener('pointerdown', event => this._startResize(event, column, handle));
                handle.addEventListener('keydown', event => {
                    if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
                    event.preventDefault();
                    this._commitWidth(column.id, Math.max(24, column.width + (event.key === 'ArrowRight' ? 10 : -10)));
                    Array.from(this._header.querySelectorAll('[role=columnheader]')).find(cell => cell.dataset.columnId === column.id)?.querySelector('.resize').focus();
                });
                cell.append(handle);
                this.interactions.bind(cell,'column',column.id);
            }
            this._pinCells(this._header);
        }
        _commitWidth(id, width) {
            const column = this._columns.find(column => column.id === id);
            if (!column || column.width === width) return;
            this.columns = this._columnDefinitions.map(column => column.id === id ? {...column, width} : column);
            this.dispatchEvent(new CustomEvent('grid-column-resize', {bubbles:true, composed:true, detail:{id, width}}));
        }
        _startResize(event, column, handle) {
            if (event.button !== 0) return;
            event.preventDefault(); event.stopPropagation();
            this._cancelResize?.();
            const start = event.clientX;
            let width = column.width;
            const abort = new this.ownerDocument.defaultView.AbortController();
            const options = {signal:abort.signal};
            const finish = commit => {
                abort.abort(); this._cancelResize = null;
                if (handle.hasPointerCapture?.(event.pointerId)) handle.releasePointerCapture(event.pointerId);
                this._header.style.gridTemplateColumns = this._template();
            if (this.rowHeaderWidth) this._header.append(this._rowHeading());
                this._pinCells(this._header);
                handle.setAttribute('aria-valuenow', String(column.width));
                this._renderRows();
                if (commit) this._commitWidth(column.id, width);
            };
            this._cancelResize = () => finish(false);
            handle.setPointerCapture?.(event.pointerId);
            this.ownerDocument.addEventListener('pointermove', move => {
                if (move.pointerId !== event.pointerId) return;
                width = Math.max(24, Math.round(column.width + move.clientX - start));
                const preview = this._columns.map(item => item.id === column.id ? {...item, width} : item);
                const template = this._template(preview);
                this._header.style.gridTemplateColumns = template;
                this._pinCells(this._header, preview);
                for (const row of this._body.querySelectorAll('.row')) {row.style.gridTemplateColumns = template; this._pinCells(row, preview);}
                this._syncHorizontal(preview);
                this.bands.render(preview);
                handle.setAttribute('aria-valuenow', String(width));
                handle.setAttribute('aria-valuemax', String(Math.max(10000, width)));
            }, options);
            this.ownerDocument.addEventListener('pointerup', up => {if (up.pointerId === event.pointerId) finish(true);}, options);
            this.ownerDocument.addEventListener('pointercancel', cancel => {if (cancel.pointerId === event.pointerId) finish(false);}, options);
            handle.addEventListener('lostpointercapture', () => finish(false), options);
            this.ownerDocument.addEventListener('keydown', key => {if (key.key === 'Escape') {key.preventDefault(); finish(false);}}, options);
        }
        _renderRows() {
            this._syncHorizontal();
            this.bands.render();
            if (this._store?.error) { this._renderError(this._store.error); return; }
            const focusedKey = this.shadowRoot.activeElement?._gridKey;
            this._body.textContent = '';
            this._frame.setAttribute('aria-multiselectable', String(this.selectionMode==='multiple'));
            this._frame.setAttribute('aria-colcount', String(this._columns.length + (this.rowHeaderWidth ? 1 : 0)));
            if (!this._store || !this._columns.length) { this._body.style.height = '0px'; return; }
            const count = this._store.size;
            this._frame.setAttribute('aria-rowcount', String(count + 1));
            this._frame.setAttribute('aria-multiselectable', String(this.selectionMode==='multiple'));
            this._frame.setAttribute('aria-colcount', String(this._columns.length + (this.rowHeaderWidth ? 1 : 0)));
            if (!count) { this._body.style.height = '0px'; const empty=document.createElement('div'); empty.className='empty'; empty.textContent='No rows'; this._body.append(empty); return; }
            this._measureRows();
            this._body.style.height = `${this.rowTop(count)}px`;
            const maximumScroll = Math.max(0, this.rowTop(count) + this._header.offsetHeight - (this._frame.clientHeight || 260));
            if (this._frame.scrollTop > maximumScroll) this._frame.scrollTop = maximumScroll;
            const viewport = this._frame.clientHeight || parseFloat(this.ownerDocument.defaultView.getComputedStyle(this._frame).height) || 260;
            const first = Math.max(0, this._rowAtOffset(this._frame.scrollTop) - this._overscan);
            const last = Math.min(count, this._rowAtOffset(this._frame.scrollTop + viewport) + 1 + this._overscan);
            for (let index=first; index<last; index++) this._body.append(this._row(this._store.rowAt(index), index));
            this.gridEditor?.position();
            if (focusedKey != null && !this.gridEditor?.active) Array.from(this._body.querySelectorAll('.row')).find(row => row._gridKey === focusedKey)?.focus({preventScroll:true});
        }
        _row(row, index) {
            const element = document.createElement('div'); element.className = 'row'; element.setAttribute('role','row');
            element.classList.toggle('alternate', index % 2 === 1);
            element.tabIndex = 0; element.dataset.rowKey = String(row.key); element.style.top = `${this.rowTop(index)}px`; element.style.height = `${this.rowSize(index)}px`;
            element._gridKey = row.key;
            if (this.rowHeaderWidth) element.append(this._rowHeading(row, index));
            element.style.gridTemplateColumns = this._template(); element.setAttribute('aria-rowindex', String(index + 2));
            this.interactions.bind(element,'row',row.key);
            if (this.interactions.keys.includes(row.key)) { element.classList.add('selected'); element.setAttribute('aria-selected','true'); }
            element.addEventListener('click', event => {
                this.focusCell = {rowKey:row.key, columnId:event.target.closest('.cell')?.dataset.columnId || this._columns[0].id};
                this._choose(row.key, 'pointer', event);
            });
            element.addEventListener('dblclick', event => {
                const id = event.target.closest('.cell')?.dataset.columnId;
                if (this._columns.find(c => c.id === id)?.edit) {
                    this.gridEditor ||= new GridEditor(this);
                    this.gridEditor.open(row.key, id);
                } else this._activate(row.key);
            });
            element.addEventListener('keydown', event => {
                if (event.key === 'Enter') { event.preventDefault(); this._activate(row.key); return; }
                if (!['ArrowDown','ArrowUp'].includes(event.key)) return;
                event.preventDefault();
                const selectedIndex = this._store.keys().indexOf(this._selectedKey);
                const current = selectedIndex < 0 ? index : selectedIndex;
                const target = Math.max(0, Math.min(this._store.size - 1, current + (event.key === 'ArrowDown' ? 1 : -1)));
                this.focusCell = {rowKey:this._store.rowAt(target).key, columnId:this.focusCell?.columnId || this._columns[0].id};
                this._choose(this._store.rowAt(target).key, 'keyboard', event);
                const top = this.rowTop(target);
                const bottom = this.rowTop(target + 1) + this._header.offsetHeight;
                const viewport = this._frame.clientHeight || 260;
                if (top < this._frame.scrollTop) this._frame.scrollTop = top;
                else if (bottom > this._frame.scrollTop + viewport) this._frame.scrollTop = bottom - viewport;
                this._renderRows();
                Array.from(this._body.querySelectorAll('.row')).find(rowElement => rowElement._gridKey === this._selectedKey)?.focus({preventScroll:true});
            });
            for (const column of this._columns) {
                const value = gridCellValue(row, column, this._store); const cell = document.createElement('div'); cell.className = 'cell';
                cell.setAttribute('role','gridcell'); cell.dataset.columnId = column.id;
                this.gridEditor?.decorateCell(cell, row.key, column.id);
                cell.classList.toggle('numeric', ['N','L','I','R','F'].includes(column.dtype) || typeof value === 'number');
                cell.classList.toggle('boolean', column.dtype === 'B' || typeof value === 'boolean');
                if (column.cellClasses) cell.classList.add(...column.cellClasses.split(/\s+/).filter(Boolean));
                if (column.cellStyles) cell.style.cssText = column.cellStyles;
                if (value == null || value === '') cell.classList.add('null');
                if (this.autoRowHeight && !column.edit?.modal && String(column.edit?.tag).toLowerCase() === 'textboxarea') { cell.style.whiteSpace = 'pre-wrap'; cell.style.overflowWrap = 'anywhere'; cell.style.overflowY = 'auto'; cell.style.maxHeight = `${this.rowSize(index)}px`; }
                cell.textContent = formatDisplay(value, {...column, locale:column.locale || this.locale}); element.append(cell);
            }
            this._pinCells(element);
            return element;
        }
        _activate(key) {
            this._choose(key, 'activation');
            this.dispatchEvent(new CustomEvent('grid-activated-row', {
                bubbles:true, composed:true, detail:{key},
            }));
        }
        _choose(key, source, event = {}) {
            if(this.selectionMode==='none')return;
            if(source!=='reconcile')key=this.interactions.select(key,event);

            this._selectedKey = key;
            this._renderRows();
            const row = key == null ? null : this._store.row(key);
            const detail = {key, keys:this.selectedKeys, rowNode:row?.node || null,
                row:row ? (this._store.datamode === 'attr' ? this._store.rowFromItem(row.node) : row.value) : null, source};
            const pointer = this.getAttribute('data-selectedKey-pointer');
            if (pointer) this.dispatchEvent(new CustomEvent('gnr-set', {bubbles:true, composed:true, detail:{pointer,value:key}}));
            const keysPointer=this.getAttribute('data-selectedKeys-pointer');
            if(keysPointer)this.dispatchEvent(new CustomEvent('gnr-set',{bubbles:true,composed:true,detail:{pointer:keysPointer,value:this.selectedKeys}}));
            this.dispatchEvent(new CustomEvent('grid-selected-row', {bubbles:true, composed:true, detail}));
        }
    }
    customElements.define('gnr-grid', GnrGrid);
}

registerComponentCollection('grid', {components:builtinComponents('grid'), defineComponents});

export {defineComponents};
