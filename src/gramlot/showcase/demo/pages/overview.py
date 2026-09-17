from gramlot.showcase import ShowcasePage


class Page(ShowcasePage):
    def main(self, root):
        root.h1('Learn Gramlot by building useful forms')
        root.p('Each lesson adds a practical idea: Data, bindings, inputs, layout, formatting, and validation.',
               class_='lesson-lead')
        cards = root.formlet(col_min_width='280px', gap='16px', class_='lesson-grid')
        cards.groupBox(lbl='Read the Python', class_='lesson-card').p('The source panel shows the exact main method that built the page.')
        cards.groupBox(lbl='Change the Data', class_='lesson-card').p('Edit controls and watch every bound preview update through Gramlot.')
        cards.groupBox(lbl='Inspect the Source', class_='lesson-card').p('Open Inspector to see Source and Data without leaving the lesson.')
        cards.groupBox(lbl='Follow the sequence', class_='lesson-card').p('The examples grow from one heading into a complete booking form.')
