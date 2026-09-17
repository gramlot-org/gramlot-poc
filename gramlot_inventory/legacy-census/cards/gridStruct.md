# gridStruct

## Identity

- **Identity:** `gridStruct`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::gridStruct:L644`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `struct` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`struct` object |
| `columns` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | it represents the :ref:`columns` to be returned by the "SELECT" |

- **Consumed kwargs:** `gridId`, `nodeId`, `store`, `storepath`, `structpath`, `table`

- **Forwarded keyword names:** `childname`, `gridId`, `gridattr`, `source`, `table`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::gridStruct:L644`: TODO :param struct: the :ref:`struct` object :param columns: it represents the :ref:`columns` to be returned by the "SELECT" clause in the traditional sql query. For more information, check the :ref:`sql_columns` section
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::gridStruct:L644`

```python
def gridStruct(self, struct=None, columns=None):
        """TODO
        
        :param struct: the :ref:`struct` object
        :param columns: it represents the :ref:`columns` to be returned by the "SELECT"
                        clause in the traditional sql query. For more information, check the
                        :ref:`sql_columns` section
        """
        gridattr=self.attributes
        structpath = gridattr.get('structpath')
        table = gridattr.get('table')
        gridId= gridattr.get('nodeId') 
        storepath = gridattr.get('storepath')
        source = struct or columns
        page = self.page
        struct = page._prepareGridStruct(source=source,table=table,gridId=gridId)
        if struct:
            self.data(structpath, struct,childname='struct')
            return struct
        elif (source and not table) or not storepath:
            def getStruct(source=None,gridattr=None,gridId=None):
                storeCode = gridattr.get('store') or gridattr.get('nodeId') or gridattr.get('gridId')
                storeNode = page.pageSource('%s_store' %storeCode)
                table = gridattr.get('table')
                if storeNode:
                    table = storeNode.attr.get('table')
                    gridattr['table'] = table
                    #gridattr['storepath'] = '#%s_store.%s' %(storeCode,storeNode.attr.get('storepath'))
                return page._prepareGridStruct(source=source,table=table,gridId=gridId)
            struct = BagCbResolver(getStruct, source=source,gridattr=gridattr,gridId=gridId)
            struct._xmlEager=True
            self.data(structpath, struct)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.gridStruct(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::gridStruct:L644`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
