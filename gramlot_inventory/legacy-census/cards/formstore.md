# formstore

## Identity

- **Identity:** `formstore`
- **Type:** controller
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `GenroWidgets`, `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `formStore`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formstore:L380`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `handler` | not declared | optional | `'recordCluster'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `nodeId` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the page nodeId. For more information, check the :ref:`nodeid` |
| `table` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`database table <table>` name on which the query will be executed, |
| `storeType` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `parentStore` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `tag`

- **Forwarded keyword names:** `childname`, `handler`, `nodeId`, `parentStore`, `storeCode`, `storeType`, `table`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::FormStore:L692`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formstore:L380`: TODO :param storepath: TODO :param handler: TODO :param nodeId: the page nodeId. For more information, check the :ref:`nodeid` documentation page :param table: the :ref:`database table <table>` name on which the query will be executed, in the form ``packageName.tableName`` (packageName is the name of the :ref:`package <packages>` to which the table belongs to) :param storeType: TODO :param parentStore: TODO
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::FormStore:L692`: Client-side form data store for load/save record operations. Args: **kwargs: handler, table, formId, pkeyField, autoSave.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formstore:L380`

```python
def formstore(self, handler='recordCluster', nodeId=None, table=None,
                  storeType=None, parentStore=None, **kwargs):
        """TODO
        
        :param storepath: TODO
        :param handler: TODO
        :param nodeId: the page nodeId. For more information, check the :ref:`nodeid`
                       documentation page
        :param table: the :ref:`database table <table>` name on which the query will be executed,
                      in the form ``packageName.tableName`` (packageName is the name of the
                      :ref:`package <packages>` to which the table belongs to)
        :param storeType: TODO
        :param parentStore: TODO"""
        assert self.attributes.get('tag','').lower()=='frameform', 'formstore can be created only inside a FrameForm'
        storeCode = self.attributes['frameCode']
        self.attributes['storeCode'] = storeCode
        if not storeType:
            if parentStore:
                storeType='Collection'
            else:
                storeType='Item'
        if table:
            self.attributes['table'] = table
        elif 'table' in self.attributes:
            table = self.attributes['table']
        if table:
            tblattr = dict(self.page.db.table(table).attributes)
            tblattr.pop('tag',None)
            self.data('.controller.table',table,**tblattr)
        return self.child('formStore',childname='store',storeCode=storeCode,table=table,
                            nodeId = nodeId or '%s_store' %storeCode,storeType=storeType,
                            parentStore=parentStore,handler=handler,**kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::FormStore:L692`

```python
def FormStore(self, **kwargs):
        """Client-side form data store for load/save record operations.

        Args:
            **kwargs: handler, table, formId, pkeyField, autoSave.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.formstore(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formstore:L380`
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::FormStore:L692`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `src/gramlot/grammar/logic.py:L147`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
