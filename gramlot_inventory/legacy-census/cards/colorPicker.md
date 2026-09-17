# colorPicker

## Identity

- **Identity:** `colorPicker`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::colorPicker:L239`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `showRgb` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Show/update RGB input fields. |
| `showHsv` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Show/update HSV input fields. |
| `showHex` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Show/update hex value field. |
| `webSafe` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Show web-safe color preview. |
| `animatePoint` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, animate cursor movement on click. |
| `slideDuration` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Animation duration in ms when animatePoint is True. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::colorPicker:L239`: HSV color picker similar to Photoshop's color selection tool. Args: showRgb: Show/update RGB input fields. showHsv: Show/update HSV input fields. showHex: Show/update hex value field. webSafe: Show web-safe color preview. animatePoint: If True, animate cursor movement on click. slideDuration: Animation duration in ms when animatePoint is True.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::colorPicker:L239`

```python
def colorPicker(self, showRgb: bool = True,
                    showHsv: bool = True,
                    showHex: bool = True,
                    webSafe: bool = True,
                    animatePoint: bool = True,
                    slideDuration: int | None = None,
                    **kwargs):
        """HSV color picker similar to Photoshop's color selection tool.

        Args:
            showRgb: Show/update RGB input fields.
            showHsv: Show/update HSV input fields.
            showHex: Show/update hex value field.
            webSafe: Show web-safe color preview.
            animatePoint: If True, animate cursor movement on click.
            slideDuration: Animation duration in ms when animatePoint is True.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.colorPicker(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::colorPicker:L239`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `js/dom/src/components/builtin-components.json`, `src/gramlot/grammar/inputs.py:L66`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
