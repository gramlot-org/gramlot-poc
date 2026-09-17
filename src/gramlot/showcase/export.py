# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Export the shared Python showcase for a plain static HTTP server."""
from __future__ import annotations

import argparse
from html import escape
from importlib.resources import files
import json
from pathlib import Path
import shutil

from gramlot.builder import GramlotBuilder
from gramlot.hosting import PageRegistry
from gramlot.transport import to_tytx
from gramlot.showcase import ShowcaseCatalog, ShowcaseShellPage, get_showcase_directory


def _json(value):
    return json.dumps(value, ensure_ascii=False).replace('<', '\\u003c')


def export_showcase(destination: str | Path) -> Path:
    """Write a new static directory; never overwrite an existing export."""
    output = Path(destination).expanduser().resolve()
    if output.exists():
        raise FileExistsError(f'Export destination already exists: {output}')
    runtime = Path(str(files('gramlot').joinpath('resources/browser')))
    manifest = json.loads((runtime / 'manifest.json').read_text())
    registry = PageRegistry(get_showcase_directory())
    documents = {}
    imports = {key: './runtime/' + value for key, value in manifest['entryPoints'].items()}
    for name, page_class in registry.pages.items():
        page = page_class()
        if isinstance(page, ShowcaseShellPage):
            page.catalog = ShowcaseCatalog(page.catalog.lessons, default=page.catalog.default,
                                            page_url='{id}.html')
            page.host_label = 'Static · Python'
        builder = GramlotBuilder('main')
        page.main(builder.root)
        startup = {'source': to_tytx(builder.source, transport='json'),
                   'inspector': page.source_inspection}
        documents[name] = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(getattr(page, 'title', name))}</title>
<script type="importmap">{_json({'imports': imports})}</script></head>
<body><div id="root"></div><p id="error" role="alert" hidden></p>
<script type="application/json" id="startup">{_json(startup)}</script>
<script type="module" src="./bootstrap.js"></script></body></html>'''
    output.mkdir(parents=True)
    shutil.copytree(runtime, output / 'runtime')
    for name, document in documents.items():
        (output / f'{name}.html').write_text(document, encoding='utf-8')
    (output / 'bootstrap.js').write_text('''// Shared static host: lesson behavior remains in Gramlot Source.
import {Application} from 'gramlot-dom';
import {GramlotBuilder} from 'gramlot-builder';
import {fromTytx} from 'genro-tytx';
const host = document.getElementById('root');
try {
    const startup = JSON.parse(document.getElementById('startup').textContent);
    const builder = new GramlotBuilder('main');
    builder.loadSource(fromTytx(startup.source, 'json'));
    const app = new Application(host, builder, {inspector: startup.inspector});
    window.addEventListener('pagehide', event => { if (!event.persisted) app.dispose(); });
} catch (error) {
    const message = document.getElementById('error');
    message.hidden = false;
    message.textContent = error.message;
}
''', encoding='utf-8')
    (output / 'README.txt').write_text(
        'Serve this directory with a static HTTP server and open index.html.\n'
        'No Python application server or database is needed. Browser ES modules\n'
        'require HTTP; file:// is not a supported delivery mode. CodeMirror\n'
        'loads its pinned CDN modules and keeps a text fallback when unavailable.\n',
        encoding='utf-8',
    )
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('destination', type=Path)
    args = parser.parse_args()
    print(export_showcase(args.destination))


if __name__ == '__main__':
    main()
