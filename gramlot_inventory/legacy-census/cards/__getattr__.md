# __getattr__

## Identity

- **Identity:** `__getattr__`
- **Type:** internal/reference helper
- **Level:** N/A
- **Purpose:** source-backed census entry; detailed product purpose is internal support for public declarations.
- **Status:** solo riferimento legacy

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `autoslot`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::__getattr__:L170`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `fname` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `autoslots`, `tag`

- **Forwarded keyword names:** `childname`

- **Conditions:** `handler is None`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::__getattr__:L170`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::__getattr__:L170`

```python
def __getattr__(self, fname): 
        fnamelower = fname.lower()
        if (fname != fnamelower) and hasattr(self, fnamelower):
            return getattr(self, fnamelower)
        if fnamelower in self.genroNameSpace:
            return GnrDomElem(self, '%s' % (self.genroNameSpace[fnamelower]))
        if fname in self._external_methods:
            method_name = self._external_methods[fname]
            handler = getattr(self.page, method_name, None)
            if handler is None:
                page_name = os.path.basename(getattr(self.page, 'filepath', '') or '')
                raise AttributeError(
                    "Struct method '%s' not found in page '%s'"
                    " — check py_requires" % (method_name, page_name))
            return lambda *args, **kwargs: handler(self, *args,**kwargs)
        attachnode = self.getNode(fname)
        if attachnode:
            return attachnode._value
        autoslots = self._parentNode.attr.get('autoslots')
        if autoslots:
            autoslots = autoslots.split(',')
            if fname in autoslots:
                return self.child('autoslot',childname=fname)
        parentTag = self._parentNode.attr.get('tag','').lower()
        if parentTag and not fnamelower.startswith(parentTag):
            subtag = ('%s_%s' %(parentTag,fname)).lower()
            if hasattr(self,subtag):
                return getattr(self,subtag)
        page_name = os.path.basename(getattr(self.page, 'filepath', '') or '')
        raise AttributeError("'%s' is not defined in page '%s'"
                    " — check py_requires" % (fname, page_name))
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

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::__getattr__:L170`

## Incompatibilità Genropy legacy

This is internal/reference legacy machinery rather than a public Gramlot contract; applicability is **da verificare**.
