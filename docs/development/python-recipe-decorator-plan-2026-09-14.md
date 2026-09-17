# Python recipe decorator plan

Status: planned only. The owner explicitly deferred implementation on 2026-09-14.

## Purpose and contract

Restore the authoring convenience described by the owner as the legacy struct
method: a Python routine builds ordinary Source nodes into a supplied parent,
and `pane.message_box(...)` supplies that parent automatically. This is a
Gramlot-owned feature, without a legacy runtime dependency.

The proposed decorator is `@recipe`. A decorated page/builder method remains
directly callable as `self.message_box(pane, ...)`; calling
`pane.message_box(...)` invokes the same bound method with `pane` inserted as
its first argument after `self`. Arguments, exceptions and return values retain
their ordinary Python meaning.

Illustrative API, to implement later:

```python
from gramlot.builder import GramlotBuilder, recipe


class ExamplePage(GramlotBuilder):
    @recipe
    def message_box(self, pane, value="^message"):
        box = pane.div()
        box.caption("Message")
        box.textBox(value=value)
        return box

    def main(self, root):
        root.message_box(value="^message")
```

The expansion happens in Python before serialization. The browser receives
only the generated nodes; there is no synthetic recipe node, browser recipe
lookup, or JavaScript implementation requirement. Bindings on the generated
nodes remain live in the browser. Python branches use construction-time values.

## Current integration points

- `src/gramlot/builder.py`: `GramlotBuilder.root` exposes an `AuthoringNode`;
  `_wrap()` preserves that facade for child nodes and returned structures.
- `AuthoringNode.__getattr__` currently delegates to the underlying Source node.
  Recipe resolution must integrate before unknown names reach that delegation,
  while preserving existing declarations and facade methods.
- `docs/examples/recipes/recipe.py` already demonstrates ordinary imported
  Python composition; it remains the baseline for equivalent expanded Source.

## Implementation steps, when authorized

1. Add and export `recipe` from `gramlot.builder`. Mark callables without
   changing their direct-call behavior. Initially support decorated methods
   on builder/page classes and their mixins, including inherited methods.
2. Discover marked methods on the concrete builder class and bind them to the
   current builder instance. Respect Python inheritance and overrides; avoid
   process-global registration and cross-page leakage.
3. Resolve `pane.<recipe_name>` through that instance's recipe catalog and
   pass the current `AuthoringNode` as the parent. Preserve the routine's return
   value, including `None`, and ordinary argument errors.
4. Reject ambiguous names that collide with existing authoring methods or
   element declarations, with an actionable error. Verify the actual builder
   declaration API before choosing the collision detection implementation.
5. Adapt the small box example to show the decorator and equivalent explicit
   method call, Python first. Document expansion and return-value semantics.
6. Run focused authoring and serialization tests, then the existing builder
   and grammar regression suites.

## Acceptance checks

- Explicit `self.message_box(pane, ...)` and `pane.message_box(...)` produce
  equivalent Source trees, with no extra recipe node or callable metadata in
  the serialized payload.
- Calls work on the root and nested parents; recipes can call other recipes.
- Bound methods can use page instance state; separate page instances remain
  isolated. Inheritance and deliberate overrides behave as documented.
- Positional/keyword arguments, defaults, returned nodes and `None` propagate
  correctly. Undecorated page methods are not exposed as recipes.
- Conflicting names fail clearly; normal element and authoring calls keep
  working. Serialized bindings remain identical to direct composition.

## Separate follow-up decisions

Imported free functions continue to work as `message_box(pane, ...)`.
Exposing them as `pane.message_box(...)` needs an explicit attachment/catalog
contract; do not introduce import side effects or a global registry implicitly.

The discussed `gramlot/components/` and `gramlot/recipes/` folder discovery,
class-owned component metadata, manifest generation, JavaScript recipe loading,
and persistent recipe nodes are separate architecture work. None is required
for this Python decorator. The IDE conversion is also outside this small step.
