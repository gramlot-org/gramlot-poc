# dataRecord and dataSelection: legacy parameters and proposed boundaries

Inspection date: 2026-09-15. Legacy HEAD: `fa35e5adfa6ad1b269f3a22a9b12c4c1ee6513ea`.
This is a source audit, not a port or a promise of capability support. Group
membership below is a **proposal**; the owner's Genropy differentiation rule
already applies, but these two minimum contracts have not been approved.

## What the nodes actually are

Both Python helpers emit a `dataRpc` Source node; neither creates its own DOM.
`dataRecord` defaults to `app.getRecord`; `dataSelection` to `app.getSelection`.
They inherit reactive arguments, execution triggers, destination binding and RPC
callbacks. The server entry points implement the database/model-specific work.
Neither helper is a save endpoint or a complete form/selection store.

| Aspect | dataRecord | dataSelection |
| --- | --- | --- |
| Purpose | One record, including its field values | A collection of query results |
| Selector | Primary key, or lower-level record kwargs | Query, keys, or a stored selection |
| Legacy response | `(record Bag, recInfo)` | `(data Bag, attributes)`; optional structure wrapper |
| Rich behavior | New/sample records, defaults, related resolvers, eager loading, protection and onLoading hooks | Frozen selections, grid row metadata, output slicing, sorting, totals, saved queries/views, linked selections |
| Common future route (proposed) | `dbhandler.datarecord` | `dbhandler.dataselection` |

## Python declaration parameters

- `dataRecord(path, table, pkey=None, method='app.getRecord', **kwargs)`.
- `dataSelection(path, table=None, method='app.getSelection', columns=None,
  distinct=None, where=None, order_by=None, group_by=None, having=None,
  columnsFromView=None, **kwargs)`.

`path` is the Data destination, not a database argument. `method` selects the
RPC endpoint. dataSelection substitutes `columns='*'` when absent. Using
`columnsFromView` without columns raises DeprecationWarning (as an exception).
Its `name` and `content` kwargs are renamed `_name` and `_content`.
Other kwargs are forwarded to dataRpc, where client controls are consumed before
remaining parameters reach the server. The signatures below are server inputs,
not all automatically recommended public application parameters.

## Shared client controls (database-independent)

`path`, `datapath`, reactive `^` / evaluated `=` arguments; lifecycle/trigger
controls `_onStart`, `_onBuilt`, `_fired_onStart`, `_init`, `_delay`, `_timing`,
`_userChanges`, `subscribe_*`; branching `_if`, `_else`; callbacks `_onCalling`,
`_onResult`, `_onError`; transport `httpMethod`, `_POST`; feedback `_lockScreen`,
`_execClass`; diagnostics `_trace`, `_trace_level`; Source identity `nodeId`.
These are inherited families, not a new per-database capability list.
`_strippedKwargs`, `_sourceNode`, deferred registration and trigger arguments are
runtime plumbing. The helper docstrings also mention `sync`; this audit does
not infer synchronous semantics merely from that mention.

## Classification key

- **Minimum candidate**: small portable contract to agree before implementation.
- **Optional candidate**: useful common extension, with semantics still to define.
- **Genropy extension**: preserve outside the portable minimum, even if another
  engine could technically implement a related feature.
- **Internal**: implementation context, not ordinary user-facing API.

For selection `columns` means a record projection, not dbSelect's Genropy-only
`auxColumns`. A portable projection would name allowed scalar fields; the full
legacy `$`, `@`, formula and relation-expression language remains Genropy-specific.
Likewise portable filters/order must be defined, not copied as unrestricted SQL.

## dataRecord: all 25 named server parameters

