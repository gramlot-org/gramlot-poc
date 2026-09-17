# menuline

## Identity

- **Identity:** `menuline`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `menuline`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::menuline:L852`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the menuline label. Set it to "``-``" to create a dividing line |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | * *action*: allow to execute a javascript callback. For more information, check |

- **Forwarded keyword names:** `label`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::menuline:L852`: A line of a :ref:`menu` :param label: the menuline label. Set it to "``-``" to create a dividing line in the menu: ``menuline('-')`` :param kwargs: * *action*: allow to execute a javascript callback. For more information, check the :ref:`action_attr` page * *checked*: boolean (by default is ``False``). If ``True``, allow to set a "V" mark on the left side of the *menuline*
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::menuline:L852`

```python
def menuline(self, label=None, **kwargs):
        """A line of a :ref:`menu`
        
        :param label: the menuline label. Set it to "``-``" to create a dividing line
                      in the menu: ``menuline('-')``
        :param kwargs:
                       
                       * *action*: allow to execute a javascript callback. For more information, check
                         the :ref:`action_attr` page
                       * *checked*: boolean (by default is ``False``). If ``True``, allow to set a "V"
                         mark on the left side of the *menuline*
        """
        return self.child('menuline', label=label, **kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.menuline(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::menuline:L852`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
