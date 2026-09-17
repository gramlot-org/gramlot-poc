# fisheyeList

## Identity

- **Identity:** `fisheyeList`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::fisheyeList:L114`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `itemWidth` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Dormant item width in px. |
| `itemHeight` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Dormant item height in px. |
| `itemMaxWidth` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Fully enlarged item width in px. |
| `itemMaxHeight` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Fully enlarged item height in px. |
| `orientation` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Layout direction ('horizontal' or 'vertical'). |
| `isFixed` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, adds window scroll listener for fixed positioning. |
| `conservativeTrigger` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, enlarge only when mouse is over an item. |
| `effectUnits` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | How much reaction the menu makes relative to mouse distance. |
| `itemPadding` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Padding in px between each menu item. |
| `attachEdge` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Border that items expand from ('center','left','right','top','bottom'). |
| `labelEdge` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Position of labels relative to icons ('center','left','right','top','bottom'). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::fisheyeList:L114`: Mac OS-style fisheye menu with icon magnification on hover. Args: itemWidth: Dormant item width in px. itemHeight: Dormant item height in px. itemMaxWidth: Fully enlarged item width in px. itemMaxHeight: Fully enlarged item height in px. orientation: Layout direction ('horizontal' or 'vertical'). isFixed: If True, adds window scroll listener for fixed positioning. conservativeTrigger: If True, enlarge only when mouse is over an item. effectUnits: How much reaction the menu makes relative to mouse distance. itemPadding: Padding in px between each menu item. attachEdge: Border that items expand from ('center','left','right','top','bottom'). labelEdge: Position of labels relative to icons ('center','left','right','top','bottom').
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::fisheyeList:L114`

```python
def fisheyeList(self, itemWidth: int | None = None,
                    itemHeight: int | None = None,
                    itemMaxWidth: int | None = None,
                    itemMaxHeight: int | None = None,
                    orientation: str | None = None,
                    isFixed: bool = False,
                    conservativeTrigger: bool = False,
                    effectUnits: int | None = None,
                    itemPadding: int | None = None,
                    attachEdge: str | None = None,
                    labelEdge: str | None = None,
                    **kwargs):
        """Mac OS-style fisheye menu with icon magnification on hover.

        Args:
            itemWidth: Dormant item width in px.
            itemHeight: Dormant item height in px.
            itemMaxWidth: Fully enlarged item width in px.
            itemMaxHeight: Fully enlarged item height in px.
            orientation: Layout direction ('horizontal' or 'vertical').
            isFixed: If True, adds window scroll listener for fixed positioning.
            conservativeTrigger: If True, enlarge only when mouse is over an item.
            effectUnits: How much reaction the menu makes relative to mouse distance.
            itemPadding: Padding in px between each menu item.
            attachEdge: Border that items expand from ('center','left','right','top','bottom').
            labelEdge: Position of labels relative to icons ('center','left','right','top','bottom').
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.fisheyeList(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::fisheyeList:L114`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
