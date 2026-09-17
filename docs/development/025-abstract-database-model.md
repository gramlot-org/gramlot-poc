# 025 · Abstract database model and relation tree

Document ID: **GP-025**. Status: **implemented PoC; product contract pending review**.
[Compact counterpart](../../docs_llm/development/025-abstract-database-model.md).

<a id="gp-025-005"></a>

## 005 · Model boundary

**005.1** ModelProvider exposes async describeTable(logicalTable, {signal}). ReadAdapter
extends this metadata contract with record/query operations; a metadata-only provider
can implement the model without either operation. No host, SQL, ORM class or BagDB
object enters the neutral descriptor. BagDbReadAdapter is the first mapping; Django,
SQLAlchemy and GenroPy mappings are not implemented by this change.

**005.2** A table descriptor contains table, identity (field names), fields (name →
dtype, nullable, optional label), relations and optional selector configuration.
Dtype identifiers are not restricted to BagDB T/L/R/B; an independent provider test
uses N. That verifies preservation, not decimal read support. Scalar FK dtype stays
on its field; relation metadata is separate. No records, joins or record hierarchy
are implied. Root table is explicit; table discovery is not implemented.

**005.3** A relation has stable provider-defined id, source/target table, ordered
sourceFields/targetFields arrays, cardinality one/many and inverse boolean.
Cardinality describes target multiplicity, not mandatory participation. BagDB supplies
forward FK edges and inverse edges only for exposed registered tables. The neutral
schema accepts matching composite field lists; BagDB still supports one scalar PK.

<a id="gp-025-010"></a>

## 010 · Catalog and traversal

**010.1** ModelCatalog moved from stores.mjs to common/model.mjs, with a compatibility
re-export. It validates provider descriptors and exposes table, field, relations,
resolvePath(root, relationIds, options), relationTree(root, options), invalidate.
A path is an ordered list of relation IDs, not a SQL expression or a Bag label.
Target fields are validated when an edge is traversed. Unknown tables/fields/edges
and invalid descriptors reject; provider errors are normalized rather than hidden.

**010.2** Cache belongs to one provider/context; callers invalidate on exposure,
authorization or schema changes. Returned descriptors are detached. Invalidation
prevents pending descriptors refilling cache and aborts a tree traversal crossing
a model generation. No remote security guarantee comes from this client cache.

**010.3** relationTree materializes a bounded metadata graph as a tree: defaults
maxDepth=3 and maxNodes=100, ranges 0–8 and 1–1000. Nodes expose table, identity,
fields, path, incoming relation, cycle, truncated and children. A table repeated
on the current ancestor path is a cycle leaf; separate branches are not globally
collapsed. Limits are visible, never silently presented as a complete model.
Explicit resolvePath permits finite revisits and limits paths to 32 edges.

**010.4** This first tree is eagerly materialized within those bounds. Lazy resolver
expansion and huge-schema virtualisation remain follow-ups. Only metadata is fetched;
there is no cross-table query execution, record count or implicit FK lookup.

<a id="gp-025-015"></a>

## 015 · Python declaration and shared presentation

**015.1** The PoC adds a Source controller and reuses the existing storeTree:

```python
root.relationTree('customers', adapter='local', storepath='model_tree',
                  maxDepth=3, maxNodes=50, statuspath='model_status', height='300px')
```

Startup is enabled by default. Successful traversal replaces the destination Data
Bag. Status reports loading/stale/error; failures preserve the prior tree. Source
replacement/removal, adapter removal and application disposal invalidate ownership
and abort traversal so old work cannot publish. The adapter does not own UI.

**015.2** modelTreeBag maps neutral tree nodes to display Bags. Field captions show
name/dtype/PK; relation captions show target, one/many and inverse. Cycles are marked
with ↻ and do not expand indefinitely. Bag f_N/r_N labels are positional presentation
labels; stable model references use table names and relation IDs, stored separately.
The customer/invoice lab displays customers → invoices → customers ↻.

<a id="gp-025-020"></a>

## 020 · Verification and pending scope

**020.1** Five model tests cover metadata-only providers, non-BagDB dtype preservation,
paths, inverse edges, cycles, limits, invalid schemas/targets, abort and invalidation.
Together with adapter/store/Source tests: 20 tests pass. Python declaration and lab
serialization pass. Source integration asserts the model arrives in a Data Bag and
adapter removal releases model consumers. Browser assets and lab export were rebuilt.

**020.2** Pending: real remote providers/security, lazy metadata resolvers, field and
fieldcell construction, provider-specific model richness and accepted naming/API.
This does not amend the constitution or establish formal Live Object Tree semantics.

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
