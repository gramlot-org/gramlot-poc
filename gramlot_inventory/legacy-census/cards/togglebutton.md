# togglebutton

## Identity

- **Identity:** `togglebutton`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`, `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `togglebutton`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::togglebutton:L796`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the button's label |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | * **iconClass**: the button icon. For more information, check the :ref:`iconclass` section |

- **Forwarded keyword names:** `label`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::toggleButton:L355`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Text displayed on the button. |
| `checked` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, the button is initially in the checked state. |
| `iconClass` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | CSS class for the button icon. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::togglebutton:L796`: A toggle button is a button that represents a setting with two states: ``True`` and ``False``. Use the *iconclass* attribute to allow the user to know (see) the current status :param label: the button's label :param kwargs: * **iconClass**: the button icon. For more information, check the :ref:`iconclass` section * **showLabel**: boolean. If ``True``, show the button label
- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::toggleButton:L355`: A button that can be in two states (checked or not). Can be used as base for tabs, checkboxes or radio buttons. Args: label: Text displayed on the button. checked: If True, the button is initially in the checked state. iconClass: CSS class for the button icon.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::togglebutton:L796`

```python
def togglebutton(self, label=None, **kwargs):
        """A toggle button is a button that represents a setting with two states:
        ``True`` and ``False``. Use the *iconclass* attribute to allow the user
        to know (see) the current status
        
        :param label: the button's label
        :param kwargs: 
        
                       * **iconClass**: the button icon. For more information, check the :ref:`iconclass` section
                       * **showLabel**: boolean. If ``True``, show the button label
        """
        return self.child('togglebutton', label=label, **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::toggleButton:L355`

```python
def toggleButton(self, label: str | None = None,
                     checked: bool = False,
                     iconClass: str | None = None,
                     **kwargs):
        """A button that can be in two states (checked or not).

        Can be used as base for tabs, checkboxes or radio buttons.

        Args:
            label: Text displayed on the button.
            checked: If True, the button is initially in the checked state.
            iconClass: CSS class for the button icon.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.togglebutton(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::togglebutton:L796`
- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::toggleButton:L355`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
