# bagStore

## Identity

- **Identity:** `bagStore`
- **Type:** controller
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `BagStore`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::bagStore:L231`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `table` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`database table <table>` name on which the query will be executed, |
| `storeCode` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `storepath` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `columns` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | it represents the :ref:`columns` to be returned by the "SELECT" |
| `_identifier` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `frameCode`, `nodeId`, `paletteCode`, `storepath`, `table`, `tag`

- **Forwarded keyword names:** `_identifier`, `nodeId`, `storepath`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::bagStore:L231`: TODO :param table: the :ref:`database table <table>` name on which the query will be executed, in the form ``packageName.tableName`` (packageName is the name of the :ref:`package <packages>` to which the table belongs to) :param storeCode: TODO :param storepath: TODO :param columns: it represents the :ref:`columns` to be returned by the "SELECT" clause in the traditional sql query. For more information, check the :ref:`sql_columns` section
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::bagStore:L231`

```python
def bagStore(self,table=None,storeCode=None,storepath=None,columns=None,_identifier=None,**kwargs):
        """TODO
        
        :param table: the :ref:`database table <table>` name on which the query will be executed,
                      in the form ``packageName.tableName`` (packageName is the name of the
                      :ref:`package <packages>` to which the table belongs to)
        :param storeCode: TODO
        :param storepath: TODO
        :param columns: it represents the :ref:`columns` to be returned by the "SELECT"
                        clause in the traditional sql query. For more information, check the
                        :ref:`sql_columns` section
        """
        attr = self.attributes
        parentTag = attr.get('tag')
        #columns = columns or '==gnr.getGridColumns(this);'
        parent = self
        if parentTag:
            parentTag = parentTag.lower()
        #storepath = storepath or attr.get('storepath') or '.grid.store'

        if parentTag =='includedview' or  parentTag =='newincludedview':
            attr['table'] = attr.get('table') or table
            storepath = storepath or attr.get('storepath') or '.store'
            storeCode = storeCode or attr.get('nodeId') or  attr.get('frameCode') 
            attr['store'] = storeCode
            attr['tag'] = 'newincludedview'
            if _identifier:
                attr['identifier'] = _identifier
            parent = self._storeParentFrame()

        if parentTag == 'palettegrid':            
            storeCode=storeCode or attr.get('paletteCode')
            attr['store'] = storeCode
            attr['table'] = table
            if _identifier:
                attr['identifier'] = _identifier
            storepath = storepath or attr.get('storepath') or '.store'
        nodeId = '%s_store' %storeCode
        #self.data(storepath,Bag())
        return parent.child('BagStore',storepath=storepath, nodeId=nodeId,_identifier=_identifier,**kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.bagStore(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::bagStore:L231`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `src/gramlot/grammar/logic.py:L132`, `src/gramlot/grammar/logic.py:L16`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
