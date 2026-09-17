# child

## Identity

- **Identity:** `child`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::child:L209`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `tag` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the html tag |
| `childname` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`childname` |
| `childcontent` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the html content |
| `envelope` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `_tablePermissions` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `__forbidden__`, `_childname`, `_strippedKwargs`, `_tags`, `default_value`, `disabled`, `fld`, `innerHTML`, `nodeId`, `serverpath`, `src`, `table`, `tag`, `value`

- **Prefix families:** `^*`

- **Forwarded keyword names:** `childcontent`, `childname`, `tag`

- **Conditions:** `'_tags' in kwargs`, `'disabled' not in kwargs`, `'fld' in kwargs`, `'value' not in kwargs`, `childname != '*_#'`, `v is None`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::child:L209`: Set a new item of the ``tag`` type into the current structure through the :meth:`child() <gnr.core.gnrstructures.GnrStructData.child>` and return it :param tag: the html tag :param childname: the :ref:`childname` :param childcontent: the html content :param envelope: TODO
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::child:L209`

```python
def child(self, tag, childname=None, childcontent=None, envelope=None,_tablePermissions=None,**kwargs):
        """Set a new item of the ``tag`` type into the current structure through
        the :meth:`child() <gnr.core.gnrstructures.GnrStructData.child>` and return it
        
        :param tag: the html tag
        :param childname: the :ref:`childname`
        :param childcontent: the html content
        :param envelope: TODO"""
        if childname and childname.startswith('^') and 'value' not in kwargs:
            kwargs['value'] = childname
            childname = None
        if '_tags' in kwargs and not self.page.application.checkResourcePermission(kwargs['_tags'], self.page.userTags):
            kwargs['__forbidden__'] = True
        if _tablePermissions and _tablePermissions.get('table') \
            and not self.page.checkTablePermission(**_tablePermissions):
            kwargs['__forbidden__'] = True
        if not self.page.application.allowedByPreference(**kwargs):
            kwargs['__forbidden__'] = True
        if 'fld' in kwargs:
            fld_dict = self.getField(kwargs.pop('fld'))
            fld_dict.update(kwargs)
            kwargs = fld_dict
            t = kwargs.pop('tag', tag)
            if tag == 'input':
                tag = t
        if hasattr(self, 'fbuilder'):
            if tag not in (
            'tr', 'data', 'script', 'func', 'connect', 'dataFormula', 'dataScript', 'dataRpc', 'dataRemote',
            'dataRecord', 'dataSelection', 'dataController'):
                if tag == 'br':
                    return self.fbuilder.br()
                if 'disabled' not in kwargs:
                    if hasattr(self, 'childrenDisabled'):
                        kwargs['disabled'] = self.childrenDisabled
                return self.fbuilder.place(tag=tag, childname=childname, **kwargs)
        if envelope:
            obj = GnrStructData.child(self, 'div', childname='*_#', **envelope)
        else:
            obj = self
        for k,v in list(kwargs.items()):
            if isinstance(v,GnrStructData):
                kwargs[k]=v.js_sourceNode()
        if kwargs.get('nodeId'):
            self.checkNodeId(kwargs['nodeId'])
        sourceNodeValueAttr = dictExtract(kwargs,'attr_')
        serverpath = sourceNodeValueAttr.get('serverpath')
       # dbenv = sourceNodeValueAttr.get('dbenv')
        if serverpath: #or dbenv:
            clientpath = kwargs.get('value') or kwargs.get('src') or kwargs.get('innerHTML')
            if clientpath:
                clientpath = clientpath.replace('^','').replace('=','')
                value=kwargs.get('default_value')
                self.data(clientpath,value,**sourceNodeValueAttr)
        if childname and childname != '*_#':
            kwargs['_childname'] = childname
        _strippedKwargs=','.join([k for k,v in list(kwargs.items()) if v is None])
        if _strippedKwargs:
            kwargs['_strippedKwargs'] = _strippedKwargs
        return GnrStructData.child(obj, tag, childname=childname, childcontent=childcontent,**kwargs)
```


## Abstract extension hooks

Statically visible extension families: `^*`
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.child(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::child:L209`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
