# codemirror

## Identity

- **Identity:** `codemirror`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `GenroWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::codemirror:L427`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::codemirror:L427`: CodeMirror 6 text editor widget for code editing. Args: **kwargs: value (^path), config_mode (language: sql, python, javascript, css, html, xml, json, markdown, yaml), config_theme (oneDark, dracula, ...), config_lineNumbers, config_keyMap (softTab), config_indentUnit, config_fontSize, config_fontFamily, config_extraGutters, readOnly, editable, lineWrapping, height, width.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::codemirror:L427`

```python
def codemirror(self, **kwargs):
        """CodeMirror 6 text editor widget for code editing.

        Args:
            **kwargs: value (^path), config_mode (language: sql, python,
                javascript, css, html, xml, json, markdown, yaml),
                config_theme (oneDark, dracula, ...), config_lineNumbers,
                config_keyMap (softTab), config_indentUnit, config_fontSize,
                config_fontFamily, config_extraGutters, readOnly, editable,
                lineWrapping, height, width.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.codemirror(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::codemirror:L427`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `js/dom/src/components/builtin-components.json`, `src/gramlot/grammar/widgets.py:L27`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
