# includedview_inframe

## Identity

- **Identity:** `includedview_inframe`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::includedview_inframe:L575`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `frameCode` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `struct` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`struct` object |
| `columns` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | it represents the :ref:`columns` to be returned by the "SELECT" |
| `storepath` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `structpath` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`struct` path |
| `datapath` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | allow to create a hierarchy of your data’s addresses into the datastore. |
| `nodeId` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the page nodeId. For more information, check the :ref:`nodeid` |
| `configurable` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | boolean. TODO |
| `_newGrid` | not declared | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | boolean. TODO |
| `childname` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`childname` |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `frameCode`, `relativeWorkspace`

- **Forwarded keyword names:** `childname`, `columns`, `configurable`, `datapath`, `frameCode`, `nodeId`, `relativeWorkspace`, `storepath`, `struct`, `structpath`

- **Conditions:** `datapath is False`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::includedview_inframe:L575`: TODO :param frameCode: TODO :param struct: the :ref:`struct` object :param columns: it represents the :ref:`columns` to be returned by the "SELECT" clause in the traditional sql query. For more information, check the :ref:`sql_columns` section :param storepath: TODO :param structpath: the :ref:`struct` path :param datapath: allow to create a hierarchy of your data’s addresses into the datastore. For more information, check the :ref:`datapath` and the :ref:`datastore` pages :param nodeId: the page nodeId. For more information, check the :ref:`nodeid` documentation page :param configurable: boolean. TODO :param _newGrid: boolean. TODO :param childname: the :ref:`childname`
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::includedview_inframe:L575`

```python
def includedview_inframe(self, frameCode=None, struct=None, columns=None, storepath=None, structpath=None,
                             datapath=None, nodeId=None, configurable=None, _newGrid=False, childname=None, **kwargs):
        """TODO
        
        :param frameCode: TODO
        :param struct: the :ref:`struct` object
        :param columns: it represents the :ref:`columns` to be returned by the "SELECT"
                        clause in the traditional sql query. For more information, check the
                        :ref:`sql_columns` section
        :param storepath: TODO
        :param structpath: the :ref:`struct` path
        :param datapath: allow to create a hierarchy of your data’s addresses into the datastore.
                         For more information, check the :ref:`datapath` and the :ref:`datastore` pages
        :param nodeId: the page nodeId. For more information, check the :ref:`nodeid`
                       documentation page
        :param configurable: boolean. TODO
        :param _newGrid: boolean. TODO
        :param childname: the :ref:`childname`
        """
        nodeId = nodeId or '%s_grid' %frameCode
        if datapath is False:
            datapath = None
        elif storepath:
            datapath = datapath or '#FORM.%s' %nodeId 
        else:
            datapath = '.grid'
        structpath = structpath or '.struct'
        self.attributes['target'] = nodeId
        wdg = 'NewIncludedView' if _newGrid else 'includedView'
        relativeWorkspace = kwargs.pop('relativeWorkspace',True)
        childname=childname or 'grid'
        frameattributes = self.attributes
        if not self.attributes.get('frameCode'):
            frameattributes = self.root.getNodeByAttr('frameCode',frameCode).attr
        frameattributes['target'] = nodeId
        iv =self.child(wdg,frameCode=frameCode, datapath=datapath,structpath=structpath, nodeId=nodeId,
                     childname=childname,
                     relativeWorkspace=relativeWorkspace,configurable=configurable,
                     storepath=storepath,**kwargs)
        if struct or columns or not structpath:
            iv.gridStruct(struct=struct,columns=columns)
        return iv
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.includedview_inframe(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::includedview_inframe:L575`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
