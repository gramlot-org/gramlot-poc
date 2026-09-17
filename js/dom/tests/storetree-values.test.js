import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Bag} from 'genro-bag-js';
import {setupDom} from './dom.js';
import {Application, HtmlBuilder} from '../src/index.js';
import '../src/collections/storetree.js';

test('optional tree values preserve null, false, zero and text safely across snapshots', () => {
    setupDom();
    class Page extends HtmlBuilder {
        static wc_requires = ['storeTree'];
        main(root) { root.storeTree({store:'^snapshot',showValues:true}); }
    }
    const host=document.body.appendChild(document.createElement('div'));
    const app=new Application(host,new Page('main'),{inspector:false});
    const data=new Bag();
    for(const [key,value] of Object.entries({zero:0,no:false,missing:null,text:'<script>unsafe</script>'})) data.setItem(key,value);
    app.live(()=>app.data.setItem('main.snapshot',data));
    const tree=host.querySelector('gnr-storetree');
    assert.deepEqual([...tree.shadowRoot.querySelectorAll('.node-value')].map(el=>el.textContent),
        ['0','false','null','<script>unsafe</script>']);
    assert.equal(tree.shadowRoot.querySelector('script'),null);
    const next=new Bag();next.setItem('zero',12);
    app.live(()=>app.data.setItem('main.snapshot',next));
    assert.equal(tree.shadowRoot.querySelector('.node-value').textContent,'12');
    app.dispose();host.remove();
});
