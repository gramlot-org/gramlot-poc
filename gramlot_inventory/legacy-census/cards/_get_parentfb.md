# _get_parentfb

## Identity

- **Identity:** `_get_parentfb`
- **Type:** internal/reference helper
- **Level:** N/A
- **Purpose:** source-backed census entry; detailed product purpose is internal support for public declarations.
- **Status:** solo riferimento legacy

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::_get_parentfb:L163`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::_get_parentfb:L163`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::_get_parentfb:L163`

```python
def _get_parentfb(self):
        if hasattr(self, 'fbuilder'):
            return self.fbuilder
        elif self.parent:
            return self.parent.parentfb
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
# Internal/reference symbol; no public authoring call.
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::_get_parentfb:L163`

## Incompatibilità Genropy legacy

This is internal/reference legacy machinery rather than a public Gramlot contract; applicability is **da verificare**.
