# dataFormula

## Identity

- **Identity:** `dataFormula`
- **Type:** controller
- **Level:** LOW-LEVEL
- **Purpose:** evaluate a browser-side expression and write its result to Data.
- **Status:** implementato

## Bases, mixins and composition

The Python helper belongs to `LogicDeclarations` and creates one
`dataFormula` Source node. Browser execution is owned by `LogicRuntime`; it does
not compose UI components or server calls.

## Common parameters

| Parameter | Type | Presence | Default | Bindings | Constraints |
| --- | --- | --- | --- | --- | --- |
| `destination` | Data path string | required | none | path is relative to the node datapath | Must be nonempty. |
| `formula` | JavaScript expression string | required | none | named parameters may be literals, `^` reactive bindings or `=` passive reads | Must be nonempty; `func` is rejected. |
| named inputs | any | conditional | none | `^` reruns on change; `=` is sampled when execution occurs | Names become expression scope. |
| `_on_start` | boolean | optional | false/absent | not a binding-specific field | Opts into startup execution. |
| `_delay` | milliseconds | optional | absent | may be resolved with runtime values | Coalesces pending triggers before execution. |

## Behavior, output and errors

On execution, the expression result replaces `destination`. Startup formulas
are dependency-ordered; a startup cycle raises `dataFormula startup dependency
cycle`. A missing or invalid formula raises an error. Removing a node cancels
its pending delayed execution. Function recipes remain supported by the runtime,
but the public Python contract is the expression form.

## Abstract extension hooks

Named functions may be supplied through the runtime's `dataLogic` providers.
This is an execution extension point, not a different public `dataFormula`
signature.

## Generic example

```python
root.dataFormula('invoice.total', 'price * quantity',
                 price='^invoice.price', quantity='^invoice.quantity')
```

## Code and evidence

- `src/gramlot/grammar/logic.py`: authoring validation and Source declaration.
- `js/dom/src/logic/runtime.js`: binding, scheduling, expression execution,
  destination write and cycle errors.
- `docs/development/local-logic-review.md`: reviewed implemented scope.
- Legacy discovery index:
  `gnrpy/gnr/web/gnrwebstruct/dojo11.py::dataFormula`.

## Incompatibilità Genropy legacy

The core destination/formula shape and reactive/passive parameter distinction
are intentionally close to legacy. Full comparison of legacy macros, startup
hooks and scheduling remains **da verificare**.
