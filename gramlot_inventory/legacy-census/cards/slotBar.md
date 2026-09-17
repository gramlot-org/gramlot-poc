# slotBar

## Identity

- **Identity:** `slotBar`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `slotBar`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotBar:L711`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `slots` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | MANDATORY. Create a configurable UI inside the div or :ref:`contentpane` |
| `slotbarCode` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | autocreate a :ref:`nodeid` for the slotToolbar AND autocreate |
| `namespace` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `childname` | not declared | optional | `'bar'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the slotBar :ref:`childname` |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `frameCode`, `namespace`

- **Forwarded keyword names:** `childname`, `frame`, `frameCode`, `namespace`, `prefix`, `slotbarCode`, `slots`, `toolbarArgs`

- **Conditions:** `slot != '*'`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotBar:L711`: Create a :ref:`slotBar <slotbar>` and returns it. A slotBar is a Genro :ref:`toolbar <toolbars>` :param slots: MANDATORY. Create a configurable UI inside the div or :ref:`contentpane` in which the slotToolbar is defined. For more information, check the :ref:`slotbar_slots` section :param slotbarCode: autocreate a :ref:`nodeid` for the slotToolbar AND autocreate hierarchic nodeIds for every slotToolbar child :param namespace: TODO :param childname: the slotBar :ref:`childname`
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotBar:L711`

```python
def slotBar(self, slots=None, slotbarCode=None, namespace=None, childname='bar', **kwargs):
        """Create a :ref:`slotBar <slotbar>` and returns it. A slotBar is a Genro
        :ref:`toolbar <toolbars>`
        
        :param slots: MANDATORY. Create a configurable UI inside the div or :ref:`contentpane`
                      in which the slotToolbar is defined. For more information, check the
                      :ref:`slotbar_slots` section
        :param slotbarCode: autocreate a :ref:`nodeid` for the slotToolbar AND autocreate
                            hierarchic nodeIds for every slotToolbar child
        :param namespace: TODO
        :param childname: the slotBar :ref:`childname`
        """
        namespace = namespace or self.parent.attributes.get('namespace')
        tb = self.child('slotBar',slotbarCode=slotbarCode,slots=slots,childname=childname,**kwargs)
        toolbarArgs = tb.attributes
        slots = gnrstring.splitAndStrip(str(slots))
        frame = self.parent
        frameCode = self.getInheritedAttributes().get('frameCode')
        prefix = slotbarCode or frameCode
        for slot in slots:
            if slot!='*' and slot!='|' and not slot.isdigit():
                tb._addSlot(slot,prefix=prefix,frame=frame,frameCode=frameCode,namespace=namespace,toolbarArgs=toolbarArgs)
        return tb
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.slotBar(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotBar:L711`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
