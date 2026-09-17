from gramlot.showcase import ShowcaseShellPage
from gramlot.showcase.demo_catalog import CATALOG


class Page(ShowcaseShellPage):
    catalog = CATALOG
    host_label = 'Gramlot'
