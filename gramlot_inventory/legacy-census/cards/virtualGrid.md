# virtualGrid

## Identity

- **Identity:** `virtualGrid`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::virtualGrid:L523`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `structure` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | View layout definition (object or string name). |
| `rowCount` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Number of rows to display. |
| `rowsPerPage` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Number of rows to render per page. |
| `autoWidth` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, grid width auto-fits the data. |
| `autoHeight` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, grid height auto-fits the data. |
| `autoRender` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, grid renders itself after initialization. |
| `defaultHeight` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Default grid height as CSS value (e.g. '15em'). |
| `elasticView` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Index of the view to make elastic (fills available space). |
| `singleClickEdit` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, single click starts cell editing. |
| `keepRows` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Number of rows to keep in the rendering cache. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::virtualGrid:L523`: Virtual scrolling grid without direct data store binding. Args: structure: View layout definition (object or string name). rowCount: Number of rows to display. rowsPerPage: Number of rows to render per page. autoWidth: If True, grid width auto-fits the data. autoHeight: If True, grid height auto-fits the data. autoRender: If True, grid renders itself after initialization. defaultHeight: Default grid height as CSS value (e.g. '15em'). elasticView: Index of the view to make elastic (fills available space). singleClickEdit: If True, single click starts cell editing. keepRows: Number of rows to keep in the rendering cache.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::virtualGrid:L523`

```python
def virtualGrid(self, structure: str | None = None,
                    rowCount: int | None = None,
                    rowsPerPage: int | None = None,
                    autoWidth: bool = False,
                    autoHeight: bool = False,
                    autoRender: bool = True,
                    defaultHeight: str | None = None,
                    elasticView: int | None = None,
                    singleClickEdit: bool = False,
                    keepRows: int | None = None,
                    **kwargs):
        """Virtual scrolling grid without direct data store binding.

        Args:
            structure: View layout definition (object or string name).
            rowCount: Number of rows to display.
            rowsPerPage: Number of rows to render per page.
            autoWidth: If True, grid width auto-fits the data.
            autoHeight: If True, grid height auto-fits the data.
            autoRender: If True, grid renders itself after initialization.
            defaultHeight: Default grid height as CSS value (e.g. '15em').
            elasticView: Index of the view to make elastic (fills available space).
            singleClickEdit: If True, single click starts cell editing.
            keepRows: Number of rows to keep in the rendering cache.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.virtualGrid(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::virtualGrid:L523`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
