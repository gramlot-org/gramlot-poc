# getField

## Identity

- **Identity:** `getField`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::getField:L1189`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `fld` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |

- **Consumed kwargs:** `checkpref`

- **Forwarded keyword names:** `pkg`

- **Conditions:** `fieldobj is None`, `relcol != None`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::getField:L1189`: TODO :param fld: TODO
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::getField:L1189`

```python
def getField(self, fld):
        """TODO
        
        :param fld: TODO"""
        result = {}
        if '.' in fld:
            x = fld.split('.')
            fld = x.pop()
            tblobj = self.page.db.table('.'.join(x), pkg=self.page.packageId)
        else:
            tblobj = self.tblobj
            result['value'] = '^.%s' % fld
            
        fieldobj = tblobj.column(fld)
        if fieldobj is None:
            raise GnrDomSrcError('Not existing field %s' % fld)
        dtype = result['dtype'] = fieldobj.dtype
        result['lbl'] = fieldobj.name_long
        result['size'] = 20
        fieldattr = fieldobj.attributes
        if 'checkpref' in fieldattr:
            result['checkpref'] = fieldattr['checkpref']
            result.update(dictExtract(fieldattr,'checkpref_'))

        result.update(dictExtract(fieldattr,'validate_'))
        relcol = fieldobj.relatedColumn()
        if relcol != None:
            lnktblobj = relcol.table
            linktable_attr = lnktblobj.attributes
            if linktable_attr.get('checkpref'):
                result['checkpref'] = linktable_attr['checkpref']
                result.update(dictExtract(linktable_attr,'checkpref_'))
            linktable = lnktblobj.fullname
            result['tag'] = 'DbSelect'
            result['dbtable'] = linktable
            result['dbfield'] = lnktblobj.rowcaption
            result['recordpath'] = ':@*'
            result['keyfield'] = relcol.name
            result['_class'] = 'linkerselect'
            if hasattr(lnktblobj, 'zoomUrl'):
                zoomPage = lnktblobj.zoomUrl()
                
            else:
                zoomPage = linktable.replace('.', '/')
            result['lbl_href'] = '^.%s?zoomUrl' % fld
            result['zoomPage'] = zoomPage
        #elif attr.get('mode')=='M':
        #    result['tag']='bagfilteringtable'
        elif dtype == 'A':
            result['size'] = fieldobj.print_width or 10
            result['tag'] = 'input'
            result['_type'] = 'text'
        elif dtype == 'B':
            result['tag'] = 'checkBox'
        elif dtype == 'T':
            result['size'] = fieldobj.print_width or 40
            result['tag'] = 'input'
        elif dtype == 'D':
            result['tag'] = 'dropdowndatepicker'
        else:
            result['tag'] = 'input'
            
        return result
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.getField(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::getField:L1189`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
