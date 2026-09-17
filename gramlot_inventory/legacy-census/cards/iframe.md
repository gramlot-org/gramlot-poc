# iframe

## Identity

- **Identity:** `iframe`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`, `HtmlWidgets`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `iframe`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::iframe:L459`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `childcontent` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the html content |
| `main` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `border`, `height`, `width`

- **Forwarded keyword names:** `_class`, `childcontent`, `main`, `overflow`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::iframe:L60`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::iframe:L459`: Create an :ref:`iframe` and returns it :param childcontent: the html content :param main: TODO
- `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::iframe:L60`: HTML inline frame element.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::iframe:L459`

```python
def iframe(self, childcontent=None, main=None, **kwargs):
        """Create an :ref:`iframe` and returns it
        
        :param childcontent: the html content
        :param main: TODO"""
        if main:
            self.attributes.update(dict(overflow='hidden'))
            kwargs['height'] = '100%'
            kwargs['width'] = '100%'
            kwargs['border'] = 0
        parent = self
        if self.page.isMobile:
            parent = parent.div(_class='scroll-wrapper')
        return parent.htmlChild('iframe', childcontent=childcontent, main=main, **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::iframe:L60`

```python
def iframe(self, **kwargs):
        """HTML inline frame element."""
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.iframe(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::iframe:L459`
- `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::iframe:L60`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
