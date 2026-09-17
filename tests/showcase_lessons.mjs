// Browser-runtime probe for Python-authored showcase Source.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {setupDom} from '../../gramlot-dom/tests/dom.js';
import {Application} from 'gramlot-dom';
import '/_assets/dom/collections/inputs.js';
import '/_assets/dom/collections/layout.js';
import '/_assets/dom/collections/forms.js';
import '/_assets/dom/collections/colorpicker.js';
import {fromTytx} from 'genro-tytx';

setupDom();
const {GramlotBuilder} = await import('/_assets/pages/builder.js');
const payloads = JSON.parse(readFileSync(0, 'utf8'));

for (const [name, source] of Object.entries(payloads)) {
    class Lesson extends GramlotBuilder {
        static wc_requires = ['inputs', 'layout', 'forms', 'colorpicker'];
    }
    const builder = new Lesson('showcase');
    builder.loadSource(fromTytx(source, 'json'));
    const host = document.body.appendChild(document.createElement('div'));
    const app = new Application(host, builder, {inspector: false});

    const change = (path, value) => app.live(() => builder.data.setItem('data_root.' + path, value));
    if (name === 'data_formula') {
        change('quantity', 4);
        assert.equal(builder.data.getItem('data_root.subtotal'), 100);
        assert.equal(builder.data.getItem('data_root.total'), 90);
        assert.match(host.querySelector('h2').textContent, /90/);
    } else if (name === 'data_controller') {
        change('name', 'Grace');
        change('uppercase', true);
        assert.equal(host.querySelector('h2').textContent, 'Hello GRACE');
        assert.equal(builder.data.getItem('data_root.characters'), 5);
    } else if (name === 'hello_binding') {
        change('greeting', 'Hello folk');
        assert.equal(host.querySelector('h2').textContent, 'Hello folk');
    } else if (name === 'dynamic_label_position') {
        change('label.position', 'TL');
        const fields = host.querySelectorAll('gnr-textbox,gnr-numbertextbox,gnr-datetextbox');
        assert.equal(fields.length, 4);
        for (const field of fields) {
            assert.equal(field.getAttribute('lbl_position'), 'TL');
            assert.equal(field.shadowRoot.querySelector('.labledBox').style.flexDirection, 'column');
        }
    } else if (name === 'input_widgets') {
        assert.equal(host.querySelector('gnr-formlet').children.length, 8);
        change('profile.country', 'fr');
        assert.equal(host.querySelector('p').textContent, 'Stored country code: fr');
    } else if (name === 'number_format') {
        assert.ok(host.textContent.includes('Amount: 1,234.57'), host.textContent);
        change('locale', 'de-DE');
        assert.ok(host.textContent.includes('Amount: 1.234,57'), host.textContent);
    } else if (name === 'formlet') {
        assert.equal(host.querySelectorAll('gnr-formlet').length, 2);
        change('contact.name', 'Grace');
        assert.equal(host.querySelector('p').textContent, 'Profile ready for Grace.');
    } else if (name === 'required_validation') {
        const field = host.querySelector('gnr-numbertextbox');
        app.mutate(field.id, 7);
        assert.equal(field.shadowRoot.querySelector('input').getAttribute('aria-invalid'), 'true');
        const nameField = [...host.querySelectorAll('gnr-textbox')].find(e => e.getAttribute('lbl') === 'Guest name');
        app.mutate(nameField.id, '');
        assert.equal(nameField.shadowRoot.querySelector('input').getAttribute('aria-invalid'), 'true');
    }

    app.dispose();
    host.remove();
}

console.log(`Showcase runtime lessons: ${Object.keys(payloads).length} passed.`);
