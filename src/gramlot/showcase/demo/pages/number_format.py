from datetime import date
from decimal import Decimal

from gramlot.showcase import ShowcasePage


class Page(ShowcasePage):
    def main(self, root):
        root.data('.amount', Decimal('1234.567'))
        root.data('.day', date(2026, 10, 15))
        root.data('.locale', 'en-US')
        root.h1('Store once, present clearly')
        fields = root.formlet(col_min_width='220px', gap='12px', class_='lesson-card')
        fields.numberTextBox(value='^.amount', dtype='N', places=2, lbl='Amount')
        fields.dateTextBox(value='^.day', lbl='Date')
        fields.filteringSelect(value='^.locale', lbl='Display locale',
                               values='en-US:English (US),it-IT:Italian,de-DE:German')
        result = root.groupBox(lbl='Formatted readout', class_='lesson-preview')
        result.p('^.amount', dtype='N', format='decimal', places=2,
                 locale='^.locale', mask='Amount: %s')
        result.p('^.day', dtype='D', format='long', locale='^.locale', mask='Date: %s')
        result.p('mask inserts the displayed value into %s; it is not an input mask.', class_='lesson-note')
