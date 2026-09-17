"""Resident cell editing experiment, authored entirely through Gramlot."""
from genro_bag import Bag
from datetime import date, time, timedelta
from gramlot.grid import GridStruct
from gramlot.page import WebPage, endpoint


class Page(WebPage):
    title = 'Editable grid'
    example_view = False
    source_inspection = False

    def main(self, root):
        root = root.div(padding='12px', box_sizing='border-box',
                        height='calc(100vh - 16px)', background='#f5f7fa',
                        font_family='system-ui, sans-serif', font_size='14px')
        extra_columns = self.editor_columns()
        data = Bag()
        orders = [
            ('Reading corner · brass lamp', 2, 89.90, 'lamp', 'Warm light, 2700 K.\nPack the shades separately.', 'it', 'Courier', True),
            ('Workshop · sketchbooks', 12, 8.50, 'book', '', 'fr', 'Collection', True),
            ('Reception · oak desk', 1, 640.00, 'desk', 'Deliver after 10:00.', 'en', 'White glove', False),
            ('Meeting room · linen chairs', 6, 145.00, 'chair', 'Natural linen upholstery.\nCheck fabric sample before dispatch.\nAssembly requested on site.', 'it', 'White glove', True),
            ('Kitchen · ceramic mugs', 24, 11.80, 'mug', '', 'de', 'Courier', True),
            ('Studio · wool rug', 1, 279.00, 'rug', 'Leave with the concierge.', 'fr', 'Courier', False),
            ('Library · walnut shelf', 3, 185.50, 'shelf', 'Second floor, no lift.\nCall Sofia 30 minutes before arrival.', 'it', 'White glove', True),
            ('Terrace · terracotta planters', 8, 32.00, 'planter', '', 'es', 'Collection', True),
            ('Guest room · cotton throws', 4, 48.75, 'throw', 'Choose the sand colour.', 'en', 'Courier', False),
            ('Entrance · round mirror', 2, 119.00, 'mirror', 'Fragile glass.\nKeep upright during transport.\nInspect the frame with the customer.', 'de', 'White glove', True),
            ('Home office · desk clock', 5, 26.40, 'clock', '', 'es', 'Courier', True),
            ('Lounge · oak side table', 2, 168.00, 'table', 'Include felt pads.', 'it', 'Collection', False),
        ]
        for i, (description, quantity, price, product, notes, country, delivery, enabled) in enumerate(orders):
            row = Bag()
            values = dict(description=description, quantity=quantity, price=price, product=product,
                          notes=notes, country=country, free_choice=delivery, enabled=enabled,
                          remote=orders[(i + 3) % len(orders)][3],
                          local_choice=['Sofia', 'Marco', 'Alice', 'Tom'][i % 4],
                          datasets=[None, 'gift', 'assembly,call', 'call', 'gift,pack', 'pack'][i % 6],
                          day=date(2026, 9, 15) + timedelta(days=i * 2),
                          hour=time([9, 10, 14, 16][i % 4], [0, 30, 15][i % 3]),
                          discount=[0, 5, 10, 15, 0, 20, 5, 0, 10, 5, 15, 0][i],
                          vertical=[30, 80, 50, 90, 20, 40, 75, 60, 25, 85, 45, 65][i],
                          color=['#b58b52', '#587568', '#8a6548', '#d0bfa5', '#7796b2', '#b47a67'][i % 6],
                          password=f'demo-{i + 1:02d}', popup_notes=notes)
            for field, value in values.items():
                row.set_item(field, value)
            data.set_item(f'r{i}', row)
        root.data('rows', data)
        struct = GridStruct()
        cells = struct.view().rows()
        cells.columnset('amounts', name='Order details', background_color='#44203e', color='white')
        cells.columnset('delivery', name='Delivery', background_color='#21633b', color='white')
        cells.columnset('options', name='Planning & options', background_color='#b66a0a', color='white')
        cells.cell('description', name='Description', width=250, edit=True)
        cells.cell('quantity', name='Qty', dtype='L', width=64, totalize=True, columnset='amounts', edit=dict(validate_min=1))
        cells.cell('price', name='Unit price', dtype='N', width=100, places=2, columnset='amounts', edit=dict(places=2))
        cells.cell('product', name='Product', width=120, columnset='amounts',
                   edit=dict(tag='dbSelect', rpcmethod='products', searchdelay=80))
        cells.cell('total', name='Total', dtype='N', width=110, places=2, totalize=True, columnset='amounts', formula='quantity * price', calculated=True)
        cells.cell('discounted_total', name='Net total', dtype='N', width=110, places=2, totalize=True, columnset='amounts',
                   formula='quantity * price * (1 - discount / 100)', calculated=True)
        for field, label, _value, dtype, width, editor in extra_columns:
            cells.cell(field, name=label, dtype=dtype, width=width, edit=editor,
                       columnset='delivery' if field in {'notes', 'country', 'free_choice'} else 'options')
        root.data('struct', struct)
        cells.cell('popup_notes', name='Notes · popup', width=260, columnset='options',
                   edit=dict(tag='textBoxArea', modal=True, height='110px',
                             validate_len='0:500'))
        root.data('autoHeight', True)
        root.data('showNumbers', True)
        root.data('frozen', 1)
        root.data('selectionMode', 'multiple')
        layout = root.borderContainer(height='calc(100vh - 40px)', width='100%')
        top = layout.contentPane(region='top', height='48px')
        toolbar = top.div(role='toolbar', aria_label='Grid tools', display='flex',
                          align_items='center', gap='8px', height='100%', padding='0 10px',
                          box_sizing='border-box', background='#eef2f6',
                          border='1px solid #c9d1d9', border_radius='6px 6px 0 0')
        toolbar.strong('📦 Studio orders', margin_right='auto', color='#283340')
        button_style = dict(border='1px solid #cbd5df', border_radius='5px',
                            background='white', padding='6px 10px', cursor='pointer',
                            font_size='13px', color='#344456')
        toolbar.button('↕️ Auto height', action="this.SET('autoHeight', !this.GET('autoHeight'));",
                       aria_pressed='^autoHeight', **button_style)
        toolbar.button('🔢 Row numbers', action="this.SET('showNumbers', !this.GET('showNumbers'));",
                       aria_pressed='^showNumbers', **button_style)
        toolbar.button('🧊 Freeze description', action="this.SET('frozen', this.GET('frozen') ? 0 : 1);",
                       **button_style)
        toolbar.filteringSelect(value='^selectionMode', values='none:No selection,single:Single row,multiple:Multiple rows', width='140px')
        toolbar.button('⚙️', title='Configure grid', **{'aria-label': 'Configure grid'},
                       action="this.SET('configurationOpen', true);", **button_style)
        center = layout.contentPane(region='center', height='100%', min_height='0', overflow='hidden')
        center.grid(datapath='orderGrid', store='^rows', structpath='struct', height='100%', width='100%',
                    selectionMode='^selectionMode', selfDragRows=True, selfDragColumns=True,
                    frozenColumns='^frozen', footer='Order totals', statusBar=True, statusTarget='grid-editing-status',
                    autoRowHeight='^autoHeight', rowHeaders='^showNumbers', rowResize='^showNumbers')
        bottom = layout.contentPane(region='bottom', height='46px')
        bottom.div(id='grid-editing-status', height='100%')
        self.configuration(root)

    def configuration(self, root):
        """Prototype: edit the actual structure attributes through normal bindings."""
        root.data('configurationOpen', False)
        palette = root.palette(value='^configurationOpen', title='Grid configuration',
                               keyboard=True, width='660px', height='490px',
                               left='120px', top='100px')
        palette.p('Changes apply immediately.', margin='0 0 12px', color='#667789')
        configuration = palette.quickGrid(value='^struct.view_0.rows_0', datamode='attr',
                                          height='390px', width='100%', rowHeaders=True,
                                          selectionMode='multiple', selfDragRows=True, selfDragColumns=True)
        configuration.column('field', name='Field', width=180)
        configuration.column('dtype', name='Type', width=55)
        configuration.column('name', name='Heading', width=200, edit=True)
        configuration.column('width', name='Width (px)', dtype='L', width=90,
                             edit=dict(validate_min=40))
        configuration.column('hidden', name='Hidden', dtype='B', width=70, edit=True)

    def editor_columns(self):
        """Every currently supported scalar field-editor family in one grid."""
        return [
            ('notes', 'Delivery notes', 'First line\nSecond line', None, 300,
             dict(tag='textBoxArea', rows=4, height='100px', maxHeight='160px', maxlength=1000)),
            ('country', 'Country', 'it', None, 100,
             dict(tag='filteringSelect', values='it:Italy,en:United Kingdom,fr:France,de:Germany,es:Spain')),
            ('free_choice', 'Delivery', 'Courier', None, 140,
             dict(tag='comboBox', values='Courier,Collection,White glove')),
            ('remote', 'Alternative', 'lamp', None, 130,
             dict(tag='remoteSelect', rpcmethod='products', searchdelay=80)),
            ('local_choice', 'Contact', 'Sofia', None, 115,
             dict(tag='callbackSelect', callback="""
                const rows = ['Sofia','Marco','Alice','Tom'].map(name=>({id:name,name}));
                return {rows:rows.filter(r => kw._id != null ? r.id === String(kw._id)
                    : r.name.toLowerCase().includes(String(kw._querystring || '').toLowerCase())),
                    identifier:'id',caption:'name'};
             """)),
            ('datasets', 'Services', None, None, 190,
             dict(tag='checkBoxText', popup=True, cols=1,
                  values='gift:Gift wrap,assembly:Assembly,call:Call ahead,pack:Extra packing')),
            ('enabled', 'Ready', True, 'B', 70, dict(tag='checkBox')),
            ('day', 'Delivery date', date(2026, 9, 14), 'D', 125,
             dict(tag='dateTextBox', locale='it-IT', symbolic=True)),
            ('hour', 'Time', time(14, 30), 'H', 85, dict(tag='timeTextBox')),
            ('discount', 'Discount %', 10, 'L', 130,
             dict(tag='horizontalSlider', min=0, max=100, step=5)),
            ('vertical', 'Priority', 40, 'L', 95,
             dict(tag='verticalSlider', min=0, max=100, step=5, height='110px')),
            ('color', 'Colour', '#336699', None, 100, dict(tag='colorpicker')),
            ('password', 'Access code (demo)', 'demo-only', None, 145, dict(tag='passwordbox')),
        ]

    @endpoint
    def products(self, _querystring='', _id=None):
        rows = [dict(id=code, caption=caption) for code, caption in [
            ('lamp', 'Brass reading lamp'), ('book', 'Sketchbook'), ('desk', 'Oak desk'),
            ('chair', 'Linen chair'), ('mug', 'Ceramic mug'), ('rug', 'Wool rug'),
            ('shelf', 'Walnut shelf'), ('planter', 'Terracotta planter'),
            ('throw', 'Cotton throw'), ('mirror', 'Round mirror'),
            ('clock', 'Desk clock'), ('table', 'Oak side table'),
        ]]
        rows = [r for r in rows if (r['id'] == _id if _id is not None
                                   else _querystring.lower() in r['caption'].lower())]
        return dict(rows=rows, identifier='id', caption='caption')
