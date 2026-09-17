# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Assemble browser resources after npm ci in js/dom; never fetch at build time."""
from hashlib import sha256
import json
from pathlib import Path
import shutil
import subprocess


class AssetPreparation:
    def run(self):
        root = Path(__file__).resolve().parents[1]
        modules = root / "js/dom/node_modules"
        target = root / "src/gramlot/resources"
        copies = {
            root / "js/dom/src": "gramlot-dom/src",
            root / "js/pages/src": "pages",
            modules / "genro-bag-js/src": "genro-bag-js/src",
            modules / "genro-tytx/js/src": "genro-tytx/js/src",
            modules / "decimal.js": "decimal.js",
            modules / "@msgpack/msgpack/dist.esm": "genro-tytx/js/node_modules/@msgpack/msgpack/dist.esm",
        }
        for source in copies:
            if not source.is_dir():
                raise SystemExit(f"Missing {source}; run npm ci --ignore-scripts in js/dom first")
        if target.exists():
            shutil.rmtree(target)
        for source, destination in copies.items():
            shutil.copytree(source, target / destination)
        # Keep native ESM source serving self-contained as well as the final bundle.
        subprocess.run([str(modules / '.bin/esbuild'),
                        str(root / 'js/dom/src/charts/d3.js'), '--bundle', '--format=esm',
                        '--minify', '--outfile=' + str(target / 'gramlot-dom/src/charts/d3.js')], check=True)
        # Editor dependencies are lazy browser chunks in both development source
        # serving and the final distribution. Build them together so CodeMirror
        # and ProseMirror each keep one shared module identity across extensions.
        subprocess.run([str(modules / '.bin/esbuild'),
                        str(root / 'js/dom/src/editor-dependencies.js'),
                        '--bundle', '--splitting', '--format=esm', '--platform=browser',
                        '--target=es2022', '--minify',
                        '--outdir=' + str(target / 'gramlot-dom/src'),
                        '--chunk-names=editor-dependencies/[name]-[hash]'], check=True)
        jodit_css = (modules / 'jodit/es2021/jodit.min.css').read_text()
        (target / 'gramlot-dom/src/collections/jodit-style.js').write_text(
            '// Generated from jodit 4.13.9 by scripts/prepare_assets.py.\n'
            f'export default {json.dumps(jodit_css)};\n'
        )
        # Build the inspector from its authoritative Python recipe, not a second JS UI.
        import sys
        sys.path.insert(0, str(root / "src"))
        from gramlot.builder import GramlotBuilder
        from gramlot.inspector import build_inspector
        from gramlot.transport import to_tytx
        from genro_builders.builder import SourceBag
        from genro_tytx import from_tytx

        def verify_source_types(original, decoded, path="root"):
            """Fail before publishing if the encoder erases a structural branch type."""
            if isinstance(original, SourceBag) and not isinstance(decoded, SourceBag):
                raise SystemExit(
                    f"Recipe compiler lost SourceBag typing at {path}; "
                    "install the project dependencies from pyproject.toml"
                )
            if not isinstance(original, SourceBag):
                return
            for node in original:
                value = node.value
                if isinstance(value, SourceBag):
                    verify_source_types(value, decoded.get_item(node.label), f"{path}.{node.label}")

        def source_branch_count(source):
            return 1 + sum(
                source_branch_count(node.value)
                for node in source
                if isinstance(node.value, SourceBag)
            )

        for presentation, filename in (("floating", "inspector.tytx"),
                                       ("embedded", "inspector-embedded.tytx")):
            inspector = GramlotBuilder()
            build_inspector(inspector.root, presentation=presentation)
            encoded = to_tytx(inspector.source, "json")
            if encoded.count("::XS") != source_branch_count(inspector.source):
                raise SystemExit(
                    f"Recipe compiler lost SourceBag markers in {filename}; "
                    "install the project dependencies from pyproject.toml"
                )
            verify_source_types(inspector.source, from_tytx(encoded, transport="json"))
            (target / "pages" / filename).write_text(encoded)
        for package in ("genro-bag-js", "genro-tytx", "@msgpack/msgpack", "decimal.js",
                        "d3-scale", "d3-selection", "d3-axis", "d3-array", "d3-color",
                        "d3-format", "d3-interpolate", "d3-time", "d3-time-format", "internmap",
                        "d3-shape", "d3-path",
                        "codemirror", "@codemirror/autocomplete", "@codemirror/commands",
                        "@codemirror/lang-css", "@codemirror/lang-javascript",
                        "@codemirror/lang-python", "@codemirror/lang-xml",
                        "@codemirror/language", "@codemirror/lint", "@codemirror/search",
                        "@codemirror/state", "@codemirror/theme-one-dark", "@codemirror/view",
                        "@lezer/common", "@lezer/css", "@lezer/highlight", "@lezer/javascript",
                        "@lezer/lr", "@lezer/python", "@lezer/xml",
                        "@marijn/find-cluster-break", "crelt", "style-mod", "w3c-keyname",
                        "prosemirror-commands", "prosemirror-history", "prosemirror-keymap",
                        "prosemirror-markdown", "prosemirror-model", "prosemirror-schema-basic",
                        "prosemirror-state", "prosemirror-transform", "prosemirror-view",
                        "orderedmap", "rope-sequence", "markdown-it",
                        "markdown-it/node_modules/entities", "linkify-it", "mdurl",
                        "punycode.js", "uc.micro", "highlight.js", "jodit"):
            source = modules / package
            destination = target / "licenses" / package
            destination.mkdir(parents=True)
            shutil.copy2(source / "package.json", destination / "package.json")
            for name in ("LICENSE", "LICENSE.txt", "LICENSE-MIT.txt", "LICENCE.md", "NOTICE"):
                if (source / name).is_file():
                    shutil.copy2(source / name, destination / name)
            if not any((destination / name).exists() for name in
                       ("LICENSE", "LICENSE.txt", "LICENSE-MIT.txt", "LICENCE.md")):
                metadata = json.loads((source / "package.json").read_text())
                if metadata["license"] != "Apache-2.0":
                    raise SystemExit(f"Missing license text for {package}")
                shutil.copy2(root / "LICENSE", destination / "LICENSE")
        paths = [p for folder in (root / "js/dom/src", root / "js/pages/src")
                 for p in folder.rglob('*') if p.is_file()]
        paths += [p for p in (root / "src/gramlot/grammar").rglob("*.py") if p.is_file()]
        paths += [p for p in (root / "src/gramlot/contrib/_shared/frontend").rglob('*')
                  if p.is_file()]
        paths += [root / "js/dom/package.json", root / "js/dom/package-lock.json",
                  root / "src/gramlot/inspector.py", root / "src/gramlot/builder.py",
                  root / "src/gramlot/transport.py",
                  root / "scripts/build_browser_bundle.mjs",
                  root / "scripts/build_browser_distribution.py"]
        manifest = {
            "sources": {str(p.relative_to(root)): sha256(p.read_bytes()).hexdigest() for p in sorted(paths)},
            "assets": {str(p.relative_to(target)): sha256(p.read_bytes()).hexdigest()
                       for p in sorted(target.rglob('*')) if p.is_file()},
        }
        (target / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
        print(f"Prepared {len(manifest['assets'])} browser resource files")


if __name__ == "__main__":
    AssetPreparation().run()
