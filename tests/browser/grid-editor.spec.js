// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import {test,expect} from '@playwright/test';

test('selection modes and dragging preserve row identities and structure order',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(new URL('../playground/',process.env.GRAMLOT_GRID_EDITOR_URL).href);
    const grid=page.locator('gnr-grid').first();
    const row=key=>grid.locator(`.row[data-row-key="${key}"]`);
    await row('r0').locator('.cell').first().click();
    await row('r2').locator('.cell').first().click({modifiers:['Shift']});
    expect(await grid.evaluate(g=>g.selectedKeys)).toEqual(['r0','r1','r2']);
    await row('r4').locator('.cell').first().click({modifiers:['Meta']});
    await row('r1').locator('.cell').first().click({modifiers:['Meta']});
    expect(await grid.evaluate(g=>g.selectedKeys)).toEqual(['r0','r2','r4']);
    await row('r0').dragTo(row('r6'),{targetPosition:{x:100,y:2}});
    expect(await grid.evaluate(g=>g.collectionStore().keys().slice(0,7))).toEqual(['r1','r3','r5','r0','r2','r4','r6']);
    expect(await grid.evaluate(g=>g.selectedKeys)).toEqual(['r0','r2','r4']);
    const headers=grid.locator('.header [data-column-id]');
    await headers.nth(1).dragTo(headers.nth(3),{targetPosition:{x:5,y:10}});
    expect(await grid.evaluate(g=>g.columns.slice(0,4).map(c=>c.field))).toEqual(['description','price','quantity','product']);
    await grid.evaluate(g=>g.selectionMode='none');
    await row('r0').locator('.cell').first().click();
    expect(await grid.evaluate(g=>g.selectedKeys)).toEqual([]);
    await grid.evaluate(g=>g.selectionMode='single');
    await row('r0').locator('.cell').first().click();
    await row('r2').locator('.cell').first().click({modifiers:['Shift','Meta']});
    expect(await grid.evaluate(g=>g.selectedKeys)).toEqual(['r2']);
});

test('toolbar gear edits the live structure and reopens its palette',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(new URL('../playground/',process.env.GRAMLOT_GRID_EDITOR_URL).href);
    await page.getByRole('button',{name:'Configure grid',exact:true}).click();
    const palette=page.locator('gnr-palette');
    await expect(palette).toBeVisible();
    const main=page.locator('gnr-grid').first();
    const config=palette.locator('gnr-grid');
    const edit=async(field)=>{
        const id=await config.evaluate((g,field)=>g.columns.find(c=>c.field===field).id,field);
        await config.locator('.row').first().locator(`[data-column-id="${id}"]`).dblclick();
    };
    await edit('name');
    const heading=config.locator('gnr-textbox input');
    await heading.fill('Order item'); await heading.press('Enter');
    await expect(main.locator('.header')).toContainText('Order item');
    await edit('width');
    const width=config.locator('gnr-numbertextbox input');
    await width.fill('280');await width.press('Enter');
    await expect.poll(()=>main.evaluate(g=>g.columns.find(c=>c.field==='description').width)).toBe(280);
    await edit('hidden');
    await config.getByRole('checkbox').check();
    await config.getByRole('checkbox').press('Enter');
    await expect(main.locator('.header')).not.toContainText('Order item');
    await palette.getByRole('button',{name:'Close palette',exact:true}).click();
    await expect(palette).toBeHidden();
    await page.getByRole('button',{name:'Configure grid',exact:true}).click();
    await expect(config.locator('.row').first()).toContainText('Order item');
    await edit('hidden');
    await config.getByRole('checkbox').uncheck();
    await config.getByRole('checkbox').press('Enter');
    await expect(main.locator('.header')).toContainText('Order item');

});

