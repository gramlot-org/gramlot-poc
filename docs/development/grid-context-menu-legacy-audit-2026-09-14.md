# Legacy grid context menus

Status: source inspection and migration proposal, not an implemented Gramlot menu
API. Requested after the owner supplied a TableHandler grid screenshot.

## Sources inspected

Paths below are relative to `/Users/gporcari/Sviluppo/Genropy/genropy`.

- `gnrjs/gnr_d11/js/genro_grid.js:812`: custom versus automatic menu;
  `:1079–1269`: standard plugins and menu composition.
- `gnrjs/gnr_d11/js/genro_widgets.js:40`: Bag-to-menu translation;
  `:2993`: Menuline; `:3120`: Menu; `:3236`: context opening.
- `resources/common/th/th_view.py:450`: TableHandler base entries.

## Three layers behind the screenshot

1. **General Menu/Menuline components.** Menus attach to their parent by default,
   or use `connectId`; a parent's arrow can be the trigger. Content can be
   declared as Source, supplied through `values`, or read through `storepath`.
   Bags become menu items; nested Bags and resolvers become submenus. Caption
   precedence is `caption`, `label`, string value, node label. `label='-'`
   produces a separator. `iconClass` and `checked` support visual indicators.
2. **Grid composition.** A child menu replaces the automatic menu. Otherwise,
   unless `gridplugins=False`, the grid creates a callback-backed `.contextMenu`
   from a deep copy of `.contextMenuBase` plus plugins. The default plugin list
   is `export_xls,print`, prefixed by `configurator` when available and enabled.
   Copy cell, copy rows, paste rows and dynamic search are appended; each plugin
   can omit its entry when inapplicable. Toggle line number is added last.
   Plugin names resolve to `cm_plugin_<name>` or the general plugin dispatcher,
   which also accepts `plugin:command`.
3. **TableHandler contributions.** `_th_view_confMenues` supplies Reload,
   developer-only Touch selected records, Show Archived Records, Totals count,
   and permission-gated User Configuration through `.contextMenuBase`.
   These are application/server capabilities, not intrinsic grid features.

Charts and statistics are additional grid plugins. The screenshot's exact
plugin configuration cannot be established from the image alone.

## Context, actions and dynamic state

The grid's `onCellContextMenu` records `rowIndex` and `cellIndex` on the menu
Source node. The generic menu retains `originalContextTarget`, `lastContextEvent`
and `ctxTargetSourceNode`. An action receives item attributes, the contextual
Source node and the click event (`$1`, `$2`, `$3` in legacy action strings).
Actions may be inherited; an action on the contextual source takes precedence.
Items can also contain a dataController/dataRpc, and `selected`/`selected_*`
write item identity/attributes to Data.

Opening can evaluate `onOpen`, `menuItemCb`, `disabledItemCb` and `hiddenItemCb`.
`onOpeningMenu(evt)` supplies resolver arguments when an expired resolver is
evaluated; it is not an unconditional opening callback. `modifiers` and
`validclass` filter the triggering event. `checked` can bind to Data, as it does
for archived records, total counting and row numbers.

The inspected grid hook records coordinates; it does **not** explicitly change
selection. Copy selected rows reads the existing selection. Do not equate the
right-clicked row with the selected rows or claim that the underlying Dojo
selection behavior has been exhaustively verified.

Copy cell copies the original DOM target through the legacy clipboard helper.
Copy selected rows serializes selected row attributes into Bag XML, not a
spreadsheet-oriented TSV table. Paste rows is only offered for an enabled grid
editor. Print/export call higher-level services; their presence in a menu does
not make them portable browser-only operations.

## Proposed Gramlot direction

Preserve the authoring vocabulary `menu`, `menuline`, `storepath`, `checked`,
`disabled`, `iconClass`, `action` and the automatic-grid extension points where
feasible. Build a shared menu component first, using ordinary Source, Data
bindings and shared popup/focus infrastructure. Do not create a separate menu
engine inside the grid. This also serves the previously deferred symbolic-date
help menu.

The grid adapter should provide stable row keys, column identifiers, the clicked
value and a snapshot of selected keys, as well as legacy positional information.
This is a proposed extension, not an approved payload. Stable keys matter after
sorting, filtering and virtual rendering. Context must remain valid while a
submenu is open, and missing/deleted targets must disable affected commands.

Keep right-click context separate from selection by default; explicitly settle
selection policy before implementation. Handle active valid/invalid drafts
without trapping focus or silently discarding edits. Define whether Copy cell
uses the visible draft, formatted caption or stored value.

Start with portable commands supported by the grid: copy cell, copy selected
rows, toggle row numbers, and declared application commands. Add other entries
only when their services exist. Genropy integration may contribute reload,
archived-record controls, permissions and user configuration. Menu visibility
does not replace server-side permission checks.

## Acceptance checks for a future implementation

- Python-authored static and Bag-driven menus, reactive checked/disabled state,
  separators, icons, nested and lazily supplied items.
- Right-click and keyboard opening (Shift+F10/context-menu key); arrow navigation,
  Enter, Escape, outside dismissal, viewport positioning and restored focus.
- Correct context after scrolling, filtering, sorting and row deletion;
  preservation of multiple selection when opening a menu on a selected row.
- Valid and invalid active editors, nested popups, and header versus body targets.
- Source removal cleans up subscriptions, listeners and open popups.
- Explicit clipboard format and service requirements for each standard command.

This audit did not execute the legacy UI or implement menu runtime changes.
