from gramlot.showcase import ShowcasePage


class Page(ShowcasePage):
    def main(self, root):
        root.data('.contact.name', 'Ada Lovelace')
        root.data('.contact.email', 'ada@example.com')
        root.data('.contact.phone', '+39 06 555 0100')
        root.data('.contact.city', 'Rome')
        root.data('.contact.country', 'it')
        root.h1('Compose fields into sections')
        identity = root.groupBox(lbl='Contact', class_='lesson-card')
        fields = identity.formlet(col_min_width='220px', gap='12px')
        fields.textBox(value='^.contact.name', lbl='Name')
        fields.textBox(value='^.contact.email', lbl='Email')
        fields.textBox(value='^.contact.phone', lbl='Phone')
        location = root.groupBox(lbl='Address', class_='lesson-card')
        address = location.formlet(col_min_width='220px', gap='12px')
        address.textBox(value='^.contact.city', lbl='City')
        address.filteringSelect(value='^.contact.country', lbl='Country',
                                values='it:Italy,fr:France,de:Germany')
        root.p('^.contact.name', mask='Profile ready for %s.', class_='lesson-note')
