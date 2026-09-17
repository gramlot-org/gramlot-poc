# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Minimal dbSelect: the same SQLite customers, with two matching policies."""
from gramlot.database import DbPageMixin
from gramlot.page import WebPage


class Page(DbPageMixin, WebPage):
    title = 'SQLite dbSelect'
    example_view = True
    initial_customer = None

    def main(self, root):
        root.h1('SQLite dbSelect')
        root.p('Customers from test_invoice_pg, copied into SQLite and read through SQLAlchemy.')
        root.p('Search tries the beginning of the name first. If nothing matches, it searches '
               'inside the name. Search text is literal, including % and _.')
        root.data('insensitive', None)
        root.data('customer_caption', None)
        root.data('sensitive', None)
        root.data('restored', self.initial_customer)
        fields = root.div(max_width='560px', padding='20px', display='grid', gap='18px')
        fields.dbSelect(dbtable='invc.customer', value='^insensitive',
                        selectedCaption='^customer_caption',
                        ignoreCase=True, limit=10, lbl='Ignore case',
                        placeholder='Try Smith or smith', width='100%')
        fields.div('^insensitive', mask='Selected identity: %s')
        fields.div('^customer_caption', mask='Selected name: %s')
        fields.dbSelect(dbtable='invc.customer', value='^sensitive',
                        ignoreCase=False, limit=10, lbl='Match case',
                        placeholder='Compare Smith with smith', width='100%')
        fields.div('^sensitive', mask='Selected identity: %s')
        fields.dbSelect(dbtable='invc.customer', value='^restored',
                        lbl='Caption restored from an existing identity', width='100%')
        fields.button('Clear selections', action="this.SET('insensitive', null); "
                      "this.SET('customer_caption', null); "
                      "this.SET('sensitive', null); this.SET('restored', null);")
