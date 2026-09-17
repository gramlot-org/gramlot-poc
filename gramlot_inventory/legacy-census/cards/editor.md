# editor

## Identity

- **Identity:** `editor`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::editor:L561`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Initial HTML content. |
| `plugins` | list \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | List of plugin names or instances to load. |
| `extraPlugins` | list \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Additional plugins appended to the default set. |
| `height` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Editor height CSS value (e.g. '300px'). |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::editor:L561`: A rich-text editing widget based on an iframe contentEditable area. Args: value: Initial HTML content. plugins: List of plugin names or instances to load. extraPlugins: Additional plugins appended to the default set. height: Editor height CSS value (e.g. '300px').
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::editor:L561`

```python
def editor(self, value: str | None = None,
               plugins: list | None = None,
               extraPlugins: list | None = None,
               height: str | None = None,
               **kwargs):
        """A rich-text editing widget based on an iframe contentEditable area.

        Args:
            value: Initial HTML content.
            plugins: List of plugin names or instances to load.
            extraPlugins: Additional plugins appended to the default set.
            height: Editor height CSS value (e.g. '300px').
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.editor(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::editor:L561`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
