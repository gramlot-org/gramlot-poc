# expandbox

## Identity

- **Identity:** `expandbox`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `expandbox`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::expandbox:L560`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `title` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `open` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `animate` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `minimal` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `locked` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `animate`, `locked`, `minimal`, `open`, `title`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::expandbox:L560`: Create an expandable/collapsible container based on HTML5 details/summary. The expandbox widget wraps content in a native <details> element with a <summary> header. It supports CSS animations and reactive open/close binding. Args: title (str): The text displayed in the summary header. open (bool): Whether the box starts expanded. Default False. animate (bool): Enable smooth CSS transition on open/close. minimal (bool): Use minimal style (no border, no header background). locked (bool): Disable toggle — keeps current open/close state. The marker is hidden and the header is not clickable. **kwargs: Additional attributes. Prefix with title_* for summary styling and content_* for content div styling. Returns: GnrDomSrcNode: The expandbox container node. Example: box = pane.expandbox(title='Details', open=True, animate=True) fb = box.formbuilder(cols=2) fb.textbox(value='^.name', lbl='Name')
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::expandbox:L560`

```python
def expandbox(self, title=None, open=None, animate=None,
                  minimal=None, locked=None, **kwargs):
        """Create an expandable/collapsible container based on HTML5 details/summary.

        The expandbox widget wraps content in a native <details> element with a
        <summary> header. It supports CSS animations and reactive open/close binding.

        Args:
            title (str): The text displayed in the summary header.
            open (bool): Whether the box starts expanded. Default False.
            animate (bool): Enable smooth CSS transition on open/close.
            minimal (bool): Use minimal style (no border, no header background).
            locked (bool): Disable toggle — keeps current open/close state.
                           The marker is hidden and the header is not clickable.
            **kwargs: Additional attributes. Prefix with title_* for summary
                      styling and content_* for content div styling.

        Returns:
            GnrDomSrcNode: The expandbox container node.

        Example:
            box = pane.expandbox(title='Details', open=True, animate=True)
            fb = box.formbuilder(cols=2)
            fb.textbox(value='^.name', lbl='Name')
        """
        return self.child('expandbox', title=title, open=open,
                          animate=animate, minimal=minimal,
                          locked=locked, **kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.expandbox(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::expandbox:L560`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
