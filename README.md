# Gramlot

> **Being phased out:** `gramlot-poc` is being progressively retired. Its material
> will be cleaned up, reorganized and transferred in reviewed increments to
> [Gramlot](https://github.com/gramlot-org/gramlot), the consolidated framework.
> This repository remains available for experiments, existing examples and tests
> during the transition.

**Living laboratory:** this repository is `gramlot-poc`. Existing pages, tests,
examples and new experiments remain active here. The clean consolidated product
is [gramlot-org/gramlot](https://github.com/gramlot-org/gramlot).
Python/npm package names remain unchanged for existing consumers.
See the [consolidation guide](versione2/docs/00-consolidating-gramlot.md).


<img src="https://raw.githubusercontent.com/genropy/gramlot/main/assets/gramlot-logo.png" alt="Gramlot logo" width="180">

**GRAMmar for Live Object Trees**

Describe interfaces in Python and render them with the Gramlot JavaScript runtime.
The first alpha includes typed Source transport, widgets and host-independent
page authoring. Server adapters are maintained in separate integration packages.

## FastAPI integration

Create `pages/hello.py` in your application directory:

```python
from genro_toolbox import metadata
from gramlot.page import WebPage

@metadata(title="Hello")
class Page(WebPage):
    """Display a greeting."""

    def main(self, root):
        root.h1("Hello World")
```

Install the sibling development checkouts and start the application:

```sh
python -m pip install -e .
python -m pip install -e ../gramlot-fastapi
gramlot-fastapi serve /path/to/my_app
```

Open `http://127.0.0.1:8000/page/`. No `main.py` or JSON registry is required.
For custom servers, use `GramlotApplication` or `mount_gramlot` from
`gramlot_fastapi`. The legacy `gramlot fastapi serve` command and contrib imports
delegate to that package during the transition.

## Documentation

[Read the English manual](https://gramlot.readthedocs.io/en/latest/).

- [JavaScript only: browser ZIP and static hosting](docs/guides/javascript-only.md)
- [FastAPI integration](https://github.com/gramlot-org/gramlot-fastapi)
- [Pages and reserved metadata](docs/source/reference/pages.rst)
- [Documentation development](docs/development/building-docs.rst)
- [Progressive Python/JavaScript teaching preview](docs/examples/teaching/README.md)
- [Building Gramlot components](docs/source/guide/components.rst)

The current source version is **0.1.5**, not yet published. The next development
target is 0.2.0 beta.

[Gramlot 0.1.0a1 is available on PyPI](https://pypi.org/project/gramlot/0.1.0a1/). See
[build and release instructions](docs/release.md).

## Development

```sh
npm --prefix js/dom ci --ignore-scripts
python scripts/prepare_assets.py
python scripts/build_browser_distribution.py
python scripts/prepare_test_client.py
python -m pip install '.[test]' httpx
GRAMLOT_CLIENT_MODULES="$PWD/build/test-client" python -m pytest -q
npm --prefix js/dom test
```

Run the two asset commands in order. `prepare_assets.py` refreshes source-mode
resources and removes any previous compiled payload; `build_browser_distribution.py`
then creates the manifest-backed runtime required by tests and package builds.

Documentation builds independently from runtime packages. See `docs/requirements.txt`.
The browser build writes the same manifest-driven payload to the Python wheel and
to `build/browser-distributions/gramlot-browser-<version>-<build-id>.zip`.
Consumers deploy that payload directly; installing Gramlot never invokes Node.
Gramlot is licensed under Apache 2.0.
