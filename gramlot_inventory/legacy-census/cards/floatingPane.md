# floatingPane

## Identity

- **Identity:** `floatingPane`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::floatingPane:L16`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `title` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Title displayed in the header bar. |
| `closable` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Allow closure of this pane. |
| `dockable` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Allow minimizing (docking) of the pane. |
| `resizable` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Allow resizing of the pane. |
| `maxable` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Allow maximizing the pane to fill the viewport. |
| `resizeAxis` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Resize direction constraint ('x', 'y', or 'xy'). |
| `dockTo` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Id of the Dock widget to minimize into. |
| `duration` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Time in ms for toggle animation. |
| `contentClass` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | CSS class applied to inner content node. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::floatingPane:L16`: Non-modal floating window pane, draggable by title bar. Args: title: Title displayed in the header bar. closable: Allow closure of this pane. dockable: Allow minimizing (docking) of the pane. resizable: Allow resizing of the pane. maxable: Allow maximizing the pane to fill the viewport. resizeAxis: Resize direction constraint ('x', 'y', or 'xy'). dockTo: Id of the Dock widget to minimize into. duration: Time in ms for toggle animation. contentClass: CSS class applied to inner content node.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::floatingPane:L16`

```python
def floatingPane(self, title: str | None = None,
                     closable: bool = True,
                     dockable: bool = True,
                     resizable: bool = False,
                     maxable: bool = False,
                     resizeAxis: str | None = None,
                     dockTo: str | None = None,
                     duration: int | None = None,
                     contentClass: str | None = None,
                     **kwargs):
        """Non-modal floating window pane, draggable by title bar.

        Args:
            title: Title displayed in the header bar.
            closable: Allow closure of this pane.
            dockable: Allow minimizing (docking) of the pane.
            resizable: Allow resizing of the pane.
            maxable: Allow maximizing the pane to fill the viewport.
            resizeAxis: Resize direction constraint ('x', 'y', or 'xy').
            dockTo: Id of the Dock widget to minimize into.
            duration: Time in ms for toggle animation.
            contentClass: CSS class applied to inner content node.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.floatingPane(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::floatingPane:L16`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
