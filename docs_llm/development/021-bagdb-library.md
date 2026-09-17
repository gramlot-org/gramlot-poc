# 021 · BagDB common library

Document ID: **GP-021**. Status: **transferred to Gramlot PoC, 2026-09-17; acceptance pending**.
[Expanded view](../../docs/development/021-bagdb-library.md).

<a id="gp-021-005"></a>

## 005 · Structure and calls

- **005.1** Gramlot common JS utility; depends on Bag, no host/filesystem/UI.
  Export BagDB from gramlot-dom; source database/common/bagdb.js. Not the read adapter.
- **005.2** Owns copied Bag(struct, data). setTable → setColumn(dtype/PK/nullable),
  setRelation separately. Schema changes validate whole candidate atomically;
  handles survive changes. New nullable fields fill null; no implicit defaults.
- **005.3** CRUD + getRow/getRows. Populated table: one immutable T/L PK.
  T string, L safe integer, R finite number, B boolean; strict types, omitted values null
  unless required. Names: [A-Za-z][A-Za-z0-9_]*. Keys may be empty/punctuated strings.
- **005.4** FK targets existing same-dtype PK; nullable/self references supported;
  duplicates/orphans/referenced deletes fail before mutation. Duplicate Bag labels rejected.
  Input, snapshot and returned rows detached. No external mutation bypass.
- **005.5** getRows: equality AND + literal text contains/startsWith, sensitive by default;
  insertion order; default limit 50, zero empty. PK direct lookup, queries/FKs full scans.
  No ranking/fallback, extra indexes or concurrent writers. Schema copying is for small fixtures.

<a id="gp-021-010"></a>

## 010 · Persistence and limits

- **010.1** Optional save(TYTX JSON) awaited by explicit close(); caller owns loading/I/O.
  Concurrent closes share pending save; success closes writes; failure allows retry/writes.
  Repeated successful close does not save again; reads remain available. No unload guarantee.
- **010.2** Reserved TYTX suffix strings (::xx) unsupported; no escaping fix.
  No joins/cascades/SQL/generated keys/migrations/transactions across calls/schema removal,
  renaming/custom dtypes/UI selection policy. Neutral contract does not inherit these limits.

<a id="gp-021-015"></a>

## 015 · Verification

- **015.1** From js/dom: node --test tests/bagdb.test.js. Ten passing transferred tests:
  CRUD/integrity/types/keys/queries/isolation/loaded-data validation/self-FKs/TYTX/close/schema.
  Adapter/runtime integration and its omissions are documented separately in GP-020.
