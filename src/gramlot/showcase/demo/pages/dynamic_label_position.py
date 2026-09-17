from gramlot.showcase import ShowcasePage


class Page(ShowcasePage):
    def main(self, root):
        root.data('.label.position', 'L')
        root.data('.label.color', '#475569')
        root.data('.name', 'Ada Lovelace')
        root.data('.email', 'ada@example.com')
        root.data('.guests', 3)
        root.data('.arrival', '2026-10-15')
        root.h1('Label playground')
        controls = root.formlet(col_min_width='220px', gap='12px', class_='lesson-card')
        controls.filteringSelect(value='^.label.position', lbl='Position',
                                 values='L:Left,R:Right,TL:Top left,TC:Top center,TR:Top right,BL:Bottom left')
        controls.colorpicker(value='^.label.color', lbl='Color')
        sample = root.formlet(col_min_width='220px', gap='12px', class_='lesson-card')
        label = dict(lbl_position='^.label.position', lbl_color='^.label.color')
        sample.textBox(value='^.name', lbl='Name', **label)
        sample.textBox(value='^.email', lbl='Email', **label)
        sample.numberTextBox(value='^.guests', lbl='Guests', **label)
        sample.dateTextBox(value='^.arrival', lbl='Arrival', **label)
