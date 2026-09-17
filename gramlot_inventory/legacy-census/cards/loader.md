# loader

## Identity

- **Identity:** `loader`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::loader:L144`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `loadIcon` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | URL to the loading icon image. |
| `loadMessage` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Text to display during loading. |
| `hasVisuals` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, shows a fixed loading message in the corner. |
| `attachToPointer` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, shows indicator near the mouse cursor. |
| `duration` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Time in ms to toggle the visual indicator in/out. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::loader:L144`: Global XHR listener that displays a loading indicator during requests. Args: loadIcon: URL to the loading icon image. loadMessage: Text to display during loading. hasVisuals: If True, shows a fixed loading message in the corner. attachToPointer: If True, shows indicator near the mouse cursor. duration: Time in ms to toggle the visual indicator in/out.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::loader:L144`

```python
def loader(self, loadIcon: str | None = None,
               loadMessage: str | None = None,
               hasVisuals: bool = True,
               attachToPointer: bool = True,
               duration: int | None = None,
               **kwargs):
        """Global XHR listener that displays a loading indicator during requests.

        Args:
            loadIcon: URL to the loading icon image.
            loadMessage: Text to display during loading.
            hasVisuals: If True, shows a fixed loading message in the corner.
            attachToPointer: If True, shows indicator near the mouse cursor.
            duration: Time in ms to toggle the visual indicator in/out.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.loader(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::loader:L144`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
