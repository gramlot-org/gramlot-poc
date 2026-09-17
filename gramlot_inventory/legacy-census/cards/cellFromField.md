# cellFromField

## Identity

- **Identity:** `cellFromField`
- **Type:** internal/reference helper
- **Level:** N/A
- **Purpose:** source-backed census entry; detailed product purpose is internal support for public declarations.
- **Status:** solo riferimento legacy

## Bases, mixins and composition

Declared by module-level helpers.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/_helpers.py::cellFromField:L44`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `field` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `tableobj` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `checkPermissions` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `_external_fkey`, `_external_name`, `_joiner_storename`, `_subtable`, `alternatePkey`, `caption_field`, `cellClasses`, `cell_edit`, `checkpref`, `dfltwidth`, `dtype`, `edit`, `field_getter`, `foreignkey`, `format`, `format_pattern`, `hidden`, `lookup`, `name`, `related_column`, `related_table`, `related_table_lookup`, `relating_column`, `rowcaption`, `sqlcolumn`, `storefield`, `user_blurred`, `user_forbidden`, `user_readonly`, `values`, `width`

- **Prefix families:** `@*`

- **Forwarded keyword names:** `cellClasses`, `checkPermissions`, `slice_prefix`

- **Conditions:** `'_joiner_storename' in caption_field_kwargs`, `caption_field is None`, `columnobj is not None`, `edit is not True`, `fkeycol is not None`, `fldobj is None`, `fldobj.sql_formula is not True`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/_helpers.py::cellFromField:L44`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/_helpers.py::cellFromField:L44`

```python
def cellFromField(field,tableobj,checkPermissions=None):
    kwargs = dict()
    fldobj = tableobj.column(field)
    if fldobj is None:
        raise Exception('Missing column {} in table {}'.format(field,tableobj.fullname))
    fldattr = dict(fldobj.attributes or dict())
        
    if (fldattr.get('cell_edit') or fldattr.get('edit'))\
         and fldobj.table.fullname!=fldobj.fullname:
        fldattr.pop('cell_edit',None)
        fldattr.pop('edit',None)
        
    
    if checkPermissions:
        fldattr.update(fldobj.getPermissions(**checkPermissions))
    if fldattr.get('checkpref'):
        kwargs['checkpref'] = fldattr.get('checkpref')
        kwargs.update(dictExtract(fldattr,'checkpref_'))

    if fldattr.get('user_forbidden'):
        kwargs['hidden'] = True


    if fldattr.get('user_blurred'):
        kwargs['cellClasses'] = '{cellClasses} gnr_blurred_cell'.format(cellClasses=kwargs.get('cellClasses',''))

    if 'values' in fldattr:
        values = fldattr['values']
        values = getattr(fldobj.table.dbtable, values ,lambda: values)()
        fldattr['values'] = values
        kwargs['values'] = fldattr['values']

    kwargs.update(dictExtract(fldattr,'cell_'))
    kwargs.setdefault('format_pattern',fldattr.get('format'))
    kwargs.setdefault('format',fldattr.get('format'))
    kwargs.update(dictExtract(fldattr,'format_',slice_prefix=False))
    if getattr(fldobj,'sql_formula',None) and fldobj.sql_formula is not True and \
        fldobj.sql_formula.startswith('@') and '.(' in fldobj.sql_formula:
        kwargs['_subtable'] = True
    kwargs['name'] =  fldobj.name_short or fldobj.name_long
    kwargs['dtype'] =  fldobj.dtype
    
    kwargs['dfltwidth'] = '%iem' % int(fldobj.print_width*.6) if fldobj.print_width else None
    for attr in ['caption_field', '_owner_package', 'required_columns']:
        if fldattr.get(attr):
            kwargs[attr] = fldattr[attr]
        
    relfldlst = tableobj.fullRelationPath(field).split('.')
    validations = dictExtract(fldobj.attributes,'validate_',slice_prefix=False)
    if fldattr.get('user_readonly'):
        kwargs.pop('edit',None)
    if validations and kwargs.get('edit'):
        edit = kwargs['edit']
        if edit is not True:
            validations.update(edit)
        kwargs['edit'] = validations
    #if 'values' in fldobj.attributes:
    #    kwargs['values']=fldobj.attributes['values']
    if hasattr(fldobj,'relatedColumnJoiner'):
        columnjoiner = fldobj.relatedColumnJoiner()
        if columnjoiner:
            relatedTable = fldobj.relatedColumn().table
            linktable_attr = relatedTable.attributes
            if linktable_attr.get('checkpref'):
                kwargs['checkpref'] = linktable_attr['checkpref']
                kwargs.update(dictExtract(linktable_attr,'checkpref_'))
            kwargs['related_table'] = relatedTable.fullname
            kwargs['related_table_lookup'] = linktable_attr.get('lookup')
            onerelfld = columnjoiner['one_relation'].split('.')[2]
            isForeignKey = columnjoiner.get('foreignkey')
            storefield = columnjoiner.get('storefield')
            if(onerelfld != relatedTable.pkey):
                kwargs['alternatePkey'] = onerelfld
            if len(relfldlst) == 1:
                caption_field = kwargs.pop('caption_field',None)
                if (caption_field is None) and (isForeignKey or onerelfld == relatedTable.pkey):
                    caption_field =  relatedTable.attributes.get('caption_field')
                if caption_field and not kwargs.get('hidden'):
                    rel_caption_field = '@%s.%s' %(field,caption_field)
                    caption_fieldobj = tableobj.column(rel_caption_field)
                    kwargs['width'] = '%iem' % int(caption_fieldobj.print_width*.6) if caption_fieldobj.print_width else None
                    kwargs['caption_field'] = rel_caption_field
                    caption_field_kwargs = cellFromField(rel_caption_field,tableobj,checkPermissions=checkPermissions)
                    if '_joiner_storename' in caption_field_kwargs:
                        kwargs['_joiner_storename'] = caption_field_kwargs['_joiner_storename']
                        kwargs['_external_fkey'] = caption_field_kwargs['_external_fkey']
                        kwargs['_external_name'] = caption_field_kwargs['_external_name']
                    kwargs['relating_column'] = field
                    kwargs['related_column'] = caption_field
                    kwargs['rowcaption'] = caption_field

    if len(relfldlst) > 1:
        fkey = relfldlst[0][1:]
        kwargs['relating_column'] = fkey
        kwargs['related_column'] = '.'.join(relfldlst[1:])
        fkeycol=tableobj.column(fkey)
        if fkeycol is not None:
            joiner = fkeycol.relatedColumnJoiner()
            ext_fldname = '.'.join(relfldlst[1:])
            if 'storefield' in joiner:
                externalStore(tableobj,field,joiner,fkey,ext_fldname,kwargs)
            elif '_storename' in joiner:
                externalStore(tableobj,field,joiner,fkey,ext_fldname,kwargs)
    
    field_getter = kwargs.get('caption_field') or field
    sqlcolumn = None
    if field_getter.startswith('@'):
        original_field = field_getter
        field_getter = field_getter.replace('.','_').replace('@','_')
        sqlcolumn = '%s AS %s' %(original_field,field_getter)
    else:
        columnobj = tableobj.column(field_getter)
        if columnobj is not None:
            sqlcolumn = '$%s' %field_getter
    kwargs['field_getter'] = field_getter
    kwargs['sqlcolumn'] = sqlcolumn
    return kwargs
```


## Abstract extension hooks

Statically visible extension families: `@*`
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
# Internal/reference symbol; no public authoring call.
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/_helpers.py::cellFromField:L44`

## Incompatibilità Genropy legacy

This is internal/reference legacy machinery rather than a public Gramlot contract; applicability is **da verificare**.
