// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import {Bag} from 'genro-bag-js';
import {addNumeric} from './grid-formulas.js';
import {formatDisplay} from '../display-format.js';
import {ValueSnapshot} from '../forms/value-snapshot.js';

/** Column-aligned bands; row data and total bindings stay independent of DOM. */
export class GridBands {
    constructor(grid) {
        this.grid = grid;
        this.totals = new Bag();
        this.snapshot = new ValueSnapshot();
        const doc = grid.ownerDocument;
        this.groups = doc.createElement('div'); this.groups.className = 'grid-band group-band';
        this.footer = doc.createElement('div'); this.footer.className = 'grid-band footer-band';
        grid.shadowRoot.insertBefore(this.groups, grid._frame);
        grid.shadowRoot.insertBefore(this.footer, grid._horizontal);
    }
    sync() {
        this.groups.scrollLeft = this.footer.scrollLeft = this.grid._frame.scrollLeft;
    }
    row(parent, items, role, columns = this.grid._columns) {
        const grid = this.grid, doc = grid.ownerDocument;
        const row = doc.createElement('div'); row.className = 'band-row'; row.setAttribute('role','row');
        row.style.gridTemplateColumns = grid._template(columns);
        if (grid.rowHeaderWidth) {
            const gutter = doc.createElement('div'); gutter.className = 'band-cell band-pinned';
            gutter.style.left = '0px'; row.append(gutter);
        }
        for (const item of items) {
            const cell = doc.createElement('div'); cell.className = 'band-cell';
            cell.setAttribute('role',role); cell.dataset.field = item.field || '';
            cell.style.gridColumn = `${item.index + 1 + (grid.rowHeaderWidth ? 1 : 0)} / span ${item.span || 1}`;
            cell.textContent = item.text;
            if (item.group) {
                cell.classList.add('columnset-title');
                const attrs = item.group;
                if (attrs.background_color || attrs.background) cell.style.backgroundColor = attrs.background_color || attrs.background;
                if (attrs.color) cell.style.color = attrs.color;
                if (attrs.border_radius) cell.style.borderRadius = attrs.border_radius;
                if (attrs._class) cell.classList.add(...String(attrs._class).split(/\s+/).filter(Boolean));
            } else if (parent === this.groups) cell.classList.add('columnset-empty');
            if (item.problem) { cell.title = item.problem; cell.setAttribute('aria-invalid','true'); }
            if (item.numeric) cell.classList.add('numeric');
            if (item.index < grid.frozenColumns) {
                cell.classList.add('band-pinned');
                cell.style.left = `${grid.rowHeaderWidth + columns.slice(0,item.index).reduce((sum,c)=>sum+c.width,0)}px`;
            }
            row.append(cell);
        }
        parent.replaceChildren(row);
    }
    render(columns = this.grid._columns) {
        const grid = this.grid;
        const metadata = grid.structBag?.getItem('info.columnsets');
        const groups = [];
        for (let index=0; index<columns.length;) {
            const column = columns[index], code = column.columnset;
            const definition = code && metadata?.getNode(code)?.attr;
            let end = index + 1;
            if (definition) while (end<columns.length && columns[end].columnset === code && end !== grid.frozenColumns) end++;
            groups.push({index,span:end-index,text:definition?.name || '',field:column.field,group:definition});
            index = end;
        }
        this.groups.hidden = !columns.some(c=>c.columnset && metadata?.getNode(c.columnset));
        if (!this.groups.hidden) this.row(this.groups,groups,'columnheader',columns);
        this.footer.hidden = !grid.footer;
        if (!this.footer.hidden) {
            const items = columns.map((column,index)=>{
                let value = column.footer_value ?? '', problem;
                if (column.totalize) {
                    try {
                        value = 0;
                        const store = grid.collectionStore();
                        // Resident store keys define the scope, never mounted viewport rows.
                        for (const key of store?.keys() || []) {
                            let current = store.getValue(store.row(key).node,column.field);
                            if (typeof current === 'boolean') current = Number(current);
                            value = addNumeric(value,current);
                        }
                        if (!this.snapshot.equal(this.totals.getItem(column.field),value)) this.totals.setItem(column.field,value);
                        const app = grid.sourceNode?.handler?.application;
                        const path = typeof column.totalize === 'string' ? column.totalize : `.totalize.${column.field}`;
                        if (app && !this.publishing) {
                            let absolute;
                            try { absolute = grid.sourceNode.absDatapath(path); }
                            catch (error) {
                                if (typeof column.totalize === 'string') throw error;
                                absolute = grid.sourceNode.absDatapath(path.slice(1));
                            }
                            if (!this.snapshot.equal(app.data.getItem(absolute),value)) {
                                this.publishing = true;
                                try { app.live(()=>app.data.setItem(absolute,value)); } finally { this.publishing = false; }
                            }
                        }
                    } catch (error) { value = '—'; problem = error.message; }
                } else if (index === 0 && !value) value = typeof grid.footer === 'string' ? grid.footer : 'Total';
                let text = value === '' ? '' : String(value);
                try { if (value !== '' && !problem) text = formatDisplay(value, {...column,format:column.footer_format ?? column.format,locale:column.locale || grid.locale}); }
                catch (error) { problem = `${column.field}: ${error.message} (${String(value)})`; }
                return {index,field:column.field,numeric:Boolean(column.totalize),text,problem};
            });
            this.row(this.footer,items,'gridcell',columns);
        }
        this.sync();
    }
}
