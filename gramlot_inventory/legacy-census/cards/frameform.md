# frameform

## Identity

- **Identity:** `frameform`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GenroWidgets`, `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `FrameForm`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::frameform:L344`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `formId` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `frameCode` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `store` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `storeType` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `storeCode` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `slots` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `table` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`database table <table>` name on which the query will be executed, |
| `store_kwargs` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `centerCb`, `storeType`

- **Prefix families:** `store=True`

- **Forwarded keyword names:** `autoslots`, `formId`, `frameCode`, `namespace`, `store`, `storeCode`, `table`

- **Conditions:** `store is True`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::FrameForm:L203`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `frameCode` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Unique identifier for the frame. |
| `formId` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Unique identifier for the form. |
| `table` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Database table in package.table format. |
| `store` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Store type ('record', 'document', 'memory'). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::frameform:L344`: TODO ``frameform()`` method is decorated with the :meth:`extract_kwargs <gnr.core.gnrdecorator.extract_kwargs>` decorator :param formId: TODO :param frameCode: TODO :param store: TODO :param storeCode: TODO :param slots: TODO :param table: the :ref:`database table <table>` name on which the query will be executed, in the form ``packageName.tableName`` (packageName is the name of the :ref:`package <packages>` to which the table belongs to) :param store_kwargs: TODO
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::FrameForm:L203`: Frame container with integrated form store for record editing. Combines FramePane layout with a FormStore for load/save operations. Args: frameCode: Unique identifier for the frame. formId: Unique identifier for the form. table: Database table in package.table format. store: Store type ('record', 'document', 'memory'). **kwargs: Common attrs: datapath, pkeyPath, default_kwargs.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::frameform:L344`

```python
def frameform(self, formId=None, frameCode=None, store=None,storeType=None, storeCode=None,
                  slots=None, table=None, store_kwargs=None, **kwargs):
        """TODO
        
        ``frameform()`` method is decorated with the :meth:`extract_kwargs <gnr.core.gnrdecorator.extract_kwargs>` decorator
        
        :param formId: TODO
        :param frameCode: TODO
        :param store: TODO
        :param storeCode: TODO
        :param slots: TODO
        :param table: the :ref:`database table <table>` name on which the query will be executed,
                      in the form ``packageName.tableName`` (packageName is the name of the
                      :ref:`package <packages>` to which the table belongs to)
        :param store_kwargs: TODO"""
        formId = formId or '%s_form' %frameCode
        if not storeCode:
            storeCode = formId
        if not table:
            storeNode = self.root.nodeById('%s_store' %storeCode)
            if storeNode:
                table = storeNode.attr['table']
        centerCb = kwargs.pop('centerCb',None)
        frame = self.child('FrameForm',formId=formId,frameCode=frameCode,
                            namespace='form',storeCode=storeCode,table=table,
                            autoslots='top,bottom,left,right,center',**kwargs)
        if store:
            store_kwargs['storeType'] = storeType or store_kwargs.get('storeType')
            if store is True:
                store = 'recordCluster'
            store_kwargs['handler'] = store
            frame.formStore(**store_kwargs)
        if callable(centerCb):
            centerCb(frame)
        return frame
```

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::FrameForm:L203`

```python
def FrameForm(self, frameCode=None, formId=None, table=None, store=None, **kwargs):
        """Frame container with integrated form store for record editing.

        Combines FramePane layout with a FormStore for load/save operations.

        Args:
            frameCode: Unique identifier for the frame.
            formId: Unique identifier for the form.
            table: Database table in package.table format.
            store: Store type ('record', 'document', 'memory').
            **kwargs: Common attrs: datapath, pkeyPath, default_kwargs.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: `store=True`
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.frameform(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::frameform:L344`
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::FrameForm:L203`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
