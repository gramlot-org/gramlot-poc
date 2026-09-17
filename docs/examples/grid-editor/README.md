# Resident grid editor experiment

Local prototype, 2026-09-13. This is an experiment in hosting ordinary Gramlot
controls inside an editable grid, not a complete GridEditor migration.

Run from the repository after preparing the browser distribution:

```sh
.venv/bin/gramlot-fastapi serve docs/examples/grid-editor --port 8079
```

Open http://127.0.0.1:8079/page/index/ . The page is authored in Python; its
source is displayed next to the live example. The dbSelect uses a small Python
endpoint with fictional products, without a database dependency.

## Implemented behavior

### Column groups and automatic footer

The playground uses `rows.columnset(code, name=...)` and
`cell(..., columnset=code)`. Alternatively, declare cells directly on the group:

```python
rows = struct.view().rows()
amounts = rows.columnset('amounts', name='Amounts', cells_width=100)
amounts.cell('quantity', dtype='L', totalize=True)
amounts.cell('total', dtype='N', places=2, totalize=True)
pane.grid(store='^rows', structpath='struct', footer='Order totals')
```

`columns=[dict(field=..., ...)]` is also supported. Group cells remain in the
flat row structure with `columnset` metadata under `info.columnsets`. Visible
contiguous runs form header spans, split at frozen-column boundaries. Header
groups and footer cells share widths, resize previews and horizontal scrolling.
Group labels are centered coloured bands with rounded upper corners; ungrouped
columns leave the band blank. Legacy-style `background_color`, `color`,
`border_radius` and `_class` on `columnset(...)` customize their presentation.

`footer=True` or a title string enables an automatic footer. `totalize=True`
adds valid numeric/Boolean values over the resident store keys, including
calculated columns. Decimal inputs retain exact arithmetic. Totals react to
confirmed edits and external writes, insertion and removal. They are available
in `grid.bands.totals` and `.totalize.<field>` under the grid datapath (or
`totalize.<field>` at the application root when no relative scope exists).
A string `totalize` is an explicit Data path. `footer_value` accepts a literal
and `footer_format` overrides the column format.

This first slice does not implement `grid.footer().item(...)`, multiple custom
footer rows, nested group levels, collapsing groups or server-wide totals over
partially loaded collections. Custom footer declarations can be added as another
band data source without changing the flat column/group transport contract.
The data footer is separate from the bottom status toolbar.

`autoRowHeight=True` enables measured multiline row heights; the standalone
playground enables it. `textBoxArea` columns preserve line breaks and wrap to
their column width. `rowHeight` remains the minimum. The active textarea grows
with its content, expanding the whole row; confirming shorter text shrinks it.
Virtualization and keyboard scrolling use cumulative row offsets. Measurements
are cached by font, width and formatted text, and are refreshed after data or
width changes. This supports resident rows and text-based multiline cells;
arbitrary rich content and remote variable-height pages are outside this slice.

The playground also enables `rowHeaders=True` and `rowResize=True`. Row numbers
follow the current ordering and remain pinned during horizontal scrolling.
Drag the bottom edge of a row heading to resize it; double-click resets the
automatic height. A focused resize handle supports Up/Down (10px increments)
and Home (automatic height). Escape cancels a drag. Manual heights are local
viewport geometry keyed by row identity, retained across redraws and discarded
on store replacement. They override automatic sizing until reset.

Use `edit=dict(tag='textBoxArea', maxHeight='160px')` to cap automatic multiline
height. This first version accepts positive pixel values (number or `px` string).
Long content scrolls inside both the textarea and the displayed cell. A smaller
manual row height also constrains the editor. `rowHeight` remains the minimum.
Single-line editors keep their natural height at the top of a tall row; their
focus border follows the editor rather than filling the row's height.

The standalone `/page/playground/` page enables `statusBar=True`: a bottom
toolbar opens error and change lists, with links back to their cells. The
page uses a borderContainer: a top toolbar controls automatic height, row
numbers and the frozen description; the center holds the grid. The bottom
region hosts the existing status toolbar through `statusTarget`, the ID of
a Source-declared host element. Both bars expose the `toolbar` role and named
buttons with icons. The framework owns mounting and cleanup of the status view.
The
GridEditor exposes `errors` and `changes` Bags; confirmed edits retain their
first original value and latest valid value, and returning to the original
removes the change entry. Invalid drafts remain separate. This initial log
tracks editor-confirmed local changes, not external writes or database saves;
save acknowledgement/reset and public Python output bindings remain future work.

