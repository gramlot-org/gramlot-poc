# htmlChild

## Identity

- **Identity:** `htmlChild`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::htmlChild:L269`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `tag` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the html tag |
| `childcontent` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the html content |
| `value` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `innerHTML`

- **Forwarded keyword names:** `childcontent`

- **Conditions:** `childcontent is not None`, `value is not None`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::htmlChild:L269`: Create an html child and return it :param tag: the html tag :param childcontent: the html content :param value: TODO
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::htmlChild:L269`

```python
def htmlChild(self, tag, childcontent, value=None, **kwargs):
        """Create an html child and return it
        
        :param tag: the html tag
        :param childcontent: the html content
        :param value: TODO"""
        if childcontent is not None :
            kwargs['innerHTML'] = childcontent
            childcontent = None
        elif value is not None:
            kwargs['innerHTML'] = value
            value = None
        return self.child(tag, childcontent=childcontent, **kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.htmlChild(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::htmlChild:L269`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
