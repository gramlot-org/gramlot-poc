# Legacy grid configurator

Status: screenshot and source inspection; no Gramlot implementation in this task.
Source: `/Users/gporcari/Sviluppo/Genropy/genropy/resources/common/th/th_viewconfigurator.js`.

## Verified details

- `configuratorPalette` (line 345) opens/reuses a PalettePane per grid, with a
  stack container and toolbar for Columns, Columnsets and Advanced configuration.
  The briefcase icon **copies the structure to the clipboard**; it is not an
  Open command. Save is omitted when `externalSave` is set.
- `_cellsEditorGrid` (line 467) uses another editable grid to configure columns.
  It enables row dragging and edits names, formulas, columnset membership,
  totalization, display format, sorting and cell styles. Sort values are
  `a:Asc,d:Desc`. Totalization is editable only for dtypes in `NRFLI`.
- Add opens an ask dialog for field, name and dtype, then inserts a cell with
  `calculated=true`. Available dialog types are Decimal, Integer, Text, Boolean
  and Date. Formula editing is enabled only for calculated cells.
- The formula editor uses `edit:{modal:true,contentCb:...}` with a textbox and
  ComboMenu. The menu inserts a field token into the expression. Tokens derive
  from fields with non-word characters replaced by underscores, with an
  aggregation suffix where applicable. This is not a verified formula parser
  or semantic autocomplete engine.
- `_subBagCell` (line 558) renders a formatted summary of a nested Bag in a
  cell, then opens a form to edit that Bag. This explains compact “Width: 5em”
  summaries and richer popup editors. The popup editor pattern is reusable
  independently of the configurator.
- `_columnsetsGrid` (line 381) edits code/name and two distinct style Bags:
  group-header styles and member-cell styles. The latter become `cells_*`
  attributes under `struct.info.columnsets`. Header styles exclude height/width;
  cell styles exclude height/border in this UI.
- `_structureConfigurator` (line 534) uses FlatBagEditor on the structure's
  column nodes. The left checkboxes invert `hidden`; the right pane exposes
  attributes, with an explicit exclusion list. It is a lower-level structure
  editor, not a separate definition of columns.

## State and persistence

The friendly grids edit intermediate Bags (`cells_edit`, `columnsets_edit`).
Converters flatten nested style Bags into attributes on the real structure and
rebuild the editing projection when the structure changes. Trigger reasons
prevent notification loops. Changes therefore reach the live structure before
pressing Save; Save persists a view rather than applying pending UI edits.

`saveGridView` (line 35) submits the actual `structBag`, table and metadata to
`_table.adm.userobject.saveUserObject`, using `view` or `grpview`. This is a
Genropy service dependency. Persistence is distinct from local editing.

## Gramlot implications — proposal

Use the existing structure Bag as the authoritative configuration. A reusable
attribute-to-row adapter may be needed to expose node attributes through an
editable grid without application-specific synchronization code. Preserve
unknown attributes when editing supported ones.

Build shared support for cell popup forms and nested Bag summaries before
authoring the configurator in Python. Reuse the ordinary grid, controls,
validation and palette services. Keep header styles and `cells_*` defaults
distinct, and preserve `columnset`, `totalize`, `format`, `sort` and `formula`
conventions where supported. Existing formula semantics must govern editing;
do not introduce a second expression engine in the palette.

Separate live structure editing from optional view persistence. A Genropy host
can supply user-object storage; a portable configurator should work without it.
An advanced attribute editor must distinguish supported runtime attributes
from preserved metadata, including model-specific fields shown in the screenshot.

Future verification must cover live updates, reorder/hide, replacement of the
structure, unknown metadata retention, popup focus/validation, formula failures,
style removal, and cleanup. None of these browser behaviors was tested by this
source-only audit.
