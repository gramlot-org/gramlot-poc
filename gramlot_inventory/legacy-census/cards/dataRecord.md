# dataRecord

## Identity

- **Identity:** `dataRecord`
- **Type:** controller
- **Level:** COMPOSED
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `dataRpc`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataRecord:L410`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `path` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `table` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`database table <table>` name on which the query will be executed, |
| `pkey` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the record :ref:`primary key <pkey>` |
| `method` | not declared | optional | `'app.getRecord'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | *_onCalling*, *_onResult*, *sync*. For more information, |

- **Forwarded keyword names:** `method`, `path`, `pkey`, `table`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataRecord:L410`: Create a :ref:`datarecord` and returns it. dataRecord allows... TODO :param path: TODO :param table: the :ref:`database table <table>` name on which the query will be executed, in the form ``packageName.tableName`` (packageName is the name of the :ref:`package <packages>` to which the table belongs to) :param pkey: the record :ref:`primary key <pkey>` :param method: TODO :param **kwargs: *_onCalling*, *_onResult*, *sync*. For more information, check the :ref:`rpc_attributes` section
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataRecord:L410`

```python
def dataRecord(self, path, table, pkey=None, method='app.getRecord', **kwargs):
        """Create a :ref:`datarecord` and returns it. dataRecord allows... TODO
        
        :param path: TODO
        :param table: the :ref:`database table <table>` name on which the query will be executed,
                      in the form ``packageName.tableName`` (packageName is the name of the
                      :ref:`package <packages>` to which the table belongs to)
        :param pkey: the record :ref:`primary key <pkey>`
        :param method: TODO
        :param **kwargs: *_onCalling*, *_onResult*, *sync*. For more information,
                           check the :ref:`rpc_attributes` section
        """
        return self.child('dataRpc', path=path, table=table, pkey=pkey, method=method, **kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.dataRecord(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataRecord:L410`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
