# dateTextBox

## Identity

- **Identity:** `dateTextBox`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::dateTextBox:L86`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Current date value (ISO format string). |
| `constraints` | dict \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Dict with min, max, datePattern constraints. |
| `required` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, the field must be filled in. |
| `invalidMessage` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Message displayed when the value is invalid. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::dateTextBox:L86`: A validating, serializable, range-bound date text box with a popup calendar. Args: value: Current date value (ISO format string). constraints: Dict with min, max, datePattern constraints. required: If True, the field must be filled in. invalidMessage: Message displayed when the value is invalid.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::dateTextBox:L86`

```python
def dateTextBox(self, value: str | None = None,
                    constraints: dict | None = None,
                    required: bool = False,
                    invalidMessage: str | None = None,
                    **kwargs):
        """A validating, serializable, range-bound date text box with a popup calendar.

        Args:
            value: Current date value (ISO format string).
            constraints: Dict with min, max, datePattern constraints.
            required: If True, the field must be filled in.
            invalidMessage: Message displayed when the value is invalid.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.dateTextBox(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::dateTextBox:L86`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `js/dom/src/components/builtin-components.json`, `src/gramlot/grammar/inputs.py:L48`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
