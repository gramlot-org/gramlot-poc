# setRow

## Identity

- **Identity:** `setRow`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrFormBuilder`.
Declaring-class bases: `object`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::setRow:L192`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `fields` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `row` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |

- **Consumed kwargs:** `col`

- **Conditions:** `row is None`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::setRow:L192`: TODO :param fields: TODO :param row: TODO
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::setRow:L192`

```python
def setRow(self, fields, row=None):
        """TODO
        
        :param fields: TODO
        :param row: TODO
        """
        colcurr = -1
        if row is None:
            row = self.rowcurr = self.rowcurr + 1
        if row > self.rowlast:
            for r in range(self.rowlast, row):
                self._formRow(r + 1)
        self._formRow(row)
                
        for f in fields:
            if not 'col' in f:
                col = colcurr = colcurr + 1
            else:
                col = int(f.pop('col'))
            if col <= self.colmax:
                self.setField(f, row, col)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.setRow(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::setRow:L192`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
