# simpleTextarea

## Identity

- **Identity:** `simpleTextarea`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DijitWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::simpleTextarea:L146`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `value` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Current text content. |
| `rows` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Number of visible text rows. |
| `cols` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Number of visible text columns. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::simpleTextarea:L146`: A simple textarea that does not auto-resize. Works with dijit.form.Form. Args: value: Current text content. rows: Number of visible text rows. cols: Number of visible text columns.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::simpleTextarea:L146`

```python
def simpleTextarea(self, value: str | None = None,
                       rows: int | None = None,
                       cols: int | None = None,
                       **kwargs):
        """A simple textarea that does not auto-resize. Works with dijit.form.Form.

        Args:
            value: Current text content.
            rows: Number of visible text rows.
            cols: Number of visible text columns.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.simpleTextarea(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dijit.py::DijitWidgets::simpleTextarea:L146`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
