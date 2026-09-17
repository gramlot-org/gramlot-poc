# gallery

## Identity

- **Identity:** `gallery`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::gallery:L317`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `imageHeight` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Maximum image height in px in the slideshow. |
| `imageWidth` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Maximum image width in px in the slideshow. |
| `pageSize` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Number of records to retrieve from the store per request. |
| `autoLoad` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, preload images before the user views them. |
| `linkAttr` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Store attribute name for image link URL. |
| `imageThumbAttr` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Store attribute name for thumbnail URL. |
| `imageLargeAttr` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Store attribute name for full-size image URL. |
| `titleAttr` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Store attribute name for image title. |
| `slideshowInterval` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Seconds between automatic image transitions. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::gallery:L317`: Image gallery combining a ThumbnailPicker and SlideShow. Args: imageHeight: Maximum image height in px in the slideshow. imageWidth: Maximum image width in px in the slideshow. pageSize: Number of records to retrieve from the store per request. autoLoad: If True, preload images before the user views them. linkAttr: Store attribute name for image link URL. imageThumbAttr: Store attribute name for thumbnail URL. imageLargeAttr: Store attribute name for full-size image URL. titleAttr: Store attribute name for image title. slideshowInterval: Seconds between automatic image transitions.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::gallery:L317`

```python
def gallery(self, imageHeight: int | None = None,
                imageWidth: int | None = None,
                pageSize: int | None = None,
                autoLoad: bool = True,
                linkAttr: str | None = None,
                imageThumbAttr: str | None = None,
                imageLargeAttr: str | None = None,
                titleAttr: str | None = None,
                slideshowInterval: int | None = None,
                **kwargs):
        """Image gallery combining a ThumbnailPicker and SlideShow.

        Args:
            imageHeight: Maximum image height in px in the slideshow.
            imageWidth: Maximum image width in px in the slideshow.
            pageSize: Number of records to retrieve from the store per request.
            autoLoad: If True, preload images before the user views them.
            linkAttr: Store attribute name for image link URL.
            imageThumbAttr: Store attribute name for thumbnail URL.
            imageLargeAttr: Store attribute name for full-size image URL.
            titleAttr: Store attribute name for image title.
            slideshowInterval: Seconds between automatic image transitions.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.gallery(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::gallery:L317`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