test('popup cell editor confirms, cancels and resumes dismissed drafts',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(new URL('../playground/',process.env.GRAMLOT_GRID_EDITOR_URL).href);
    const grid=page.locator('gnr-grid').first();
    const open=()=>grid.evaluate(g=>g.gridEditor.open('r0',g.columns.find(c=>c.field==='popup_notes').id));
    const value=()=>grid.evaluate(g=>g.collectionStore().getValue(g.collectionStore().row('r0').node,'popup_notes'));
    await open();
    const popup=grid.getByRole('dialog',{name:'Notes · popup'});
    const input=grid.locator('gnr-textboxarea textarea');
    await expect(popup).toBeVisible();
    await input.fill('Call Sofia.\nDeliver before noon.');
    await input.press('Tab');
    await expect(popup.getByRole('button',{name:'Cancel'})).toBeFocused();
    await popup.getByRole('button',{name:'Confirm'}).click();
    await expect.poll(value).toBe('Call Sofia.\nDeliver before noon.');
    await open(); await input.fill('Discard this');
    await popup.getByRole('button',{name:'Cancel'}).click();
    await expect.poll(value).toBe('Call Sofia.\nDeliver before noon.');
    await open(); await input.fill('Draft to resume');
    await page.getByText('📦 Studio orders',{exact:true}).click();
    await expect(popup).toHaveCount(0);
    await open(); await expect(input).toHaveValue('Draft to resume');
    await input.press('Escape');
    await expect.poll(value).toBe('Call Sofia.\nDeliver before noon.');
    expect(await grid.evaluate(g=>g.gridEditor.drafts.size)).toBe(0);
});

test('popup cell validation retains errors and cleans up with its grid',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(new URL('../playground/',process.env.GRAMLOT_GRID_EDITOR_URL).href);
    const grid=page.locator('gnr-grid').first();
    const open=()=>grid.evaluate(g=>g.gridEditor.open('r0',g.columns.find(c=>c.field==='popup_notes').id));
    await open();
    const input=grid.locator('gnr-textboxarea textarea');
    await input.fill('x'.repeat(501));
    await grid.getByRole('button',{name:'Confirm',exact:true}).click();
    await expect(grid.getByRole('dialog')).toBeVisible();
    await expect.poll(()=>grid.evaluate(g=>g.gridEditor.errors.getNodes().length)).toBe(1);
    await page.getByText('📦 Studio orders',{exact:true}).click();
    await open();await expect(input).toHaveValue('x'.repeat(501));
    await input.fill('Corrected');
    await grid.getByRole('button',{name:'Confirm',exact:true}).click();
    await expect.poll(()=>grid.evaluate(g=>g.gridEditor.errors.getNodes().length)).toBe(0);
    await open();
    const path=await grid.evaluate(g=>g.sourceNode.absDatapath(g.gridEditor.path));
    expect(await grid.evaluate((g,path)=>{const app=g.sourceNode.handler.application;g.remove();return app.data.getNode(path)==null;},path)).toBe(true);
    await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('column groups and totals align and react to cell edits',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(new URL('../playground/',process.env.GRAMLOT_GRID_EDITOR_URL).href);
    const grid=page.locator('gnr-grid').first();
    await expect(grid.locator('.group-band')).toBeVisible();
    await expect(grid.locator('.footer-band')).toBeVisible();
    const sum=()=>grid.evaluate(g=>Number(g.bands.totals.getItem('quantity')));
    await expect.poll(sum).toBe(70);
    await grid.locator('.row').first().locator('.cell').nth(1).dblclick();
    const input=grid.locator('gnr-numbertextbox input');
    await input.fill('4');await input.press('Enter');
    await expect.poll(sum).toBe(72);
    expect(await grid.evaluate(g=>g.sourceNode.handler.application.data.getItem(g.sourceNode.absDatapath('.totalize.quantity')))).toBe(72);
    await grid.evaluate(g=>{g._horizontal.scrollLeft=250});
    await expect.poll(()=>grid.evaluate(g=>g.bands.footer.scrollLeft)).toBe(250);
    const footer=await grid.locator('.footer-band [data-field="quantity"]').boundingBox();
    const header=await grid.locator('.header [data-column-id]').filter({hasText:'Qty'}).boundingBox();
    expect(Math.abs(footer.x-header.x)).toBeLessThan(1);
});

test('filtering select arrow disappears when the grid editor loses focus',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(new URL('../playground/',process.env.GRAMLOT_GRID_EDITOR_URL).href);
    const grid=page.locator('gnr-grid').first();
    await grid.evaluate(async g=>g.gridEditor.open('r0',g.columns.find(c=>c.field==='country').id));
    const input=grid.locator('gnr-filteringselect input');
    const tools=grid.locator('gnr-filteringselect .choice-toggle');
    await expect(tools).toBeVisible();
    await grid.locator('.row[data-row-key="r1"] .cell').first().click();
    await expect(tools).toBeHidden();
    await input.click();
    await expect(tools).toBeVisible();
    await input.press('Tab');
    await expect(grid.locator('gnr-filteringselect')).toHaveCount(0);
});

