// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
/** Grid interaction state. Data and structure order remain owned by their Bags. */
export class GridInteractions {
    constructor(grid) { this.grid=grid; this.keys=[]; this.mode='single'; }
    select(key,event={}) {
        const g=this.grid;
        if(this.mode==='none') return;
        let keys;
        if(this.mode==='multiple' && event.shiftKey && this.anchor!=null) {
            const order=g.collectionStore().keys(), a=order.indexOf(this.anchor), b=order.indexOf(key);
            const range=a<0?[key]:order.slice(Math.min(a,b),Math.max(a,b)+1);
            keys=event.ctrlKey||event.metaKey?[...new Set([...this.keys,...range])]:range;
        } else if(this.mode==='multiple' && (event.ctrlKey||event.metaKey)) {
            keys=this.keys.includes(key)?this.keys.filter(k=>k!==key):[...this.keys,key];
            this.anchor=key;
        } else {keys=key==null?[]:[key];this.anchor=key;}
        this.keys=keys;
        return keys.includes(key)?key:keys.at(-1)??null;
    }
    setMode(mode) {
        if(!['none','single','multiple'].includes(mode)) throw new TypeError('selectionMode must be none, single or multiple');
        this.mode=mode;
        this.keys=mode==='none'?[]:mode==='single'?this.keys.slice(-1):this.keys;
    }
    bind(element,kind,key) {
        const g=this.grid;
        if(!(kind==='row'?g.selfDragRows:g.selfDragColumns)) return;
        element.draggable=true;
        element.addEventListener('dragstart',event=>{
            if(event.target.closest('.resize,.row-height-handle') || !this.canMove(kind)) {event.preventDefault();return;}
            this.drag={kind,keys:kind==='row'&&this.keys.includes(key)?g.collectionStore().keys().filter(k=>this.keys.includes(k)):[key]};
            event.dataTransfer.effectAllowed='move'; event.dataTransfer.setData('text/plain',String(key));
        });
        element.addEventListener('dragover',event=>{
            if(this.drag?.kind!==kind) return;
            event.preventDefault();event.dataTransfer.dropEffect='move';
            element.style.boxShadow='inset 0 -2px #527fa2';
        });
        element.addEventListener('dragleave',()=>{element.style.boxShadow='';});
        element.addEventListener('drop',event=>{
            if(this.drag?.kind!==kind)return;
            event.preventDefault();event.stopPropagation();element.style.boxShadow='';
            const rect=element.getBoundingClientRect();
            const after=kind==='row'?event.clientY>rect.top+rect.height/2:event.clientX>rect.left+rect.width/2;
            const drag=this.drag;this.drag=null;this.move(kind,drag.keys,key,after);
        });
        element.addEventListener('dragend',()=>{this.drag=null;element.style.boxShadow='';});
    }
    canMove(kind) {
        const store=this.grid.collectionStore();
        return kind==='column' || Boolean(store?.getData()?.move && store.batch && !store._sortField && !store._filter);
    }
    move(kind,keys,target,after=false) {
        const g=this.grid;
        if(!this.canMove(kind) || keys.includes(target)) return false;
        const store=g.collectionStore();
        const cells=g.structBag?.getNodes().find(n=>n.label!=='info')?.getValue().getNodes()[0]?.getValue();
        const bag=kind==='row'?store.getData():cells;
        const order=kind==='row'?store.keys():(cells?cells.getNodes().map(n=>n.label):g.columns.map(c=>c.id));
        if(!order.includes(target)||keys.some(key=>!order.includes(key))) return false;
        const moving=order.filter(k=>keys.includes(k)), rest=order.filter(k=>!keys.includes(k));
        rest.splice(rest.indexOf(target)+(after?1:0),0,...moving);
        const mutate=()=>{
            if(bag) {
                const nodes=new Map(order.map(key=>[key,kind==='row'?store.row(key).node:bag.getNode(key)]));
                for(let i=0;i<rest.length;i++) {
                    const index=bag.getNodes().indexOf(nodes.get(rest[i]));
                    if(index!==i)bag.move(index,i);
                }
            } else g.columns=rest.map(id=>g.columns.find(c=>c.id===id));
        };
        const apply=()=>kind==='row'?store.batch(mutate):mutate();
        const app=g.sourceNode?.handler?.application;
        if(app)app.live(apply);else apply();
        g.dispatchEvent(new CustomEvent(kind==='row'?'grid-rows-reordered':'grid-columns-reordered',{bubbles:true,composed:true,detail:{keys:moving,order:rest}}));
        return true;
    }
}
