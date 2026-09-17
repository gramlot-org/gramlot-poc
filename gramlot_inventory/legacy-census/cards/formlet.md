# formlet

## Identity

- **Identity:** `formlet`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formlet:L1009`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `columns` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `table` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `formletCode` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `formletclass` | not declared | optional | `'formlet'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `excludeParentField` | not declared | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `_class` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `wrap` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `col_min_width` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `cols`, `excludeCols`, `table`

- **Prefix families:** `^*`

- **Forwarded keyword names:** `_class`, `columns`, `formletCode`, `pop`, `slice_prefix`, `table`

- **Conditions:** `param_name in kwargs`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formlet:L1009`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formlet:L1009`

```python
def formlet(self,columns=None,table=None,formletCode=None,
                formletclass='formlet',excludeParentField=True,_class=None,
                wrap=None,col_min_width=None,**kwargs):
        # Two responsive modes, mutually exclusive with each other and with a
        # fixed `columns`/`cols`:
        #  * wrap=True       -> wrapping flexbox: heterogeneous items keep their
        #    intrinsic width and flow onto new rows when they no longer fit
        #    (toolbar / "headline" strips). See .gnrgridbox.formlet_wrap.
        #  * col_min_width   -> responsive grid: uniform columns that reduce in
        #    count as the container narrows, down to 1, each column at least
        #    `col_min_width` wide (mobile-friendly record forms). Same CSS
        #    auto-fit/minmax trick as the groupletGrid min_width. auto-fit
        #    never lays out more tracks than there are items; cap the count on
        #    wide screens with a fixed `columns=N` or a max_width on the formlet.
        #    A distinct name (not `min_width`) so it never shadows the element's
        #    CSS min-width style.
        if col_min_width:
            kwargs.pop('cols', None)
            columns = f'repeat(auto-fit, minmax({col_min_width}, 1fr))'
        elif wrap:
            formletclass = f'{formletclass} formlet_wrap'
        formNode = self.parentNode.attributeOwnerNode('formId') if self.parentNode else None
        excludeCols = kwargs.pop('excludeCols',None)
        if formNode:
            table = table or formNode.attr.get('table')
            # Hide the parent link column when this formlet is the child form of a
            # relation-based Table Handler, mirroring the formbuilder behaviour
            # (see GnrFormBuilder._formCell). The Table Handler puts the parent fkey
            # in the form node's excludeCols; field() reads it back from there.
            # excludeParentField=False opts out and shows the column anyway.
            if not excludeParentField:
                formNode.attr.pop('excludeCols',None)
            elif excludeCols:
                formNode.attr.setdefault('excludeCols',excludeCols)

        # Promote static item_* to their unprefixed form on the gridbox so
        # that child fields can pick them up via getInheritedAttributes()
        # before gridbox.onChildBuilding copies _items_attr on them
        # (buildLblWrapper runs *before* the child has been touched).
        # Reactive bindings (^...) must NOT be promoted: they would land on
        # the gridbox as unhandled reactive attrs and trigger rebuild loops.
        item_params = dictExtract(kwargs, 'item_', pop=False, slice_prefix=True)
        for param_name, value in item_params.items():
            if param_name in kwargs:
                continue
            if isinstance(value, str) and value.startswith('^'):
                continue
            kwargs[param_name] = value

        result =  self.gridbox(columns=columns,
                               table=table,
                            formletCode=formletCode,
                            _class=_class or f'gnrgridbox {formletclass}',**kwargs)
        if formNode:
            if not hasattr(formNode,'_mainformbuilder'):
                formNode._mainformbuilder = result
        return result
```


## Abstract extension hooks

Statically visible extension families: `^*`
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.formlet(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formlet:L1009`
- Current Gramlot name-level evidence: `js/dom/src/components/builtin-components.json`, `src/gramlot/grammar/layout.py:L10`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