test('single-line editors keep their natural height in tall rows',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(new URL('../playground/',process.env.GRAMLOT_GRID_EDITOR_URL).href);
    const grid=page.locator('gnr-grid').first();
    await grid.evaluate(g=>{g._manualRowHeights.set('r0',240);g._renderRows()});
    for (const field of ['description','quantity','country','product','enabled']) {
        await grid.evaluate(async(g,field)=>g.gridEditor.open('r0',g.columns.find(c=>c.field===field).id),field);
        await expect(grid.locator('.cell-editor')).toBeVisible();
        expect(await grid.locator('.cell-editor').evaluate(e=>e.getBoundingClientRect().height)).toBeLessThan(60);
        expect(await grid.locator('.row[data-row-key="r0"]').evaluate(e=>e.getBoundingClientRect().height)).toBe(240);
        await grid.evaluate(g=>g.gridEditor.close());
    }
});

test('row headings resize rows and multiline content scrolls at its maximum',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(new URL('../playground/',process.env.GRAMLOT_GRID_EDITOR_URL).href);
    const grid=page.locator('gnr-grid').first();
    const row=()=>grid.locator('.row[data-row-key="r0"]');
    await expect(row().getByRole('rowheader')).toHaveText('1');
    const initial=await row().evaluate(r=>r.getBoundingClientRect().height);
    const handle=row().getByRole('separator');
    const box=await handle.boundingBox();
    await page.mouse.move(box.x+box.width/2,box.y+box.height/2);
    await page.mouse.down();await page.mouse.move(box.x+box.width/2,box.y+box.height/2+60);await page.mouse.up();
    await expect.poll(()=>row().evaluate(r=>r.getBoundingClientRect().height)).toBe(initial+60);
    await row().getByRole('separator').focus();await page.keyboard.press('ArrowDown');
    await expect.poll(()=>row().evaluate(r=>r.getBoundingClientRect().height)).toBe(initial+70);
    await page.keyboard.press('Home');
    await expect.poll(()=>row().evaluate(r=>r.getBoundingClientRect().height)).toBe(initial);
    await grid.evaluate(async g=>g.gridEditor.open('r0',g.columns.find(c=>c.field==='notes').id));
    const input=grid.locator('textarea');
    await input.fill('Long line\n'.repeat(30));
    await expect.poll(()=>input.evaluate(i=>i.getBoundingClientRect().height)).toBe(160);
    expect(await input.evaluate(i=>i.scrollHeight>i.clientHeight)).toBe(true);
    await input.press('Control+Enter');
    const notes=row().locator('.cell').nth(6);
    expect(await notes.evaluate(c=>c.scrollHeight>c.clientHeight)).toBe(true);
    const before=await row().getByRole('rowheader').boundingBox();
    await grid.evaluate(g=>{g._horizontal.scrollLeft=1000});
    await expect.poll(async()=>(await row().getByRole('rowheader').boundingBox())?.x).toBe(before.x);
});

test('variable rows grow with multiline drafts and shrink after confirmation',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(new URL('../playground/',process.env.GRAMLOT_GRID_EDITOR_URL).href);
    const grid=page.locator('gnr-grid').first();
    const heights=()=>grid.evaluate(g=>[g.rowSize(0),g.rowTop(1)]);
    await expect.poll(async()=>(await heights())[0]).toBeGreaterThan(26);
    await grid.evaluate(async g=>g.gridEditor.open('r0',g.columns.find(c=>c.field==='notes').id));
    const input=grid.locator('textarea');
    await input.fill(Array.from({length:12},(_,i)=>`Line ${i+1}`).join('\n'));
    await expect.poll(async()=>(await heights())[0]).toBe(160);
    expect((await heights())[0]).toBe((await heights())[1]);
    await input.press('Control+Enter');
    await expect.poll(async()=>(await heights())[0]).toBe(160);
    await grid.evaluate(g=>{g._frame.scrollTop=g.rowTop(9)});
    await expect(grid.locator('.row[data-row-key="r9"]')).toBeVisible();
    await grid.evaluate(g=>{g._frame.scrollTop=0});
    await grid.evaluate(async g=>g.gridEditor.open('r0',g.columns.find(c=>c.field==='notes').id));
    await expect(input).toHaveValue(Array.from({length:12},(_,i)=>`Line ${i+1}`).join('\n'));
    await input.fill('Short');await input.press('Control+Enter');
    await expect.poll(async()=>(await heights())[0]).toBe(26);
});

