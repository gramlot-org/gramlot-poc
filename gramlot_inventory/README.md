# Gramlot inventory — first review draft

This directory contains a source-backed inventory experiment for Gramlot's public
building blocks. It combines a small set of reviewed current-contract cards with
a complete syntactic census of the owner-selected legacy Python discovery trees.
It does not make every legacy behavior an approved Gramlot contract.

## Taxonomy

The primary split is by responsibility:

- **Components** produce user-interface nodes. **Low-level** components occupy
  one Source node and map to one native or adapted browser component. **Composed**
  components expand into multiple ordinary Source nodes.
- **Controllers** produce or react to Data and events. **Low-level** controllers
  are direct Source runtime declarations. **Composed** controllers expand into
  one or more lower-level controllers and may also add component nodes.
- **Recipes** are construction-time compositions of ordinary Source nodes. They
  remain distinct because the planned Python `@recipe` registration API is not
  implemented. A declaration being composed does not make it an implemented
  recipe.
- **Mixins** add reusable authoring or host capabilities without being Source
  nodes themselves.
- **Proxy and integration contracts** expose a stable generic boundary to host
  or backend services. Backend implementations belong in parallel inventories;
  this inventory records only the shared contract.

Level describes construction, not complexity or importance. Parameter
optionality describes whether an author must supply an argument; it does not
claim that every optional legacy capability is implemented.

## Initial cards

### Components

- Low-level: [`textBox`](components/low-level/textBox.md)
- Composed: no representative card yet

### Controllers

- Low-level: [`dataFormula`](controllers/low-level/dataFormula.md)
- Composed: [`apiResolver` concept / verified `openApiResolver`](controllers/composed/apiResolver.md),
  [`dataRecord`](controllers/composed/dataRecord.md), and
  [`dataSelection`](controllers/composed/dataSelection.md)

### Proxy and integration contracts

- [`DbHandler`](proxy-integration/DbHandler.md)

## Full legacy census

The [coverage manifest](legacy-census/coverage-manifest.md) maps every direct
module/class declaration and every statically discoverable literal namespace/tag
registration in the two primary source trees to one card. Same-name declarations
are consolidated into one identity card with separate signatures and source
bodies. Internal and protocol helpers also receive cards, making their exclusion
from the public authoring surface explicit.

The generated cards live in [`legacy-census/cards/`](legacy-census/cards/).
[`unresolved-evidence.md`](legacy-census/unresolved-evidence.md) records evidence
that requires downstream JavaScript, server, database-model or
application-defined handler inspection. The reproducible static-analysis script
is [`reference/generate_census.py`](reference/generate_census.py).
The [secondary implementation-reference index](legacy-census/implementation-reference-index.md)
locates exact-name consumers outside the primary declarations without treating a
textual occurrence as verified semantics.

### Recipes and mixins

No individual recipe card is included in this first set. `DbPageMixin` is
documented with the `DbHandler` proxy contract because its sole current role is
registering that proxy. A broader census should decide whether shared component
capabilities such as `Decorated` and `FieldState` deserve separate mixin cards.

## Discovery evidence and remaining census

Current Gramlot discovery starts from `src/gramlot/grammar/`, the generated
component catalogue in `js/dom/src/components/builtin-components.json`, browser
registrations and runtime services. Maintained guides and tests provide behavior
evidence but do not override code.

Legacy discovery starts from Genropy's `gnrpy/gnr/web/gnrwebstruct/` definitions,
especially `base.py`, `dojo11.py`, `dojo20.py`, `gridstruct.py`, `formbuilder.py`
and `_helpers.py`, then follows widget definitions in
`gnrpy/gnr/web/widgets/` (`genro.py`, `dijit.py`, `dojox.py`, `html.py`).
These Python definitions are the preferred widget discovery source;
`gnrjs/gnr_d11/js/genro_widgets.js` is secondary implementation evidence.
Those sources are an index of candidates,
not proof that Gramlot implements them.

The declaration and registration census is complete for literal, statically
visible Python entries. Downstream consumer review remains explicitly tracked
where open `**kwargs`, dynamic registrations or implementation layers prevent a
finite answer from these indexes alone. Generic behavior remains separate from
SQLite, Genropy, FastAPI, Django and other implementations.

## Card rules exercised here

Every card records identity, type, level, purpose and status; bases, mixins or
composition; common parameters with binding and constraint information; behavior,
output and errors; extension hooks; a generic Python-first example; and source
evidence. Inherited APIs are linked to their base contract rather than copied.
Every card ends with `Incompatibilità Genropy legacy`; unperformed comparisons
are explicitly marked `da verificare`.
