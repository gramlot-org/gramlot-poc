# 015 · Shared teaching showcase

This living PoC owns `gramlot.showcase`. It is not yet an accepted clean-core port.

## Authoring

Subclass `ShowcasePage` and write only `main(self, root)`. The base class supplies
an example container identified by `source_root`, with `datapath='data_root'`.
Use local declarations such as `root.data('.name', 'Ada')` and pointers
`^.name`. The base class initializes the Data Bag, prepares the surrounding
workspace and displays the exact original main method in CodeMirror. No separate
illustrative source snippet is maintained. The wrapper preserves the authoring
signature and source metadata.

The Inspector receives independent `data_root` and `source_root` origins. Tools,
source-viewer state and navigation are outside those branches. Child iframe
applications remain independent; scoped inspection is not a security boundary.

## Catalog and hosts

`ShowcaseLesson` describes an ID, title, group path, global order, short description
and capabilities. `ShowcaseCatalog` validates IDs/defaults, orders lessons and
provides a URL template or callable. `ShowcaseShellPage` builds a nested tree and
persistent closable iframe tabs with ordinary Gramlot Source declarations.

`get_showcase_directory()` supplies packaged page files to existing Python host
registries. FastAPI consumes this directory directly; it does not copy lessons or
visual resources. Other Python hosts can consume the same directory, but require
individual integration verification. Node.js lessons and JavaScript standalone
remain pending; this package does not claim cross-language equivalence.

## Static delivery

`python -m gramlot.showcase.export /path/to/new-directory` compiles the same Python
lessons and shell into a new directory of HTML and browser assets. Serve the output
using a plain static HTTP server. It needs no Python application server or database
after generation. Direct `file://` loading is not a supported mode because the
browser uses ES modules. The exporter refuses to overwrite an existing directory.
CodeMirror uses the pinned CDN provider with its text fallback when unavailable.

## Teaching and limits

English lessons introduce one concept at a time, starting with Hello world and
binding, then labels, widgets, display formatting, grouping, formlet and validation.
Widget spelling follows actual runtime APIs: `labledBox`, `groupBox`, `colorpicker`.
A display `mask` interpolates text and is not an input mask. Fields generally commit
on change/blur; lessons must not imply immediate per-keystroke updates by default.

Tests cover shared Source/Inspector ownership and original-source fidelity. Runtime
probes exercise representative dynamic attributes and inputs; adapter tests request
every packaged page. Published packages and untested host modes are not implied.

The right sidebar starts closed on every lesson. Its top-edge toggle opens the tools; hiding it releases both the region and its splitter so the live example fills the available width.

The opening lessons are top-level tree leaves. The optional right sidebar contains Source and an embedded Inspector in separate tabs. Top-edge sidebar icons control navigation and the per-example tools; the Inspector remains scoped to that iframe.

The workshop contains eleven pages: overview, Hello world, live greeting,
reactive labels, input widgets, formatting, formlets, validation, dataFormula, dataController, and dataRpc. Related
widgets share practical forms. A toolbar below the header controls the left
navigation and right Source/Inspector pane, which starts open. At most six
lesson tabs remain open; opening another evicts the oldest opened tab.
The active iframe receives tool visibility through the shared same-origin
`frameChannel` component, including when its recipe initializes after load.

Showcase formlets use `col_min_width` (280px for overview cards, 220px for
fields), so their columns adapt to the available panel width. A numeric
`columns` declaration instead requests a fixed number of columns.

The Data and logic group adds dataFormula, dataController and dataRpc lessons.
The RPC lesson calls a real decorated Python endpoint without a database and
requires server hosting; static hosting cannot execute that endpoint. Its Source
viewer includes the endpoint method after main through `showcase_source_methods`.
