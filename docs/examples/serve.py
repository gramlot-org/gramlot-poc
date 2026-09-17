# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Run all repository examples through the optional FastAPI adapter."""
import argparse
import os
from pathlib import Path
import subprocess
import sys

import gramlot_fastapi
from gramlot_fastapi.example_host import create_example_application

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
def create_app(preview: Path | None = None, *, genropy_application=None):
    """Pass framework checkout paths to the external example host."""
    preview = (preview or ROOT / 'build/teaching-preview').resolve()
    packaged_examples = Path(gramlot_fastapi.__file__).resolve().parent / '_examples'
    return create_example_application(
        framework_root=ROOT,
        examples_root=HERE,
        preview=preview,
        navigation_path=HERE / 'navigation.py',
        genropy_directory=packaged_examples / 'genropy',
        genropy_application=genropy_application,
    )


def build():
    env = dict(os.environ, PYTHONPATH=str(ROOT / 'src'), PYTHONDONTWRITEBYTECODE='1')
    for script in ('scripts/prepare_assets.py', 'scripts/build_browser_distribution.py',
                   'docs/examples/teaching/build_preview.py',
                   'docs/examples/gramlot-api-poc/build.py'):
        subprocess.run([sys.executable, str(ROOT / script)], cwd=ROOT, env=env, check=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--host', default='127.0.0.1')
    parser.add_argument('--port', default=8051, type=int)
    parser.add_argument('--no-build', action='store_true', help='Use the existing generated examples')
    parser.add_argument('--genropy-instance', help='Enable the optional legacy DB example')
    options = parser.parse_args()
    if not options.no_build:
        build()
    import uvicorn
    genropy_application = None
    if options.genropy_instance:
        from gnr.app.gnrapp import GnrApp
        genropy_application = GnrApp(options.genropy_instance)
    uvicorn.run(create_app(genropy_application=genropy_application), host=options.host, port=options.port)


if __name__ == '__main__':
    main()
