# dataFormula

## Identity

- **Identity:** `dataFormula`
- **Type:** controller
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `GenroWidgets`, `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `dataFormula`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataFormula:L86`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `path` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the dataFormula's path |
| `formula` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the dataFormula's formula |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | formula parameters and other ones (:ref:`css`, etc) |

- **Forwarded keyword names:** `formula`, `path`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataFormula:L45`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `path` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Datastore path where the computed result is stored. |
| `formula` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | JavaScript expression using named variables. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataFormula:L86`: Create a :ref:`dataformula` and returns it. dataFormula allows to calculate a value through a formula. :param path: the dataFormula's path :param formula: the dataFormula's formula :param **kwargs: formula parameters and other ones (:ref:`css`, etc)
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataFormula:L45`: Reactive formula that computes a value from datastore paths. Args: path: Datastore path where the computed result is stored. formula: JavaScript expression using named variables. **kwargs: Variable bindings (varname='^.path' or varname='=.path').
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataFormula:L86`

```python
def dataFormula(self, path, formula, **kwargs):
        """Create a :ref:`dataformula` and returns it. dataFormula allows to calculate
        a value through a formula.
        
        :param path: the dataFormula's path
        :param formula: the dataFormula's formula
        :param **kwargs: formula parameters and other ones (:ref:`css`, etc)
        """
        return self.child('dataFormula', path=path, formula=formula, **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataFormula:L45`

```python
def dataFormula(self, path=None, formula=None, **kwargs):
        """Reactive formula that computes a value from datastore paths.

        Args:
            path: Datastore path where the computed result is stored.
            formula: JavaScript expression using named variables.
            **kwargs: Variable bindings (varname='^.path' or varname='=.path').
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.dataFormula(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataFormula:L86`
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataFormula:L45`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `src/gramlot/grammar/logic.py:L39`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
