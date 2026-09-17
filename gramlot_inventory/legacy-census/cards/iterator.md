# iterator

## Identity

- **Identity:** `iterator`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::iterator:L295`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `store` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Data store providing the items. |
| `query` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Query object for the store fetch. |
| `data` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Direct array of objects or strings to iterate. |
| `start` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Start index for fetching. |
| `fetchMax` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Maximum number of items to fetch. |
| `defaultValue` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Default value for missing attributes. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::iterator:L295`: Repeater widget that iterates over store items or data arrays using a template. Args: store: Data store providing the items. query: Query object for the store fetch. data: Direct array of objects or strings to iterate. start: Start index for fetching. fetchMax: Maximum number of items to fetch. defaultValue: Default value for missing attributes.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::iterator:L295`

```python
def iterator(self, store: str | None = None,
                 query: str | None = None,
                 data: str | None = None,
                 start: int | None = None,
                 fetchMax: int | None = None,
                 defaultValue: str | None = None,
                 **kwargs):
        """Repeater widget that iterates over store items or data arrays using a template.

        Args:
            store: Data store providing the items.
            query: Query object for the store fetch.
            data: Direct array of objects or strings to iterate.
            start: Start index for fetching.
            fetchMax: Maximum number of items to fetch.
            defaultValue: Default value for missing attributes.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.iterator(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::iterator:L295`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
