# textBox

## Identity

- **Identity:** `textBox`; browser tag `gnr-textbox`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** edit a scalar text value through a native text input adapted to
  Gramlot Source, Data binding, decoration and field state.
- **Status:** implementato

## Bases, mixins and composition

`GnrTextBox` subclasses the shared `ControlElement`. That base composes the
`Decorated` and `FieldState` capabilities and owns the native input, null state,
label decoration, lifecycle cleanup and event forwarding. `textBox` adds only
`inputType = "text"`; inherited attributes should be documented on a future
`ControlElement` base card rather than duplicated across every control.

## Common parameters

| Parameter | Type | Presence | Default | Bindings | Constraints |
| --- | --- | --- | --- | --- | --- |
| `value` | scalar text or `None` | optional | `None` | `^path` writes and observes; `=path` reads passively | A focused native editor is not overwritten by incoming updates. |
| `placeholder` | string | optional | empty | ordinary Source binding rules | Forwarded to the native input. |
| `lbl` | string | optional | absent | ordinary Source binding rules | Uses shared label decoration. |
| `disabled` | boolean | optional | `False` | ordinary Source binding rules | Disables native interaction. |
| `readonly` | boolean | optional | `False` | ordinary Source binding rules | Prevents native editing. |
| `live` | boolean | optional | `False` | ordinary Source binding rules | `True` selects input-event write-back; otherwise commit is on change/focus-out. |

Additional validation, styling, label and form parameters belong to shared base
contracts and are not repeated here. The Python declaration accepts `**kwargs`;
that open signature is not evidence that every possible argument is supported.

## Behavior, output and errors

The browser component exposes a `value` property. `None` is retained as null
rather than collapsed into an empty string. Native `input` is composed; native
`change` is re-emitted from the host so delegated Gramlot write-back can observe
it across Shadow DOM. Invalid validation state is presented through the shared
field-state service; validation policy is outside this component-specific card.

## Abstract extension hooks

There are no `textBox`-specific abstract hooks. New scalar controls extend
`ControlElement` through `_createControl()`, `_configure()`, `inputType`,
`controlCss` and related shared lifecycle points.

## Generic example

```python
root.textBox(value='^profile.name', lbl='Name', placeholder='Full name')
```

## Code and evidence

- `src/gramlot/grammar/inputs.py`: Python declaration and `gnr-textbox` mapping.
- `js/dom/src/components/builtin-components.json`: component identity and shared
  capabilities.
- `js/dom/src/components/bases.js`: `ControlElement`, `Decorated` and
  `FieldState` behavior.
- `js/dom/src/collections/inputs.js`: `GnrTextBox` and custom-element registration.
- `docs/development/textbox-legacy-audit.md`: targeted legacy comparison record.

## Incompatibilità Genropy legacy

The repository contains a dedicated comparison, but this first card has not
revalidated every legacy textbox attribute and widget behavior against the
current source: **da verificare**.