The main grid combines textBox, textBoxArea, numberTextBox, dbSelect,
filteringSelect, comboBox, remoteSelect, callbackSelect, checkBoxText, checkBox,
dateTextBox, timeTextBox, horizontalSlider, verticalSlider, colorpicker and
passwordbox editors. Description is frozen while scrolling horizontally.
Two read-only formulas calculate `quantity * price` and
`quantity * price * (1 - discount / 100)` after valid confirmation.
Standalone widgets such as dateCalendar and rich document editors are not
scalar FormField cell editors and are not included in this playground.

- Legacy-shaped `edit=True` / `edit=dict(tag=..., ...)` column declarations.
- Double-click opens an editor; Enter confirms, Tab/Shift-Tab confirms and moves,
  Escape discards the current cell draft. Keyboard navigation selects the destination
  text. Up/Down moves in the same column, except while a choice popup owns the
  arrows. The active-cell border is inset and only visible while the editor has focus.
  Clicking outside retains the draft and validation state without the focus border. Uneditable cells retain row activation.
- A stable shadow slot positions an ordinary **light-DOM Source child** above
  the cell. The component and bindings belong to the original Application.
  Row redraws do not destroy the control. Switching cells recreates the control;
  same-type reuse is not implemented.
- A private Data path holds the cell draft. Confirmation writes through the
  collection store. Bag-valued and attribute-backed resident rows are supported.
- Normal FormField parsing and validation are reused. Invalid drafts can be left
  with Tab, vertical navigation or another editable cell; reopening restores the
  original control and its draft. Each suspended editor retains its own Data binding.
  Invalid values are not written into the collection store;
  asynchronous validation is awaited before confirmation. Validation messages use
  a separate tooltip above the field on hover, preserving the cell height and inset border.
  Outside hover, the error background remains and the message stays associated
  with the input through `aria-describedby`.
  The cell session retains errors by row key and column ID; rendered cells carry
  `invalidCell` and `aria-invalid` across scroll/recycling. Successful confirmation
  or Escape clears the mark. No second validator,
  browser request mechanism or application-local DOM implementation is added.
- Formulas observe confirmed writes. External changes to the same cell refuse
  an overwrite; Escape and reopen to see the new value. Row replacement/removal
  is checked again before committing.
- Scroll out of view hides the editor and retains its draft; scrolling back
  reveals it. Keyboard movement brings the destination into view.

## Findings and boundaries

The experiment removes the need to replace cell HTML and suppress row redraws.
It does not eliminate the lifecycle coordination between controls, validation,
selection and the viewport. A row editor object is unnecessary for this bounded
cell-only experiment; row-level validation and changeset persistence are separate
work.

A prerequisite defect surfaced in existing populated Bag rows: bag-js does not
recursively attach existing nested values when enabling backrefs. BagRows now
attaches detached row branches before subscribing, so changes reach external
Data bindings as well as the grid. Existing parented branches are preserved.
The shared typed snapshot service now copies and compares Decimal values without
converting them to floating-point numbers.

Not implemented: save/restore of the collection, insertion/deletion UI, autosave,
parent-form coordination, virtual-store editing, row-scoped `#ROW` configuration,
`selected_*` multi-field setters, related captions in the displayed grid, or
configurable legacy lifecycle callbacks. This experiment is for grids outside
forms. Blur alone leaves the session open; use Enter/Tab or another editable
cell to confirm. Live edits of the structure and complex clipping/frozen-column
combinations require further interaction coverage.

The shared dbSelect accepts its visible highlighted suggestion (including a sole
result) on Tab or leaving the field. Blur accepts the choice into the cell draft;
the grid session still follows the confirmation rules above. No-result text
remains invalid. Starting another search hides the previous suggestions so an
exit cannot accidentally accept a stale highlighted result.

For the RPC select, let the initial identity-to-caption lookup complete before
searching. The existing provider refuses busy requests; rapid typing during the
initial lookup can require repeating the search. This provider interaction is
not solved by the cell-host experiment. Decimal `validate_min/max` remain limited
by the existing validator's finite-number contract; the example validates an
integer quantity and uses Decimal parsing without these validators for price.

## Verification

### Widget playground

Two additional Python-authored grids exercise textBoxArea, filteringSelect,
comboBox, remoteSelect, checkBox, dateTextBox, timeTextBox, horizontalSlider,
verticalSlider, colorpicker and passwordbox alongside the original textBox,
numberTextBox and dbSelect. Each column has a first-row Data readout.
Textarea Enter inserts a newline; Ctrl/Cmd+Enter confirms. Its arrows move the
caret. Sliders and native time inputs also retain their arrow behavior. Tab
confirms and navigates for all these editors. Tall editors overlap following
rows rather than changing the virtual row height. Date/time display cells still
use the grid's existing string rendering; this exercise verifies typed editing.