| Parameter | Default | Proposed group | Verified role |
| --- | --- | --- | --- |
| `table` | `None` | Minimum candidate | Logical table name (`"pkg.table"`). |
| `dbtable` | `None` | Genropy extension | Alias used in preference to table; passed to self.db.table(), so it is a Genropy logical name, not necessarily a physical SQL table. |
| `pkg` | `None` | Genropy extension | Package prefix — prepended to *dbtable* when set. |
| `pkey` | `None` | Minimum candidate | Primary key.  `"*newrecord*"` creates a blank record, `"*sample*"` returns sample data. |
| `ignoreMissing` | `True` | Optional candidate | Silently return empty on missing record. |
| `ignoreDuplicate` | `True` | Optional candidate | Silently return first on duplicate. |
| `lock` | `False` | Genropy extension | Requests for_update for a supplied key and handles legacy lock metadata; lock is disabled when pkey is None. |
| `readOnly` | `False` | Optional candidate | Skips write/delete protection metadata checks; does not open a read-only connection or prohibit future writes. |
| `from_fld` | `None` | Genropy extension | Source field for related-record context. |
| `target_fld` | `None` | Genropy extension | Declared related-record context parameter, but not referenced in this getRecord body. |
| `sqlContextName` | `None` | Genropy extension | Named SQL context for join conditions. |
| `applymethod` | `None` | Optional candidate | Page method called after loading to post-process the record. |
| `js_resolver_one` | `'relOneResolver'` | Genropy extension | Client-side resolver for one-to-one relations. |
| `js_resolver_many` | `'relManyResolver'` | Genropy extension | Client-side resolver for one-to-many relations. |
| `loadingParameters` | `None` | Genropy extension | Extra parameters forwarded to `onLoading`. |
| `default_kwargs` | `None` | Genropy extension | Default values for new records (extracted by `@extract_kwargs(default=True)`). |
| `eager` | `None` | Genropy extension | Passed to the record loader, falling back to page.eagers for the table. |
| `virtual_columns` | `None` | Genropy extension | Comma-separated virtual columns to include. |
| `_storename` | `None` | Genropy extension | Alternate store name. |
| `_resolver_kwargs` | `None` | Internal | Accepted but not referenced in this getRecord body; do not treat as a working feature of this entry point. |
| `_eager_level` | `0` | Internal | Current nesting depth for eager expansion. |
| `_eager_record_stack` | `None` | Internal | Stack of parent records (cycle guard). |
| `onLoadingHandler` | `None` | Genropy extension | Explicit onLoading handler name. |
| `sample_kwargs` | `None` | Genropy extension | Parameters for sample-data generation (extracted by `@extract_kwargs(sample=True)`). |
| `ignoreReadOnly` | `None` | Genropy extension | Forwarded to protection checks and recInfo; does not enforce read-only database access. |

The signature also accepts `**kwargs`; see the open families below.

## dataSelection: all 46 named server parameters

