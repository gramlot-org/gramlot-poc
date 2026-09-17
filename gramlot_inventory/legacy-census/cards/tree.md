# tree

## Identity

- **Identity:** `tree`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::tree:L581`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `model` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Data model providing the tree structure. |
| `store` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Data store to query items from (may be removed in Dojo 2.0). |
| `query` | dict \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Query object to get top-level children from the store. |
| `label` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Label for a synthetic root node (makes it a single-root tree). |
| `showRoot` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, shows the root node; if False, only children are visible. |
| `persist` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, saves expand/collapse state in a cookie. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::tree:L581`: Displays hierarchical data from a store as an expandable tree. Loads children lazily as the user expands nodes. Technically a forest (multiple roots) unless label is specified to create a single root. Args: model: Data model providing the tree structure. store: Data store to query items from (may be removed in Dojo 2.0). query: Query object to get top-level children from the store. label: Label for a synthetic root node (makes it a single-root tree). showRoot: If True, shows the root node; if False, only children are visible. persist: If True, saves expand/collapse state in a cookie.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::tree:L581`

```python
def tree(self, model: str | None = None,
             store: str | None = None,
             query: dict | None = None,
             label: str | None = None,
             showRoot: bool = True,
             persist: bool = False,
             **kwargs):
        """Displays hierarchical data from a store as an expandable tree.

        Loads children lazily as the user expands nodes. Technically a forest
        (multiple roots) unless label is specified to create a single root.

        Args:
            model: Data model providing the tree structure.
            store: Data store to query items from (may be removed in Dojo 2.0).
            query: Query object to get top-level children from the store.
            label: Label for a synthetic root node (makes it a single-root tree).
            showRoot: If True, shows the root node; if False, only children are visible.
            persist: If True, saves expand/collapse state in a cookie.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.tree(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::tree:L581`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
