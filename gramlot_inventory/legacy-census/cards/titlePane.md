# titlePane

## Identity

- **Identity:** `titlePane`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::titlePane:L505`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `title` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Title text displayed in the heading. |
| `open` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, the pane is initially open; if False, collapsed. |
| `duration` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Animation duration in milliseconds. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::titlePane:L505`: A pane with a title that can be opened or collapsed. Extended from ContentPane; supports href for remote content loading. Args: title: Title text displayed in the heading. open: If True, the pane is initially open; if False, collapsed. duration: Animation duration in milliseconds.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::titlePane:L505`

```python
def titlePane(self, title: str | None = None,
                  open: bool = True,
                  duration: int | None = None,
                  **kwargs):
        """A pane with a title that can be opened or collapsed.

        Extended from ContentPane; supports href for remote content loading.

        Args:
            title: Title text displayed in the heading.
            open: If True, the pane is initially open; if False, collapsed.
            duration: Animation duration in milliseconds.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.titlePane(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::titlePane:L505`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
