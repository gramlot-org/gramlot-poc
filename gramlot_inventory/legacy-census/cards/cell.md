# cell

## Identity

- **Identity:** `cell`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrGridStruct`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `cell`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::cell:L144`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `field` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `name` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `width` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the width of the cell |
| `dtype` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`datatype` |
| `classes` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `cellClasses` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `headerClasses` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `calculated`, `columnset`

- **Forwarded keyword names:** `cellClasses`, `childcontent`, `classes`, `dtype`, `field`, `headerClasses`, `name`, `width`

- **Conditions:** `self.tblobj.column(field) is None`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::cell:L144`: Return a :ref:`cell` :param field: TODO :param name: TODO :param width: the width of the cell :param dtype: the :ref:`datatype` :param classes: TODO :param cellClasses: TODO :param headerClasses: TODO
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::cell:L144`

```python
def cell(self, field=None, name=None, width=None, dtype=None, classes=None, cellClasses=None, 
            headerClasses=None,**kwargs):
        """Return a :ref:`cell`
        
        :param field: TODO
        :param name: TODO
        :param width: the width of the cell
        :param dtype: the :ref:`datatype`
        :param classes: TODO
        :param cellClasses: TODO
        :param headerClasses: TODO"""
        if not self.page.application.allowedByPreference(**kwargs):
            return 
        if field and getattr(self,'tblobj',None):
            kwargs.setdefault('calculated',self.tblobj.column(field) is None)
        row = self
        parentAttributes = self.attributes
        if  parentAttributes['tag'] == 'columnset':
            row = self.parent.parent.parent.getItem('view_0.rows_0')
            kwargs['columnset'] = parentAttributes['code']
        return row.child('cell', childcontent='', field=field, name=name or field, width=width, dtype=dtype,
                          classes=classes, cellClasses=cellClasses, headerClasses=headerClasses,
                          **kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.cell(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::cell:L144`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
