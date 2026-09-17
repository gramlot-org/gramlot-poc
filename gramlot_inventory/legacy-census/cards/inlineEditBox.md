# inlineEditBox

## Identity

- **Identity:** `inlineEditBox`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::inlineEditBox:L316`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Current displayed/editable value. |
| `editor` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Widget class to use as editor (e.g. 'dijit.Editor', 'dijit.form.Slider'). |
| `autoSave` | bool | optional | `True` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If True, saves on blur without requiring Save button. |
| `buttonSave` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Label for the save button (empty string to hide). |
| `buttonCancel` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Label for the cancel button (empty string to hide). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::inlineEditBox:L316`: An element with in-line edit capabilities. When clicked, an editor replaces the text. Optionally shows Save/Cancel buttons. Default editor is Textarea (or TextBox for inline values). Args: value: Current displayed/editable value. editor: Widget class to use as editor (e.g. 'dijit.Editor', 'dijit.form.Slider'). autoSave: If True, saves on blur without requiring Save button. buttonSave: Label for the save button (empty string to hide). buttonCancel: Label for the cancel button (empty string to hide).
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::inlineEditBox:L316`

```python
def inlineEditBox(self, value: str | None = None,
                      editor: str | None = None,
                      autoSave: bool = True,
                      buttonSave: str | None = None,
                      buttonCancel: str | None = None,
                      **kwargs):
        """An element with in-line edit capabilities.

        When clicked, an editor replaces the text. Optionally shows Save/Cancel
        buttons. Default editor is Textarea (or TextBox for inline values).

        Args:
            value: Current displayed/editable value.
            editor: Widget class to use as editor (e.g. 'dijit.Editor', 'dijit.form.Slider').
            autoSave: If True, saves on blur without requiring Save button.
            buttonSave: Label for the save button (empty string to hide).
            buttonCancel: Label for the cancel button (empty string to hide).
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.inlineEditBox(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::inlineEditBox:L316`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
