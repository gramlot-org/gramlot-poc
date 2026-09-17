# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Python-authored local database laboratory; fixture setup is not a write API."""
from pathlib import Path
from gramlot.bagdb import load_bagdb_directory
from gramlot.page import WebPage


class Page(WebPage):
    title = 'BagDB · database laboratory'
    source_inspection = True

    def main(self, root):
        fixture, tables = load_bagdb_directory(Path(__file__).resolve().parents[1] / 'mydb')
        tables['customer']['selector'] = dict(key='id', caption='account_name', search='account_name')
        initial_customer = fixture.get_item('data.invoice').nodes[0].value.get_item('customer_id')
        root.data('fixture', fixture)
        root.data('customer_id', initial_customer)
        root.data('ignore_case', True)
        root.data('show_source', False)
        root.dataFormula('source_display', "visible ? 'block' : 'none'",
                         visible='^show_source', _on_start=True)
        root.bagDb(adapter='local', source='=fixture', tables=tables)
        root.dataRecord('record', adapter='local', dbtable='customer', pkey='^customer_id',
                        statuspath='record_status')
        root.dataFormula('invoice_filter', "({customer_id: customer ?? ''})",
                         customer='^customer_id', _on_start=True)
        root.dataSelection('rows', adapter='local', dbtable='invoice', where='^invoice_filter',
                           orderBy=[dict(field='date', direction='asc')],
                           limit=50, statuspath='selection_status')
        root.styleSheet('''body{margin:0;font:15px/1.5 system-ui;color:#203349;background:#f2f5f9}
            .db-lab{max-width:1080px;margin:32px auto;padding:28px;background:white;border-radius:14px}
            .db-lab h1{margin:0 0 8px}.db-lab .lead{color:#586b80;margin-bottom:24px}
            .db-lab .panel{padding:20px;border:1px solid #d9e2ed;border-radius:9px;margin:18px 0}
            .db-lab .tools{display:flex;gap:12px;margin:14px 0}.db-lab button{padding:8px 14px}
            .db-lab .model-viewport{height:300px;overflow:auto;border:1px solid #e2e8f0;border-radius:6px;padding:8px;box-sizing:border-box}
            .db-lab .source-tools{display:flex;justify-content:flex-end;margin-top:16px;padding-top:12px;border-top:1px solid #e2e8f0}
            .db-lab .source-toggle{appearance:none;background:transparent;border:1px solid #d9e2ed;border-radius:6px;color:#586b80;font:500 12px/1.4 system-ui;padding:5px 10px;cursor:pointer}
            .db-lab .source-toggle:hover{background:#f2f5f9;color:#203349;border-color:#b9c8d9}
            .db-lab .source-toggle:focus-visible{outline:2px solid #3678b5;outline-offset:2px}
            .db-lab .source{height:520px;border:1px solid #d9e2ed;margin-top:20px}''')
        panel = root.div(class_='db-lab')
        panel.h1('Customers and their invoices')
        panel.p('Choose a customer to load their details and invoices from the local database.', class_='lead')
        fields = panel.formlet(col_min_width='240px', gap='16px', class_='panel')
        fields.dbSelect(dbadapter='local', dbtable='customer', value='^customer_id',
                        ignoreCase='^ignore_case', limit=10, lbl='Customer', searchdelay=0)
        fields.checkbox(value='^ignore_case', lbl='Ignore case')
        record = panel.div(class_='panel')
        record.h2('Customer details')
        record.p('^record.account_name', mask='Name: %s')
        record.p('^record.suburb', mask='Suburb: %s')
        record.p('^record_status.found', mask='Found: %s')
        tools = panel.div(class_='tools')
        tools.button('Missing record', action="this.SET('customer_id', '999');")
        tools.button('Clear', action="this.SET('customer_id', null);")
        tools.button('Restore initial customer', action=f"this.SET('customer_id', {initial_customer!r});")
        panel.h2('Customer invoices')
        panel.grid(store='^rows', identifier='id', datamode='attr', height='210px',
                   columns=[dict(field='inv_number', name='Invoice'),
                            dict(field='date', name='Date'),
                            dict(field='gross_total', name='Amount')])
        panel.p('^selection_status.hasMore', mask='More invoices available: %s')
        panel.p('Complete legacy CSV snapshot: 18 tables. Search customer names with prefix or containment matching.')
        panel.h2('Model relations')
        panel.p('Inspect customer fields and expand the inverse relation to invoices. '
                'The return relation is marked as a cycle; this tree contains schema, not records.')
        model_viewport = panel.div(class_='model-viewport')
        model_viewport.relationTree('customer', adapter='local', storepath='model_tree',
                           statuspath='model_status', maxDepth=3, maxNodes=50)
        source_tools = panel.div(class_='source-tools')
        source_tools.button('Python source', class_='source-toggle', action="this.SET('show_source', !this.GET('show_source'));")
        panel.codeMirror(value=Path(__file__).read_text(), language='python', readonly=True,
                         display='^source_display', class_='source')
