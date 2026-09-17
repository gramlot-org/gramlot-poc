# flexbox

## Identity

- **Identity:** `flexbox`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`, `HtmlWidgets`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `flexbox`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::flexbox:L485`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `direction` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `wrap` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `align_content` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `justify_content` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `align_items` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `justify_items` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `align_content`, `align_items`, `direction`, `justify_content`, `justify_items`, `wrap`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::flexbox:L446`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::flexbox:L485`: Create a flexbox container for flexible layout of child elements. The flexbox container uses CSS Flexbox layout to arrange child elements in a flexible, responsive manner. It provides powerful alignment and distribution capabilities. Args: direction (str): Main axis direction for flex items. - 'row': Left to right (default) - 'column': Top to bottom - 'row-reverse': Right to left - 'column-reverse': Bottom to top wrap (bool or str): Whether flex items should wrap to next line. - True/'wrap': Items wrap onto multiple lines - False/'nowrap': Items stay on single line (default) - 'wrap-reverse': Items wrap in reverse order align_content (str): Aligns lines when there is extra space on cross axis. - 'flex-start': Lines packed to start - 'flex-end': Lines packed to end - 'center': Lines centered - 'space-between': Lines evenly distributed - 'space-around': Lines with equal space around - 'stretch': Lines stretch to fill container (default) justify_content (str): Aligns items along main axis. - 'flex-start': Items packed to start (default) - 'flex-end': Items packed to end - 'center': Items centered - 'space-between': Items evenly distributed - 'space-around': Items with equal space around - 'space-evenly': Items with equal space between align_items (str): Aligns items along cross axis. - 'flex-start': Items aligned to start - 'flex-end': Items aligned to end - 'center': Items centered - 'baseline': Items aligned to baseline - 'stretch': Items stretch to fill (default) justify_items (str): Justifies items within their area (grid-specific). **kwargs: Additional HTML/CSS attributes (e.g., height, width, border, padding) Returns: GnrDomSrcNode: The flexbox container node Example: # Simple horizontal flexbox box = pane.flexbox(direction='row', justify_content='space-between') box.div('Item 1') box.div('Item 2') box.div('Item 3') # Vertical flexbox with wrapping box = pane.flexbox(direction='column', wrap=True, height='200px') for i in range(10): box.div(f'Item {i}', height='30px') # Centered content box = pane.flexbox(justify_content='center', align_items='center', height='100%') box.div('Centered content') See Also: - gridbox(): For grid-based layouts - borderContainer(): For region-based layouts
- `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::flexbox:L446`: GenroPy flexbox layout container with CSS flex properties support.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::flexbox:L485`

```python
def flexbox(self,direction=None,wrap=None,align_content=None,
                justify_content=None,align_items=None,
                justify_items=None,**kwargs):
        """Create a flexbox container for flexible layout of child elements.

        The flexbox container uses CSS Flexbox layout to arrange child elements in a flexible,
        responsive manner. It provides powerful alignment and distribution capabilities.

        Args:
            direction (str): Main axis direction for flex items.
                           - 'row': Left to right (default)
                           - 'column': Top to bottom
                           - 'row-reverse': Right to left
                           - 'column-reverse': Bottom to top

            wrap (bool or str): Whether flex items should wrap to next line.
                              - True/'wrap': Items wrap onto multiple lines
                              - False/'nowrap': Items stay on single line (default)
                              - 'wrap-reverse': Items wrap in reverse order

            align_content (str): Aligns lines when there is extra space on cross axis.
                               - 'flex-start': Lines packed to start
                               - 'flex-end': Lines packed to end
                               - 'center': Lines centered
                               - 'space-between': Lines evenly distributed
                               - 'space-around': Lines with equal space around
                               - 'stretch': Lines stretch to fill container (default)

            justify_content (str): Aligns items along main axis.
                                 - 'flex-start': Items packed to start (default)
                                 - 'flex-end': Items packed to end
                                 - 'center': Items centered
                                 - 'space-between': Items evenly distributed
                                 - 'space-around': Items with equal space around
                                 - 'space-evenly': Items with equal space between

            align_items (str): Aligns items along cross axis.
                             - 'flex-start': Items aligned to start
                             - 'flex-end': Items aligned to end
                             - 'center': Items centered
                             - 'baseline': Items aligned to baseline
                             - 'stretch': Items stretch to fill (default)

            justify_items (str): Justifies items within their area (grid-specific).

            **kwargs: Additional HTML/CSS attributes (e.g., height, width, border, padding)

        Returns:
            GnrDomSrcNode: The flexbox container node

        Example:
            # Simple horizontal flexbox
            box = pane.flexbox(direction='row', justify_content='space-between')
            box.div('Item 1')
            box.div('Item 2')
            box.div('Item 3')

            # Vertical flexbox with wrapping
            box = pane.flexbox(direction='column', wrap=True, height='200px')
            for i in range(10):
                box.div(f'Item {i}', height='30px')

            # Centered content
            box = pane.flexbox(justify_content='center', align_items='center',
                              height='100%')
            box.div('Centered content')

        See Also:
            - gridbox(): For grid-based layouts
            - borderContainer(): For region-based layouts
        """
        return self.child('flexbox',direction=direction, wrap=wrap,
                          align_content=align_content,justify_content=justify_content,
                          align_items=align_items,justify_items=justify_items,**kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::flexbox:L446`

```python
def flexbox(self, **kwargs):
        """GenroPy flexbox layout container with CSS flex properties support."""
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.flexbox(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::flexbox:L485`
- `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::flexbox:L446`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
