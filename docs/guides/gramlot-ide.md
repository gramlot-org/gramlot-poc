# GramlotIde

`gramlotIde` is a reusable Web Component in the `labEditors` collection. Its
implementation composes FileSystemTree and CodeMirror. Python applications
declare it without application-level DOM, event wiring or HTTP code.

```python
from gramlot.page import WebPage

class Page(WebPage):
    def main(self, root):
        root.gramlotIde(content='print("Hello")', filename='scratch.py')
```

This standalone mode does not request a server. Editing lives in the Data Bag;
filesystem Save is unavailable. To connect an existing directory:

```python
from pathlib import Path
from gramlot.filesystem import FileSystemPageMixin
from gramlot.page import WebPage

class Page(FileSystemPageMixin, WebPage):
    filesystem_roots = {'project': Path('/srv/my-project')}
    filesystem_writable_roots = ('project',)

    def main(self, root):
        root.gramlotIde(root='project', initialpath='main.py',
                        writable=True, datapath='ide', height='550px')
```

Declare only workspaces the application intends to expose. The provider and UI
both gate Save. Omitting filesystem_writable_roots leaves the server read-only;
omitting writable leaves the UI without Save even on a writable provider.
Editing in the browser remains possible in either case.

## Interaction and state

Double-click a file, or press Enter on its tree row, to open it. Tabs identify
documents by workspace-relative path. Opening an existing tab preserves its
edits. A dot marks unsaved changes. Closing a dirty document requires an explicit
discard or cancellation; closing a document with an operation pending is refused.
The file-tree splitter supports dragging and left/right arrows.

The component's datapath contains `workspace`, `active` and `documents`.
Each document is a Bag with path, content, saved, language, revision and writable.
Document keys encode UTF-8 paths, avoiding dots being interpreted as Bag paths.
Python supplies an isolated default datapath; explicit scopes must not be shared
by different IDE instances. Replacing the component leaves document Data intact
and cancels its owned RPC requests. A late response cannot reinstall a document.
Save captures the submitted text: further typing during the request remains dirty.
Data is memory-resident, not localStorage; reloading a page can lose unsaved work.
The component installs the browser's ordinary unsaved-changes navigation guard.

## Provider contract

Defaults can be replaced by treemethod, readmethod and savemethod:

| Endpoint | Request | Result |
| --- | --- | --- |
| directory_tree | root, optional path | Bag with lazy RPC directory descriptors |
| document_read | root, path | content, language, revision, writable |
| document_save | root, path, content, revision | new revision |

The supplied provider reads existing UTF-8 text files up to 2 MiB, rejects NUL
bytes, traversal and symbolic links, and does not execute document content.
Save compares a SHA-256 content revision before atomic replacement and serializes
writes within the server process. A conflict or other error retains local edits.
This is not a multi-process transaction or a lock against external editors;
production providers may implement stronger version and access policies.
Use application-controlled roots, as described in the directory provider guide.

## Current limits and verification

This is the first IDE component, not a complete legacy gnride port. It edits
existing files; create/delete/rename, execution, debugging and preview are absent.
HTML opens as source with XML highlighting; visual HTML editing needs a separate
rich-text component and is not implemented. Markdown and unknown text use plain
text editing. CodeMirror uses the existing pinned external modules, falling back
to a textarea if those modules cannot load.

The minimal parameter reference is generated from the component catalogue.
`/page/gramlot-ide/` uses an isolated temporary workspace with writable sample
files, never the framework repository itself. Browser verification covers open,
edit, Save, switching tabs, retained edits and dirty-close cancellation. Model
tests cover edits during Save, failures, late responses and standalone Data;
provider tests cover permission checks, revisions and traversal.

## Shared tabs and local development view

The IDE uses the framework tabContainer/tab components. Document panes declare
closable; the shared tab header shows its small close control on hover or focus.
Ordinary tabs without closable have no close control. Tab captions use the file
name; their tooltip contains the full relative path. FileSystemTree uses small
monochrome SVG folder/file glyphs with extension-specific markings.

The autonomous application in `tools/gramlot-ide`, mounted at `/ide/index/`,
has no example navigation or demonstration frame. The old
`/page/gramlot-ide-local/` address redirects there. A borderContainer header
describes the tool and provides a wide folder-path textBox. The initial path
and workspace are empty. Committing a path loads its workspace through @source;
clearing it empties the center. Each folder has a separate Data namespace.
This local-only application accepts absolute paths (including `~` expansion)
and permits revision-checked Save after the user unlocks a document. Generic filesystem pages retain named-root
allowlists. The example at `/page/gramlot-ide/` now uses the same folder-path
workflow, with its Python source visible; it replaces the temporary-file demo.
Its source is `docs/examples/triangle-rpc/pages/gramlot-ide.py`. `--ide-tree-width` adjusts the initial file-tree width.

Complex components may construct Gramlot Source with the JavaScript builder.
The current IDE reuses framework widgets but still assembles its internal shell
in the Web Component; a full Source-based composition API is not implemented by
this styling change.