| Parameter | Default | Proposed group | Verified role |
| --- | --- | --- | --- |
| `table` | `''` | Minimum candidate | Fully qualified table name. |
| `distinct` | `False` | Optional candidate | Use SELECT DISTINCT. |
| `columns` | `''` | Minimum candidate | Column specification. |
| `where` | `''` | Optional candidate | SQL WHERE clause or a :class:`Bag` (query-by-sample). |
| `condition` | `None` | Optional candidate | Extra condition ANDed with *where*. |
| `order_by` | `None` | Minimum candidate | SQL ORDER BY clause. |
| `limit` | `None` | Minimum candidate | Maximum rows. |
| `offset` | `None` | Minimum candidate | Row offset. |
| `group_by` | `None` | Genropy extension | SQL GROUP BY clause. |
| `having` | `None` | Genropy extension | SQL HAVING clause. |
| `relationDict` | `None` | Genropy extension | Symbolic relation names. |
| `sqlparams` | `None` | Optional candidate | Additional SQL parameters. |
| `row_start` | `'0'` | Genropy extension | Offset when slicing the materialized/frozen selection output; distinct from SQL offset. |
| `row_count` | `'0'` | Genropy extension | Count when slicing selection output; converted from string to int. Distinct from SQL limit. |
| `filteringPkeys` | `None` | Genropy extension | Additional legacy key filtering or public method; its type-dependent implementation needs review before porting. |
| `recordResolver` | `True` | Genropy extension | Add resolver attributes for lazy record loading. |
| `selectionName` | `''` | Genropy extension | Name for freezing the selection. |
| `queryMode` | `None` | Genropy extension | Query set operation (`"U"`/`"I"`/`"D"`). |
| `structure` | `False` | Genropy extension | Return structure alongside data. |
| `numberedRows` | `True` | Genropy extension | Use numbered row keys. |
| `pkeys` | `None` | Optional candidate | Truthy primary-key list overrides where in the default executor and skips adding condition. An empty list does not force an empty result. |
| `fromSelection` | `None` | Genropy extension | Frozen selection to use as pkey source. |
| `applymethod` | `None` | Optional candidate | Post-processing method name. |
| `totalRowCount` | `False` | Optional candidate | Include total count in attributes. |
| `selectmethod` | `None` | Optional candidate | Custom select method name. |
| `expressions` | `None` | Genropy extension | Named expression set for column substitution. |
| `sum_columns` | `None` | Genropy extension | Comma-separated columns to sum. |
| `sortedBy` | `None` | Genropy extension | Sort specification for the selection. |
| `excludeLogicalDeleted` | `True` | Genropy extension | Exclude logically deleted records. |
| `excludeDraft` | `True` | Genropy extension | Exclude draft records. |
| `hardQueryLimit` | `None` | Genropy extension | Hard limit on result rows. |
| `savedQuery` | `None` | Genropy extension | Saved query identifier. |
| `savedView` | `None` | Genropy extension | Saved view identifier. |
| `externalChanges` | `None` | Genropy extension | Accepted but not referenced in this getSelection body. |
| `prevSelectedDict` | `None` | Genropy extension | Previously selected pkeys (for diff). |
| `checkPermissions` | `None` | Genropy extension | Permission parameters. |
| `queryBySample` | `False` | Genropy extension | Accepted but not referenced in this getSelection body; a Bag-valued where is handled separately. |
| `weakLogicalDeleted` | `False` | Genropy extension | Retry without logical deletion filter. |
| `customOrderBy` | `None` | Genropy extension | Custom ordering :class:`Bag`. |
| `queryExtraPars` | `None` | Genropy extension | Extra query parameters :class:`Bag`. |
| `joinConditions` | `None` | Genropy extension | Join condition specifications. |
| `multiStores` | `None` | Genropy extension | Database store name. |
| `saveRpcQuery` | `None` | Genropy extension | Return serialized query instead of data. |
| `gridVisibleColumns` | `None` | Genropy extension | Columns visible in the grid. |
| `formulaVariants` | `None` | Genropy extension | Formula variant specifications. |
| `countOnly` | `False` | Optional candidate | Returns an empty Bag plus totalrows; default executor fetches distinct grouped primary keys and takes len(), rather than an unconditional SQL COUNT(*). |

The signature also accepts `**kwargs`; see the open families below.

## Open kwargs and downstream parameters

- Record: `default_*` and `sample_*` are extracted into the corresponding
  dictionaries by `@extract_kwargs`. `apply_*` feeds the postprocessor. Other
  kwargs reach `tblobj.record`; examples include field selectors and
  `for_update`. They are not a closed generic API.
- Selection: named SQL bind values, `apply_*`, `format_*`, `subtable` and lower
  query kwargs are accepted through the open signature. The default executor
  also explicitly consumes `sqlContextName` and `_aggregateRows=True`.
  `where_attr` is removed before Bag query decoding. `multiStores` becomes
  `_storename`; formulaVariants and queryExtraPars expand into query kwargs.
- Saved view/query contents, join-condition Bags, loadingParameters and custom
  handlers introduce further nested parameters. Inventorying named entry-point
  parameters cannot enumerate arbitrary user-written handlers or SQL bindings.

## Differences that matter for the portable contract

1. **Record absence is not new-record creation.** Legacy recognizes
   `*newrecord*` and `*sample*`, and treats a falsy loaded primary key as a new
   record. A portable handler should preserve key 0 and distinguish missing,
   existing and explicitly requested new records. Proposed first slice: read
   existing records only, with an explicit missing-result contract.
2. **Two pagination layers exist.** `limit`/`offset` constrain the query;
   `row_start`/`row_count` slice the resulting selection. For the minimum, propose
   one bounded pagination layer. Frozen selections remain a separate Genropy
   capability, not an implicit requirement for ordinary selection loading.
