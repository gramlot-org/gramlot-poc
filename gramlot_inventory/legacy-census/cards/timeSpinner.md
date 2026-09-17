# timeSpinner

## Identity

- **Identity:** `timeSpinner`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::timeSpinner:L279`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `required` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, the field is required. |
| `smallDelta` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Minute increment for small step (default 5). |
| `largeDelta` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Minute increment for large step (default 30). |
| `value` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Initial time value string (e.g. '12:00 AM'). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::timeSpinner:L279`: Spinner widget for time component of a date, using minute increments. Args: required: If True, the field is required. smallDelta: Minute increment for small step (default 5). largeDelta: Minute increment for large step (default 30). value: Initial time value string (e.g. '12:00 AM').
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::timeSpinner:L279`

```python
def timeSpinner(self, required: bool = False,
                    smallDelta: int | None = None,
                    largeDelta: int | None = None,
                    value: str | None = None,
                    **kwargs):
        """Spinner widget for time component of a date, using minute increments.

        Args:
            required: If True, the field is required.
            smallDelta: Minute increment for small step (default 5).
            largeDelta: Minute increment for large step (default 30).
            value: Initial time value string (e.g. '12:00 AM').
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.timeSpinner(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::timeSpinner:L279`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
