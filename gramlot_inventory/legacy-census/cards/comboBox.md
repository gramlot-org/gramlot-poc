# comboBox

## Identity

- **Identity:** `comboBox`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::comboBox:L198`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Current value. |
| `store` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Data store providing the list of values. |
| `searchAttr` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Attribute of store items to search against. |
| `autoComplete` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, auto-completes the first matching value. |
| `hasDownArrow` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, shows the drop-down arrow button. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::comboBox:L198`: Auto-completing text box. Base class for FilteringSelect. Values in the drop-down are populated from a data provider that filters based on user input. Args: value: Current value. store: Data store providing the list of values. searchAttr: Attribute of store items to search against. autoComplete: If True, auto-completes the first matching value. hasDownArrow: If True, shows the drop-down arrow button.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::comboBox:L198`

```python
def comboBox(self, value: str | None = None,
                 store: str | None = None,
                 searchAttr: str | None = None,
                 autoComplete: bool = True,
                 hasDownArrow: bool = True,
                 **kwargs):
        """Auto-completing text box. Base class for FilteringSelect.

        Values in the drop-down are populated from a data provider that
        filters based on user input.

        Args:
            value: Current value.
            store: Data store providing the list of values.
            searchAttr: Attribute of store items to search against.
            autoComplete: If True, auto-completes the first matching value.
            hasDownArrow: If True, shows the drop-down arrow button.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.comboBox(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::comboBox:L198`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `js/dom/src/components/builtin-components.json`, `src/gramlot/grammar/inputs.py:L39`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
