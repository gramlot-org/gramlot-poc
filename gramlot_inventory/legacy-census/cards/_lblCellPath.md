# _lblCellPath

## Identity

- **Identity:** `_lblCellPath`
- **Type:** internal/reference helper
- **Level:** N/A
- **Purpose:** source-backed census entry; detailed product purpose is internal support for public declarations.
- **Status:** solo riferimento legacy

## Bases, mixins and composition

Declared by `GnrFormBuilder`.
Declaring-class bases: `object`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::_lblCellPath:L230`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `r` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the row of the field cell |
| `c` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the column of the field cell |

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::_lblCellPath:L230`: Relative source path from the field cell to the cell holding its label. With ``lblpos='L'`` label and field are siblings in the same row (``c_N_l``/``c_N_f``); with ``lblpos='T'`` they live in two twin rows (``r_N_l``/``r_N_f``) where the cell keeps the same childname. :param r: the row of the field cell :param c: the column of the field cell
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::_lblCellPath:L230`

```python
def _lblCellPath(self, r, c):
        """Relative source path from the field cell to the cell holding its label.

        With ``lblpos='L'`` label and field are siblings in the same row
        (``c_N_l``/``c_N_f``); with ``lblpos='T'`` they live in two twin rows
        (``r_N_l``/``r_N_f``) where the cell keeps the same childname.

        :param r: the row of the field cell
        :param c: the column of the field cell
        """
        if self.lblpos == 'L':
            return 'parent/c_%i_l' % c
        return 'parent/parent/r_%i_l/c_%i' % (r, c)
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

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::_lblCellPath:L230`

## Incompatibilità Genropy legacy

This is internal/reference legacy machinery rather than a public Gramlot contract; applicability is **da verificare**.
