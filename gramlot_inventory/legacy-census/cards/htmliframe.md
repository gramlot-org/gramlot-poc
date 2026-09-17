# htmliframe

## Identity

- **Identity:** `htmliframe`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`, `HtmlWidgets`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `htmliframe`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::htmliframe:L474`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `_class`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::htmliframe:L441`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::htmliframe:L474`: Create an :ref:`iframe` and returns it :param childcontent: the html content :param main: TODO
- `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::htmliframe:L441`: GenroPy enhanced iframe with datastore integration and event bridging.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::htmliframe:L474`

```python
def htmliframe(self,**kwargs):
        """Create an :ref:`iframe` and returns it
        
        :param childcontent: the html content
        :param main: TODO"""
        parent = self
        if self.page.isMobile:
            parent = parent.div(_class='scroll-wrapper')
        return parent.child('htmliframe', **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::htmliframe:L441`

```python
def htmliframe(self, **kwargs):
        """GenroPy enhanced iframe with datastore integration and event bridging."""
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.htmliframe(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::htmliframe:L474`
- `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::htmliframe:L441`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
