# 025 · Abstract database model and relation tree

Document ID: **GP-025**. Status: **implemented PoC; product contract pending review**.
[Expanded counterpart](../../docs/development/025-abstract-database-model.md).

<a id="gp-025-005"></a>

## 005 · Model boundary

- **005.1** ModelProvider: async describeTable(table, {signal}). ReadAdapter extends it.
  Metadata-only providers need no record/query API. No host/ORM/BagDB objects in contract.
  BagDB mapping exists; Django/SQLAlchemy/GenroPy mappings remain pending.
- **005.2** Descriptor: table, identity[], fields{name:{dtype,nullable,label?}}, relations[],
  selector?. Dtypes extensible (N preserved in tests; no decimal read claim). Root explicit;
  no table discovery, joins, records or record hierarchy. FK dtype separate from edge.
- **005.3** Edge: stable id, source/target, ordered sourceFields/targetFields, one|many,
  inverse. Multiplicity is not requiredness. Neutral composite mappings allowed; fake
  still scalar-PK. BagDB omits edges to unexposed tables.

<a id="gp-025-010"></a>

## 010 · Catalog and traversal

- **010.1** ModelCatalog in common/model.mjs; stores re-export. table/field/relations,
  resolvePath(root, relationIds), relationTree, invalidate. Validate descriptors and
  traversed target fields. Explicit errors. Paths use IDs, not SQL or Bag labels.
- **010.2** Per-provider/context cache, detached outputs; explicit invalidation on
  schema/exposure/auth changes prevents stale refills and aborts crossing traversals.
- **010.3** Tree nodes: table/identity/fields/path/relation/cycle/truncated/children.
  Defaults depth 3 (0–8), nodes 100 (1–1000); visible truncation. Ancestor-table repeats
  stop as cycle leaves; independent branches retained. Explicit paths ≤32 edges.
- **010.4** Bounded eager metadata only. Lazy resolvers/large schemas deferred;
  no record reads, FK lookup, counts or joined queries.

<a id="gp-025-015"></a>

## 015 · Python declaration and shared presentation

- **015.1** dataRelationTree(destination, adapter, dbtable, maxDepth=3, maxNodes=100,
  statuspath?, _on_start=True) → Data Bag → storeTree. Status loading/stale/error;
  failure retains data. Replacement/removal/adapter disposal blocks late publication.
- **015.2** modelTreeBag presents field dtype/PK, relation multiplicity/inverse,
  cycle ↻ and limits. f_N/r_N are positional display labels, not stable model paths.
  Lab: customers → invoices → customers ↻.

<a id="gp-025-020"></a>

## 020 · Verification and pending scope

- **020.1** Five model tests; 20 passing with adapter/store/Source tests. Python
  declaration/serialization pass. Source model publication and consumer cleanup tested.
  Assets rebuilt. N dtype test verifies metadata preservation only.
- **020.2** Pending real remote mappings/security, lazy resolvers, field/fieldcell,
  richer provider metadata and product API acceptance. No constitution/LOT amendment.

Browser verification: expanded customers → invoices; fields/dtypes/PK, inverse many
edge and return one edge marked ↻ are visible. The lab exporter versions runtime
asset directories by buildId to avoid mixing cached code and new Source.

Owner correction: presentation uses the existing relationTree component, not generic
storeTree with text type labels. relationTree(adapter=...) composes dataRelationTree
and the same widget used by RPC. Metadata uses dtype, node_kind and relation_direction:
ascending for forward edges, descending for inverse edges. Existing badges, colors
and attribute inspection remain component-owned. Local eager traversal limits remain.

Owner clarification: field groups are GenroPy-specific. The generic model exposes
fields and relation branches directly, without a synthetic table/field group.
Local relationTree declarations mark modelDialect=generic and reject groupDescending;
the existing legacy presentation remains available separately.
