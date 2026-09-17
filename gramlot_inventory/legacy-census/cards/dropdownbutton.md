# dropdownbutton

## Identity

- **Identity:** `dropdownbutton`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`, `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `dropdownbutton`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dropdownbutton:L841`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the button label |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | * **iconClass**: the button icon. For more information, check the :ref:`iconclass` section |

- **Forwarded keyword names:** `label`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::dropDownButton:L385`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Text displayed on the button. |
| `iconClass` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | CSS class for the button icon. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dropdownbutton:L841`: The :ref:`dropdownbutton` can be used to build a :ref:`menu` :param label: the button label :param kwargs: * **iconClass**: the button icon. For more information, check the :ref:`iconclass` section * **showLabel**: boolean. If ``True``, show the button label
- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::dropDownButton:L385`: A button that opens a popup (menu or tooltip dialog) when clicked. Args: label: Text displayed on the button. iconClass: CSS class for the button icon.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dropdownbutton:L841`

```python
def dropdownbutton(self, label=None, **kwargs):
        """The :ref:`dropdownbutton` can be used to build a :ref:`menu`
        
        :param label: the button label
        :param kwargs: 
                       
                       * **iconClass**: the button icon. For more information, check the :ref:`iconclass` section
                       * **showLabel**: boolean. If ``True``, show the button label
        """
        return self.child('dropdownbutton', label=label, **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::dropDownButton:L385`

```python
def dropDownButton(self, label: str | None = None,
                       iconClass: str | None = None,
                       **kwargs):
        """A button that opens a popup (menu or tooltip dialog) when clicked.

        Args:
            label: Text displayed on the button.
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
root.dropdownbutton(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dropdownbutton:L841`
- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::dropDownButton:L385`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