The playground exposed and fixed comboBox confirmation before native change and
timeTextBox conversion between native minute precision and TYTX H seconds.
Four Chromium scenarios and 27 targeted JavaScript tests pass after these fixes.

- 403 JavaScript tests pass, including four new tests for mounted Source editors,
  Bag/attribute confirmation and cancellation, invalid values, external writes,
  deleted rows, and exact Decimal snapshots.
- `tests/browser/grid-editor.spec.js` passes in Chromium against this Python page:
  draft retention through scroll, Tab, numeric validation, Escape, dbSelect RPC
  selection, formula results and external Data readers. Set
  `GRAMLOT_GRID_EDITOR_URL=http://127.0.0.1:8079/page/index/` to run it.
- Python page and endpoint were executed by the FastAPI host during the browser
  test. Application source contains only Python Gramlot declarations and domain
  data; browser behavior resides in reusable framework code.
- Visual inspection includes the open selector popup. No publication or commit.
- Follow-up dbSelect exit behavior: 27 targeted JavaScript tests and three
  Chromium grid scenarios pass, including sole-result Tab acceptance, highlighted
  selection, outside-click acceptance and rejection of unmatched text.
# Popup cell editors — experimental, 2026-09-14

The standalone toolbar gear opens a Python-authored configuration palette.
An editable quickGrid uses `datamode="attr"` over the actual structure rows
Bag; heading, pixel width and hidden state are edited through GridEditor. Changes apply immediately and survive closing/reopening the
palette for the current page session. The configuration rows follow the structure Bag without a copied editing
store. Controls for insertion/removal, grouping/formula editing and saved views
are not implemented by this palette.

Undo/redo is deferred: the current changes Bag is a net-change report, not an
ordered operation history. A future history must capture sequential old/new
values, invalidate redo after a new edit, and handle external-write conflicts.
Structure edits enter the configuration grid's own change log; data edits
remain in the main grid's change log.

`edit=dict(modal=True, tag='textBoxArea', height='110px')` opens the ordinary
bound control in an anchored popup with Cancel and Confirm. The standalone
playground includes a separate **Notes · popup** column for comparison with
inline notes. Popup multiline fields keep a compact cell preview and do not
contribute to automatic row height.

Confirm uses the same validation and change log as inline editing. Invalid
values stay open. Clicking outside retains the draft for reopening; Escape or
Cancel discards it. Tab moves through the popup controls; textarea Enter inserts
a newline and Ctrl/Cmd+Enter confirms. Arrow keys belong to the popup widget.
The popup uses the browser top layer, with viewport-constrained positioning.

This first slice supports one normal control per popup, not legacy `contentCb`
or multi-field nested Bag forms. `modal` preserves the legacy editor option
name; it does not make the whole page inert. The popup shell owns presentation
only; draft Data, validation and changes remain in GridEditor.

The owner considers the current grid work a functional prototype. Final
component boundaries (grid, gridEditor and shared components) require review
and cleanup before consolidation. Legacy functional parity is the long-term
target; this slice does not implement the configurator or context menus.

## Selection and reorder experiment

- `selectionMode='none'|'single'|'multiple'` defaults to `single`. The playground
  exposes a bound mode selector and starts in `multiple`. No selection still
  permits cell editing and row activation.
- Plain click selects one row; Shift selects the interval from the anchor;
  Ctrl-click (Windows/Linux) or Cmd-click (macOS) toggles membership. Ctrl/Cmd
  with Shift adds an interval. Arrow navigation supports Shift extension.
- `selectedKey` remains the current key; `selectedKeys` exposes the selected
  key array and accepts a Data binding. The selection event includes `keys`.
- `selfDragRows=True` enables native row dragging. Dragging a selected row moves
  the selected group in its current order; dragging an unselected row moves
  only that row. Drop in the upper/lower half to insert before/after the target.
- `selfDragColumns=True` enables header dragging, inserting before/after the
  target according to the left/right half. Width resize handles remain separate.
  Structure-backed columns move in their Bag; direct column declarations update
  their declaration or bound array. Columnsets retain membership and can split
  into contiguous visual runs after a move.

Row moves preserve BagNode identity and batch store notifications. They currently
require a resident mutable Bag store with no active sort/filter; remote reorder
persistence, drag auto-scroll and keyboard reorder commands remain future work.
Moves are not yet part of undo/redo. Both reorder options are enabled in the
configuration grid: moving its rows changes the main grid's column order.