3. **Output is not the dbSelect envelope.** Legacy grid rows put fields in Bag
   node attributes, with `_pkey` and optional record resolver metadata; dataRecord
   has record fields as values. Choose the Gramlot record/collection shapes
   explicitly before implementation, without accidentally inheriting grid-only
   serialization.
4. **Read-only UI metadata is not a database guarantee.** Legacy `readOnly`
   changes protection reporting. It does not enforce read-only connections.
5. **Callbacks split into two layers.** `_onResult` and `_onError` are common
   client behavior. `onLoading`, defaults, counters, virtual columns and related
   resolvers are Genropy model behavior. `method` selects the outer endpoint;
   `selectmethod` replaces selection execution and `applymethod` postprocesses
   its result. They are not synonyms.
6. **Counts have distinct meanings.** `totalrows` is the materialized selection
   length; `totalRowCount` runs a separate count using condition and remaining
   kwargs, not necessarily the full where query. `countOnly` has another execution
   branch. A portable API must define which count it reports.

## Legacy caveats observed in executable code

- `format_*` writes `formats[7:]`, not `formats[k[7:]]`: malformed assignment;
  it does not reliably create the intended formatting map.
- A custom selectmethod returning a list triggers `_default_getSelection()`
  with no arguments and leaves the list in place: do not promise that return type.
- `externalChanges` and `queryBySample` are accepted but unused in getSelection.
  `_resolver_kwargs` is unused in getRecord itself.
- Truthy `pkeys` overrides where and suppresses adding condition in the default
  executor. Empty pkeys does not force an empty selection. This needs an explicit
  contract rather than blind compatibility.
- `filteringPkeys` filter construction is inside the string-input branch;
  direct list behavior should not be assumed equivalent.
- `getRecord` and `gridSelectionData` use falsy key checks, relevant to key 0.
- A reused frozen selection bypasses fresh-query processing, including several
  postprocessing/count paths; flags cannot be assumed orthogonal in every mode.

## Suggested next contract, not implemented

Keep generic loading endpoints on DbHandler, with backend-specific read hooks.
Keep Source destination, reactive execution and callbacks in common controllers.

- dataRecord first slice: destination, configured logical table, primary key;
  a portable record plus identity/missing metadata. Optional scalar projection
  is a new design choice (not a named getRecord argument).
- dataSelection first slice: destination, configured logical table, allowed
  scalar columns, bounded limit/offset and deterministic order. Add a typed
  filter contract only after defining its operators and parameter semantics.
- Optional common candidates: explicit missing policy, scalar filters, key
  lists, distinct, count and named custom services. Their placement is proposed.
- Genropy extensions: record creation/defaults/sample, model hooks/protections,
  eager/resolver graphs, virtual/formula/relation columns, SQL contexts,
  multi-store queries, frozen/linked selections, saved queries/views, aggregation
  and legacy grid metadata. This respects product separation without claiming
  those operations are technically impossible elsewhere.

## Source evidence

Paths are relative to the canonical legacy checkout
`/Users/gporcari/Sviluppo/Genropy/genropy`:

- `gnrpy/gnr/web/gnrwebstruct/dojo11.py:348` and `:410`: Python helpers.
- `gnrjs/gnr_d11/js/gnrdomsource.js:267` and `:390`: controller/RPC execution.
- `gnrpy/gnr/web/gnrwebpage_proxy/apphandler/get_record.py:91`: decorator,
  signature and full record-loading flow.
- `gnrpy/gnr/web/gnrwebpage_proxy/apphandler/get_selection.py:101`: selection
  entry point; `:610`: default executor and extra parameters.
- `gnrpy/gnr/web/gnrwebpage_proxy/apphandler/misc.py:464`: grid Bag conversion.
- `gnrpy/gnr/web/gnrwebpage_proxy/apphandler/__init__.py:221`: apply_* extraction.

Signatures were extracted with Python AST and checked against the parameter
rows. Bodies were inspected; no legacy runtime test or feature port was run.
