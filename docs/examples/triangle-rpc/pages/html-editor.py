"""Try the shared Jodit HTML editor without writing a filesystem document."""
from gramlot.page import WebPage


class Page(WebPage):
    def main(self, root):
        root.h2('HTML editor — Jodit Community')
        root.p('Choose Rich text and unlock editing. This scratch document is not saved to disk.')
        root.gramlotIde(
            filename='sample.html', language='html', datapath='html_editor',
            height='calc(100vh - 120px)',
            content='''<!doctype html><html lang="en"><head><title>Editor sample</title>
<style>body{max-width:900px;margin:auto;color:#25354a}h1{color:#365e96}table{border-collapse:collapse}td,th{border:1px solid #cbd5e1;padding:10px}</style>
</head><body><h1>A complete HTML editor</h1>
<p>Select some text and try <strong>formatting</strong>, links or colours.</p>
<h2>Project notes</h2><ul><li>Shared Gramlot binding</li><li>Code and Preview views</li></ul>
<table><tbody><tr><th>Component</th><th>Status</th></tr><tr><td>HTML editor</td><td>Ready to try</td></tr></tbody></table>
<p>Add your next paragraph here.</p></body></html>''')
