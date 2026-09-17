"""Browser verification for representative Python-authored showcase lessons."""
from importlib import util
import json
import os
from pathlib import Path
import subprocess

from gramlot.transport import to_tytx


ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / "src" / "gramlot" / "showcase" / "demo" / "pages"
PROBES = (
    "data_formula", "data_controller", "hello_binding", "dynamic_label_position", "input_widgets", "number_format", "formlet", "required_validation",
)


def load_page(name):
    spec = util.spec_from_file_location(f"showcase_{name}", PAGES / f"{name}.py")
    module = util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.Page()


def test_representative_lessons_in_browser_runtime():
    payload = {}
    for name in PROBES:
        page = load_page(name)
        builder = page.source_builder("showcase")
        live = builder.root.div(datapath="data_root")
        page._showcase_author_main(live)
        payload[name] = to_tytx(builder.source, "json")

    result = subprocess.run(
        ["node", "--experimental-loader", str(ROOT / "tests" / "lab_loader.mjs"),
         str(ROOT / "tests" / "showcase_lessons.mjs")],
        cwd=Path(os.environ["GRAMLOT_CLIENT_MODULES"]),
        input=json.dumps(payload), text=True, capture_output=True, timeout=30,
    )
    assert result.returncode == 0, result.stderr
    assert f"Showcase runtime lessons: {len(payload)} passed." in result.stdout