test('optional status bar lists changes and resumes invalid cells',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(new URL('../playground/',process.env.GRAMLOT_GRID_EDITOR_URL).href);
    const grid=page.locator('gnr-grid').first();
    await expect(page.getByRole('toolbar',{name:'Editing status'})).toBeVisible();
    const cell=n=>grid.locator('.row').first().locator('.cell').nth(n);
    await cell(0).dblclick();
    await grid.locator('gnr-textbox input').fill('Updated');
    await grid.locator('gnr-textbox input').press('Enter');
    await page.getByRole('button',{name:'📝 Changes: 1',exact:true}).click();
    await expect(grid.getByRole('button',{name:'r0 · description: Reading corner · brass lamp → Updated',exact:true})).toBeVisible();
    await page.keyboard.press('Escape');
    await cell(1).dblclick();
    await grid.locator('gnr-numbertextbox input').fill('0');
    await grid.locator('gnr-numbertextbox input').press('Tab');
    await page.getByRole('button',{name:'🔴 Errors: 1',exact:true}).click();
    await grid.getByRole('button',{name:/r0 · quantity:/}).click();
    await expect(grid.locator('gnr-numbertextbox input:visible')).toHaveValue('0');
    await grid.locator('gnr-numbertextbox input:visible').press('Escape');
    await expect(page.getByRole('button',{name:'🟢 Errors: 0',exact:true})).toBeVisible();
});

test('main grid exposes all field editors and recalculates both formulas',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(process.env.GRAMLOT_GRID_EDITOR_URL);
    const grid=page.locator('gnr-grid').first();
    await grid.locator('.row').first().locator('.cell').first().dblclick();
    await grid.evaluate(g=>g.gridEditor.close());
    for (const field of ['notes','country','free_choice','remote','local_choice','datasets','enabled','day','hour','discount','vertical','color','password']) {
        await grid.evaluate(async(g,field)=>{const c=g.columns.find(c=>c.field===field);await g.gridEditor.open('r0',c.id)},field);
        await expect(grid.locator('.cell-editor')).toBeVisible();
        await expect.poll(()=>grid.evaluate(g=>Boolean(g.gridEditor.widget?._formField))).toBe(true);
        await grid.evaluate(g=>g.gridEditor.close());
    }
    await grid.evaluate(async g=>{await g.gridEditor.open('r0',g.columns.find(c=>c.field==='quantity').id)});
    const input=grid.locator('gnr-numbertextbox input');
    await input.fill('4');await input.press('Enter');
    await expect.poll(()=>grid.evaluate(g=>Number(g.storeBag.getItem('r0.total')))).toBe(50);
    await expect.poll(()=>grid.evaluate(g=>Number(g.storeBag.getItem('r0.discounted_total')))).toBe(45);
});

test('invalid drafts allow navigation and can be resumed independently',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(process.env.GRAMLOT_GRID_EDITOR_URL);
    const grid=page.locator('gnr-grid').first();
    const cell=n=>grid.locator('.row').first().locator('.cell').nth(n);
    await cell(1).dblclick();
    let input=grid.locator('gnr-numbertextbox input:visible');
    await input.fill('0');
    await input.press('Tab');
    await expect(grid.locator('.cell.invalidCell')).toHaveCount(1);
    await expect(grid.locator('gnr-numbertextbox input:visible')).toHaveValue('12.5');
    await grid.locator('gnr-numbertextbox input:visible').press('Escape');
    await cell(1).dblclick();
    input=grid.locator('gnr-numbertextbox input:visible');
    await expect(input).toHaveValue('0');
    await cell(0).dblclick();
    await expect(grid.locator('gnr-textbox input:visible')).toBeFocused();
    await grid.locator('gnr-textbox input:visible').press('Escape');
    await cell(1).dblclick();
    input=grid.locator('gnr-numbertextbox input:visible');
    await expect(input).toHaveValue('0');
    await input.fill('3');
    await input.press('Enter');
    await expect(grid.locator('.cell.invalidCell')).toHaveCount(0);
    await expect(cell(1)).toHaveText('3');
});

