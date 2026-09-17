# makeRoot

## Identity

- **Identity:** `makeRoot`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`, `GnrGridStruct`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::makeRoot:L131`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `page` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the webpage instance |
| `source` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the filepath of the xml file |
| `rootAttributes` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `protocls`, `rootAttributes`, `source`
### `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::makeRoot:L36`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `page` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `maintable` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`database table <table>` to which the :ref:`struct` refers to. |
| `source` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |

- **Forwarded keyword names:** `protocls`, `source`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::makeRoot:L131`: Build the root through the :meth:`makeRoot() <gnr.core.gnrstructures.GnrStructData.makeRoot>` method and return it :param cls: the structure class :param page: the webpage instance :param source: the filepath of the xml file
- `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::makeRoot:L36`: TODO :param cls: TODO :param page: TODO :param maintable: the :ref:`database table <table>` to which the :ref:`struct` refers to. For more information, check the :ref:`maintable` section :param source: TODO
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::makeRoot:L131`

```python
def makeRoot(cls, page, source=None,rootAttributes=None):
        """Build the root through the :meth:`makeRoot()
        <gnr.core.gnrstructures.GnrStructData.makeRoot>` method and return it
        
        :param cls: the structure class
        :param page: the webpage instance
        :param source: the filepath of the xml file"""
        root = GnrStructData.makeRoot(source=source, protocls=cls,rootAttributes=rootAttributes)
        root._page = page
        return root
```

### `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::makeRoot:L36`

```python
def makeRoot(cls, page, maintable=None, source=None):
        """TODO
        
        :param cls: TODO
        :param page: TODO
        :param maintable: the :ref:`database table <table>` to which the :ref:`struct` refers to.
                          For more information, check the :ref:`maintable` section
        :param source: TODO
        """
        root = GnrStructData.makeRoot(source=source, protocls=cls)
        #root._page = weakref.ref(page)
        root._page = page
        root._maintable = maintable
        return root
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.makeRoot(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::makeRoot:L131`
- `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::makeRoot:L36`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
