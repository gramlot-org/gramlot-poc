# tooltipDialog

## Identity

- **Identity:** `tooltipDialog`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::tooltipDialog:L468`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `title` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Description of the tooltip dialog (required for accessibility). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::tooltipDialog:L468`: A popup dialog that appears like a Tooltip. Typically used with DropDownButton. Args: title: Description of the tooltip dialog (required for accessibility).
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::tooltipDialog:L468`

```python
def tooltipDialog(self, title: str | None = None,
                      **kwargs):
        """A popup dialog that appears like a Tooltip. Typically used with DropDownButton.

        Args:
            title: Description of the tooltip dialog (required for accessibility).
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.tooltipDialog(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::tooltipDialog:L468`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
