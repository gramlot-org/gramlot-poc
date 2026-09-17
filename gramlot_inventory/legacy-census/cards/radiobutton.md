# radiobutton

## Identity

- **Identity:** `radiobutton`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`, `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `radiobutton`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::radiobutton:L809`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the radiobutton label |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | * *group*: allow to create a radiobutton group. To create a group, give |

- **Forwarded keyword names:** `label`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::radioButton:L178`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Value submitted with the form when selected. |
| `checked` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, this radio is initially selected. |
| `name` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Group name for mutually exclusive radio buttons. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::radiobutton:L809`: :ref:`Radiobuttons <radiobutton>` are used when you want to let the user select one - and just one - option from a set of choices (if more options are to be allowed at the same time you should use :ref:`checkboxes <checkbox>` instead) :param label: the radiobutton label :param kwargs: * *group*: allow to create a radiobutton group. To create a group, give the same string to the *group* attribute of many radiobuttons. You can obviously create more than a group giving a different string to the *group* attribute (for more information, check the :ref:`rb_examples_group`)
- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::radioButton:L178`: Same as an HTML radio button, but with Dojo styling. Radio grouping is managed by dijit, not by the browser. Args: value: Value submitted with the form when selected. checked: If True, this radio is initially selected. name: Group name for mutually exclusive radio buttons.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::radiobutton:L809`

```python
def radiobutton(self, label=None, **kwargs):
        """:ref:`Radiobuttons <radiobutton>` are used when you want to let the user select
        one - and just one - option from a set of choices (if more options are to be allowed
        at the same time you should use :ref:`checkboxes <checkbox>` instead)
        
        :param label: the radiobutton label
        :param kwargs: 
                       
                       * *group*: allow to create a radiobutton group. To create a group, give
                         the same string to the *group* attribute of many radiobuttons. You can
                         obviously create more than a group giving a different string to the *group*
                         attribute (for more information, check the :ref:`rb_examples_group`)
        """
        return self.child('radiobutton', label=label, **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::radioButton:L178`

```python
def radioButton(self, value: str | None = None,
                    checked: bool = False,
                    name: str | None = None,
                    **kwargs):
        """Same as an HTML radio button, but with Dojo styling.

        Radio grouping is managed by dijit, not by the browser.

        Args:
            value: Value submitted with the form when selected.
            checked: If True, this radio is initially selected.
            name: Group name for mutually exclusive radio buttons.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.radiobutton(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::radiobutton:L809`
- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::radioButton:L178`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
