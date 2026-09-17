# dataScript

## Identity

- **Identity:** `dataScript`
- **Type:** controller
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GenroWidgets`, `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `dataScript`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataScript:L96`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `path` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `script` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `path`, `script`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataScript:L72`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `path` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Datastore path for the result. |
| `script` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | JavaScript code to execute. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataScript:L96`: .. warning:: deprecated since version 0.7. It has been substituted by :ref:`datacontroller` and :ref:`dataformula`
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataScript:L72`: Deprecated since 0.7. Use dataController or dataFormula instead. Args: path: Datastore path for the result. script: JavaScript code to execute.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataScript:L96`

```python
def dataScript(self, path, script, **kwargs):
        """.. warning:: deprecated since version 0.7. It has been substituted
                        by :ref:`datacontroller` and :ref:`dataformula`
        """
        return self.child('dataScript', path=path, script=script, **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataScript:L72`

```python
def dataScript(self, path=None, script=None, **kwargs):
        """Deprecated since 0.7. Use dataController or dataFormula instead.

        Args:
            path: Datastore path for the result.
            script: JavaScript code to execute.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.dataScript(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataScript:L96`
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataScript:L72`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
