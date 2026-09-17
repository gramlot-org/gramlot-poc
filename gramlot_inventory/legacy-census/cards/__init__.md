# __init__

## Identity

- **Identity:** `__init__`
- **Type:** internal/reference helper
- **Level:** N/A
- **Purpose:** source-backed census entry; detailed product purpose is internal support for public declarations.
- **Status:** solo riferimento legacy

## Bases, mixins and composition

Declared by `GnrDomElem`, `GnrFormBuilder`.
Declaring-class bases: `object`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomElem::__init__:L100`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `obj` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `tag` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::__init__:L30`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `tbl` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `cols` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `dbtable` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `fieldclass` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `lblclass` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `lblpos` | not declared | optional | `'L'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `byColumn` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `lblalign` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `fldalign` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `lblvalign` | not declared | optional | `'top'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `fldvalign` | not declared | optional | `'top'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `rowdatapath` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `head_rows` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `excludeCols` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `colswidth` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `boxMode` | not declared | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `commonKwargs` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |

- **Produced/forwarded fields:** `L`, `T`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomElem::__init__:L100`: No behavior docstring is present in the primary declaration.
- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::__init__:L30`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomElem::__init__:L100`

```python
def __init__(self, obj, tag):
        self.obj = obj
        self.tag = tag
```

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::__init__:L30`

```python
def __init__(self, tbl, cols=None, dbtable=None, fieldclass=None,
                 lblclass=None, lblpos='L',byColumn=None, lblalign=None, fldalign=None,
                 lblvalign='top', fldvalign='top', rowdatapath=None, head_rows=None,
                 excludeCols=None, colswidth=None,boxMode=False,commonKwargs=None):
        self.commonKwargs = commonKwargs or {}
        self.lblalign = lblalign or {'L': 'right', 'T': 'left'}[lblpos] # jbe?  why is this right and not left?
        self.fldalign = fldalign or {'L': 'left', 'T': 'center'}[lblpos]
        self.boxMode = boxMode
        self.lblvalign = lblvalign
        self.fldvalign = fldvalign
        self.lblclass = lblclass or 'gnrfieldlabel' if not self.boxMode else None
        self.fieldclass = fieldclass 
        self.colswidth = colswidth
        self.colmax = cols
        self.lblpos = lblpos
        self.rowlast = -1
        self.byColumn = byColumn
        #self._tbl=weakref.ref(tbl)
        self._tbl = tbl
        self.maintable = dbtable
        if self.maintable:
            self.tblobj = self.page.db.table(self.maintable)
        self.rowcurr = -1
        self.colcurr = 0
        self.row = -1
        self.col = -1
        self.rowdatapath = rowdatapath
        self.head_rows = head_rows or 0
        self.field_list = []
        self.excludeCols = excludeCols.split(',') if excludeCols else []
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

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomElem::__init__:L100`
- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::__init__:L30`

## Incompatibilità Genropy legacy

This is internal/reference legacy machinery rather than a public Gramlot contract; applicability is **da verificare**.
