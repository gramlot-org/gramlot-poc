from gramlot.showcase import ShowcasePage


class Page(ShowcasePage):
    def main(self, root):
        root.data('.name', 'Ada')
        root.data('.greeting', 'Welcome')
        root.data('.tone', '#2563eb')
        root.h1('A greeting made from Data')
        fields = root.formlet(col_min_width='220px', gap='12px', class_='lesson-card')
        fields.textBox(value='^.name', lbl='Name', live=True)
        fields.textBox(value='^.greeting', lbl='Greeting', live=True)
        fields.colorpicker(value='^.tone', lbl='Accent')
        preview = root.groupBox(lbl='Live preview', class_='lesson-preview')
        preview.h2('^.greeting', color='^.tone')
        preview.p('^.name', mask='This message is for %s.')
