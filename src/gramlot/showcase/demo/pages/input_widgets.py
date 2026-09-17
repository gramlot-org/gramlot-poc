from datetime import date

from gramlot.showcase import ShowcasePage


class Page(ShowcasePage):
    def main(self, root):
        root.data('.profile.name', 'Ada')
        root.data('.profile.notes', 'Window seat, please.')
        root.data('.profile.day', date(2026, 10, 15))
        root.data('.profile.time', '18:30')
        root.data('.profile.color', '#7c3aed')
        root.data('.profile.guests', 2)
        root.data('.profile.country', 'it')
        root.data('.profile.updates', True)
        root.h1('A useful input palette')
        fields = root.formlet(col_min_width='220px', gap='14px', class_='lesson-card')
        fields.textBox(value='^.profile.name', lbl='Name')
        fields.textBoxArea(value='^.profile.notes', lbl='Notes', rows=3)
        fields.dateTextBox(value='^.profile.day', lbl='Date')
        fields.timeTextBox(value='^.profile.time', lbl='Time')
        fields.colorpicker(value='^.profile.color', lbl='Favorite color')
        fields.numberTextBox(value='^.profile.guests', lbl='Guests', min=1, max=8)
        fields.filteringSelect(value='^.profile.country', lbl='Country',
                               values='it:Italy,fr:France,de:Germany,es:Spain')
        fields.checkbox(checked='^.profile.updates', lbl='Send trip updates')
        root.p('^.profile.country', mask='Stored country code: %s', class_='lesson-note')
