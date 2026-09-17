# slotButton

## Identity

- **Identity:** `slotButton`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GenroWidgets`, `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotButton:L150`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the button's :ref:`tooltip` (or its label, if no *iconClass* is set) |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | * **action**: allow to execute a javascript callback. For more information, |

- **Forwarded keyword names:** `label`, `tag`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::SlotButton:L640`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Button tooltip (or visible label if no iconClass). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotButton:L150`: Return a :ref:`slotbutton`. A slotbutton is a :ref:`button` with some preset attributes to create rapidly a button with an icon (set through the *iconClass* attribute) and with a label that works only as a tooltip: for example you can use a slotButton when you handle a :ref:`toolbar <toolbars>` or a :ref:`palette <palette>` :param label: the button's :ref:`tooltip` (or its label, if no *iconClass* is set) :param kwargs: * **action**: allow to execute a javascript callback. For more information, check the :ref:`action_attr` section * **iconClass**: the button icon. For more information, check the :ref:`iconclass` section * **showLabel**: boolean. If ``True``, show the button label * **value**: specify the path of the widget's value. For more information, check the :ref:`datapath` page
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::SlotButton:L640`: Compact button designed for toolbars and slot areas. The label acts as tooltip when iconClass is set. Args: label: Button tooltip (or visible label if no iconClass). **kwargs: action (JavaScript), iconClass, publish, topic.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotButton:L150`

```python
def slotButton(self, label=None, **kwargs):
        """Return a :ref:`slotbutton`. A slotbutton is a :ref:`button` with some preset attributes
        to create rapidly a button with an icon (set through the *iconClass* attribute) and with
        a label that works only as a tooltip: for example you can use a slotButton when you handle
        a :ref:`toolbar <toolbars>` or a :ref:`palette <palette>`
        
        :param label: the button's :ref:`tooltip` (or its label, if no *iconClass* is set)
        :param kwargs:
        
                       * **action**: allow to execute a javascript callback. For more information,
                         check the :ref:`action_attr` section
                       * **iconClass**: the button icon. For more information, check the :ref:`iconclass` section
                       * **showLabel**: boolean. If ``True``, show the button label
                       * **value**: specify the path of the widget's value. For more information,
                         check the :ref:`datapath` page
        """
        return self.child(tag='SlotButton',label=label,**kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::SlotButton:L640`

```python
def SlotButton(self, label=None, **kwargs):
        """Compact button designed for toolbars and slot areas.

        The label acts as tooltip when iconClass is set.

        Args:
            label: Button tooltip (or visible label if no iconClass).
            **kwargs: action (JavaScript), iconClass, publish, topic.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.slotButton(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotButton:L150`
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::SlotButton:L640`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
