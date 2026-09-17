# quickgrid

## Identity

- **Identity:** `quickgrid`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `GenroWidgets`, `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `quickgrid`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::quickgrid:L432`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `childname` | not declared | optional | `'grid'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `childname`, `value`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::QuickGrid:L231`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Datastore path to the Bag containing grid data (^path syntax). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::quickgrid:L432`: No behavior docstring is present in the primary declaration.
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::QuickGrid:L231`: Lightweight grid widget for displaying and editing tabular data. Supports inline editing, column configuration, and tools (addrow, delrow, export). Args: value: Datastore path to the Bag containing grid data (^path syntax). **kwargs: Common attrs: columns, height, width, border, default_*, selfDragRows, canSort, canFilter.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::quickgrid:L432`

```python
def quickgrid(self,value,childname='grid',**kwargs):
        return self.child('quickgrid',value=value,childname=childname,**kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::QuickGrid:L231`

```python
def QuickGrid(self, value=None, **kwargs):
        """Lightweight grid widget for displaying and editing tabular data.

        Supports inline editing, column configuration, and tools (addrow, delrow, export).

        Args:
            value: Datastore path to the Bag containing grid data (^path syntax).
            **kwargs: Common attrs: columns, height, width, border, default_*,
                selfDragRows, canSort, canFilter.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.quickgrid(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::quickgrid:L432`
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::QuickGrid:L231`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `src/gramlot/grammar/grid.py:L7`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
