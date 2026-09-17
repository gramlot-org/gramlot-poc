// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
// Jodit Community (MIT). JavaScript and CSS ship in Gramlot's local assets.
import {loadJoditLibrary} from '../editor-dependencies.js';
import bundledJoditCss from './jodit-style.js';

export const joditCss=bundledJoditCss;
let library;
export async function loadJodit(root, css=joditCss){
 const style=document.createElement('style');style.textContent=css;
 root.append(style);
 library ||= loadJoditLibrary().catch(error=>{library=null;throw error;});
 return library;
}