test('cell focus border disappears outside while the draft is retained',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(process.env.GRAMLOT_GRID_EDITOR_URL);
    const grid=page.locator('gnr-grid').first();
    await grid.locator('.row').first().locator('.cell').first().dblclick();
    const input=grid.locator('gnr-textbox input');
    await input.fill('Retained draft');
    const border=()=>grid.evaluate(g=>getComputedStyle(g.gridEditor.layer,'::after').boxShadow);
    await expect.poll(border).not.toBe('none');
    await page.getByText('First description in Data: Line 1',{exact:true}).click();
    await expect.poll(border).toBe('none');
    await expect(input).toHaveValue('Retained draft');
    await input.click();
    await expect.poll(border).not.toBe('none');
    await input.press('Escape');
    await expect(grid.locator('.row').first().locator('.cell').first()).toHaveText('Line 1');
});

test('resident Source cell editor: typed confirmation, scroll, cancellation and RPC choice',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(process.env.GRAMLOT_GRID_EDITOR_URL);
    const grid=page.locator('gnr-grid').first();await expect(grid).toBeVisible();
    const cell=(n)=>grid.locator('.row').first().locator('.cell').nth(n);
    await cell(0).dblclick();let input=grid.locator('gnr-textbox input');await expect(input).toBeVisible();
    await input.fill('Browser edit');
    await grid.evaluate(g=>{g._frame.scrollTop=800});await page.waitForTimeout(100);
    await grid.evaluate(g=>{g._frame.scrollTop=0});await page.waitForTimeout(100);
    await expect(input).toHaveValue('Browser edit');await input.press('Tab');
    await expect(page.getByText('First description in Data: Browser edit',{exact:true})).toBeVisible();
    input=grid.locator('gnr-numbertextbox input');await expect(input).toBeVisible();
    const editorHeight=await grid.evaluate(g=>g.gridEditor.layer.getBoundingClientRect().height);
    await input.fill('0');await input.press('Enter');await expect(input).toBeVisible();
    const message=grid.locator('[data-validation-message]');
    await expect(message).toHaveText('Enter a value greater than or equal to 1.');
    await page.getByText('First description in Data: Browser edit',{exact:true}).click();
    await expect(message).toBeHidden();
    await expect(grid.locator('.cell.invalidCell')).toHaveCount(1);
    await input.hover();
    await expect(message).toBeVisible();
    await expect.poll(()=>grid.evaluate(g=>g.gridEditor.layer.getBoundingClientRect().height)).toBe(editorHeight);
    await expect(grid.locator('.cell.invalidCell')).toHaveCount(1);
    await grid.evaluate(g=>{g._frame.scrollTop=800});
    await expect(grid.locator('.cell.invalidCell')).toHaveCount(0);
    await grid.evaluate(g=>{g._frame.scrollTop=0});
    await expect(grid.locator('.cell.invalidCell')).toHaveCount(1);
    await expect(grid.locator('.cell.invalidCell')).toHaveAttribute('aria-invalid','true');
    await expect(input).toHaveValue('0');
    await input.hover();
    const messageBox=await message.boundingBox(), inputBox=await input.boundingBox();
    expect(messageBox.y+messageBox.height).toBeLessThanOrEqual(inputBox.y);

    await input.fill('4');await input.press('Tab');await expect(page.getByText('First quantity in Data: 4',{exact:true})).toBeVisible();await grid.locator('gnr-numbertextbox input').press('Escape');
    await expect(grid.locator('.cell.invalidCell')).toHaveCount(0);
    await cell(0).dblclick();input=grid.locator('gnr-textbox input');await input.fill('Discard');await input.press('Escape');await expect(cell(0)).toHaveText('Browser edit');
    await cell(3).dblclick();input=grid.locator('gnr-dbselect input');await expect(input).toHaveValue('Desk lamp');await input.fill('Note');
    await expect(grid.getByRole('option',{name:'Notebook',exact:true})).toBeVisible();await grid.getByRole('option',{name:'Notebook',exact:true}).click();await input.press('Tab');
    await expect(page.getByText('First product ID in Data: book',{exact:true})).toBeVisible();
    await expect.poll(()=>grid.evaluate(g=>g.storeBag.getItem('r0.total').toString())).toBe('50');
    expect(errors).toEqual([]);
});