Each document pane contains a borderContainer with its own top toolbar. Files
start read-only; the crossed-pencil button unlocks editing for that document
and reveals Save and Revert. Relocking preserves pending edits. Revert restores
the last successfully saved text (it does not reload external disk changes).
Editor instances and lock state survive tab changes. Save remains subject to
server permissions and revision checks; generic read-only providers stay read-only.

### HTML views — Jodit Community

HTML documents have Code, Preview and Rich text panes sharing the same Data Bag,
editing lock, Save and Revert. Rich text uses Jodit Community 4.13.9, loaded on
demand from the packaged local browser assets (matching JavaScript and CSS
versions). Loading failure leaves Code available and displays an error. The existing `gnr-proseeditor` runtime tag
is retained for compatibility; its HTML implementation is now Jodit.

The toolbar includes headings, fonts, sizes, colours, inline formatting, lists,
indentation, alignment, links, images, tables, search, undo/redo and fullscreen.
Images uploaded in this prototype are embedded as base64 in the document; no
upload server is configured. External image URLs are not fetched by the rich
iframe. Markdown continues to use its separate editor.

For full HTML pages, Gramlot preserves the original doctype, head and body
attributes and edits the body. Embedded head styles are applied inside the
isolated editor iframe. Scripts, embedded documents and other protected nodes
appear as labelled placeholders and are restored from the original parsed tree
when serializing. Removing or duplicating such a placeholder rejects that edit
with an error and restores the previous editor content; use Code for those changes. Event attributes are removed from the
editing copy and restored on their surviving elements. The iframe CSP blocks
page scripts, forms and external resources. DOM serialization and Jodit may
normalize body markup: this is a rich content editor, not a lossless page builder.
Opening or unlocking alone does not change the document value.

The Python-authored `/page/html-editor/` example offers an unsaved scratch HTML
document to try the toolbar, Code synchronization and Revert without disk writes.
Jodit Community is MIT licensed; retain its copyright and permission notice.
Validation covers shared Code synchronization, read-only lock and Revert,
full-document preservation, selection formatting and insertion of a 2×2 table.
The toolbar lives in the component shadow tree, but Jodit is not configured
with that ShadowRoot: its editable content lives in an iframe. This keeps both
text selection and table hit testing in the editing document. Popup CSS
is installed in both the component shadow tree and the owner document.
No Pro plugins are included. See [upstream license](https://github.com/xdan/jodit/blob/4.13.9/LICENSE.txt)
and [source](https://github.com/xdan/jodit).

## Host-rendered preview

`previewmethod` optionally names an RPC endpoint accepting `root`, `path` and
`content` (the current unsaved editor text) and returning `{html: string}`.
Clicking Preview requests that rendering; without a provider, the existing
immediate HTML preview remains unchanged. Rendering does not Save the document.
Stale responses after edits, disposal or a newer preview request are ignored.
The result stays in the existing sandboxed iframe; scripts and forms remain
inactive. Relative resources can be resolved by a provider-supplied base URL.

## Markdown and the inventory workspace

The master example application includes **Gramlot Inventory** at
`/page/gramlot-inventory/`. Its ordinary Python page configures the named
`inventory` filesystem root to the framework's `gramlot_inventory` directory
and initially opens `README.md`. Save uses the existing revision-checked
filesystem endpoint and requires unlocking the document.

The shared IDE now gives `.md` and `.markdown` files three views:

- **Raw:** CodeMirror editing of the stored Markdown text.
- **Preview:** rendered Markdown in a sandboxed iframe, refreshed from the current
  document, including unsaved changes. Embedded HTML is escaped; scripts and
  external resources are blocked. Relative document links do not yet navigate
  the IDE workspace: use the file tree to open another card.
- **Rich text:** ProseMirror editing of ordinary headings, paragraphs, lists and
  inline formatting. Its value is serialized back to Markdown, never HTML.
  Rich edits may normalize Markdown whitespace and marker style.

Tables, embedded HTML and unsupported inline strikethrough are preserved as
opaque source-backed blocks in the rich view and edited in Raw. Documents with
reference-link definitions or YAML front matter remain opaque in rich mode to
avoid dropping syntax outside the supported schema. This is not a complete
visual editor for every Markdown extension. Opening a view alone does not
serialize or mark the document dirty.

Markdown dependencies load on demand from pinned esm.sh URLs, following the
existing editor integration pattern. If loading fails, Raw stays usable.
The implementation uses [ProseMirror Markdown](https://github.com/ProseMirror/prosemirror-markdown)
for structured parsing/serialization and [markdown-it](https://github.com/markdown-it/markdown-it)
for rendering. The legacy proseMirrorEditor exposes HTML/JSON and Markdown-like
input rules; it does not establish a Markdown file round-trip contract.

Verification covers the shared IDE's document/toolbar/HTML regressions plus
Markdown lock, rich-to-Raw state synchronization and Revert. Browser checks
confirmed navigation, preview rendering, visual edits and reverting without
saving inventory changes.

### Table editing plugins

The local Jodit loader explicitly includes `select`, `select-cells`,
`resize-cells` and `table-keyboard-navigation`. Click a cell while editing is
unlocked to open commands for rows, columns, merging, splitting and deletion.
Browser validation confirmed inserting a row below and synchronizing the extra
`tr` and cells into the IDE Code view. Revert restores the original document.
