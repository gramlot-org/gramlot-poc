# dataSelection

## Identity

- **Identity:** `dataSelection`
- **Type:** controller
- **Level:** COMPOSED
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `dataRpc`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataSelection:L348`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `path` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `table` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`database table <table>` name on which the query will be executed, |
| `method` | not declared | optional | `'app.getSelection'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `columns` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | it represents the :ref:`columns` to be returned by the "SELECT" |
| `distinct` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | boolean, ``True`` for getting a "SELECT DISTINCT" |
| `where` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the sql "WHERE" clause. For more information check the :ref:`sql_where` section. |
| `order_by` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | corresponding to the sql "ORDER BY" operator. For more information check the |
| `group_by` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the sql "GROUP BY" clause. For more information check the |
| `having` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the sql "HAVING" clause. For more information check the :ref:`sql_having` |
| `columnsFromView` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | *_onCalling*, *_onResult*, *sync*. For more information, |

- **Consumed kwargs:** `_content`, `_name`, `content`, `name`

- **Forwarded keyword names:** `columns`, `distinct`, `group_by`, `having`, `method`, `order_by`, `path`, `table`, `where`

- **Conditions:** `'content' in kwargs`, `'name' in kwargs`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataSelection:L348`: Create a :ref:`dataselection` and returns it. dataSelection allows... TODO :param path: TODO :param table: the :ref:`database table <table>` name on which the query will be executed, in the form ``packageName.tableName`` (packageName is the name of the :ref:`package <packages>` to which the table belongs to) :param method: TODO :param columns: it represents the :ref:`columns` to be returned by the "SELECT" clause in the traditional sql query. For more information, check the :ref:`sql_columns` section :param distinct: boolean, ``True`` for getting a "SELECT DISTINCT" :param where: the sql "WHERE" clause. For more information check the :ref:`sql_where` section. :param order_by: corresponding to the sql "ORDER BY" operator. For more information check the :ref:`sql_order_by` section :param group_by: the sql "GROUP BY" clause. For more information check the :ref:`sql_group_by` section :param having: the sql "HAVING" clause. For more information check the :ref:`sql_having` :param columnsFromView: TODO :param **kwargs: *_onCalling*, *_onResult*, *sync*. For more information, check the :ref:`rpc_attributes` section
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataSelection:L348`

```python
def dataSelection(self, path, table=None, method='app.getSelection', columns=None, distinct=None,
                      where=None, order_by=None, group_by=None, having=None, columnsFromView=None, **kwargs):
        """Create a :ref:`dataselection` and returns it. dataSelection allows... TODO
        
        :param path: TODO
        :param table: the :ref:`database table <table>` name on which the query will be executed,
                      in the form ``packageName.tableName`` (packageName is the name of the
                      :ref:`package <packages>` to which the table belongs to)
        :param method: TODO
        :param columns: it represents the :ref:`columns` to be returned by the "SELECT"
                        clause in the traditional sql query. For more information, check the
                        :ref:`sql_columns` section
        :param distinct: boolean, ``True`` for getting a "SELECT DISTINCT"
        :param where: the sql "WHERE" clause. For more information check the :ref:`sql_where` section.
        :param order_by: corresponding to the sql "ORDER BY" operator. For more information check the
                         :ref:`sql_order_by` section
        :param group_by: the sql "GROUP BY" clause. For more information check the
                         :ref:`sql_group_by` section
        :param having: the sql "HAVING" clause. For more information check the :ref:`sql_having`
        :param columnsFromView: TODO
        :param **kwargs: *_onCalling*, *_onResult*, *sync*. For more information,
                           check the :ref:`rpc_attributes` section
        """
        if 'name' in kwargs:
            kwargs['_name'] = kwargs.pop('name')
        if 'content' in kwargs:
            kwargs['_content'] = kwargs.pop('content')
        if not columns:
            if columnsFromView:
                raise DeprecationWarning('columnsFromView is deprecated')
                columns = '=grids.%s.columns' % columnsFromView #it is the view id
            else:
                columns = '*'
                
        return self.child('dataRpc', path=path, table=table, method=method, columns=columns,
                          distinct=distinct, where=where, order_by=order_by, group_by=group_by,
                          having=having, **kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.dataSelection(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataSelection:L348`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
