// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import {loadJodit, joditCss} from './jodit-dependencies.js';
export function richBody(html){return new DOMParser().parseFromString(html,'text/html');}
export function richRegions(doc){
 const inline=new Set(['STRONG','EM','B','I','U','S','DEL','CODE','A','BR']);
 return [...doc.body.querySelectorAll('p,h1,h2,h3,h4,h5,h6,li,dt,dd,figcaption,td,th,span,small')].filter(el=>{
  if(!el.textContent.trim()||el.closest('script,style,template,svg'))return false;
  return [...el.querySelectorAll('*')].every(child=>inline.has(child.tagName)&&
   [...child.attributes].every(a=>child.tagName==='A'&&['href','title'].includes(a.name))&&
   !(child.tagName==='A'&&/^(javascript|data):/i.test(child.getAttribute('href')||'')))&&!el.innerHTML.includes('<!--');
 });
}
export function serializeRichDocument(doc,full){
 return full?(doc.doctype?new XMLSerializer().serializeToString(doc.doctype)+'\n':'')+doc.documentElement.outerHTML:doc.body.innerHTML;
}

// Keep executable/embedded content inert and recover it from the original tree.
export function prepareRichContent(value) {
 let original=richBody(value);
 const full=/<html[\s>]|<!doctype/i.test(value)||original.head.children.length>0;
 if(!full)original=richBody('<!doctype html><html><head></head><body>'+value+'</body></html>');
 const display=original.body.cloneNode(true);
 const protectedNodes=new Map(), attributes=new Map();
 const marker='data-gramlot-'+Math.random().toString(36).slice(2);
 let sequence=0;
 const comments=[];const walker=original.createTreeWalker(display,128);
 while(walker.nextNode())comments.push(walker.currentNode);
 for(const node of [...display.querySelectorAll('script,style,iframe,object,embed,template,svg,math,link,meta,base'),...comments]){
  if(!display.contains(node))continue;
  const id=String(++sequence), placeholder=document.createElement('span');
  placeholder.setAttribute(marker,id);placeholder.contentEditable='false';
  placeholder.textContent='['+(node.tagName?.toLowerCase()||'comment')+' — edit in Code]';
  protectedNodes.set(id,node.cloneNode(true));node.replaceWith(placeholder);
 }
 for(const element of display.querySelectorAll('*')){
  const removed=[];
  for(const attr of [...element.attributes]){
   if(/^on/i.test(attr.name)||['autofocus','srcdoc'].includes(attr.name)||
      /^(?:javascript|vbscript|data):/i.test(attr.value.trim())&&['href','src','action','formaction','xlink:href'].includes(attr.name)&&
      !(element.tagName==='IMG'&&attr.name==='src'&&/^data:image\/(?:png|jpeg|gif|webp);base64,/i.test(attr.value))){
    removed.push([attr.name,attr.value]);element.removeAttribute(attr.name);
   }
  }
  if(removed.length){const id=String(++sequence);element.setAttribute(marker+'-attrs',id);attributes.set(id,removed);}
 }
 return {html:display.innerHTML, styles:[...original.head.querySelectorAll('style')].map(n=>n.textContent).join('\n'),
  serialize(html){
   const edited=richBody(html);
   for(const [id,node] of protectedNodes){
    const matches=edited.body.querySelectorAll('['+marker+'="'+id+'"]');
    if(matches.length!==1)throw new Error('Protected page content changed. Revert or use Code.');
    matches[0].replaceWith(node.cloneNode(true));
   }
   for(const element of edited.body.querySelectorAll('['+marker+'-attrs]')){
    for(const [name,value] of attributes.get(element.getAttribute(marker+'-attrs'))||[])element.setAttribute(name,value);
    element.removeAttribute(marker+'-attrs');
   }
   original.body.innerHTML=edited.body.innerHTML;
   return serializeRichDocument(original,full);
  }
 };
}

