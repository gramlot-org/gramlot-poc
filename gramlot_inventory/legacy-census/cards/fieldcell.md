# fieldcell

## Identity

- **Identity:** `fieldcell`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrGridStruct`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::fieldcell:L247`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `field` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `_as` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `name` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `width` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `dtype` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `classes` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `cellClasses` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `headerClasses` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `zoom` | not declared | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `template_name` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `table` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `caption_field`, `edit`, `related_column`, `related_table`, `relating_column`, `rowcaption`, `template_name`, `zoom_pkey`

- **Forwarded keyword names:** `checkPermissions`, `field`, `fieldobj`, `result`

- **Conditions:** `cellpars['edit'] is not True`, `fldobj.relatedTable() is not None`, `zoom is True`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::fieldcell:L247`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::fieldcell:L247`

```python
def fieldcell(self, field, 
                _as=None, name=None, width=None, dtype=None,
                  classes=None, cellClasses=None, headerClasses=None,
                   zoom=False,template_name=None,table=None,**kwargs):
        tableobj = self.tblobj
        if table:
            tableobj = self.page.db.table(table)
            _as = field
            field = tableobj.pkey
            tbl_caption_field = tableobj.attributes.get('caption_field')
            caption_field = kwargs.get('caption_field') or '%s_caption' %_as
            kwargs['related_table'] = table
            kwargs['caption_field'] = caption_field
            kwargs['rowcaption'] = tbl_caption_field
            kwargs['relating_column'] = _as
            kwargs['related_column'] = tbl_caption_field


        if not tableobj:
            self.root._missing_table = True
            return
        fldobj = tableobj.column(field)
        cellpars = cellFromField(field,tableobj,checkPermissions=self.page.permissionPars)
        cellpars.update(kwargs)
        if cellpars.get('edit') and fldobj.sqlclass=='column' and fldobj.relatedTable() is not None:
            selected_kw = {}
            _selected_defaultFrom(fieldobj=fldobj,result=selected_kw)
            if selected_kw:
                if cellpars['edit'] is not True:
                    selected_kw.update(kwargs['edit'])
                cellpars['edit'] = selected_kw
        template_name = template_name or fldobj.attributes.get('template_name')
        if template_name:
            tpl = self.page.loadTemplate('%s:%s' %(tableobj.fullname,template_name))
            tplattr = tpl.getAttr('main')
            cellpars['template_columns'] = ('%(columns)s,%(virtual_columns)s' %tplattr).strip(',')
        loc = locals()
        for attr in ('name','width','dtype','classes','cellClasses','headerClasses'):
            cellpars[attr] = loc[attr] or cellpars.get(attr)
        if zoom:
            zoomtbl = fldobj.table
            relfldlst = tableobj.fullRelationPath(field).split('.')
            if len(relfldlst) > 1:
                if zoom is True:
                    ridx = -2
                else:
                    ridx = relfldlst.index('@%s' % zoom)
                zoomtbl = tableobj.column('.'.join(relfldlst[0:ridx + 1])).parent
                relfldlst[ridx] = relfldlst[ridx][1:]
                cellpars['zoom_pkey'] = cellpars.get('zoom_pkey') or '.'.join(relfldlst[0:ridx + 1])
            elif fldobj.relatedTable():
                zoomtbl = fldobj.relatedTable()
                cellpars['zoom_pkey'] = field
            if hasattr(zoomtbl.dbtable, 'zoomUrl'):
                zoomPage = zoomtbl.dbtable.zoomUrl()
                cellpars['zoom_page'] = zoomPage
            cellpars['zoom_table'] = zoomtbl.dbtable.fullname
        return self.cell(field=_as or field, **cellpars)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.fieldcell(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::fieldcell:L247`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
