# radiogroup

## Identity

- **Identity:** `radiogroup`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`, `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::radiogroup:L901`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `labels` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `group` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `cols` | not declared | optional | `1` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `datapath` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `cols`, `datapath`, `group`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::radioGroup:L52`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `duration` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Animation duration in ms for Fade/Slide variants. |
| `hasButtons` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, generates internal hover buttons for each child. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::radiogroup:L901`: .. warning:: deprecated since version 0.7
- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::radioGroup:L52`: StackContainer that transitions between children on hover of generated buttons. Args: duration: Animation duration in ms for Fade/Slide variants. hasButtons: If True, generates internal hover buttons for each child.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::radiogroup:L901`

```python
def radiogroup(self, labels, group, cols=1, datapath=None, **kwargs):
        """.. warning:: deprecated since version 0.7"""
        if isinstance(labels, str):
            labels = labels.split(',')
        pane = self.div(datapath=datapath, **kwargs).formbuilder(cols=cols)
        for label in labels:
            if(datapath):
                pane.radioButton(label, group=group, datapath=':%s' % label)
            else:
                pane.radioButton(label, group=group)
```

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::radioGroup:L52`

```python
def radioGroup(self, duration: int | None = None,
                   hasButtons: bool = True,
                   **kwargs):
        """StackContainer that transitions between children on hover of generated buttons.

        Args:
            duration: Animation duration in ms for Fade/Slide variants.
            hasButtons: If True, generates internal hover buttons for each child.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.radiogroup(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::radiogroup:L901`
- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::radioGroup:L52`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
