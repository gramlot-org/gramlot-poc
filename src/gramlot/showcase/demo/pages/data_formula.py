from gramlot.showcase import ShowcasePage


class Page(ShowcasePage):
    def main(self, root):
        root.data('.quantity', 3)
        root.data('.price', 25)
        root.data('.discount', 10)
        root.h1('Calculate with dataFormula')
        root.p('Change an input: dependent values are recalculated in the browser.', class_='lesson-lead')
        fields = root.formlet(col_min_width='220px', gap='14px', class_='lesson-card')
        fields.numberTextBox(value='^.quantity', lbl='Quantity', min=1)
        fields.numberTextBox(value='^.price', lbl='Unit price', min=0)
        fields.numberTextBox(value='^.discount', lbl='Discount (%)', min=0, max=100)
        root.dataFormula('.subtotal', 'quantity * price', quantity='^.quantity', price='^.price', _on_start=True)
        root.dataFormula('.total', 'subtotal * (1 - discount / 100)', subtotal='^.subtotal', discount='^.discount', _on_start=True)
        preview = root.div(class_='lesson-preview')
        preview.p('^.subtotal', format='0.00', mask='Subtotal: %s')
        preview.h2('^.total', format='0.00', mask='Total: %s')
        root.p('The second formula depends on the first. Both results live in Data.', class_='lesson-note')