export function defineHtmlEditor(){
 // Retain the existing runtime tag so consumers do not need to migrate.
 if(customElements.get('gnr-proseeditor'))return;
 customElements.define('gnr-proseeditor',class extends HTMLElement{
  constructor(){super();this.attachShadow({mode:'open'});this._value='';this._readonly=true;}
  set value(value){value=String(value??'');if(value===this._value)return;this._value=value;if(this.isConnected)this.load();}
  get value(){return this._value;}
  set readonly(value){this._readonly=!!value;this.editor?.setReadOnly(this._readonly);}
  connectedCallback(){this.load();}
  disconnectedCallback(){this.generation=(this.generation||0)+1;this.editor?.destruct();this.editor=null;}
  async load(){
   const generation=this.generation=(this.generation||0)+1;
   this.editor?.destruct();this.editor=null;
   this.shadowRoot.innerHTML='<style>:host{display:block;height:100%;min-height:0;background:white}.status{font:12px system-ui;padding:6px;color:#596579}.status:empty{display:none}</style><div class="status" role="status">Loading HTML editor…</div><textarea aria-label="HTML content"></textarea>';
   const status=this.shadowRoot.querySelector('.status');
   try{
    const Jodit=await loadJodit(this.shadowRoot,joditCss);
    if(generation!==this.generation||!this.isConnected)return;
    // Jodit mounts popups/dialogs in the owner document, outside the shadow tree.
    if(!document.getElementById('gramlot-jodit-popup-style')){
     const popupStyle=document.createElement('style');popupStyle.id='gramlot-jodit-popup-style';
     popupStyle.textContent=joditCss;document.head.append(popupStyle);
    }
    const content=prepareRichContent(this._value);
    const editor=this.editor=Jodit.make(this.shadowRoot.querySelector('textarea'),{
     // Content is in Jodit's iframe. Passing the toolbar's ShadowRoot makes
     // Jodit use the wrong selection and elementFromPoint for table cells.
     globalFullSize:false,height:'100%',minHeight:250,
     readonly:this._readonly,iframe:true,iframeSandbox:'allow-same-origin allow-scripts',
     iframeStyle:'body{font-family:system-ui;padding:16px;}',
     toolbarAdaptive:false,toolbarSticky:false,showXPathInStatusbar:false,
     sourceEditor:'area',disablePlugins:['mobile'],
     buttons:['undo','redo','|','paragraph','font','fontsize','|','bold','italic','underline','strikethrough','brush','eraser','|','ul','ol','outdent','indent','align','|','link','image','table','hr','|','find','selectall','fullsize'],
     uploader:{insertImageAsBase64URI:true},
    });
    const frameDoc=editor.editor.ownerDocument;
    const policy=frameDoc.createElement('meta');policy.httpEquiv='Content-Security-Policy';
    policy.content="default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; img-src data:; form-action 'none'";
    frameDoc.head.prepend(policy);
    const pageStyle=frameDoc.createElement('style');pageStyle.textContent=content.styles;frameDoc.head.append(pageStyle);
    frameDoc.addEventListener('submit',e=>e.preventDefault(),true);
    frameDoc.addEventListener('click',e=>{if(e.target.closest?.('a'))e.preventDefault();},true);
    editor.value=content.html;
    let previous=editor.value,restoring=false;
    status.textContent='';
    editor.events.on('change',()=>{
     if(restoring||this._readonly||generation!==this.generation)return;
     const html=editor.value;if(html===previous)return;
     try{
      const value=content.serialize(html);previous=html;this._value=value;status.textContent='';
      this.dispatchEvent(new Event('change',{bubbles:true,composed:true}));
     }catch(error){
      restoring=true;try{editor.value=previous;}finally{restoring=false;}
      status.textContent=error.message;
     }
    });
   }catch(error){if(generation===this.generation)status.textContent='HTML editor unavailable: '+error.message+'. Use Code.';}
  }
 });
}
