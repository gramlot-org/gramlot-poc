# data

## Identity

- **Identity:** `data`
- **Type:** controller
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `data`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::data:L793`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `*args` | not declared | optional variadic | empty tuple | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | in the kwargs you can insert the ``_serverpath`` attribute. For more |

- **Consumed kwargs:** `_serverpath`, `serverpath`

- **Forwarded keyword names:** `__cls`, `_returnStruct`, `attr`, `childcontent`, `path`, `serverpath`, `value`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::data:L793`: Create a :ref:`data` and returns it. ``data`` allows to define variables from server to client :param *args: args[0] includes the path of the value, args[1] includes the value :param **kwargs: in the kwargs you can insert the ``_serverpath`` attribute. For more information, check the :ref:`data_serverpath` example
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::data:L793`

```python
def data(self, *args, **kwargs):
        """Create a :ref:`data` and returns it. ``data`` allows to define
        variables from server to client
        
        :param *args: args[0] includes the path of the value, args[1] includes the value
        :param **kwargs: in the kwargs you can insert the ``_serverpath`` attribute. For more
                           information, check the :ref:`data_serverpath` example"""
        value = None
        className = None
        path = None
        if len(args) == 1:
            if not kwargs:
                value = args[0]
                path = None
            else:
                path = args[0]
                value = None
        elif len(args) == 0 and kwargs:
            path = None
            value = None
        elif len(args) > 1:
            value = args[1]
            path = args[0]
        if isinstance(value, dict):
            value = Bag(value)
        if isinstance(value, Bag):
            className = 'bag'
        serverpath = kwargs.pop('serverpath',None) or kwargs.pop('_serverpath',None)

        if serverpath:
            self.page.addToContext(serverpath=serverpath,value=value,attr=kwargs)
            kwargs['serverpath'] = serverpath
        #shared_id = kwargs.pop('shared_id',None)
        #if shared_id:
        #    shared_expire = kwargs.pop('shared_expire',0)
        #    self.page.asyncServer.subscribeToSharedObject(shared_id=shared_id,page=page,expire=shared_expire)
#
        return self.child('data', __cls=className,childcontent=value,_returnStruct=False, path=path, **kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.data(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::data:L793`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `src/gramlot/grammar/logic.py:L35`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
