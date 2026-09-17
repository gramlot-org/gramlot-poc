# tableAnalyzeStore

## Identity

- **Identity:** `tableAnalyzeStore`
- **Type:** controller
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::tableAnalyzeStore:L395`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `table` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`database table <table>` name on which the query will be executed, |
| `where` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the sql "WHERE" clause. For more information check the :ref:`sql_where` |
| `group_by` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the sql "GROUP BY" clause. For more information check the |
| `storepath` | not declared | optional | `'.store.root'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `caption` | not declared | optional | `'Store'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `caption`, `group_by`, `table`, `where`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::tableAnalyzeStore:L395`: TODO :param table: the :ref:`database table <table>` name on which the query will be executed, in the form ``packageName.tableName`` (packageName is the name of the :ref:`package <packages>` to which the table belongs to) :param where: the sql "WHERE" clause. For more information check the :ref:`sql_where` section :param group_by: the sql "GROUP BY" clause. For more information check the :ref:`sql_group_by` section :param storepath: TODO
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::tableAnalyzeStore:L395`

```python
def tableAnalyzeStore(self, table=None, where=None, group_by=None, storepath='.store.root',caption='Store',**kwargs):
        """TODO
        
        :param table: the :ref:`database table <table>` name on which the query will be executed,
                      in the form ``packageName.tableName`` (packageName is the name of the
                      :ref:`package <packages>` to which the table belongs to)
        :param where: the sql "WHERE" clause. For more information check the :ref:`sql_where`
                      section
        :param group_by: the sql "GROUP BY" clause. For more information check the
                         :ref:`sql_group_by` section
        :param storepath: TODO
        """
        self.data('.store',Bag(),caption=caption)
        self.dataRpc(storepath,'app.tableAnalyzeStore',table=table,where=where,group_by=group_by,**kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.tableAnalyzeStore(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::tableAnalyzeStore:L395`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
