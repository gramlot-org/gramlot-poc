# Consolidating Gramlot

Date: 2026-09-16. [Expanded version](../docs/00-consolidating-gramlot.md).
Product documentation: [V2 overview](01-overview.md).

## 1. Document roles and order

- **1.1** `00-consolidating-gramlot.md`: how we reach V2; organization, method,
  prototype evidence, decisions and open work.
- **1.2** `01-overview.md`: Gramlot product overview, intended for distribution
  with subsequent V2 architecture/reference documents. No migration narrative.
- **1.3** Number documents with two-digit prefixes; mirror names in `docs_llm`.
  Keep technical folder names stable; documentation subfolder numbering remains open.
- **1.4** Owner clarification, 2026-09-16: replaces the operational-guide role of `01`.
  Product docs contain agreed contracts, not speculative APIs or release claims;
  verify them against the delivered library. V2 area does not set a package version.

## 2. Documentation

- **2.1** Pair `docs/<path>` with `docs_llm/<path>`; update together. Preserve decisions,
  constraints, status and open questions in the minimal version. Neither adds
  independent decisions; resolve discrepancies against owner decisions.
- **2.2** Use Mermaid for useful architecture/application diagrams; text for folder trees.
- **2.3** Keep summaries human-readable: short sections, one concept per paragraph or
  bullet. Use compact lists, with blank lines around headings rather than between items.
- **2.4** Number sections and individual points hierarchically (1, 1.1, 1.2). Keep headings
  separated from preceding content without repeated horizontal rules. References
  include document and point. This refines the spacing rule on 2026-09-16.

## 3. Constitution

- **3.1** Constitution = agreed principles here and in subsequent agreed architecture
  documents; excludes proposals, examples and open questions.
- **3.2** Check new discussions/requests against it. On conflict, cite the principle and
  explain the contradiction before implementing the affected part. Resolve by
  adapting the request or explicit owner amendment, never silent reinterpretation.
  Record amendment date, changed principle and superseded decision in both versions.
  Compatible work needs no extra approval. Rule adopted 2026-09-16.

## 4. Inventory

- **4.1** Inventory guides selection: census ≠ implementation commitment. Distinguish
  observed, proposed, agreed and verified behavior; retain explicit omissions.
- **4.2** Shared cards describe contracts, parameters, dependencies, bases/mixins, hooks,
  examples and differences. Adapter cards link to shared contracts and add specifics.

## 5. Code and adapter ownership

- **5.1** New consolidated code belongs in the new Gramlot repository (section 11).
  `versione2/` is temporary staging; server adapters retain their separate locations.
- **5.2** Owner clarification, 2026-09-16: develop architecture/docs in parallel in
  `gramlot-fastapi`, `gramlot-genro-asgi`, `gramlot-django`. Gramlot owns the shared
  server-adapter responsibilities/contract document; adapter repositories own
  specific documentation, with matching `docs_llm` copies.
- **5.3** DB divisions agreed: `common` (shared contracts/behavior), `fake` (controlled
  contract checks), `genropy`, `sqlalchemy` (specific implementations/docs).
  Replaces generic adapter placeholder; exact nesting/APIs remain open.
  SQLite is a possible SQLAlchemy backend, not the adapter-area name.
- **5.4** Keep existing material available. Expose dependencies on provisional code;
  specify external-library contracts without assuming those libraries need rewriting.

## 6. Proposed layout and current status

- **6.1** Existing `gramlot_inventory/` stays in place.
- **6.2** Earlier layout, superseded by section 11: under `versione2/`: `docs/`, `docs_llm/`, `js/{core,helpers,mixins,components}/`,
  `python/`, `adapters/db/{common,fake,genropy,sqlalchemy}/`, `tests/`.
  Each DB area: `docs/`, `docs_llm/`, `src/` (proposed nesting).
- **6.3** Server workspaces: `gramlot-fastapi`, `gramlot-django`, `gramlot-genro-asgi`.
- **6.4** Only paired organization and overview documents are added so far; DB divisions and documentation ownership
  are agreed, remaining layout details proposed. Shared server contract still to write.


## 7. Consolidation

- **7.1** `versione2/` is a consolidation area, not a release number or runtime replacement.
- **7.2** Existing code/docs/experiments are provisional evidence. Admit reviewed,
  specified, verified increments into a very small new foundation.
- **7.3** GenroPy legacy is the nearly ideal behavioral reference. Preserve useful
  behavior and familiar syntax where possible; remove implementation complexity
  and Dojo constraints. Record intentional incompatibilities.
- **7.4** Latest owner corrections prevail. Historical proposals and prototype tests
  do not establish approved architecture or version 2 verification.

## 8. Examples and status

- **8.1** Input composition (illustrative): lifecycle base + label/field-state capabilities
  + text editing; shared validation service. Check binding, null/empty behavior,
  instance isolation and removal/recreation. No final hierarchy approved.
- **8.2** DB prototype: Python dbSelect → browser → server adapter → registered
  `dbhandler.dbselect` → shared `DbHandler` policy → backend implementation.
  `DbPageMixin` registers the proxy; `SqliteDbHandler` supplies backend access.
  These are review inputs, not version 2 implementations.
- **8.3** Prototype containment fallback runs only on zero prefix results; specify this
  detail in the consolidated contract. Check identity/search/backend errors.
- **8.4** `dataRecord`/`dataSelection` contracts, general capability negotiation and a
  complete GenroPy handler are not supplied by the SQLite experiment.

## 9. Implementation increments

- **9.1** Per increment: inspect evidence → agree card → assign responsibilities →
  implement → verify contract/failures/lifecycle → update evidence and omissions.
  Advance relevant adapters alongside core; do not require all combinations first.

## 10. Open

- **10.1** First runtime slice and final paths/packages.
- **10.2** Class hierarchy and mixin composition rules.
- **10.3** DB capability protocol and record/selection contracts.
- **10.4** Packaging and consumer adoption.

No runtime migration performed.

Evidence: [inventory](../../gramlot_inventory/README.md),
[decisions](../../docs/context/decisions.md),
[open work](../../docs/context/open-work.md). Further references: expanded document.

## 11. Repository amendment — 2026-09-16

- **11.1** Rename current repository `gramlot-poc`; retain history, uncommitted work,
  working pages/examples/tests. Living laboratory: new features may start here.
- **11.2** New clean `gramlot` receives reviewed ports. Root structure replaces
  nested `versione2/`; exact paths remain open. Until executed, current area is staging.
  Repository rename does not automatically rename packages or update consumers.
- **11.3** PoC owns evolution document `00` and legacy evidence. New Gramlot owns
  product docs `01` onward, selected cards and authoritative product constitution.
  Keep paired summaries; PoC references authority, never an independent constitution.
- **11.4** PoC LLM prepares bounded ports: contract/code/tests/differences. Destination
  LLM reviews coherence/behavior, accepts or requests revisions. Record exchanges
  by port ID; carry lessons forward. Architectural amendments remain owner decisions.
- **11.5** Supersedes single-repository consolidation layout. Preserve working PoC,
  dirty files, consumers and compatibility links; census paths/services/remotes before
  transition. Approved destination is not evidence that moves have occurred.

Transition sequence: [repository transition](00-01-repository-transition.md).

Current state — 2026-09-16: the repositories are split. Product authority is
[the new constitution](https://github.com/gramlot-org/gramlot/blob/main/docs/00-constitution.md).
Earlier destination layouts in this guide are historical. The PoC remains active;
its uncommitted work has been preserved rather than bulk-committed.
