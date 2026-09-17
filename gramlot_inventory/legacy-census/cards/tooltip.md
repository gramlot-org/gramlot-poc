# tooltip

## Identity

- **Identity:** `tooltip`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`, `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `tooltip`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::tooltip:L787`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | not declared | optional | `''` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the tooltip text |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `label`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::tooltip:L525`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Text to display in the tooltip (supports HTML). |
| `connectId` | str \| list \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | ID (or list of IDs) of nodes to attach the tooltip to. |
| `showDelay` | int | optional | `400` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Milliseconds to wait before showing the tooltip. |
| `position` | list \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | List of preferred positions ('above', 'below', 'after', 'before'). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::tooltip:L787`: Create a :ref:`tooltip` and return it :param label: the tooltip text
- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::tooltip:L525`: A tooltip that pops up a help message when hovering over a node. Args: label: Text to display in the tooltip (supports HTML). connectId: ID (or list of IDs) of nodes to attach the tooltip to. showDelay: Milliseconds to wait before showing the tooltip. position: List of preferred positions ('above', 'below', 'after', 'before').
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::tooltip:L787`

```python
def tooltip(self, label='', **kwargs):
        """Create a :ref:`tooltip` and return it
        
        :param label: the tooltip text"""
        return self.child('tooltip', label=label, **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::tooltip:L525`

```python
def tooltip(self, label: str | None = None,
                connectId: str | list | None = None,
                showDelay: int = 400,
                position: list | None = None,
                **kwargs):
        """A tooltip that pops up a help message when hovering over a node.

        Args:
            label: Text to display in the tooltip (supports HTML).
            connectId: ID (or list of IDs) of nodes to attach the tooltip to.
            showDelay: Milliseconds to wait before showing the tooltip.
            position: List of preferred positions ('above', 'below', 'after', 'before').
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.tooltip(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::tooltip:L787`
- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::tooltip:L525`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