test('Tab selects the value and vertical arrows move the active editor',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(process.env.GRAMLOT_GRID_EDITOR_URL);
    const grid=page.locator('gnr-grid').first();
    await grid.locator('.row').first().locator('.cell').first().dblclick();
    await grid.locator('gnr-textbox input').press('Tab');
    const input=grid.locator('gnr-numbertextbox input');
    await expect.poll(()=>input.evaluate(el=>[el.selectionStart,el.selectionEnd,el.value.length])).toEqual([0,1,1]);
    await input.press('7');
    await input.press('ArrowDown');
    await expect.poll(()=>grid.evaluate(g=>g.gridEditor.active.key)).toBe('r1');
    await expect(page.getByText('First quantity in Data: 7',{exact:true})).toBeVisible();
    await expect(input).toHaveValue('2');
    await expect.poll(()=>input.evaluate(el=>[el.selectionStart,el.selectionEnd])).toEqual([0,1]);
    await input.press('ArrowUp');
    await expect.poll(()=>grid.evaluate(g=>g.gridEditor.active.key)).toBe('r0');
    await expect(input).toHaveValue('7');
    await input.press('ArrowUp');
    await expect(input).toBeVisible();
    await expect.poll(()=>grid.evaluate(g=>g.gridEditor.active.key)).toBe('r0');
    await expect.poll(()=>grid.evaluate(g=>getComputedStyle(g.gridEditor.layer,'::after').boxShadow)).toContain('inset');
    await input.press('Escape');
    await grid.locator('.row').first().locator('.cell').nth(3).dblclick();
    const select=grid.locator('gnr-dbselect input');
    await expect(select).toHaveValue('Desk lamp');
    await select.press('ArrowDown');
    await expect(grid.getByRole('option',{name:'Notebook',exact:true})).toBeVisible();
    await select.press('ArrowDown');
    await expect.poll(()=>grid.evaluate(g=>g.gridEditor.active.key)).toBe('r0');
    await expect(grid.getByRole('option',{name:'Notebook',exact:true})).toHaveAttribute('aria-selected','true');
    await select.press('Tab');
    await expect(page.getByText('First product ID in Data: book',{exact:true})).toBeVisible();
});

test('dbSelect accepts the visible suggestion on Tab and leaving the field',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(process.env.GRAMLOT_GRID_EDITOR_URL);
    const grid=page.locator('gnr-grid').first();
    const product=()=>grid.locator('.row').first().locator('.cell').nth(3);
    await product().dblclick();
    let input=grid.locator('gnr-dbselect input');
    await expect(input).toHaveValue('Desk lamp');
    await input.fill('n');
    await expect(grid.getByRole('option',{name:'Notebook',exact:true})).toBeVisible();
    await input.press('Tab');
    await expect(page.getByText('First product ID in Data: book',{exact:true})).toBeVisible();
    await grid.locator('textarea').press('Escape');
    await product().dblclick();
    input=grid.locator('gnr-dbselect input');
    await expect(input).toHaveValue('Notebook');
    await input.fill('oak');
    await expect(grid.getByRole('option',{name:'Oak desk',exact:true})).toBeVisible();
    await page.getByText('First product ID in Data: book',{exact:true}).click();
    await expect(input).toHaveValue('Oak desk');
    await input.press('Tab');
    await expect(page.getByText('First product ID in Data: desk',{exact:true})).toBeVisible();
    await grid.locator('textarea').press('Escape');
    await product().dblclick();
    input=grid.locator('gnr-dbselect input');
    await expect(input).toHaveValue('Oak desk');
    await input.fill('no-match');
    await expect(grid.getByText('No results',{exact:true})).toBeVisible();
    await input.press('Tab');
    await expect(input).toBeHidden();
    await expect(grid.locator('.cell.invalidCell')).toHaveCount(1);
    await product().dblclick();
    await expect(input).toBeVisible();
    await input.hover();
    await expect(grid.locator('#choice-error')).toBeHidden();
    await expect(grid.locator('[data-validation-message]')).toBeVisible();
    await expect(grid.locator('.cell.invalidCell')).toHaveCount(1);
    await expect(page.getByText('First product ID in Data: desk',{exact:true})).toBeVisible();
    await input.press('Escape');
});

