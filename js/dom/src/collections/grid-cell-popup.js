// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
/** Presentation only: values, drafts and validation remain in GridEditor. */
export class GridCellPopup {
    constructor(editor) {
        this.editor = editor;
        const doc = editor.grid.ownerDocument;
        this.title = doc.createElement('strong');
        this.title.className = 'cell-popup-title';
        this.actions = doc.createElement('div');
        this.actions.className = 'cell-popup-actions';
        for (const [label, action] of [['Cancel', () => this.cancel()], ['Confirm', async () => {
            if (await editor.confirm()) this.restoreFocus();
        }]]) {
            const button = doc.createElement('button');
            button.type = 'button'; button.textContent = label;
            button.addEventListener('click', action);
            this.actions.append(button);
        }
        editor.layer.prepend(this.title);
        editor.layer.append(this.actions);
        this.title.hidden = this.actions.hidden = true;
        this.toggle = event => {
            if (event.newState === 'closed' && this.opened && editor.active) {
                this.opened = false;
                editor.suspend();
            }
        };
        this.escape = event => {
            if (event.key !== 'Escape' || event.isComposing || !this.opened) return;
            // A nested choice/calendar popup handles its own first Escape.
            if (editor.widget?.shadowRoot?.querySelector(':popover-open')) return;
            event.preventDefault(); event.stopPropagation(); this.cancel();
        };
        editor.layer.addEventListener('beforetoggle', this.toggle);
    }
    show(cell) {
        const {layer, active, grid} = this.editor;
        if (!active?.modal) return;
        this.key = active.key;
        layer.classList.add('cell-popup');
        layer.setAttribute('popover', 'auto');
        layer.setAttribute('role', 'dialog');
        layer.setAttribute('aria-label', active.column.name || active.column.field);
        this.title.textContent = active.column.name || active.column.field;
        this.title.hidden = this.actions.hidden = false;
        layer.hidden = false;
        layer.style.width = 'min(420px, calc(100vw - 24px))';
        if (!layer.matches(':popover-open')) layer.showPopover();
        this.opened = true;
        grid.ownerDocument.addEventListener('keydown', this.escape, true);
        const rect = cell.getBoundingClientRect(), size = layer.getBoundingClientRect();
        const win = grid.ownerDocument.defaultView;
        layer.style.left = `${Math.max(12, Math.min(rect.left, win.innerWidth - size.width - 12))}px`;
        layer.style.top = `${Math.max(12, Math.min(rect.bottom + 5, win.innerHeight - size.height - 12))}px`;
    }
    hide() {
        const wasOpen = this.opened;
        this.opened = false;
        const {layer} = this.editor;
        this.editor.grid.ownerDocument.removeEventListener('keydown', this.escape, true);
        if (wasOpen && layer.matches(':popover-open')) layer.hidePopover();
        layer.removeAttribute('popover'); layer.removeAttribute('role'); layer.removeAttribute('aria-label');
        layer.classList.remove('cell-popup');
        this.title.hidden = this.actions.hidden = true;
    }
    restoreFocus() {
        [...this.editor.grid._body.children].find(row => row._gridKey === this.key)?.focus({preventScroll:true});
    }
    cancel() { this.editor.close(); this.restoreFocus(); }
    dispose() { this.hide(); this.editor.layer.removeEventListener('beforetoggle', this.toggle); }
}
