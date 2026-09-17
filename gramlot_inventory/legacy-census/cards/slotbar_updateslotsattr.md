# slotbar_updateslotsattr

## Identity

- **Identity:** `slotbar_updateslotsattr`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotbar_updateslotsattr:L737`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `frameCode`, `namespace`, `slotbarCode`

- **Forwarded keyword names:** `frame`, `frameCode`, `namespace`, `prefix`, `toolbarArgs`

- **Conditions:** `slot != '*'`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotbar_updateslotsattr:L737`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotbar_updateslotsattr:L737`

```python
def slotbar_updateslotsattr(self,**kwargs):
        self.attributes.update(kwargs)
        toolbarArgs = self.attributes
        slotstr = toolbarArgs['slots']
        slots = gnrstring.splitAndStrip(slotstr)
        slotbarCode= toolbarArgs.get('slotbarCode')
        inattr = self.getInheritedAttributes()
        frameCode = inattr.get('frameCode')
        namespace = inattr.get('namespace')
        frame = self.parent.parent
        prefix = slotbarCode or frameCode
        for slot in slots:
            if slot!='*' and slot!='|' and not slot.isdigit():
                self.pop(slot)
                self._addSlot(slot,prefix=prefix,frame=frame,frameCode=frameCode,namespace=namespace,toolbarArgs=toolbarArgs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.slotbar_updateslotsattr(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotbar_updateslotsattr:L737`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
