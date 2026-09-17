# PORT-0001-bagdb-read-stores

Status: **PoC preparation implemented; destination review pending**.
Owner correction (2026-09-17): run DB trials here, and transfer generic BagDB from
Bag JS into Gramlot common code. No release, push or product acceptance performed.

## Scope and provenance

[GP-020 expanded](../../docs/development/020-bagdb-laboratory.md) and
[compact](../../docs_llm/development/020-bagdb-laboratory.md) describe the contract,
setup and limitations. [GP-021](../../docs/development/021-bagdb-library.md) owns the
transferred generic utility. Source provenance and original SHA-256 are in GP-020.
The Bag JS candidate worktree is clean after removing BagDB source/test/guide/export;
its ordinary Bag API remains. No historical commits or published packages changed.

Common code: js/dom/src/database/common. Fake implementation: database/fake.
Source integration: database/service.js plus bounded runtime/grammar/renderer hooks.
Python lab: docs/examples/bagdb/pages/index.py; reproducible exporter alongside it.
The destination worktree retains earlier candidates for comparison; its test fixture
now imports the Gramlot-owned utility through GRAMLOT_POC_SOURCE, not BAGDB_SOURCE.

## Verification — 2026-09-17

- 54 selected JS tests passed, including 10 utility, 12 adapter/store, 3 Source
  integration tests, and related logic/store/selector regressions.
- 17 selected Python tests passed: DB declarations/serialization, dataRpc and SQLite.
- Full JS suite: 451/452 passed on the initial run; the sole failing test could not
  write its generated OpenAPI page under sandbox restrictions. Re-running that
  two-test file with write permission passed 2/2. No failing assertion remains.
- Retained clean-destination candidates: 12/12 passed with the relocated utility.
- Browser resources and distribution built locally; Python lab exporter succeeded.
- Browser: identity restoration, missing/restore, containment search, selection →
  record update, reactive limit/grid/hasMore, Python source and Inspector verified.

SQLite's existing host test had stale fixture injection: it assigned a page class
attribute instead of the current host db_handler parameter. The test now follows
the actual host API. No host production implementation changed.

## Review findings retained

1. Initial node teardown hook was not on the runtime's actual removal path. A
   new Source-removal test detected late writes. Cleanup now also runs from
   BuilderHandler._unregisterPointer; the test passes. Later ports must exercise
   actual Source deletion, not only explicit store.dispose().
2. Old dbSelect stringifies IDs and has its own busy policy. This is an explicit
   integration limit; typed adapter/record APIs do not silently adopt that policy.
   The lab uses text IDs. Typed widget writeback needs a separate reviewed change.
3. BagDB previously belonged to an external uncommitted candidate. Ownership is
   now Gramlot common code, but this uncommitted PoC slice still needs review and
   a bounded accepted revision before being promoted to the clean product.

## Omissions / destination feedback

Pending: typed widget identities, field/fieldcell metadata construction, recursive
relationTree, remote adapter/providers and authorization/cleanup verification.
No dbComboBox port, application writes, ORM parity, record hierarchy or advanced
GenroPy features claimed. BagDB retains its TYTX suffix and scalar-type limitations.
The constitution was checked (2–5, 8–10); no conflict or amendment identified.
Destination review result remains **pending**, never implied by local tests.

## Model follow-up — 2026-09-17

GP-025 adds abstract ModelProvider, validated ModelCatalog, explicit relation paths
and a bounded eager schema tree, presented through dataRelationTree + storeTree.
Five new model tests; 20 model/adapter/Source tests pass, Python authoring passes.
Browser expansion confirms fields/types/inverse edges/cycle leaf. Real remote model
providers, lazy resolvers and field/fieldcell remain pending; earlier statement that
all recursive model tree work is absent is superseded by this bounded experiment.

## Complete legacy fixture — 2026-09-17

Owner requests comparable trials with all 18 CSV tables. The PoC now stores
17,538 rows under `docs/examples/bagdb/mydb/{struct,data}`, with source hashes
and an offline reproducible converter. All CSV cells/order match the JSON files.
BagDB now accepts leading underscores for legacy system columns. Python checks
(2) and common BagDB/full-dataset JS checks (11) pass. Browser record/selection,
clear/restore and generic tree are observed. Decimal/date/XML semantics, computed
fields, composite/external relations remain unsupported; lexical values are
preserved. Full database snapshot copying causes slow startup/reads and remains
an optimization gap. This evidence does not establish destination acceptance.
