# validationTextBox

## Identity

- **Identity:** `validationTextBox`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::validationTextBox:L33`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Current value of the textbox. |
| `regExp` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Regular expression string for validation. |
| `required` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, the field must be filled in. |
| `invalidMessage` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Message displayed when the value is invalid. |
| `promptMessage` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Message displayed when the field is focused and empty. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::validationTextBox:L33`: A TextBox with the ability to validate content and provide user feedback. Args: value: Current value of the textbox. regExp: Regular expression string for validation. required: If True, the field must be filled in. invalidMessage: Message displayed when the value is invalid. promptMessage: Message displayed when the field is focused and empty.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::validationTextBox:L33`

```python
def validationTextBox(self, value: str | None = None,
                          regExp: str | None = None,
                          required: bool = False,
                          invalidMessage: str | None = None,
                          promptMessage: str | None = None,
                          **kwargs):
        """A TextBox with the ability to validate content and provide user feedback.

        Args:
            value: Current value of the textbox.
            regExp: Regular expression string for validation.
            required: If True, the field must be filled in.
            invalidMessage: Message displayed when the value is invalid.
            promptMessage: Message displayed when the field is focused and empty.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.validationTextBox(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::validationTextBox:L33`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
