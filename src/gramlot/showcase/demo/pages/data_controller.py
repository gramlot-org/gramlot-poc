from gramlot.showcase import ShowcasePage


class Page(ShowcasePage):
    def main(self, root):
        root.data('.name', 'Ada')
        root.data('.uppercase', False)
        root.h1('React with dataController')
        root.p('A controller reacts to its bound inputs and can write more than one Data value.', class_='lesson-lead')
        fields = root.formlet(col_min_width='220px', gap='14px', class_='lesson-card')
        fields.textBox(value='^.name', lbl='Your name', live=True)
        fields.checkbox(checked='^.uppercase', lbl='Uppercase greeting')
        root.dataController(
            "const clean = name.trim(); this.SET('.greeting', clean ? 'Hello ' + (uppercase ? clean.toUpperCase() : clean) : 'Hello everyone'); this.SET('.characters', clean.length);",
            name='^.name', uppercase='^.uppercase', _on_start=True,
        )
        preview = root.div(class_='lesson-preview')
        preview.h2('^.greeting')
        preview.p('^.characters', mask='Characters in the name: %s')
        root.p('Use a formula for a calculated value; use a controller for a sequence of actions.', class_='lesson-note')
