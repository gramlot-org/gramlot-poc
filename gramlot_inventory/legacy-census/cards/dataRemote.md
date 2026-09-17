# dataRemote

## Identity

- **Identity:** `dataRemote`
- **Type:** controller
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GenroWidgets`, `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `dataRemote`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataRemote:L424`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `path` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the path where the dataRemote will save the result of the rpc |
| `method` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the rpc name that has to be executed |
| `_resolved` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | *cacheTime=NUMBER*: The cache stores the retrieved value and keeps |

- **Forwarded keyword names:** `_resolved`, `childcontent`, `method`, `path`, `pop`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataRemote:L56`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `path` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Datastore path where the result is stored. |
| `method` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Server method name to call. |
| `_resolved` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Internal flag for resolution state. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataRemote:L424`: Create a :ref:`dataremote` and returns it. dataRemote is a synchronous :ref:`datarpc`: it calls a (specified) dataRspc as its resolver. When ``dataRemote`` is brought to the client, it will be changed in a Javascript resolver that at the desired path perform the rpc (indicated with the ``remote`` attribute). :param path: the path where the dataRemote will save the result of the rpc :param method: the rpc name that has to be executed :param **kwargs: *cacheTime=NUMBER*: The cache stores the retrieved value and keeps it for a number of seconds equal to ``NUMBER``
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataRemote:L56`: Lazy resolver that calls a server RPC when the path is first accessed. Unlike dataRpc (which fires immediately), dataRemote installs a resolver that triggers the RPC only when the client reads the path. Args: path: Datastore path where the result is stored. method: Server method name to call. _resolved: Internal flag for resolution state. **kwargs: Parameters passed to the server method. Special attrs: cacheTime (seconds to cache the result).
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataRemote:L424`

```python
def dataRemote(self, path, method,_resolved=None, **kwargs):
        """Create a :ref:`dataremote` and returns it. dataRemote is a synchronous :ref:`datarpc`:
        it calls a (specified) dataRspc as its resolver. When ``dataRemote`` is brought to the
        client, it will be changed in a Javascript resolver that at the desired path perform
        the rpc (indicated with the ``remote`` attribute).
        
        :param path: the path where the dataRemote will save the result of the rpc
        :param method: the rpc name that has to be executed
        :param **kwargs: *cacheTime=NUMBER*: The cache stores the retrieved value and keeps
                           it for a number of seconds equal to ``NUMBER``
        """
        childcontent =None
        if _resolved:
            resolved_kwargs = dictExtract(kwargs,'_resolved_',pop=True)
            kw = dict(kwargs)
            kw.update(resolved_kwargs)
            childcontent = method(**kw)
        return self.child('dataRemote', path=path, method=method,childcontent=childcontent,_resolved=_resolved, **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataRemote:L56`

```python
def dataRemote(self, path=None, method=None, _resolved=None, **kwargs):
        """Lazy resolver that calls a server RPC when the path is first accessed.

        Unlike dataRpc (which fires immediately), dataRemote installs a resolver
        that triggers the RPC only when the client reads the path.

        Args:
            path: Datastore path where the result is stored.
            method: Server method name to call.
            _resolved: Internal flag for resolution state.
            **kwargs: Parameters passed to the server method.
                Special attrs: cacheTime (seconds to cache the result).
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.dataRemote(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataRemote:L424`
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataRemote:L56`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
