# sortList

## Identity

- **Identity:** `sortList`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::sortList:L259`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `title` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Title displayed in the header. |
| `heading` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Alternate title for parent container (TabContainer, AccordionContainer). |
| `descending` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, sort in descending order. |
| `sortable` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Enable/disable sorting. |
| `store` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Data store reference name. |
| `key` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Attribute name to use from the store. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::sortList:L259`: Sortable unordered list with a fixed header. Args: title: Title displayed in the header. heading: Alternate title for parent container (TabContainer, AccordionContainer). descending: If True, sort in descending order. sortable: Enable/disable sorting. store: Data store reference name. key: Attribute name to use from the store.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::sortList:L259`

```python
def sortList(self, title: str | None = None,
                 heading: str | None = None,
                 descending: bool = True,
                 sortable: bool = True,
                 store: str | None = None,
                 key: str | None = None,
                 **kwargs):
        """Sortable unordered list with a fixed header.

        Args:
            title: Title displayed in the header.
            heading: Alternate title for parent container (TabContainer, AccordionContainer).
            descending: If True, sort in descending order.
            sortable: Enable/disable sorting.
            store: Data store reference name.
            key: Attribute name to use from the store.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.sortList(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::sortList:L259`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
