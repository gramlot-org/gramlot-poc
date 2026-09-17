# remote

## Identity

- **Identity:** `remote`
- **Type:** controller
- **Level:** COMPOSED
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::remote:L847`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `method` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `lazy` | not declared | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | boolean. TODO |
| `cachedRemote` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `_onRemote`

- **Forwarded keyword names:** `_onStart`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::remote:L847`: TODO :param method: TODO :param lazy: boolean. TODO
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::remote:L847`

```python
def remote(self, method=None, lazy=True, cachedRemote=None,**kwargs):
        """TODO
        
        :param method: TODO
        :param lazy: boolean. TODO"""
        if callable(method):
            handler = method
        else:
            handler = self.page.getPublicMethod('remote', method)
        if handler:
            kwargs_copy = copy(kwargs)
            parentAttr = self.parentNode.getAttr()
            parentAttr['remote'] = 'remoteBuilder'
            parentAttr['remote_handler'] = method
            if cachedRemote:
                parentAttr['_cachedRemote'] = cachedRemote
            for k, v in list(kwargs.items()):
                if k.endswith('_path'):
                    v = u'§%s' % v
                parentAttr['remote_%s' % k] = v
                kwargs.pop(k)
            if not lazy:
                onRemote = kwargs_copy.pop('_onRemote', None)
                if onRemote:
                    self.dataController(onRemote, _onStart=True)
                handler(self, **kwargs_copy)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.remote(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::remote:L847`
- Current Gramlot name-level evidence: `src/gramlot/grammar/logic.py:L167`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
