# prepareFieldAttributes

## Identity

- **Identity:** `prepareFieldAttributes`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::prepareFieldAttributes:L912`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `fld` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `_owner_package`, `excludeCols`, `hidden`, `innerHTML`, `readOnly`, `table`, `user_blurred`, `user_forbidden`, `user_readonly`, `value`

- **Prefix families:** `@*`

- **Forwarded keyword names:** `fld`

- **Conditions:** `fieldobj is None`, `parentfb is None`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::prepareFieldAttributes:L912`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::prepareFieldAttributes:L912`

```python
def prepareFieldAttributes(self, fld, **kwargs):
        parentfb = self.parentfb
        tblobj = None
        if '.' in fld and not fld.startswith('@'):
            x = fld.split('.', 2)
            maintable = '%s.%s' % (x[0], x[1])
            tblobj = self.page.db.table(maintable)
            fld = x[2]
        elif parentfb:
            assert hasattr(parentfb,'tblobj'),'missing default table. HINT: are you using a formStore in a bad place?'
            tblobj = parentfb.tblobj
        else:
            tbl = self.getInheritedAttributes().get('table')
            if not tbl:
                raise GnrDomSrcError('No table')
            else:
                tblobj = self.page.db.table(tbl)
        fieldobj = tblobj.column(fld)
        if fieldobj is None:
            raise GnrDomSrcError('Not existing field %s' % fld)
        wdgattr = self.wdgAttributesFromColumn(fieldobj, fld=fld, **kwargs)
        # Formlet path only (no GnrFormBuilder above): hide the parent link column
        # of a relation-based child Table Handler. The formbuilder handles this in
        # GnrFormBuilder._formCell; here we read the same excludeCols the Table
        # Handler left on the form node. parentfb has a fbuilder only in the
        # formbuilder case, so its absence identifies the formlet/gridbox path.
        if parentfb is None:
            formNode = self.parentNode.attributeOwnerNode('formId') if self.parentNode else None
            excludeCols = formNode.attr.get('excludeCols') if formNode else None
            if excludeCols and fld in excludeCols.split(','):
                wdgattr.setdefault('hidden', True)
        wdgattr['helpcode'] =  fieldobj.fullname.replace('.','_')
        if fieldobj.attributes.get('_owner_package'):
            wdgattr['helpcode_package'] = fieldobj.attributes.get('_owner_package')
        if fieldobj.getTag() == 'virtual_column' or (('@' in fld ) and fld != tblobj.fullRelationPath(fld)):
            wdgattr.setdefault('readOnly', True)
            wdgattr['_virtual_column'] = fld
           
        if wdgattr['tag']in ('div', 'span'):
            wdgattr['innerHTML'] = '^.%s' % fld
        elif wdgattr['tag'] == 'tree':
            wdgattr['storepath'] = '.%s' % fld
            wdgattr['_fired'] ='^.%s' % fld
        else:
            wdgattr['value'] = '^.%s' % fld
        permissions = fieldobj.getPermissions(**self.page.permissionPars)
        if permissions.get('user_readonly'):
            wdgattr['readOnly'] = True
        if permissions.get('user_forbidden'):
            wdgattr['tag'] = 'div'
            wdgattr['_class'] = 'gnr_forbidden_field'
            wdgattr.pop('value',None)
            wdgattr.pop('innerHTML','&nbsp;')
        if permissions.get('user_blurred'):
            wdgattr['tag'] = 'div'
            wdgattr['_class'] = 'gnr_blurred_field'
        return wdgattr
```


## Abstract extension hooks

Statically visible extension families: `@*`
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.prepareFieldAttributes(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::prepareFieldAttributes:L912`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
