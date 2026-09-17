# dataResource

## Identity

- **Identity:** `dataResource`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataResource:L443`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `path` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `resource` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `ext` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `pkg` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`package <packages>` object |

- **Forwarded keyword names:** `ext`, `pkg`, `resource`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataResource:L443`: Create a :ref:`dataresource` and returns it. dataResource is a :ref:`dataRemote` that allows... TODO :param path: TODO :param resource: TODO :param ext: TODO :param pkg: the :ref:`package <packages>` object
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataResource:L443`

```python
def dataResource(self, path, resource=None, ext=None, pkg=None):
        """Create a :ref:`dataresource` and returns it. dataResource is a :ref:`dataRemote`
        that allows... TODO
        
        :param path: TODO
        :param resource: TODO
        :param ext: TODO
        :param pkg: the :ref:`package <packages>` object
        """
        self.dataRemote(path,'getResourceContent',resource=resource,ext=ext, pkg=pkg)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.dataResource(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataResource:L443`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
