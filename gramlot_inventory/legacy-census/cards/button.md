# button

## Identity

- **Identity:** `button`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`, `GnrDomSrc`, `GnrDomSrc_dojo_11`, `HtmlWidgets`.
Declaring-class bases: `GnrDomSrc`, `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `button`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::button:L758`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `caption` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `caption`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::button:L782`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the label of the widget |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | * **action**: allow to execute a javascript callback. For more information, |

- **Forwarded keyword names:** `label`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::button:L341`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `label` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Text displayed on the button. |
| `iconClass` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | CSS class for the button icon. |
| `showLabel` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If False, hides the label text (icon only). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::button:L273`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::button:L758`: No behavior docstring is present in the primary declaration.
- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::button:L782`: The :ref:`button` is a :ref:`dojo-improved form widget <dojo_improved_widgets>`: through the *action* attribute you can add Javascript callbacks :param label: the label of the widget :param kwargs: * **action**: allow to execute a javascript callback. For more information, check the :ref:`action_attr` section * **iconClass**: the button icon. For more information, check the :ref:`iconclass` section * **showLabel**: boolean. If ``True``, show the button label
- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::button:L341`: A styled button. Same as an HTML button with Dojo styling. Args: label: Text displayed on the button. iconClass: CSS class for the button icon. showLabel: If False, hides the label text (icon only).
- `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::button:L273`: HTML button element.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::button:L758`

```python
def button(self, caption=None, **kwargs):
        return self.child('button', caption=caption, **kwargs)
```

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::button:L782`

```python
def button(self, label=None, **kwargs):
        """The :ref:`button` is a :ref:`dojo-improved form widget <dojo_improved_widgets>`: through
        the *action* attribute you can add Javascript callbacks
        
        :param label: the label of the widget
        :param kwargs:
        
                       * **action**: allow to execute a javascript callback. For more information,
                         check the :ref:`action_attr` section
                       * **iconClass**: the button icon. For more information, check the :ref:`iconclass` section
                       * **showLabel**: boolean. If ``True``, show the button label
        """
        return self.child('button', label=label, **kwargs)
```

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::button:L341`

```python
def button(self, label: str | None = None,
               iconClass: str | None = None,
               showLabel: bool = True,
               **kwargs):
        """A styled button. Same as an HTML button with Dojo styling.

        Args:
            label: Text displayed on the button.
            iconClass: CSS class for the button icon.
            showLabel: If False, hides the label text (icon only).
        """
        ...
```

### `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::button:L273`

```python
def button(self, **kwargs):
        """HTML button element."""
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.button(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::button:L758`
- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::button:L782`
- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::button:L341`
- `genropy/gnrpy/gnr/web/widgets/html.py::HtmlWidgets::button:L273`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
