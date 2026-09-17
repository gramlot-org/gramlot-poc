"""Edit the framework inventory through the shared Gramlot IDE."""
from pathlib import Path
from gramlot.filesystem import FileSystemPageMixin
from gramlot.page import WebPage


class Page(FileSystemPageMixin, WebPage):
    filesystem_roots = {'inventory': Path(__file__).resolve().parents[4] / 'gramlot_inventory'}
    filesystem_writable_roots = ('inventory',)

    def main(self, root):
        root.h2('Gramlot Inventory')
        root.p('Browse the catalogue. Markdown documents offer Raw, Preview and Rich text. Unlock a document to edit it.')
        root.gramlotIde(root='inventory', initialpath='README.md', writable=True,
                        datapath='inventory_editor', height='calc(100vh - 110px)',
                        style='--ide-tree-width:300px')
