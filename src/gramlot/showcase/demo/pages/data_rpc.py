from gramlot.page import endpoint
from gramlot.showcase import ShowcasePage


class Page(ShowcasePage):
    showcase_source_methods = ('triangle_area',)

    @endpoint
    def triangle_area(self, base: float, height: float) -> float:
        if base < 0 or height < 0:
            raise ValueError('Dimensions must be non-negative.')
        return base * height / 2

    def main(self, root):
        root.data('.base', 8)
        root.data('.height', 5)
        root.data('.status', 'Waiting for the server')
        root.h1('Call Python with dataRpc')
        root.p('These inputs call a real Python endpoint. No database is needed; a server connection is required.', class_='lesson-lead')
        fields = root.formlet(col_min_width='220px', gap='14px', class_='lesson-card')
        fields.numberTextBox(value='^.base', lbl='Base', min=0)
        fields.numberTextBox(value='^.height', lbl='Height', min=0)
        root.dataRpc(
            '.area', self.triangle_area, base='^.base', height='^.height', _on_start=True,
            _onCalling="this.SET('.status', 'Calling Python…');",
            _onResult="this.SET('.status', 'Response received');",
            _onError="this.SET('.status', 'Request failed: ' + error.message);",
        )
        preview = root.div(class_='lesson-preview')
        preview.h2('^.area', mask='Triangle area: %s')
        preview.p('^.status')
        root.p('dataRpc sends parameters and stores the response in Data. The endpoint is shown below main in Source.', class_='lesson-note')
