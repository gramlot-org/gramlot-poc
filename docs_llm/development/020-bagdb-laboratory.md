# 020 · Local database laboratory

Document ID: **GP-020**. Status: **working PoC; clean-product acceptance pending**.
[Expanded view](../../docs/development/020-bagdb-laboratory.md).

<a id="gp-020-005"></a>

## 005 · Ownership and experiment location

- **005.1** Owner 2026-09-17: DB trials in gramlot-poc; BagDB is Gramlot common code.
  Source/tests/guide/export removed from Bag JS candidate; Bag itself remains a dependency.
  New location: js/dom/src/database/common/bagdb.js. No release/core acceptance.
- **005.2** Source base faf6bef3badb389d25ea4cb3b35c5369cb7ffd8a plus uncommitted candidate;
  full source hash in expanded view. Only Bag import changed. Ordinary pinned dependency,
  no external BagDB checkout. Review: PORT-0001-bagdb-read-stores.
- **005.3** GP namespace for new PoC guides, mirrored anchors. Earlier ID/mirror debt remains.

<a id="gp-020-010"></a>

## 010 · Layers and declarations

- **010.1** Common BagDB utility → fake ReadAdapter → common stores/catalog → controllers.
  Utility writes are fixture setup; application integration stays readonly. Experimental APIs.
- **010.2** bagDb(adapter, source, tables): Source-owned copied fixture; explicit registry;
  no live fixture synchronization or automatic table exposure.
- **010.3** dataRecord(destination, adapter, dbtable, pkey, fields?, statuspath?, _on_start=True):
  typed identity → record Bag; null/missing → null; status found distinguishes errors.
- **010.4** dataSelection(destination, adapter, dbtable, fields?, where?, orderBy?, limit=50,
  statuspath?, _on_start=True): attr-row Bag for grid. Equality AND; sort before limit
  1–1000, identity tie-break; hasMore without continuation. Whole-filter bindings only.
- **010.5** dbSelect(dbadapter, dbtable, value): local store, no RPC. Prefix then contains
  on zero hits; off-page lookup. JS lowercase differs from SQLite casefold.

<a id="gp-020-015"></a>

## 015 · Lifecycle and explicit boundaries

- **015.1** Source-owned private state Bags; results published to declared Data in live().
  Errors preserve previous results with stale/error status; replacement/removal/disposal
  block late publication. Removing adapter releases consumers; independent query state.
- **015.2** Old widget stringifies IDs, clears empty string and retains busy-request policy.
  Canonical numeric strings converted only for local widget lookup. Numeric widget values
  are not typed record inputs; lab uses T keys. Typed widget writeback still open.
- **015.3** Metadata dtype/FK/inverse edges tested. field/fieldcell, recursive relationTree,
  new dbComboBox, remote providers/security, writes, hierarchies, date/decimal/composite
  keys and GenroPy extensions not implemented. TYTX suffix limitation remains.

<a id="gp-020-020"></a>

## 020 · Running and evidence

- **020.1** Prepare assets + browser distribution; run docs/examples/bagdb/export.py
  with a new output directory, then a local HTTP server. Python Source owns application.
- **020.2** Tests: 10 utility, 12 adapter/store, 3 Source/runtime, Python declarations;
  related logic/store/selector and SQLite tests run. SQLite host fixture injection updated
  to db_handler; no host code modified. Final counts in port record.
- **020.3** Browser: restored/missing record, containment, Malice→Roma, reactive limit,
  sorted grid/hasMore, Show source and Inspector verified. Local coverage only.

Scenario update — 2026-09-17: the lab grid now displays invoices filtered by the
selected customer, rather than a second customer list. The collection-limit control
is removed; the invoice query has limit 50. Selection drives dataRecord and a reactive
invoice filter/dataSelection. The earlier limit-control observations above remain
historical evidence of the previous scenario. Fixture dates are T and amounts R.

Model update: [GP-025](025-abstract-database-model.md) implements the abstract metadata
provider/catalog and bounded model relation tree. Earlier references to the recursive
tree being absent are superseded for this bounded eager slice; lazy loading remains open.


### Complete file-backed fixture — 2026-09-17

The current laboratory supersedes the small Alice fixture with all 18 legacy
CSV tables (17,538 rows), stored in `mydb/struct` and `mydb/data`. Earlier browser
observations above describe the previous fixture. See the [current dataset,
reproduction and capability limits](../examples/bagdb/README.md).