test('widget playground confirms multiline, choices and typed editors',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(process.env.GRAMLOT_GRID_EDITOR_URL);
    const choices=page.locator('gnr-grid').nth(1), typed=page.locator('gnr-grid').nth(2);
    const open=async(grid,index)=>{await grid.locator('.row').first().locator('.cell').nth(index).dblclick()};
    const stored=(grid,field)=>grid.evaluate((g,f)=>g.storeBag.getItem(`r0.${f}`),field);
    await open(choices,0);
    const area=choices.locator('textarea');
    await area.fill('First');await area.press('End');await area.press('Enter');await area.press('S');
    await expect(area).toHaveValue('First\nS');
    await area.press('ArrowUp');
    await expect.poll(()=>choices.evaluate(g=>g.gridEditor.active.key)).toBe('r0');
    await area.press('Control+Enter');
    await expect.poll(()=>stored(choices,'notes')).toBe('First\nS');
    await open(choices,1);
    await choices.locator('gnr-filteringselect input').fill('France');
    await choices.locator('gnr-filteringselect input').press('Tab');
    await expect.poll(()=>stored(choices,'country')).toBe('fr');
    await choices.locator('gnr-combobox input').fill('Custom choice');
    await choices.locator('gnr-combobox input').press('Tab');
    await expect.poll(()=>stored(choices,'free_choice')).toBe('Custom choice');
    const remote=choices.locator('gnr-remoteselect input');
    await expect(remote).toHaveValue('Desk lamp');await remote.fill('note');
    await expect(choices.getByRole('option',{name:'Notebook',exact:true})).toBeVisible();
    await remote.press('Tab');
    await expect.poll(()=>stored(choices,'remote')).toBe('book');
    const checkbox=choices.locator('input[type=checkbox]');
    await checkbox.uncheck();await checkbox.press('Enter');
    await expect.poll(()=>stored(choices,'enabled')).toBe(false);
    await open(typed,0);
    const day=typed.locator('gnr-datetextbox input');
    await day.fill('14/09/2026');await day.press('Tab');
    await expect.poll(()=>typed.evaluate(g=>g.storeBag.getItem('r0.day').toISOString().slice(0,10))).toBe('2026-09-14');
    const hour=typed.locator('input[type=time]');await hour.fill('16:45');await hour.press('Tab');
    await expect(hour).toHaveCount(0);
    await expect.poll(()=>typed.evaluate(g=>g.storeBag.getItem('r0.hour').toISOString().slice(11,19))).toBe('16:45:00');
    const range=typed.locator('input[type=range]');await range.press('ArrowUp');await range.press('Tab');
    await expect.poll(()=>stored(typed,'level')).toBe(45);
    await range.press('ArrowUp');await range.press('Tab');
    await expect.poll(()=>stored(typed,'vertical')).toBe(45);
    const color=typed.locator('input[type=color]');await color.fill('#ff0000');await color.press('Tab');
    await expect.poll(()=>stored(typed,'color')).toBe('#ff0000');
    const password=typed.locator('input[type=password]');await password.fill('changed');await password.press('Enter');
    await expect.poll(()=>stored(typed,'password')).toBe('changed');
    expect(errors).toEqual([]);
});

test('Down opens closed choice menus without leaving the edited row',async({page})=>{
    test.skip(!process.env.GRAMLOT_GRID_EDITOR_URL,'Requires the Python grid-editor example');
    await page.goto(process.env.GRAMLOT_GRID_EDITOR_URL);
    const grid=page.locator('gnr-grid').nth(1);
    for (const [column,tag,caption,next] of [
        [1,'gnr-filteringselect','Italy','England'],
        [2,'gnr-combobox','Italy','England'],
        [3,'gnr-remoteselect','Desk lamp','Notebook'],
    ]) {
        await grid.locator('.row').first().locator('.cell').nth(column).dblclick();
        const input=grid.locator(`${tag} input`);
        await expect(input).toHaveValue(caption);
        await expect(input).toHaveAttribute('aria-expanded','false');
        await input.press('ArrowDown');
        await expect(input).toHaveAttribute('aria-expanded','true');
        await expect.poll(()=>grid.evaluate(g=>g.gridEditor.active.key)).toBe('r0');
        await input.press('ArrowDown');
        await expect(grid.getByRole('option',{name:next,exact:true})).toHaveAttribute('aria-selected','true');
        await input.press('Escape');
        await expect(input).toHaveAttribute('aria-expanded','false');
        await input.press('Escape');
    }
});
