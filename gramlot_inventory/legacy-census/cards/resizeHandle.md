# resizeHandle

## Identity

- **Identity:** `resizeHandle`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::resizeHandle:L64`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `targetId` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Id of the Widget or DomNode to resize. |
| `targetContainer` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Direct DomNode reference to resize (overrides targetId). |
| `resizeAxis` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Axis constraint ('x', 'y', or 'xy'). |
| `activeResize` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, node resizes in realtime with mouse movement. |
| `activeResizeClass` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | CSS class for the virtual resize clone node. |
| `animateSizing` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, animate to new size on mouseUp (only when activeResize is False). |
| `animateMethod` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Animation style ('chain' or 'combine'). |
| `animateDuration` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Animation duration in ms. |
| `minHeight` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Minimum height in px. |
| `minWidth` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Minimum width in px. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::resizeHandle:L64`: Draggable handle to resize an attached node. Args: targetId: Id of the Widget or DomNode to resize. targetContainer: Direct DomNode reference to resize (overrides targetId). resizeAxis: Axis constraint ('x', 'y', or 'xy'). activeResize: If True, node resizes in realtime with mouse movement. activeResizeClass: CSS class for the virtual resize clone node. animateSizing: If True, animate to new size on mouseUp (only when activeResize is False). animateMethod: Animation style ('chain' or 'combine'). animateDuration: Animation duration in ms. minHeight: Minimum height in px. minWidth: Minimum width in px.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::resizeHandle:L64`

```python
def resizeHandle(self, targetId: str | None = None,
                     targetContainer: str | None = None,
                     resizeAxis: str | None = None,
                     activeResize: bool = False,
                     activeResizeClass: str | None = None,
                     animateSizing: bool = True,
                     animateMethod: str | None = None,
                     animateDuration: int | None = None,
                     minHeight: int | None = None,
                     minWidth: int | None = None,
                     **kwargs):
        """Draggable handle to resize an attached node.

        Args:
            targetId: Id of the Widget or DomNode to resize.
            targetContainer: Direct DomNode reference to resize (overrides targetId).
            resizeAxis: Axis constraint ('x', 'y', or 'xy').
            activeResize: If True, node resizes in realtime with mouse movement.
            activeResizeClass: CSS class for the virtual resize clone node.
            animateSizing: If True, animate to new size on mouseUp (only when activeResize is False).
            animateMethod: Animation style ('chain' or 'combine').
            animateDuration: Animation duration in ms.
            minHeight: Minimum height in px.
            minWidth: Minimum width in px.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.resizeHandle(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::resizeHandle:L64`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
