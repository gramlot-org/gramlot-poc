# nextCell

## Identity

- **Identity:** `nextCell`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrFormBuilder`.
Declaring-class bases: `object`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::nextCell:L167`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `r` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | a row |
| `c` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | a cell |

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::nextCell:L167`: Get the current row (*r* attribute) and the current cell (*c* attribute) of the :ref:`struct` and return the correct next row and cell :param r: a row :param c: a cell
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::nextCell:L167`

```python
def nextCell(self, r, c):
        """Get the current row (*r* attribute) and the current cell (*c* attribute)
        of the :ref:`struct` and return the correct next row and cell
        
        :param r: a row
        :param c: a cell
        """
        def nc(row, r, c):
            c = c + 1
            if c >= self.colmax:
                c = 0
                r = r + 1
                row = self.getRow(r)
            return row, r, c
                
        row = self.getRow(r)
        row, r, c = nc(row, r, c)
        if self.lblpos == 'L':
            while not 'c_%i_l' % c in list(row.keys()):
                row, r, c = nc(row, r, c)
        else:
            while not 'c_%i' % c in list(row[0].keys()):
                row, r, c = nc(row, r, c)
        return r, c
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.nextCell(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::nextCell:L167`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
