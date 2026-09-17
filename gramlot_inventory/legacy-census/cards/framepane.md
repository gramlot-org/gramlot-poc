# framepane

## Identity

- **Identity:** `framepane`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GenroWidgets`, `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `FramePane`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::framepane:L299`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `frameCode` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the framepane code |
| `centerCb` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `autoslots`, `frameCode`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::FramePane:L190`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `frameCode` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Unique identifier for the frame (use '#' suffix for auto-id). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::framepane:L299`: Create a :ref:`framepane` and return it. A framePane is a :ref:`bordercontainer` with :ref:`frame_sides` attribute added: these sides follow the Dojo borderContainer suddivision: there is indeed the *top*, *bottom*, *left*, *right* and *center* regions :param frameCode: the framepane code :param centerCb: TODO
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::FramePane:L190`: Frame container with named slot regions (top, bottom, left, right, center). The center region is automatically available. Access regions via frame.top, frame.bottom, frame.left, frame.right, frame.center. Args: frameCode: Unique identifier for the frame (use '#' suffix for auto-id). **kwargs: Common attrs: datapath, title, height, width, _class.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::framepane:L299`

```python
def framepane(self, frameCode=None, centerCb=None, **kwargs):
        """Create a :ref:`framepane` and return it. A framePane is a :ref:`bordercontainer`
        with :ref:`frame_sides` attribute added: these sides follow the Dojo borderContainer
        suddivision: there is indeed the *top*, *bottom*, *left*, *right* and *center* regions
        
        :param frameCode: the framepane code
        :param centerCb: TODO"""
        frameCode = frameCode or 'frame_#'
        if '#' in frameCode:
            frameCode = frameCode.replace('#',self.page.getUuid())
        frame = self.child('FramePane',frameCode=frameCode,autoslots='top,bottom,left,right,center',**kwargs)
        if callable(centerCb):
            centerCb(frame)
        return frame
```

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::FramePane:L190`

```python
def FramePane(self, frameCode=None, **kwargs):
        """Frame container with named slot regions (top, bottom, left, right, center).

        The center region is automatically available. Access regions via
        frame.top, frame.bottom, frame.left, frame.right, frame.center.

        Args:
            frameCode: Unique identifier for the frame (use '#' suffix for auto-id).
            **kwargs: Common attrs: datapath, title, height, width, _class.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.framepane(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::framepane:L299`
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::FramePane:L190`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
