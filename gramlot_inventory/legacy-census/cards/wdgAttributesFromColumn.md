# wdgAttributesFromColumn

## Identity

- **Identity:** `wdgAttributesFromColumn`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::wdgAttributesFromColumn:L970`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `fieldobj` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `fld` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `autospan`, `border`, `checkpref`, `colspan`, `dest_record_pkey`, `dest_stn`, `enable`, `enableZoom`, `extensions`, `formOnly`, `format`, `hasDownArrow`, `height`, `html_label`, `label`, `lbl`, `localized`, `lookup`, `rounded`, `size`, `tag`, `title`, `validate_len`, `values`, `width`, `zoom`

- **Forwarded keyword names:** `fieldobj`, `result`, `slice_prefix`

- **Produced/forwarded fields:** `dbfield`, `field_name_long`, `lbl`

- **Conditions:** `'autospan' in kwargs`, `defaultZoom is None`, `joiner['storefield'] is False`, `lbl is None`, `lbl is not False`, `relcol is not None`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::wdgAttributesFromColumn:L970`: TODO :param fieldobj: TODO
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::wdgAttributesFromColumn:L970`

```python
def wdgAttributesFromColumn(self, fieldobj,fld=None, **kwargs):
        """TODO
        
        :param fieldobj: TODO
        """
        lbl = kwargs.pop('lbl',None) 
        lbl =  fieldobj.name_long if lbl is None else lbl
        result = {'lbl': lbl,'field_name_long':fieldobj.name_long, 'dbfield': fieldobj.fullname}
        dtype = result['dtype'] = fieldobj.dtype
        fldattr =  dict(fieldobj.attributes or dict())
        result['format'] = fldattr.pop('format',None)
        col_size = fldattr.get('size')
        if dtype in ('A', 'C'):
            size = col_size
            if not size:
                size = '20'
            if ':' in size:
                size = size.split(':')[1]
            size = int(size)
        else:
            size = 5
        if fldattr.get('checkpref'):
            result['checkpref'] = fldattr['checkpref']
            result.update(dictExtract(fldattr,'checkpref_',slice_prefix=False))
        result.update(dictExtract(fldattr,'validate_',slice_prefix=False))
        result.update(dictExtract(fldattr,'wdg_'))
        if 'unmodifiable' in fldattr:
            result['unmodifiable'] = fldattr['unmodifiable']
        if 'protected' in fldattr:
            result['protected'] = fldattr['protected']
        relcol = fieldobj.relatedColumn()
        if relcol is not None:
            lnktblobj = relcol.table
            linktable_attr = lnktblobj.attributes
            if linktable_attr.get('checkpref'):
                result['checkpref'] = linktable_attr['checkpref']
                result.update(dictExtract(linktable_attr,'checkpref_'))
            isLookup = linktable_attr.get('lookup') or False
            joiner = fieldobj.relatedColumnJoiner()
            onerelfld = joiner['one_relation'].split('.')[2]
            if dtype in ('A', 'C'):
                size = lnktblobj.attributes.get('size', '20')
                if ':' in size:
                    size = size.split(':')[1]
                size = int(size)
            else:
                size = 5
            defaultZoom = self.getInheritedAttributes().get('enableZoom')
            if defaultZoom is None:
                defaultZoom = self.page.pageOptions.get('enableZoom', True)
            if lbl is not False:
                result['lbl'] = lbl or fieldobj.table.dbtable.relationName('@%s' % fieldobj.name)
                if kwargs.get('zoom', defaultZoom):
                    if hasattr(self.page,'_legacy'):
                        if hasattr(lnktblobj.dbtable, 'zoomUrl'):
                            zoomPage = lnktblobj.dbtable.zoomUrl()
                        else:
                            zoomPage = lnktblobj.fullname.replace('.', '/')
                        result['lbl_href'] = "=='/%s?pkey='+pkey" % zoomPage
                        result['lbl_pkey'] = '^.%s' %fld
                    else:
                        if hasattr(lnktblobj.dbtable, 'zoomUrl'):
                            pass
                        else:
                            zoomKw = dictExtract(kwargs,'zoom_')
                            forcedTitle = zoomKw.pop('title', None)
                            zoomKw.setdefault('formOnly',False)
                            result['lbl__zoomKw'] = zoomKw #,slice_prefix=False)
                            result['lbl__zoomKw_table'] = lnktblobj.fullname
                            result['lbl__zoomKw_lookup'] = isLookup
                            result['lbl__zoomKw_title'] = forcedTitle or lnktblobj.name_plural or lnktblobj.name_long
                            result['lbl__zoomKw_pkey'] = '=.%s' %fld
                            result['lbl_connect_onclick'] = "genro.dlg.zoomPaletteFromSourceNode(this,$1);"  
                    result['lbl'] = '<div class="gnrzoomicon">&nbsp;</div><div>%s</div>' %self.page._(result['lbl'])
                    result['lbl_class'] = 'gnrzoomlabel'
            result['tag'] = 'DbSelect'
            _selected_defaultFrom(fieldobj=fieldobj,result=result)
            result['dbtable'] = lnktblobj.fullname
            if '_storename' in joiner:
                result['_storename'] = joiner['_storename']
            elif 'storefield' in joiner:
                result['_storename'] = False if joiner['storefield'] is False else '=.%(storefield)s' %joiner
            #result['columns']=lnktblobj.rowcaption
            result['_class'] = 'linkerselect'
            result['searchDelay'] = 300
            result['ignoreCase'] = True
            result['method'] = 'app.dbSelect'
            result['size'] = size
            result['_guess_width'] = '%iem' % (int(size * .7) + 2)
            result.setdefault('hasDownArrow',isLookup)
            if(onerelfld != relcol.table.pkey):
                result['alternatePkey'] = onerelfld
        #elif attr.get('mode')=='M':
        #    result['tag']='bagfilteringtable'
        elif fldattr.get('values', False) and dtype not in DTYPES_IGNORING_VALUES:
            values = fldattr['values']
            values = getattr(fieldobj.table.dbtable, values ,lambda: values)()
            fldattr['values'] = values
            result['tag'] = 'filteringselect'
            result['values'] = values
        elif dtype in ('A','T') and fldattr.get('dest_stn'):
            result['tag'] = 'modalUploader'
            result['dest_fld'] = fieldobj.fullname
            result.setdefault('enable','^#FORM.controller.is_newrecord?!=#v')
            result.setdefault('height','210px')
            result.setdefault('width','190px')
            result.setdefault('border','1px solid silver')
            result.setdefault('rounded',8)
            result.setdefault('dest_record_pkey','=#FORM.pkey')
            result.setdefault('label',result.pop('lbl',None))
            result.setdefault('extensions',fldattr.get('extensions',None))
        elif dtype == 'A':
            result['maxLength'] = size
            result['tag'] = 'textBox'
            result['_type'] = 'text'
            result['_guess_width'] = '%iem' % (int(size * .7) + 2)
        elif dtype == 'B':
            result['tag'] = 'checkBox'
            result.setdefault('html_label',not kwargs.get('label'))
            if 'autospan' in kwargs:
                kwargs['colspan'] = kwargs['autospan']
                del kwargs['autospan']
        elif dtype == 'T':
            result['tag'] = 'textBox'
            if col_size:
                result.setdefault('validate_len',col_size)
            result['_guess_width'] = '%iem' % int(size * .5)
        elif dtype == 'R':
            result['tag'] = 'numberTextBox'
            result['width'] = '7em'
        elif dtype == 'N':
            result['tag'] = 'numberTextBox'
            result['_guess_width'] = '7em'
        elif dtype == 'L' or dtype == 'I':
            result['tag'] = 'numberTextBox'
            result['places'] = 0
            result.setdefault('format','#,###')
            result['_guess_width'] = '7em'
        elif dtype == 'D':
            result['tag'] = 'dateTextBox'
            result['_guess_width'] = '9em'
        elif dtype == 'H':
            result['tag'] = 'timeTextBox'
            result['_guess_width'] = '7em'
        elif dtype == 'DH' or dtype=='DHZ':
            result['tag'] = result.get('tag') or 'dateTimeTextBox'
            result['_guess_width'] = '9em'
        elif dtype =='X':
            result['tag'] = 'tree'         
        else:
            result['tag'] = 'textBox'
        if kwargs:
            if kwargs.get('autospan', False):
                kwargs['colspan'] = kwargs.pop('autospan')
                kwargs['width'] = '99%'
            result.update(kwargs)
        if result['tag']=='textBox' and fldattr.get('localized'):
            result['tag'] = 'MultiLanguageTextBox'
            result['languages'] = fldattr.get('localized')
        return result
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.wdgAttributesFromColumn(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::wdgAttributesFromColumn:L970`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
