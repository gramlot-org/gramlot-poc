# slideShow

## Identity

- **Identity:** `slideShow`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::slideShow:L359`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `imageHeight` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Maximum image height in px. |
| `imageWidth` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Maximum image width in px. |
| `title` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Initial slideshow title. |
| `titleTemplate` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Template for title text (supports ${title}, ${current}, ${total}). |
| `noLink` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, disable anchor link around the displayed image. |
| `loop` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, loop back to the first image after the last. |
| `hasNav` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Show/hide visual navigation controls. |
| `pageSize` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Number of images to request per batch. |
| `autoLoad` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, preload images before viewing. |
| `autoStart` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, start the slideshow immediately. |
| `fixedHeight` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, widget height stays fixed regardless of image size. |
| `imageStore` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Data store implementing dojo.data Read API. |
| `linkAttr` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Store attribute name for image link URL. |
| `imageLargeAttr` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Store attribute name for full-size image URL. |
| `titleAttr` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Store attribute name for image title. |
| `slideshowInterval` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Seconds between automatic transitions. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::slideShow:L359`: Image slideshow widget with automatic and manual navigation. Args: imageHeight: Maximum image height in px. imageWidth: Maximum image width in px. title: Initial slideshow title. titleTemplate: Template for title text (supports ${title}, ${current}, ${total}). noLink: If True, disable anchor link around the displayed image. loop: If True, loop back to the first image after the last. hasNav: Show/hide visual navigation controls. pageSize: Number of images to request per batch. autoLoad: If True, preload images before viewing. autoStart: If True, start the slideshow immediately. fixedHeight: If True, widget height stays fixed regardless of image size. imageStore: Data store implementing dojo.data Read API. linkAttr: Store attribute name for image link URL. imageLargeAttr: Store attribute name for full-size image URL. titleAttr: Store attribute name for image title. slideshowInterval: Seconds between automatic transitions.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::slideShow:L359`

```python
def slideShow(self, imageHeight: int | None = None,
                  imageWidth: int | None = None,
                  title: str | None = None,
                  titleTemplate: str | None = None,
                  noLink: bool = False,
                  loop: bool = True,
                  hasNav: bool = True,
                  pageSize: int | None = None,
                  autoLoad: bool = True,
                  autoStart: bool = False,
                  fixedHeight: bool = False,
                  imageStore: str | None = None,
                  linkAttr: str | None = None,
                  imageLargeAttr: str | None = None,
                  titleAttr: str | None = None,
                  slideshowInterval: int | None = None,
                  **kwargs):
        """Image slideshow widget with automatic and manual navigation.

        Args:
            imageHeight: Maximum image height in px.
            imageWidth: Maximum image width in px.
            title: Initial slideshow title.
            titleTemplate: Template for title text (supports ${title}, ${current}, ${total}).
            noLink: If True, disable anchor link around the displayed image.
            loop: If True, loop back to the first image after the last.
            hasNav: Show/hide visual navigation controls.
            pageSize: Number of images to request per batch.
            autoLoad: If True, preload images before viewing.
            autoStart: If True, start the slideshow immediately.
            fixedHeight: If True, widget height stays fixed regardless of image size.
            imageStore: Data store implementing dojo.data Read API.
            linkAttr: Store attribute name for image link URL.
            imageLargeAttr: Store attribute name for full-size image URL.
            titleAttr: Store attribute name for image title.
            slideshowInterval: Seconds between automatic transitions.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.slideShow(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::slideShow:L359`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
