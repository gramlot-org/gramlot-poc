# _selected_defaultFrom

## Identity

- **Identity:** `_selected_defaultFrom`
- **Type:** internal/reference helper
- **Level:** N/A
- **Purpose:** source-backed census entry; detailed product purpose is internal support for public declarations.
- **Status:** solo riferimento legacy

## Bases, mixins and composition

Declared by module-level helpers.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/_helpers.py::_selected_defaultFrom:L28`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `fieldobj` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `result` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `defaultFrom`

- **Prefix families:** `@*`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/_helpers.py::_selected_defaultFrom:L28`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/_helpers.py::_selected_defaultFrom:L28`

```python
def _selected_defaultFrom(fieldobj=None,result=None):
    for c in fieldobj.table.columns.values():
        defaultFrom = c.attributes.get('defaultFrom')
        if not (defaultFrom and defaultFrom[1:].startswith(fieldobj.name)):
            continue
        colname = c.name
        pathlist = defaultFrom.split('.')
        if pathlist[-1].startswith('@'):
            pathlist.append(colname)
        colpath = pathlist[1:]
        key = pathlist[-1]
        value = f'.{colname}'
        if len(colpath)>1:
            value = f'{value}={".".join(colpath)}'
        result[f"selected_{key}"] = value
```


## Abstract extension hooks

Statically visible extension families: `@*`
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
# Internal/reference symbol; no public authoring call.
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/_helpers.py::_selected_defaultFrom:L28`

## Incompatibilità Genropy legacy

This is internal/reference legacy machinery rather than a public Gramlot contract; applicability is **da verificare**.
