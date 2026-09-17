# fileInputAuto

## Identity

- **Identity:** `fileInputAuto`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::fileInputAuto:L217`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `url` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | URL for background file upload. |
| `blurDelay` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Time in ms before upload starts after losing focus. |
| `duration` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Animation duration in ms. |
| `uploadMessage` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Text shown during upload progress. |
| `label` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Text label on the browse button. |
| `cancelText` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Text label on the cancel button. |
| `name` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Name attribute for the file input field. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::fileInputAuto:L217`: File input with automatic background upload on blur. Args: url: URL for background file upload. blurDelay: Time in ms before upload starts after losing focus. duration: Animation duration in ms. uploadMessage: Text shown during upload progress. label: Text label on the browse button. cancelText: Text label on the cancel button. name: Name attribute for the file input field.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::fileInputAuto:L217`

```python
def fileInputAuto(self, url: str | None = None,
                      blurDelay: int | None = None,
                      duration: int | None = None,
                      uploadMessage: str | None = None,
                      label: str | None = None,
                      cancelText: str | None = None,
                      name: str | None = None,
                      **kwargs):
        """File input with automatic background upload on blur.

        Args:
            url: URL for background file upload.
            blurDelay: Time in ms before upload starts after losing focus.
            duration: Animation duration in ms.
            uploadMessage: Text shown during upload progress.
            label: Text label on the browse button.
            cancelText: Text label on the cancel button.
            name: Name attribute for the file input field.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.fileInputAuto(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::fileInputAuto:L217`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
