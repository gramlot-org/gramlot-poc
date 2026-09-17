# dataRpc

## Identity

- **Identity:** `dataRpc`
- **Type:** controller
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `GenroWidgets`, `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `dataRpc`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataRpc:L112`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `pathOrMethod` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `method` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the name of your ``dataRpc`` method |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | *_onCalling*, *_onResult*, *sync*. For more information, |

- **Forwarded keyword names:** `method`, `path`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataRpc:L30`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `pathOrMethod` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Datastore path for the result, or the method name directly. |
| `method` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Server method name (if pathOrMethod is the path). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataRpc:L112`: Create a :ref:`datarpc` and returns it. dataRpc allows the client to make a call to the server to perform an action and returns it. :param path: MANDATORY - it contains the folder path of the result of the ``dataRpc`` action; you have to write it even if you don't return any value in the ``dataRpc`` (in this situation it will become a "mandatory but dummy" parameter) :param method: the name of your ``dataRpc`` method :param **kwargs: *_onCalling*, *_onResult*, *sync*. For more information, check the :ref:`rpc_attributes` section
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataRpc:L30`: Remote procedure call to a server-side Python method. Calls a @public_method on the server and stores the result at path. Args: pathOrMethod: Datastore path for the result, or the method name directly. method: Server method name (if pathOrMethod is the path). **kwargs: Parameters passed to the server method. Special attrs: _onCalling, _onResult, _onError, _lockScreen, sync, _fired, _if, _else.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataRpc:L112`

```python
def dataRpc(self, pathOrMethod, method=None, **kwargs):
        """Create a :ref:`datarpc` and returns it. dataRpc allows the client to make a call
        to the server to perform an action and returns it.
        
        :param path: MANDATORY - it contains the folder path of the result of the ``dataRpc`` action;
                     you have to write it even if you don't return any value in the ``dataRpc``
                     (in this situation it will become a "mandatory but dummy" parameter)
        :param method: the name of your ``dataRpc`` method
        :param **kwargs: *_onCalling*, *_onResult*, *sync*. For more information,
                           check the :ref:`rpc_attributes` section
        """
        if not method and callable(pathOrMethod):
            method = pathOrMethod
            path = None
        else:
            path = pathOrMethod
        return self.child('dataRpc', path=path, method=method, **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataRpc:L30`

```python
def dataRpc(self, pathOrMethod=None, method=None, **kwargs):
        """Remote procedure call to a server-side Python method.

        Calls a @public_method on the server and stores the result at path.

        Args:
            pathOrMethod: Datastore path for the result, or the method name directly.
            method: Server method name (if pathOrMethod is the path).
            **kwargs: Parameters passed to the server method.
                Special attrs: _onCalling, _onResult, _onError, _lockScreen, sync,
                _fired, _if, _else.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.dataRpc(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataRpc:L112`
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataRpc:L30`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `src/gramlot/grammar/logic.py:L10`, `src/gramlot/grammar/logic.py:L99`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
