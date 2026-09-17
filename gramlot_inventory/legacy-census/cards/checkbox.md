# checkbox

## Identity

- **Identity:** `checkbox`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `DijitWidgets`, `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `checkbox`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::checkbox:L824`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the checkbox path for value. For more information, check the |
| `label` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the checkbox label |
| `lbl` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `box__class`

- **Forwarded keyword names:** `label`, `lbl`, `value`

- **Conditions:** `'box__class' not in kwargs`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::checkBox:L164`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | bool \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Value submitted with the form when checked. |
| `checked` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, the checkbox is initially checked. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::checkbox:L824`: Return a :ref:`checkbox`: setting the value to true will check the box while false will uncheck it :param label: the checkbox label :param value: the checkbox path for value. For more information, check the :ref:`datapath` section
- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::checkBox:L164`: Same as an HTML checkbox, but with Dojo styling. Supports both high-contrast mode and normal mode rendering. Args: value: Value submitted with the form when checked. checked: If True, the checkbox is initially checked.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::checkbox:L824`

```python
def checkbox(self, value=None, label=None,lbl=None,**kwargs):
        """Return a :ref:`checkbox`: setting the value to true will check the box
        while false will uncheck it

        :param label: the checkbox label
        :param value: the checkbox path for value. For more information, check the
                      :ref:`datapath` section
        """
        if lbl and not label and not getattr(self,'fbuilder',None):
            label = lbl
            lbl = '&nbsp;'
            # Placeholder label: keeps the label height with top/bottom label
            # side so the checkbox lines up with the sibling inputs
            if 'box__class' not in kwargs:
                kwargs['box__class'] = 'formlet_placeholder_label'
        return self.child('checkbox', value=value, label=label,lbl=lbl, **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::checkBox:L164`

```python
def checkBox(self, value: bool | None = None,
                 checked: bool = False,
                 **kwargs):
        """Same as an HTML checkbox, but with Dojo styling.

        Supports both high-contrast mode and normal mode rendering.

        Args:
            value: Value submitted with the form when checked.
            checked: If True, the checkbox is initially checked.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.checkbox(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::checkbox:L824`
- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::checkBox:L164`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `js/dom/src/components/builtin-components.json`, `src/gramlot/grammar/inputs.py:L60`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
