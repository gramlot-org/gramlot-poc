# progressBar

## Identity

- **Identity:** `progressBar`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::progressBar:L482`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `progress` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Initial progress value (percentage string or number). |
| `maximum` | float | optional | `100` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Maximum value for absolute progress. |
| `places` | int | optional | `0` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Number of decimal places to display. |
| `indeterminate` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, shows an animated indeterminate progress bar. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::progressBar:L482`: A progress indication widget. Progress can be specified as a percentage string (e.g. '30%') or as an absolute value between 0 and maximum. Args: progress: Initial progress value (percentage string or number). maximum: Maximum value for absolute progress. places: Number of decimal places to display. indeterminate: If True, shows an animated indeterminate progress bar.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::progressBar:L482`

```python
def progressBar(self, progress: str | None = None,
                    maximum: float = 100,
                    places: int = 0,
                    indeterminate: bool = False,
                    **kwargs):
        """A progress indication widget.

        Progress can be specified as a percentage string (e.g. '30%') or
        as an absolute value between 0 and maximum.

        Args:
            progress: Initial progress value (percentage string or number).
            maximum: Maximum value for absolute progress.
            places: Number of decimal places to display.
            indeterminate: If True, shows an animated indeterminate progress bar.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.progressBar(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::progressBar:L482`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
