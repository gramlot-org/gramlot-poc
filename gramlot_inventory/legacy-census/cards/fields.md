# fields

## Identity

- **Identity:** `fields`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrGridStruct`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::fields:L306`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `columns` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | it represents the :ref:`columns` to be returned by the "SELECT" |
| `unit` | not declared | optional | `'em'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the field unit |
| `totalWidth` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |

- **Forwarded keyword names:** `dtype`, `field`, `fixed`, `n`, `name`, `sep`, `width`

- **Conditions:** `fldobj is None`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::fields:L306`: TODO :param columns: it represents the :ref:`columns` to be returned by the "SELECT" clause in the traditional sql query. For more information, check the :ref:`sql_columns` section :param unit: the field unit :param totalWidth: TODO r.fields('name/Name:20,address/My Addr:130px....')
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::fields:L306`

```python
def fields(self, columns, unit='em', totalWidth=None):
        """TODO
        
        :param columns: it represents the :ref:`columns` to be returned by the "SELECT"
                        clause in the traditional sql query. For more information, check the
                        :ref:`sql_columns` section
        :param unit: the field unit
        :param totalWidth: TODO
        
        r.fields('name/Name:20,address/My Addr:130px....')"""
        tableobj = self.tblobj
        if isinstance(columns, str):
            columns = columns.replace('\n', '').replace('\t', '')
            col_list = gnrstring.splitAndStrip(columns, ',')
            if '[' in columns:
                maintable = []
                columns = []
                for col in col_list:
                    if '[' in col:
                        tbl, col = col.split('[')
                        maintable = [tbl]
                    columns.append('.'.join(maintable + [col.rstrip(']')]))
                    if col.endswith(']'):
                        maintable = []
            else:
                columns = col_list
        fields = []
        names = []
        widths = []
        dtypes = []
        fld_kwargs = []
        wtot = 0
        for field in columns:
            field, width = gnrstring.splitAndStrip(field, sep=':', n=2, fixed=2)
            field, name = gnrstring.splitAndStrip(field, sep='/', n=2, fixed=2)
            fldobj = tableobj.column(field)
            if fldobj is None:
                raise Exception("Unknown field %s in table %s" % (
                field, tableobj.fullname)) # FIXME: use a specific exception class
            fields.append(field)
            names.append(name or fldobj.name_long)
            if r'%' in width:
                unit='%'
                width = width.replace('%','')
            width = int(width  or fldobj.print_width)
            widths.append(width)
            wtot = wtot + width
            dtypes.append(fldobj.dtype)
            fld_kwargs.append(dict()) #PROVVISORIO
            
        if totalWidth:
            for j, w in enumerate(widths):
                widths[j] = int(w * totalWidth/wtot)
        for j, field in enumerate(fields):
            #self.child('cell', field=field, childname=names[j], width='%i%s'%(widths[j],unit), dtype=dtypes[j])
            self.cell(field=field, name=names[j], width='%i%s' % (widths[j], unit), dtype=dtypes[j], **fld_kwargs[j])
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.fields(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::fields:L306`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
