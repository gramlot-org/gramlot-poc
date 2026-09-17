# proseMirrorEditor

## Identity

- **Identity:** `proseMirrorEditor`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GenroWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::proseMirrorEditor:L441`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::proseMirrorEditor:L441`: ProseMirror-based rich text editor (no toolbar, schema-basic + lists). Lightweight test widget exposing the vendored ProseMirror bundle. Intended as the foundation for higher-level editors (Milkdown, TipTap). Editing is keyboard-driven; markdown-style input rules let users type ``# `` for headings, ``> `` for blockquote, ``1. `` / ``* `` for lists, ``\`\`\``` for code blocks. Undo/redo via Mod-z / Mod-Shift-z. Args: **kwargs: value (^path), format ('html' | 'json', default 'html'), editable (bool), readOnly (bool), height, width.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::proseMirrorEditor:L441`

```python
def proseMirrorEditor(self, **kwargs):
        """ProseMirror-based rich text editor (no toolbar, schema-basic + lists).

        Lightweight test widget exposing the vendored ProseMirror bundle.
        Intended as the foundation for higher-level editors (Milkdown, TipTap).
        Editing is keyboard-driven; markdown-style input rules let users type
        ``# `` for headings, ``> `` for blockquote, ``1. `` / ``* `` for lists,
        ``\\`\\`\\``` for code blocks. Undo/redo via Mod-z / Mod-Shift-z.

        Args:
            **kwargs: value (^path), format ('html' | 'json', default 'html'),
                editable (bool), readOnly (bool), height, width.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.proseMirrorEditor(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::proseMirrorEditor:L441`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
