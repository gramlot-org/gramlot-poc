# currencyTextBox

## Identity

- **Identity:** `currencyTextBox`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::currencyTextBox:L70`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | float \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Current currency value. |
| `currency` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | ISO 4217 currency code (e.g. 'USD', 'EUR'). |
| `constraints` | dict \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Dict with min, max, places constraints. |
| `required` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, the field must be filled in. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::currencyTextBox:L70`: A validating currency textbox. Args: value: Current currency value. currency: ISO 4217 currency code (e.g. 'USD', 'EUR'). constraints: Dict with min, max, places constraints. required: If True, the field must be filled in.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::currencyTextBox:L70`

```python
def currencyTextBox(self, value: float | None = None,
                        currency: str | None = None,
                        constraints: dict | None = None,
                        required: bool = False,
                        **kwargs):
        """A validating currency textbox.

        Args:
            value: Current currency value.
            currency: ISO 4217 currency code (e.g. 'USD', 'EUR').
            constraints: Dict with min, max, places constraints.
            required: If True, the field must be filled in.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.currencyTextBox(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::currencyTextBox:L70`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
