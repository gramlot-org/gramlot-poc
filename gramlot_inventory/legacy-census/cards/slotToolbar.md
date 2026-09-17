# slotToolbar

## Identity

- **Identity:** `slotToolbar`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotToolbar:L677`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `*args` | not declared | optional variadic | empty tuple | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `toolbar`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotToolbar:L677`: Create a :ref:`slotToolbar <slotbar>` and returns it .. note:: a slotToolbar is a :ref:`slotBar <slotbar>` with some css preset
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotToolbar:L677`

```python
def slotToolbar(self,*args,**kwargs):
        """Create a :ref:`slotToolbar <slotbar>` and returns it
        
        .. note:: a slotToolbar is a :ref:`slotBar <slotbar>` with some css preset
        """
        kwargs.setdefault('toolbar', True)
        return self.slotBar(*args,**kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.slotToolbar(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::slotToolbar:L677`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
