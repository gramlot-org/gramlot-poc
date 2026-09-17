# menuItem

## Identity

- **Identity:** `menuItem`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::menuItem:L418`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Text displayed for this menu item. |
| `iconClass` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | CSS class for the item icon. |
| `disabled` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, the item is grayed out and not clickable. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::menuItem:L418`: A line item in a Menu widget. Renders with three columns: icon, label, and expand arrow (for sub-menus). Args: label: Text displayed for this menu item. iconClass: CSS class for the item icon. disabled: If True, the item is grayed out and not clickable.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::menuItem:L418`

```python
def menuItem(self, label: str | None = None,
                 iconClass: str | None = None,
                 disabled: bool = False,
                 **kwargs):
        """A line item in a Menu widget.

        Renders with three columns: icon, label, and expand arrow (for sub-menus).

        Args:
            label: Text displayed for this menu item.
            iconClass: CSS class for the item icon.
            disabled: If True, the item is grayed out and not clickable.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.menuItem(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::menuItem:L418`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
