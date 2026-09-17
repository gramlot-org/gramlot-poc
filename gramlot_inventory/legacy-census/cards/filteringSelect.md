# filteringSelect

## Identity

- **Identity:** `filteringSelect`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::filteringSelect:L219`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Current hidden value (e.g. 'CA'). |
| `store` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Data store providing the list of values. |
| `searchAttr` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Attribute to search against. |
| `labelAttr` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Attribute for the displayed text (defaults to searchAttr). |
| `autoComplete` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, auto-completes the first matching value. |
| `hasDownArrow` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, shows the drop-down arrow button. |
| `required` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, the field must have a value. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::filteringSelect:L219`: An enhanced SELECT populated dynamically. Only allows values from the list. The submitted value is the hidden value, not the displayed label. Filters the drop-down list as you type. Args: value: Current hidden value (e.g. 'CA'). store: Data store providing the list of values. searchAttr: Attribute to search against. labelAttr: Attribute for the displayed text (defaults to searchAttr). autoComplete: If True, auto-completes the first matching value. hasDownArrow: If True, shows the drop-down arrow button. required: If True, the field must have a value.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::filteringSelect:L219`

```python
def filteringSelect(self, value: str | None = None,
                        store: str | None = None,
                        searchAttr: str | None = None,
                        labelAttr: str | None = None,
                        autoComplete: bool = True,
                        hasDownArrow: bool = True,
                        required: bool = False,
                        **kwargs):
        """An enhanced SELECT populated dynamically. Only allows values from the list.

        The submitted value is the hidden value, not the displayed label.
        Filters the drop-down list as you type.

        Args:
            value: Current hidden value (e.g. 'CA').
            store: Data store providing the list of values.
            searchAttr: Attribute to search against.
            labelAttr: Attribute for the displayed text (defaults to searchAttr).
            autoComplete: If True, auto-completes the first matching value.
            hasDownArrow: If True, shows the drop-down arrow button.
            required: If True, the field must have a value.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.filteringSelect(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::filteringSelect:L219`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `js/dom/src/components/builtin-components.json`, `src/gramlot/grammar/inputs.py:L21`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
