# gridbox

## Identity

- **Identity:** `gridbox`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`, `HtmlWidgets`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `gridbox`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::gridbox:L589`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `columns` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `align_content` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `justify_content` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `align_items` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `justify_items` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `table` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `align_content`, `align_items`, `columns`, `justify_content`, `justify_items`, `table`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::gridbox:L451`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::gridbox:L589`: Create a gridbox container for two-dimensional grid-based layouts. The gridbox container uses CSS Grid layout to arrange child elements in a two-dimensional grid system with rows and columns. It provides powerful control over item positioning, sizing, and alignment, making it ideal for complex layouts, forms, and dashboards. Args: columns (int or str): Number of columns or explicit column definition. - int: Number of equal-width columns (e.g., 3) - str: CSS grid-template-columns value (e.g., '1fr 2fr 1fr') If not specified, uses auto-placement. align_content (str): Aligns the grid within the container when there's extra space. - 'start': Grid aligned to start - 'end': Grid aligned to end - 'center': Grid centered - 'stretch': Grid stretches to fill (default) - 'space-between': Space distributed between rows - 'space-around': Space around each row - 'space-evenly': Equal space between all rows justify_content (str): Aligns the grid horizontally within the container. - 'start': Grid aligned to start - 'end': Grid aligned to end - 'center': Grid centered - 'stretch': Grid stretches to fill (default) - 'space-between': Space distributed between columns - 'space-around': Space around each column - 'space-evenly': Equal space between all columns align_items (str): Aligns items vertically within their grid cell. - 'start': Items aligned to cell start - 'end': Items aligned to cell end - 'center': Items centered in cell - 'stretch': Items stretch to fill cell (default) justify_items (str): Aligns items horizontally within their grid cell. - 'start': Items aligned to cell start - 'end': Items aligned to cell end - 'center': Items centered in cell - 'stretch': Items stretch to fill cell (default) table (str): Optional table name for integration with Genro data handling. Defaults to page.maintable if not specified. **kwargs: Additional attributes: - gap (str): Spacing between grid items (e.g., '10px', '1em') - column_gap (str): Horizontal spacing between columns - row_gap (str): Vertical spacing between rows - item_height (str): Default height for grid items - item_border (str): Border applied to all items - item_side (str): Label position for labledBox items ('top', 'left', etc.) Returns: GnrDomSrcNode: The gridbox container node Grid Item Attributes: Child elements can use these attributes for positioning: - colspan (int): Number of columns the item spans - rowspan (int): Number of rows the item spans Example: # Simple 3-column grid grid = pane.gridbox(columns=3, gap='10px') grid.div('Item 1') grid.div('Item 2') grid.div('Item 3', colspan=2) # Spans 2 columns grid.div('Item 4') # Explicit column widths grid = pane.gridbox(columns='200px 1fr 2fr', row_gap='15px') grid.div('Sidebar', height='100%') grid.div('Content') grid.div('Main area') # Form layout with gridbox form = pane.gridbox(columns=2, gap='10px') form.textbox(value='^.name', lbl='Name') form.textbox(value='^.surname', lbl='Surname') form.textbox(value='^.email', lbl='Email', colspan=2) # Dashboard with different sized sections dashboard = pane.gridbox(columns=3, gap='20px', height='100%') dashboard.labledBox('Stats', colspan=2).borderContainer() dashboard.labledBox('Quick Actions') dashboard.labledBox('Recent Activity', colspan=3) # Centered grid grid = pane.gridbox(columns=4, justify_content='center', align_items='center', height='400px') for i in range(8): grid.div(f'Cell {i}', border='1px solid #ccc') See Also: - flexbox(): For one-dimensional flexible layouts - formbuilder(): For traditional form layouts - labledBox(): For labeled containers within gridbox
- `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::gridbox:L451`: GenroPy CSS grid layout container for two-dimensional grid arrangements.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::gridbox:L589`

```python
def gridbox(self,columns=None,align_content=None,justify_content=None,
                align_items=None,justify_items=None,table=None,**kwargs):
        """Create a gridbox container for two-dimensional grid-based layouts.

        The gridbox container uses CSS Grid layout to arrange child elements in a two-dimensional
        grid system with rows and columns. It provides powerful control over item positioning,
        sizing, and alignment, making it ideal for complex layouts, forms, and dashboards.

        Args:
            columns (int or str): Number of columns or explicit column definition.
                                - int: Number of equal-width columns (e.g., 3)
                                - str: CSS grid-template-columns value (e.g., '1fr 2fr 1fr')
                                If not specified, uses auto-placement.

            align_content (str): Aligns the grid within the container when there's extra space.
                               - 'start': Grid aligned to start
                               - 'end': Grid aligned to end
                               - 'center': Grid centered
                               - 'stretch': Grid stretches to fill (default)
                               - 'space-between': Space distributed between rows
                               - 'space-around': Space around each row
                               - 'space-evenly': Equal space between all rows

            justify_content (str): Aligns the grid horizontally within the container.
                                 - 'start': Grid aligned to start
                                 - 'end': Grid aligned to end
                                 - 'center': Grid centered
                                 - 'stretch': Grid stretches to fill (default)
                                 - 'space-between': Space distributed between columns
                                 - 'space-around': Space around each column
                                 - 'space-evenly': Equal space between all columns

            align_items (str): Aligns items vertically within their grid cell.
                             - 'start': Items aligned to cell start
                             - 'end': Items aligned to cell end
                             - 'center': Items centered in cell
                             - 'stretch': Items stretch to fill cell (default)

            justify_items (str): Aligns items horizontally within their grid cell.
                               - 'start': Items aligned to cell start
                               - 'end': Items aligned to cell end
                               - 'center': Items centered in cell
                               - 'stretch': Items stretch to fill cell (default)

            table (str): Optional table name for integration with Genro data handling.
                        Defaults to page.maintable if not specified.

            **kwargs: Additional attributes:
                     - gap (str): Spacing between grid items (e.g., '10px', '1em')
                     - column_gap (str): Horizontal spacing between columns
                     - row_gap (str): Vertical spacing between rows
                     - item_height (str): Default height for grid items
                     - item_border (str): Border applied to all items
                     - item_side (str): Label position for labledBox items ('top', 'left', etc.)

        Returns:
            GnrDomSrcNode: The gridbox container node

        Grid Item Attributes:
            Child elements can use these attributes for positioning:
            - colspan (int): Number of columns the item spans
            - rowspan (int): Number of rows the item spans

        Example:
            # Simple 3-column grid
            grid = pane.gridbox(columns=3, gap='10px')
            grid.div('Item 1')
            grid.div('Item 2')
            grid.div('Item 3', colspan=2)  # Spans 2 columns
            grid.div('Item 4')

            # Explicit column widths
            grid = pane.gridbox(columns='200px 1fr 2fr', row_gap='15px')
            grid.div('Sidebar', height='100%')
            grid.div('Content')
            grid.div('Main area')

            # Form layout with gridbox
            form = pane.gridbox(columns=2, gap='10px')
            form.textbox(value='^.name', lbl='Name')
            form.textbox(value='^.surname', lbl='Surname')
            form.textbox(value='^.email', lbl='Email', colspan=2)

            # Dashboard with different sized sections
            dashboard = pane.gridbox(columns=3, gap='20px', height='100%')
            dashboard.labledBox('Stats', colspan=2).borderContainer()
            dashboard.labledBox('Quick Actions')
            dashboard.labledBox('Recent Activity', colspan=3)

            # Centered grid
            grid = pane.gridbox(columns=4, justify_content='center',
                               align_items='center', height='400px')
            for i in range(8):
                grid.div(f'Cell {i}', border='1px solid #ccc')

        See Also:
            - flexbox(): For one-dimensional flexible layouts
            - formbuilder(): For traditional form layouts
            - labledBox(): For labeled containers within gridbox
        """
        return self.child('gridbox',columns=columns,table=table or self.page.maintable,
                          align_content=align_content,justify_content=justify_content,
                          align_items=align_items,justify_items=justify_items
                          ,**kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::gridbox:L451`

```python
def gridbox(self, **kwargs):
        """GenroPy CSS grid layout container for two-dimensional grid arrangements."""
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.gridbox(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::gridbox:L589`
- `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::gridbox:L451`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
