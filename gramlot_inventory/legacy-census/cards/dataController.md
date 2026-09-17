# dataController

## Identity

- **Identity:** `dataController`
- **Type:** controller
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `GenroWidgets`, `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `dataController`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataController:L102`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `script` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the Javascript code that ``datacontroller`` has to execute. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | *_init*, *_onStart*, *_timing*. For more information, |

- **Forwarded keyword names:** `script`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataController:L19`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `script` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | JavaScript code to execute. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataController:L102`: Create a :ref:`datacontroller` and returns it. dataController allows to execute Javascript code :param script: the Javascript code that ``datacontroller`` has to execute. :param **kwargs: *_init*, *_onStart*, *_timing*. For more information, check the controllers' :ref:`controllers_attributes` section
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataController:L19`: Client-side controller that executes JavaScript when observed data changes. Args: script: JavaScript code to execute. **kwargs: Data bindings using ^path (subscribe) or =path (read) syntax. Special attrs: _init, _onStart, _timing, _if, _fired.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataController:L102`

```python
def dataController(self, script=None, **kwargs):
        """Create a :ref:`datacontroller` and returns it. dataController allows to
        execute Javascript code
        
        :param script: the Javascript code that ``datacontroller`` has to execute. 
        :param **kwargs: *_init*, *_onStart*, *_timing*. For more information,
                      check the controllers' :ref:`controllers_attributes` section
        """
        return self.child('dataController', script=script, **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataController:L19`

```python
def dataController(self, script=None, **kwargs):
        """Client-side controller that executes JavaScript when observed data changes.

        Args:
            script: JavaScript code to execute.
            **kwargs: Data bindings using ^path (subscribe) or =path (read) syntax.
                Special attrs: _init, _onStart, _timing, _if, _fired.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.dataController(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::dataController:L102`
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::dataController:L19`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `src/gramlot/grammar/logic.py:L49`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
