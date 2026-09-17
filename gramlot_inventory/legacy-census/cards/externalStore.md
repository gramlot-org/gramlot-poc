# externalStore

## Identity

- **Identity:** `externalStore`
- **Type:** controller
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is internal support for public declarations.
- **Status:** solo riferimento legacy

## Bases, mixins and composition

Declared by module-level helpers.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/_helpers.py::externalStore:L163`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `tableobj` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `field` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `joiner` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `fkey` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `ext_fldname` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `kwargs` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `_external_fkey`, `_external_name`, `_joiner_storename`, `_storename`, `storefield`

- **Prefix families:** `@*`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/_helpers.py::externalStore:L163`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/_helpers.py::externalStore:L163`

```python
def externalStore(tableobj,field,joiner,fkey,ext_fldname,kwargs):
    ext_table = '.'.join(joiner['one_relation'].split('.')[0:2])
    storefield = joiner.get('storefield')
    kwargs['_joiner_storename'] = storefield if storefield else " '%s' " % (joiner.get('_storename') or tableobj.db.rootstore)
    kwargs['_external_fkey'] ='$%s AS %s_fkey' %(fkey,joiner['one_relation'].replace('.','_'))
    if not ext_fldname.startswith('@'):
        ext_fldname = '$%s' %ext_fldname
    kwargs['_external_name'] = '%s:%s AS %s' %(joiner['one_relation'],ext_fldname,field.replace('.','_').replace('@','_'))
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

- `genropy/gnrpy/gnr/web/gnrwebstruct/_helpers.py::externalStore:L163`

## Incompatibilità Genropy legacy

This is internal/reference legacy machinery rather than a public Gramlot contract; applicability is **da verificare**.
