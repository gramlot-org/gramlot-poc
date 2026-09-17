# _fillRows

## Identity

- **Identity:** `_fillRows`
- **Type:** internal/reference helper
- **Level:** N/A
- **Purpose:** source-backed census entry; detailed product purpose is internal support for public declarations.
- **Status:** solo riferimento legacy

## Bases, mixins and composition

Declared by `GnrFormBuilder`.
Declaring-class bases: `object`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::_fillRows:L124`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `r` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::_fillRows:L124`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::_fillRows:L124`

```python
def _fillRows(self, r):
        if r > self.rowlast:
            for j in range(self.rowlast, r):
                self._formRow(j + 1)
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

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::_fillRows:L124`

## Incompatibilità Genropy legacy

This is internal/reference legacy machinery rather than a public Gramlot contract; applicability is **da verificare**.
