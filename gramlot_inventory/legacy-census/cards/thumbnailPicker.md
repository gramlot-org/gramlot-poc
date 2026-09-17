# thumbnailPicker

## Identity

- **Identity:** `thumbnailPicker`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::thumbnailPicker:L399`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `imageStore` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Data store implementing dojo.data Read API. |
| `request` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Dojo data Read API request object. |
| `size` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Width or height in px (depending on orientation). |
| `thumbHeight` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Default thumbnail height in px. |
| `thumbWidth` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Default thumbnail width in px. |
| `useLoadNotifier` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, show colored DIV under each thumb for loading status. |
| `useHyperlink` | bool | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, clicking a thumbnail opens its link. |
| `hyperlinkTarget` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | 'new' to open in new window, else current window. |
| `isClickable` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, show pointer cursor over thumbnails. |
| `isScrollable` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, use smooth scrolling between pages. |
| `isHorizontal` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, layout thumbnails horizontally. |
| `autoLoad` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, preload thumbnail images. |
| `linkAttr` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Store attribute name for link URL. |
| `imageThumbAttr` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Store attribute name for thumbnail URL. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::thumbnailPicker:L399`: Scrolling thumbnail picker for navigating image collections. Args: imageStore: Data store implementing dojo.data Read API. request: Dojo data Read API request object. size: Width or height in px (depending on orientation). thumbHeight: Default thumbnail height in px. thumbWidth: Default thumbnail width in px. useLoadNotifier: If True, show colored DIV under each thumb for loading status. useHyperlink: If True, clicking a thumbnail opens its link. hyperlinkTarget: 'new' to open in new window, else current window. isClickable: If True, show pointer cursor over thumbnails. isScrollable: If True, use smooth scrolling between pages. isHorizontal: If True, layout thumbnails horizontally. autoLoad: If True, preload thumbnail images. linkAttr: Store attribute name for link URL. imageThumbAttr: Store attribute name for thumbnail URL.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::thumbnailPicker:L399`

```python
def thumbnailPicker(self, imageStore: str | None = None,
                        request: str | None = None,
                        size: int | None = None,
                        thumbHeight: int | None = None,
                        thumbWidth: int | None = None,
                        useLoadNotifier: bool = False,
                        useHyperlink: bool = False,
                        hyperlinkTarget: str | None = None,
                        isClickable: bool = True,
                        isScrollable: bool = True,
                        isHorizontal: bool = True,
                        autoLoad: bool = True,
                        linkAttr: str | None = None,
                        imageThumbAttr: str | None = None,
                        **kwargs):
        """Scrolling thumbnail picker for navigating image collections.

        Args:
            imageStore: Data store implementing dojo.data Read API.
            request: Dojo data Read API request object.
            size: Width or height in px (depending on orientation).
            thumbHeight: Default thumbnail height in px.
            thumbWidth: Default thumbnail width in px.
            useLoadNotifier: If True, show colored DIV under each thumb for loading status.
            useHyperlink: If True, clicking a thumbnail opens its link.
            hyperlinkTarget: 'new' to open in new window, else current window.
            isClickable: If True, show pointer cursor over thumbnails.
            isScrollable: If True, use smooth scrolling between pages.
            isHorizontal: If True, layout thumbnails horizontally.
            autoLoad: If True, preload thumbnail images.
            linkAttr: Store attribute name for link URL.
            imageThumbAttr: Store attribute name for thumbnail URL.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.thumbnailPicker(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::thumbnailPicker:L399`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
