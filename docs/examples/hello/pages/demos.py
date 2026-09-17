# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Presentation entry point for the three local demo sites."""
from genro_toolbox import metadata
from gramlot.page import WebPage


@metadata(title='Gramlot demos')
class Page(WebPage):
    def main(self, root):
        root.styleSheet('''
            body { margin:0; background:#f3f6fb; color:#172d43;
                   font:16px/1.6 system-ui,sans-serif; }
            .demo-home { max-width:980px; margin:0 auto; padding:64px 32px; }
            .demo-kicker { color:#356c9d; font-weight:700; letter-spacing:.14em;
                           font-size:12px; text-transform:uppercase; }
            .demo-home h1 { font-size:clamp(32px,5vw,52px); line-height:1.1;
                            margin:16px 0; letter-spacing:-.04em; }
            .demo-intro { color:#5b6d80; margin-bottom:36px; }
            .demo-links { display:grid; gap:18px; grid-template-columns:repeat(3,1fr); }
            .demo-card { display:flex; flex-direction:column; text-decoration:none;
                         color:inherit; background:white; border:1px solid #dce5ef;
                         border-radius:18px; padding:26px; min-height:210px;
                         box-shadow:0 6px 22px #17304708; transition:transform .15s; }
            .demo-card:hover { transform:translateY(-4px); border-color:#5282af; }
            .demo-card:focus-visible { outline:3px solid #377bb5; outline-offset:4px; }
            .demo-card h2 { margin:14px 0 8px; font-size:25px; }
            .demo-card p { color:#5b6d80; font-size:15px; margin:0 0 24px; }
            .demo-port { color:#62788e; font-size:12px; font-weight:600; }
            .demo-open { margin-top:auto; color:#23649c; font-weight:700; }
            .demo-footnote { margin-top:28px; color:#62788e; font-size:13px; }
            @media(max-width:800px) { .demo-links { grid-template-columns:1fr; }
                                     .demo-home { padding:32px 20px; }
                                     .demo-card { min-height:150px; } }
        ''')
        page = root.div(class_='demo-home')
        page.div('Three sites · One framework', class_='demo-kicker')
        page.h1('Gramlot demos')
        page.p('Choose a demo. Each site opens in a new tab.', class_='demo-intro')
        cards = page.div(class_='demo-links')
        self.card(cards, 'Gramlot', 'Tutorials, gallery, builder and Genropy database examples.',
                  'http://127.0.0.1:8051/', '8051')
        self.card(cards, 'Django', 'Explore the Bakery application with Gramlot pages.',
                  'http://127.0.0.1:8063/products/explore/', '8063')
        self.card(cards, 'Rosetta', 'Compare Gramlot, React, Vue and NiceGUI side by side.',
                  'http://127.0.0.1:8026/', '8026')
        page.p().a('Griglia editabile completa →', href='/grid-editor/playground/', target='_top')
        page.p().a('I sette scenari di integrazione →', href='/hello/scenarios/', target='_top')
        page.p('Local presentation workspace · Keep the three demo servers running.',
               class_='demo-footnote')

    def card(self, parent, title, description, url, port):
        card = parent.a(href=url, target='_blank', rel='noopener', class_='demo-card')
        card.span(f'LOCALHOST : {port}', class_='demo-port')
        card.h2(title)
        card.p(description)
        card.span('Open demo ↗', class_='demo-open')
