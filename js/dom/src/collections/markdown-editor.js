// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
// Markdown is the stored value. Complex blocks retain their original source.
import {loadMarkdownEditorDependencies} from '../editor-dependencies.js';

export function markdownDependencies(){
    return loadMarkdownEditorDependencies();
}
export const markdownStyle='body{font:15px/1.6 system-ui;color:#303944;padding:24px;max-width:1000px;margin:auto;overflow-wrap:anywhere}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccd3dd;padding:6px;text-align:left}pre{overflow:auto;background:#f4f6f8;padding:12px}code{font-size:.9em}img{max-width:100%}blockquote{border-left:3px solid #ccd3dd;padding-left:16px}';
export async function renderMarkdown(value){
    const {md}=await markdownDependencies();
    return '<!doctype html><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src data:"><style>'+markdownStyle+'</style>'+md.render(value||'');
}
export function markdownCodec({md,model,markdown}){
    const schema=new model.Schema({nodes:markdown.schema.spec.nodes.append({source_block:{group:'block',atom:true,
        attrs:{source:{}},toDOM:node=>{
            const element=document.createElement('div');element.setAttribute('contenteditable','false');
            element.title='Preserved Markdown block — edit in Raw';element.innerHTML=md.render(node.attrs.source);return element;
        }}}),marks:markdown.schema.spec.marks});
    // Parse top-level blocks independently. Tables and unsupported syntax become
    // opaque rendered nodes so rich edits elsewhere cannot discard their source.
    const parser=new markdown.MarkdownParser(schema,markdown.defaultMarkdownParser.tokenizer,markdown.defaultMarkdownParser.tokens);
    const serializer=new markdown.MarkdownSerializer({...markdown.defaultMarkdownSerializer.nodes,
        source_block:(state,node)=>{state.write(node.attrs.source);state.closeBlock(node);}},markdown.defaultMarkdownSerializer.marks);
    function parse(value){
        if (/^ {0,3}\[[^\]]+\]:/m.test(value) || /^---\r?\n/.test(value)) return schema.node('doc',null,[schema.nodes.source_block.create({source:value})]);
        const lines=value.split('\n'),tokens=md.parse(value,{}),nodes=[];
        for(let i=0;i<tokens.length;i++){
            const token=tokens[i];if(token.level!==0||!token.map||token.nesting===-1)continue;
            const source=lines.slice(token.map[0],token.map[1]).join('\n');
            let opaque=token.type==='table_open'||/<\/?[A-Za-z][^>]*>|<!--/.test(source)||/~~/.test(source);
            let parsed;
            if(!opaque){try{parsed=parser.parse(source);}catch{opaque=true;}}
            if(opaque)nodes.push(schema.nodes.source_block.create({source}));
            else parsed.content.forEach(node=>nodes.push(node));
        }
        return schema.node('doc',null,nodes.length?nodes:[schema.node('paragraph')]);
    }
    return {schema,parse,serialize:doc=>serializer.serialize(doc)};
}
export function defineMarkdownEditor(){
    if(customElements.get('gnr-markdowneditor'))return;
    customElements.define('gnr-markdowneditor',class extends HTMLElement{
        constructor(){super();this.attachShadow({mode:'open'});this._value='';this._readonly=true;}
        get value(){return this._value;}
        set value(value){if(value===this._value)return;this._value=value||'';if(this.isConnected)this.load();}
        set readonly(value){this._readonly=value;this.view?.setProps({editable:()=>!this._readonly});}
        connectedCallback(){this.load();}
        disconnectedCallback(){this.generation=(this.generation||0)+1;this.view?.destroy();this.view=null;}
        async load(){
            const generation=this.generation=(this.generation||0)+1;this.view?.destroy();this.view=null;
            this.shadowRoot.innerHTML='<style>:host{display:block;height:100%;overflow:auto;background:white;color:#303944}.tools{position:sticky;top:0;background:#f7f8fa;padding:6px;z-index:1}button{margin:2px}.ProseMirror{padding:20px;outline:none;white-space:pre-wrap}table{border-collapse:collapse}td,th{border:1px solid #ccd3dd;padding:6px}pre{overflow:auto;background:#f4f6f8;padding:10px}</style><div class="tools">Loading Markdown editor…</div><div class="content"></div>';
            const toolbar=this.shadowRoot.querySelector('.tools');
            try{
                const d=await markdownDependencies();if(generation!==this.generation)return;
                const codec=markdownCodec(d);toolbar.textContent='Tables and embedded HTML: edit in Raw. ';
                this.view=new d.view.EditorView(this.shadowRoot.querySelector('.content'),{
                    state:d.state.EditorState.create({doc:codec.parse(this._value),plugins:[d.history.history(),d.keymap.keymap({'Mod-z':d.history.undo,'Mod-Shift-z':d.history.redo,...d.commands.baseKeymap})]}),
                    editable:()=>!this._readonly,
                    dispatchTransaction:tr=>{
                        this.view.updateState(this.view.state.apply(tr));
                        if(!tr.docChanged)return;
                        this._value=codec.serialize(this.view.state.doc);this.dispatchEvent(new Event('change',{bubbles:true,composed:true}));
                    }});
                for(const [label,command] of [['Bold',d.commands.toggleMark(codec.schema.marks.strong)],['Italic',d.commands.toggleMark(codec.schema.marks.em)],['Code',d.commands.toggleMark(codec.schema.marks.code)],['Undo',d.history.undo],['Redo',d.history.redo]]){
                    const button=document.createElement('button');button.textContent=label;button.onmousedown=e=>e.preventDefault();
                    button.onclick=()=>{if(!this._readonly&&this.view){command(this.view.state,this.view.dispatch,this.view);this.view.focus();}};toolbar.append(button);
                }
            }catch(error){if(generation===this.generation)toolbar.textContent='Rich text unavailable: '+error.message+'. Use Raw.';}
        }
    });
}
