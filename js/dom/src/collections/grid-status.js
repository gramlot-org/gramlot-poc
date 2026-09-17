// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
/** Optional view of the editor's change and validation Bags. */
export class GridStatus {
    constructor(grid) {
        this.grid = grid;
        const doc = grid.ownerDocument;
        this.bar = doc.createElement('div');
        this.bar.className = 'grid-status';
        this.bar.setAttribute('role', 'toolbar');
        this.bar.setAttribute('aria-label', 'Editing status');
        this.bar.innerHTML = '<button type="button" data-kind="errors"></button><button type="button" data-kind="changes"></button>';
        this.popup = doc.createElement('div');
        this.popup.className = 'grid-status-popup';
        this.popup.setAttribute('popover', 'auto');
        grid.shadowRoot.append(this.bar, this.popup);
        for (const button of this.bar.children) button.addEventListener('click', () => {
            this.kind = button.dataset.kind;
            this.renderList();
            this.popup.showPopover();
        });
        this.update();
        if (grid.statusTarget) {
            this.externalStyle = doc.createElement('style');
            this.externalStyle.textContent = '.grid-status{display:flex;align-items:center;gap:8px;padding:7px 10px;box-sizing:border-box;height:100%;font:13px system-ui,sans-serif;background:#f5f7fa;border-top:1px solid #c9d1d9}.grid-status button{font:inherit;border:1px solid #d5dde5;border-radius:5px;background:white;padding:5px 10px;cursor:pointer}.grid-status button:hover{background:#edf3f9}';
            const mount = () => {
                if (this.disposed || !grid.isConnected) return;
                const target = doc.getElementById(grid.statusTarget);
                if (target && this.bar.parentNode !== target) target.append(this.externalStyle, this.bar);
            };
            queueMicrotask(() => {
                if (this.disposed || !grid.isConnected) return;
                this.mountObserver = new doc.defaultView.MutationObserver(mount);
                this.mountObserver.observe(doc, {childList:true,subtree:true});
                mount();
            });
        }
    }
    update() {
        const editor = this.grid.gridEditor;
        const errors = editor.errors.getNodes().length;
        const changes = editor.changes.getNodes().length;
        this.bar.children[0].textContent = `${errors ? '🔴' : '🟢'} Errors: ${errors}`;
        this.bar.children[0].style.color = errors ? '#ad3030' : '#28734b';
        this.bar.children[1].textContent = `📝 Changes: ${changes}`;
        if (this.popup.matches(':popover-open')) this.renderList();
    }
    renderList() {
        const doc = this.grid.ownerDocument;
        this.popup.replaceChildren();
        const title = doc.createElement('strong');
        title.textContent = this.kind === 'errors' ? 'Invalid cells' : 'Unsaved changes';
        this.popup.append(title);
        const nodes = this.grid.gridEditor[this.kind].getNodes();
        if (!nodes.length) {
            const empty = doc.createElement('p'); empty.textContent = 'No entries'; this.popup.append(empty);
        }
        for (const node of nodes) {
            const entry = node.attr;
            const button = doc.createElement('button'); button.type = 'button';
            const value = v => v == null ? '∅' : String(v);
            button.textContent = `${entry.key} · ${entry.field}: ${this.kind === 'errors' ? entry.message : `${value(entry.oldValue)} → ${value(entry.newValue)}`}`;
            button.addEventListener('click', () => {
                this.popup.hidePopover();
                this.grid.gridEditor.open(entry.key, entry.columnId);
            });
            this.popup.append(button);
        }
    }
    dispose() { this.disposed = true; this.mountObserver?.disconnect(); this.externalStyle?.remove(); this.bar.remove(); this.popup.remove(); }
}
