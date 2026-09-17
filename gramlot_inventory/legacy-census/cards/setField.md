# setField

## Identity

- **Identity:** `setField`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrFormBuilder`.
Declaring-class bases: `object`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::setField:L83`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `field` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `row` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `col` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |

- **Consumed kwargs:** `fld`, `pos`, `pos_c`, `pos_r`

- **Conditions:** `rc[0] == '*'`, `row is None`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::setField:L83`: TODO :param field: TODO :param row: TODO :param col: TODO
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::setField:L83`

```python
def setField(self, field, row=None, col=None):
        """TODO
        
        :param field: TODO
        :param row: TODO
        :param col: TODO
        """
        field = dict(field)
        if 'pos' in field:
            rc = ('%s,0' % field.pop('pos')).split(',')
            if rc[0] == '*':
                rc[0] = str(self.row)
            elif rc[0] == '+':
                rc[0] = str(self.row + 1)
            self.row, self.col = int(rc[0]), int(rc[1])
        elif ('pos_r' in field) or ('pos_c' in field):
            self.row = field.get('pos_r',self.row)
            self.col = field.get('pos_c',self.col)
        else:
            if row is None:
                row = self.row
                col = self.col
            if col < 0:
                col = self.colmax + col
            self.row, self.col = self.nextCell(row, col)
        if 'fld' in field:
            fld_dict = self.tbl.getField(field.pop('fld'))
            fld_dict.update(field)
            field = fld_dict
        return self._formCell(self.row, self.col, field)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.setField(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::setField:L83`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
