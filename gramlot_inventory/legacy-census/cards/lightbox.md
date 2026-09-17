# lightbox

## Identity

- **Identity:** `lightbox`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::lightbox:L343`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `group` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Group name to create slideshow-like navigation among images. |
| `title` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Caption text shown beneath the image. |
| `href` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | URL of the image to display. |
| `duration` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Animation duration in ms. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::lightbox:L343`: Modal lightbox for displaying images with keyboard navigation. Args: group: Group name to create slideshow-like navigation among images. title: Caption text shown beneath the image. href: URL of the image to display. duration: Animation duration in ms.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::lightbox:L343`

```python
def lightbox(self, group: str | None = None,
                 title: str | None = None,
                 href: str | None = None,
                 duration: int | None = None,
                 **kwargs):
        """Modal lightbox for displaying images with keyboard navigation.

        Args:
            group: Group name to create slideshow-like navigation among images.
            title: Caption text shown beneath the image.
            href: URL of the image to display.
            duration: Animation duration in ms.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.lightbox(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::lightbox:L343`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
