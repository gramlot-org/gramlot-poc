# DbSelect

## Identity

- **Identity:** `DbSelect`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `GenroWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::DbSelect:L86`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `dbtable` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Table address in package.table format (e.g. 'app.customer'). |
| `value` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Datastore path for the selected record's pkey (^path syntax). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::DbSelect:L86`: Database-connected autocomplete select widget. Progressive search: startswith -> contains -> regex word boundary -> ILIKE. Args: dbtable: Table address in package.table format (e.g. 'app.customer'). value: Datastore path for the selected record's pkey (^path syntax). **kwargs: Common attrs: lbl, columns, auxColumns, condition, condition_*, selected_*, hasDownArrow, alternatePkey, order_by, limit, validate_notnull, width.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::DbSelect:L86`

```python
def DbSelect(self, dbtable=None, value=None, **kwargs):
        """Database-connected autocomplete select widget.

        Progressive search: startswith -> contains -> regex word boundary -> ILIKE.

        Args:
            dbtable: Table address in package.table format (e.g. 'app.customer').
            value: Datastore path for the selected record's pkey (^path syntax).
            **kwargs: Common attrs: lbl, columns, auxColumns, condition, condition_*,
                selected_*, hasDownArrow, alternatePkey, order_by, limit,
                validate_notnull, width.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.DbSelect(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::DbSelect:L86`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `js/dom/src/components/builtin-components.json`, `src/gramlot/grammar/inputs.py:L24`, `src/gramlot/grammar/logic.py:L73`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
