# Grid footers and column sets: legacy audit

Implementation checkpoint: the first local port now supports columnset
authoring, grouped headers and an automatic resident-data footer. See the
[implemented API and remaining limits](../examples/grid-editor/README.md#column-groups-and-automatic-footer).
The analysis below records the broader legacy contract, not full port parity.

Source inspection, 2026-09-14. This documents verified legacy declarations and
the original proposed Gramlot port.

## Column sets

Legacy `GnrGridStruct.columnset(code, name, columns, **kwargs)` stores group
metadata under `struct.info.columnsets`. Calling it on `rows` creates that
metadata automatically. Cells declared on the resulting group are inserted
into the ordinary `view_0.rows_0`, with a `columnset` attribute referencing its
code. This is a grouping layer over flat columns, not a nested record structure.

```python
rows = struct.view().rows()
amounts = rows.columnset('amounts', name='Amounts')
amounts.cell('quantity', name='Qty', dtype='L')
amounts.cell('price', name='Unit price', dtype='N')
amounts.cell('total', name='Total', dtype='N')
```

The helper also accepts `columns=[dict(...), ...]` and `cells_*` defaults,
including `cells_tag`. Ordinary cells can reference `columnset='amounts'`.
The renderer reads visible columns and makes spans for contiguous runs: a group
split by another group is rendered as multiple runs. Hidden columns do not
contribute to spans. Metadata includes the label and presentation attributes.
The inspected path provides one automatic group-header band; arbitrary nested
group levels or collapsible column groups are not established by this evidence.

Older `columnset_*` grid attributes are translated into structure metadata.
A source comment calls that syntax deprecated, but the adapter remains present.

## Footers

There are two complementary declaration paths:

- Automatic footer: grid `footer` and `footer_*` presentation attributes,
  with cell `totalize` and/or cell `footer_*` options. The renderer builds
  `footer_auto`, inherits dtype/format information and can place a title in
  the empty leading span. `totalize=True` becomes `.totalize.<field>`;
  a string can identify an explicit total binding path.
- Explicit rows: `grid.footer(**row_attributes)` followed by
  `footer.item(field, value=..., colspan=..., **presentation)`. Multiple
  footer declarations are collected. Items anchor to a field, are sorted by
  column position, and missing areas receive empty spanning cells.

Verified application example:

```python
footer = grid.footer(background_color='#B0CCEB')
footer.item('denominazione', value='Percentuali', colspan=4, text_align='right')
footer.item('n_voti_si', value='^.perc.voti_si', text_align='right', format='##.00')
```

The example uses a Data controller to calculate percentage values. The footer
renders their bindings; it does not introduce a separate formula language.
Numeric and Boolean totals use the change manager or server-provided totals,
depending on the store. The renderer prefers `.filtered_totalize.<field>` when
available. Consequently, summing only mounted DOM rows would not preserve the
legacy contract, nor would treating a partially loaded remote store as complete.

## Layout and synchronization

The extended legacy grid wraps the body in a BorderContainer with column sets
above and footer rows below. It aligns separate tables to the actual column
headers and updates widths after layout changes. Horizontal scrolling is owned
by the grid body; group headers and footers follow it. Both bands can be hidden
when empty. These are column-aligned data bands, distinct from a status toolbar.

## Current Gramlot gap and proposed implementation

Gramlot has flat `GridStruct.view/rows/cell` declarations. Its JS struct reader
already excludes `info` when reading views, but does not render group metadata.
The formula manager supports resident-row calculations; it does not currently
provide this footer/totalizer contract. The bottom error/change toolbar remains
independent of data footers.

Recommended first port:

1. Preserve `rows.columnset(...)`, `group.cell(...)` and `cell(columnset=...)`.
   Keep the transported structure flat with metadata under `info.columnsets`.
2. Render group headers and footer rows from the same column geometry as the
   cells, including widths, ordering, hidden columns and the row-number gutter.
   Split spans at frozen-column boundaries so the pinned and scrolling sections
   cannot overlap.
3. Support `totalize=True` for resident numeric/Boolean fields and calculated
   columns, using typed arithmetic and reactive Bags. Recompute after valid
   edits, insertions, removals and active-filter changes. Invalid drafts do not
   contribute until they are validly committed. Define the totals' row scope
   explicitly; remote totals require a store capability.
4. Add explicit footer rows with field anchors, values/bindings, formatting and
   spans. Keep custom calculations in existing controllers/formula services.
5. Subscribe to structure changes and reuse the existing horizontal scroll
   owner. Test resize, hide/reorder, freeze boundaries and external Data writes.

For the current playground, arrange adjacent columns into Item, Amounts,
Delivery and Options. Put sums under Quantity, Total and Net total, leaving
Price unsummed because summing unit prices is misleading. Position the data
footer directly below the grid rows/viewport, above the existing bottom toolbar.
The top toolbar remains above the group-header band.

## Source anchors

Paths relative to `/Users/gporcari/Sviluppo/Genropy/genropy`:

- `gnrpy/gnr/web/gnrwebstruct/gridstruct.py:83–111,161–166`: group metadata,
  defaults and flat cell insertion.
- `gnrjs/gnr_d11/js/genro_grid.js:219–270`: extended wrapper and explicit footers.
- Same file `281–414`: measured alignment, field anchors, spans and bound totals.
- Same file `416–493`: automatic footer and contiguous visible column sets.
- Same file `1938–1939,3932–3944,4551–4560`: total paths and store/server routes.
- `projects/gnrcore/packages/test15/webpages/gnrwdg/baggrid_scroll.py:25–34`:
  multiple column sets with three columns per set.
- `projects/gnrcore/packages/test/resources/tables/_packages/glbl/comune/th_comune.py:51–76`:
  totalized formula columns and a custom percentage footer.
- `resources/common/gnrcomponents/tag_matrix_grid.py:352`: real grouped tag matrix.
