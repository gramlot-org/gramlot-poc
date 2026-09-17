# verticalSlider

## Identity

- **Identity:** `verticalSlider`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::verticalSlider:L278`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | float \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Current slider value. |
| `minimum` | float | optional | `0` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Minimum value of the slider. |
| `maximum` | float | optional | `100` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Maximum value of the slider. |
| `discreteValues` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Number of discrete positions (snapping). |
| `showButtons` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, shows increment/decrement buttons at the ends. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::verticalSlider:L278`: A form widget to select a value with a vertically draggable handle. Args: value: Current slider value. minimum: Minimum value of the slider. maximum: Maximum value of the slider. discreteValues: Number of discrete positions (snapping). showButtons: If True, shows increment/decrement buttons at the ends.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::verticalSlider:L278`

```python
def verticalSlider(self, value: float | None = None,
                       minimum: float = 0,
                       maximum: float = 100,
                       discreteValues: int | None = None,
                       showButtons: bool = True,
                       **kwargs):
        """A form widget to select a value with a vertically draggable handle.

        Args:
            value: Current slider value.
            minimum: Minimum value of the slider.
            maximum: Maximum value of the slider.
            discreteValues: Number of discrete positions (snapping).
            showButtons: If True, shows increment/decrement buttons at the ends.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.verticalSlider(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::verticalSlider:L278`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `js/dom/src/components/builtin-components.json`, `src/gramlot/grammar/inputs.py:L57`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
