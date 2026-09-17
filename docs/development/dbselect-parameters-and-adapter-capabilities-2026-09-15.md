# Legacy dbSelect parameters and adapter capabilities

## Superseding owner decision — product differentiation, 2026-09-15

The owner deliberately reserves advanced dbSelect functionality for the Genropy
integration, including for product prestige and commercial differentiation.
Technical portability alone is not a reason to move a capability into the common
minimum or common optional tier.

- Standard search tries prefix matching first, then containment as a fallback.
  It supports both case-sensitive and case-insensitive matching. The exact
  fallback trigger and matching details still need a contract; this ordering
  differs from the inspected legacy implementation.
- `auxColumns` is a Genropy-only capability, not part of the standard minimum.
  The earlier minimum proposal below is superseded on this point.
- `method`, selecting a service method to customize/refine behavior, is a common
  nice-to-have capability. It is not mandatory in the minimum. Do not conflate
  it with the legacy `selectmethod` and `applymethod` signatures.
- Other advanced capabilities are intended for Genropy; classify their precise
  membership under this product direction rather than automatically promoting
  every technically portable feature into common Gramlot functionality.

The three tiers remain: mandatory minimum, common optional features, and
adapter-specific extensions. Shared implementation can still support reuse
internally; that does not imply exposing Genropy-specific features on all
adapters. The inventories below describe legacy behavior; earlier capability
membership tables are proposals subject to this superseding decision.

Source audit: 2026-09-15. This is analysis and a proposed responsibility split,
not an implemented adapter API or a claim of full Gramlot compatibility.

## Conclusion

One common dbSelect can serve adapters with different capabilities. However,
support belongs to the combination of **Gramlot services, adapter, table model,
database dialect and host services**, not simply to the database product.

Labeling, selection outputs and popup presentation are common widget work.
Queries need an adapter; captions, virtual columns and partitions need model
semantics; notifications and page callbacks also need host/application services.
SQLAlchemy is not a database engine: its SQLite and PostgreSQL configurations can
have different expression support. A fake adapter can implement rich semantics
in memory, but must explicitly declare its actual supported subset.

## Scope and evidence

The inspected legacy checkout is `/Users/gporcari/Sviluppo/Genropy/genropy`, at
HEAD `fa35e5adfa6ad1b269f3a22a9b12c4c1ee6513ea`. The three principal dbSelect
implementation files were clean at inspection. This audit follows actual code,
including inheritance and forwarding, rather than relying on old documentation.

There is **no finite closed list of every accepted keyword**: the builder is
open, the RPC has `**kwargs`, and common Source/style/event/validation families
are extensible. The inventory below covers every one of the **25 named server
parameters**, the dedicated browser parameters, inherited families, model-derived
configuration, transport additions and query forwarding. Arbitrary accepted
keywords are not automatically effective parameters.

A supplementary AST inventory inspected 56 Python files containing explicit
`.dbSelect(...)` calls: 128 calls, three `**kwargs` expansions, no parse failures.
This includes server calls as well as widget declarations; it is usage evidence,
not the complete API. Calls through `field()`, generated declarations and
runtime dictionaries are covered by inspecting their infrastructure separately.
Local evidence and call sites are in `temp/dbselect-parameter-audit/`.

### Source map

Paths below are relative to the legacy root:

| ID | File and entry point |
| --- | --- |
| S | `gnrpy/gnr/web/gnrwebpage_proxy/apphandler/db_select.py:55`, `dbSelect`; `:268`, `dbSelect_default` |
| W | `gnrjs/gnr_d11/js/genro_widgets.js:5093`, `DynamicBaseCombo`; `:5317`, `dbBaseCombo`; `:5538`, `BaseSelect`; `:5631`, `dbSelect` |
| B | Same file, `:4660`, `BaseCombo`; `:1403`, `baseDojo` |
| Q | `gnrjs/gnr_d11/js/gnrstores.js:577`, `GnrStoreQuery`; `:383`, identity handling |
| V | `gnrjs/gnr_d11/js/genro_frm.js:2244`, `GnrValidator`; `:2387`, `validate_select` |
| P | `gnrjs/gnr_d11/js/genro_patch.js:498`, multicolumn popup |
| R | `gnrjs/gnr_d11/js/genro_rpc.js:28`, resolver; `:278`, server call |
| D | `gnrjs/gnr_d11/js/gnrdomsource.js:1529`, reactive condition parameters |
| M | `gnrpy/gnr/web/gnrwebstruct/dojo11.py:995`, relation-field preparation |
| T | `gnrpy/gnr/sql/gnrsqltable/query.py:200`, query fields; `gnrpy/gnr/sql/gnrsqltable/record.py:638`, captions |
| SQL | `gnrpy/gnr/sql/gnrsqldata/query.py:143`, query keyword contract |
| Lite | `gnrpy/gnr/sql/adapters/gnrsqlite.py:66`, regexp callback; `:111`, SQL translation |

Dojo inherited properties were checked in `dojo_libs/dojo_11/dojo_src/dijit/form/`
(`ComboBox.js`, `FilteringSelect.js`, `TextBox.js`, `ValidationTextBox.js`,
`_FormWidget.js`). Version-specific patches must not be treated as a universal
browser API. Old RST descriptions of `hasDownArrow`, `auxColumns` and captions
are less precise than the current implementation.

## 1. All named server parameters

Defaults here are function defaults; later table/application metadata can change
effective behavior. “Portable” means feasible in a shared contract, not already
implemented in the proposed SQLAlchemy/fake adapters.

| Parameter | Default | Actual legacy behavior | Ownership / portability |
| --- | --- | --- | --- |
| `dbtable` | `None` | Logical `package.table`; resolves the Genropy table object. | Adapter table registry; preserve logical identity across backends. |
| `columns` | `None` | Search fields, falling back to model `queryfields`, then caption fields. Accepts Genropy column/expression syntax. | Simple fields portable; relation paths, virtual fields and expressions require capabilities. |
| `auxColumns` | `None` | Adds displayed popup columns to caption fields. | Adapter projects values; common UI renders them. |
| `hiddenColumns` | `None` | Fetches extra fields without adding them to displayed column headers. | Projection portable; requested field expressions still need support. |
| `rowcaption` | `None` | Overrides the table caption specification. Fields plus optional mask; e.g. `$name,$code:%s - %s`. Also determines fetched fields. | Shared formatting possible; default metadata and field resolution need model configuration. |
| `_id` | `None` | Exact identity lookup, selected by truthiness. Allows logically deleted records; still passes `excludeDraft`. Retries without a failing condition and reports an error. | Required common lookup contract; zero/false keys and eligibility need deliberate correction/specification. |
| `_querystring` | `''` | Widget search text; takes precedence when truthy. | Common request protocol, not an application field declaration. |
| `querystring` | `None` | Alternate server search-text argument. `*` is stripped; all-digit searches get a leading `%`. | Compatibility input; normalize to one internal search request. |
| `ignoreCase` | `True` | Forwarded to the search handler; the default handler accepts but does not use it. | Case matching needs a defined policy and dialect tests; no full legacy compliance claim. |
| `exclude` | `None` | Search excludes physical primary keys; accepts comma-separated text or an iterable, filtering falsy iterable entries. Not applied on identity lookup. | Portable exclusion; alternate-key interpretation must be explicit. |
| `excludeDraft` | `True` | Passed to search and lookup; relies on Genropy draft-field metadata. | Conditional on a configured draft field/policy; not a SQL engine feature. |
| `condition` | `None` | Genropy SQL predicate plus parameters; used for search and identity eligibility. | Predicate semantics required. Raw Genropy SQL is not automatically portable. |
| `limit` | `None` | Uses application `dbselect?limit` or 10, converted to int. Zero permits an unbounded query in the legacy path. | Portable with an explicit limit policy; not pagination. |
| `alternatePkey` | `None` | Lookup by another field; fetches it and uses it as widget identity. Search exclusion still uses `$pkey`. | Portable for a unique scalar key; uniqueness cannot be assumed for arbitrary fields. |
| `order_by` | `None` | Explicit order, table `order_by`, or first displayed field. Preference order may precede it. | Basic field sorting portable; expression/relation sorting capability-dependent. |
| `selectmethod` | `None` | Replaces the search handler with a public page method. Does not replace the identity branch. Receives Genropy table/query objects and keywords. | Application/server extension; existing callback signature is Genropy-specific. |
| `applymethod` | `None` | Public page method post-processes the selection, including a potentially absent selection. Truthy return updates result attributes when a selection exists. | Shared post-processing possible with a new common result type; legacy selection object is not portable. |
| `notnull` | `None` | Omits the synthetic null row. Browser defaults it from `validate_notnull`. Does not itself implement all validation. | Common candidate/validation policy. |
| `weakCondition` | `False` | Boolean: may retry without `condition`. String: appends an optional predicate and retries keeping the original condition. Marks `resultClass='relaxedCondition'`. Table metadata can supply it. | Shared search policy over predicates, with explicit relaxation support and result metadata. |
| `_storename` | `None` | Selects a database store; literal `False` resets to the default. | Adapter resource routing, distinct from browser state stores. |
| `preferred` | `None` | Explicit or table-provided SQL expression; sorts preferred rows first and emits `_customclasses_preferred`. Search path only. | Portable preference concept; expression evaluation and styling are separate capabilities. |
| `emptyLabel` | `None` | Caption of the synthetic null row, otherwise empty text. Added only for nonempty search results with `notnull` false. | Common presentation/result shaping. |
| `emptyLabel_first` | `None` | Places null row first when truthy; otherwise appends it. | Common presentation. |
| `emptyLabel_class` | `None` | `_customClasses` on the null row. | Common presentation. |
| `invalidItemCondition` | `None` | SQL expression emits `_is_invalid_item` in search results. Identity lookup does not compute this flag. | Adapter predicate produces eligibility metadata; widget enforces/displays it. |

### Search and lookup are different contracts

Default search first uses `contains` on the first query field; if it reaches the
limit, it retries `startswith`. With no results it tries word-boundary regex
across concatenated query fields, then `ILIKE` on those fields. Whitespace-only
normalized input can list candidates. Truly empty input does not enter search;
the dropdown's `*` request does. The class docstring's “startswith first” text
does not match the executable algorithm.

Lookup deliberately retrieves an existing selection even when it falls outside
the current selectable set, preserving its caption with an eligibility error.
It also includes logically deleted records, unlike the default search. These
are observable semantics, not implementation details to lose in a two-method API.

## 2. Dedicated browser and shared select parameters

S/W/Q/B/P/V identify the source-map entries above.

| Parameter or family | Behavior and owner |
| --- | --- |
| `value` | Bound identity, not display text. Widget/binding core; all providers must agree on identity representation. |
| `table` | Browser alias for `dbtable`, normalized by W. Not an additional named argument of the standard server method. |
| `method` | RPC method, default `app.dbSelect`; replaces the whole service, including search and lookup. Distinct from `selectmethod`. |
| `condition_<name>` | Runtime-resolved predicate parameters, prefix removed for RPC. Reactive `^` changes call `setCondition`; passive `=` is read when needed. Shared Source plus query service. |
| `selectedCaption` | Writes the selected row's `caption` to a Data path. Common UI; not another query. |
| `selectedRecord` | Writes a Bag of the returned row attributes, not a complete database record. Common UI; use dataRecord for the full record operation. |
| `selected_<field>` | Writes selected fields; W adds needed fields to `hiddenColumns`. Supports `destination=field_expression` mappings, with alias normalization. Common UI plus projection capability. |
| `selectedCb` | Callback receiving the selected item, compiled with the SourceNode context. Common selection extension. |
| `selectedSetter` | Custom `(path,value)` setter; used by grid editors. Common UI integration, not database work. |
| `hasDownArrow` | Default false in W; true uses `limit = limit || 0`. A truthy explicit limit is retained. readOnly hides it. UI behavior with a query-limit consequence. |
| `searchDelay` | Default 300 ms via `value || 300`, so numeric zero is replaced. Common scheduling. This is legacy camelCase spelling. |
| `autoComplete` | Defaults false in W; controls completion in the input. Common UI. |
| `ignoreCase` | Defaults true unless exactly false; Q sends it to the server. The default server search does not honor this switch explicitly. |
| `store_id` | Overrides row identity field unless `alternatePkey` is set; otherwise `_pkey`. Response-shape configuration. |
| `store_caption` | Sets `searchAttr`, otherwise `caption`. Q's standard search still checks `query.caption`, so a different name is not proven end-to-end compatible. |
| `store_record` | Extracted into `savedAttrs.record`; no consumer found in this select chain. Accepted/extracted is not evidence of behavior. |
| `store_*` | The family is extracted; only the three names above are consumed here. Do not treat every `store_*` as a supported dbSelect option. |
| `switch_*` / `switch_<name>` | Prefix regex intercepts search before RPC. Common input behavior. |
| `switch_<name>_set` | Sets displayed text from Data when the switch matches. |
| `switch_<name>_value` | Sets the selected identity when the switch matches. |
| `switch_<name>_action` | Executes an action with the regex match. Arbitrary suffixes are not implemented behaviors. |
| `auxColumns_template` | Custom popup row template, active in the multicolumn popup path. Common renderer using projected values. |
| `connectedMenu` | Attaches a menu to the dropdown arrow. Common UI; supplies no database capability. |
| `firstMatchDisabled` | Prevents the Dojo 1.1 blur patch from attempting a displayed-text match. Version-specific UI behavior. |
| `validate_select` | Added as true unless explicitly supplied. Validation integration for missing/invalid selections and query errors. |
| `validate_select_error` | Default `Not existing value`; common validation message. |
| `invalidItem_message` | Actual validation-message parameter consumed for `_is_invalid_item`. |
| `invalidItemCondition_message` | Used by a legacy example, but not read by the inspected validator. Do not advertise it as a working alias. |
| `excludeDraft`, `ignorePartition`, `distinct`, `subtable` | W forwards them. The last three enter the server through `**kwargs`; SQL consumes them. See model-dependent policies below. |
| `dbstore` | W renames to `temp_dbstore`; host request-context routing. Distinct from the explicit `_storename` server operation. |
| `httpMethod` | Resolver transport choice, including legacy WebSocket `WSK`. Host capability, not DB capability. Current precedence caveat below. |
| `dbenv_*` | Generic RPC picks these up from Source and sends them to host context. Genropy environment semantics, not a portable query parameter family. |
| `context_dbstore`, `context_tenant_schema` | Inherited/runtime RPC context. Host/tenant routing, not dbSelect filtering or authorization. |

### Inherited controls and open Source families

These remain part of the usable declaration but should not be implemented by
each database adapter:

| Family / named properties | Ownership and limits |
| --- | --- |
| `disabled`, `readOnly`, `tabindex`/`tabIndex`, `placeholder`, `name`, `id`, `title`, `tip` | Common control/HTML/accessibility layer. W additionally hides the arrow and removes tab focus for readOnly. |
| `lbl`, `lbl_*`, `box_*`, `lbl_side`, `width`, `height`, `margin`, `_class`, `style`, `hidden`, `visible`, CSS families | Label/layout/presentation capabilities. Layout containers also consume `colspan`, `rowspan`, etc. |
| `datapath`, `nodeId`, `parentForm`, `value`, `default_value`, `blankIsNull`, `attr_*` | Source identity, binding, defaults, form integration and value attributes. `blankIsNull` affects empty-string normalization. |
| `connect_*`, event hooks, `onChange`, `onFocus`, `onBlur`, `subscribe_*`, `selfsubscribe_*` | Source event machinery and control callbacks; no finite per-dbSelect list. |
| `speech`, `shortcuts`, `shortcuts_*`, focus/drag/drop helpers | General input/Source services. dbSelect supplies `onSpeechEnd` and paste/focus behavior. |
| `validate_notnull`, `validate_empty`, `validate_case`, `validate_len`, `validate_min`, `validate_max`, `validate_email`, `validate_regex`, `validate_call` | Shared validator rules; input values are selected identities, which matters when applying string/length rules. |
| `validate_gridnodup` | Collection/grid uniqueness, separate from database uniqueness. |
| `validate_nodup`, `validate_nodup_*`, `validate_exist`, `dbfield` | Additional database validation services; not fulfilled merely by search/lookup. Genropy uses record counts and optional relative conditions. |
| `validate_remote`, `validate__onResult` | Independent remote validation service/callback; can run without a database provider. |
| `validate_<rule>_if`, `_iswarning`, `_error`, `_warning`, `_<errorcode>` | Generic per-rule condition, severity and message families; suffixes attach to `validate_<rule>`. |
| `validate_onAccept`, `validate_onReject` | Shared validation lifecycle callbacks. |
| Dojo `required`, `promptMessage`, `invalidMessage`, `constraints`, `regExp`, `regExpGen`, `tooltipPosition` | Inherited validation/presentation machinery, not new database flags. Their interaction with Genropy validation must be specified when migrating. |
| Dojo `trim`, `uppercase`, `lowercase`, `propercase`, `maxLength`, `intermediateChanges` | Inherited text editing. DynamicBaseCombo does not use BaseCombo.creating, so that base's removal of maxLength is not a dbSelect-specific rule. |
| Dojo `query`, `queryExpr`, `pageSize`, `labelAttr`, `labelType` | Inherited select/search rendering options; presence does not prove compatible server paging or alternate response shapes. Q ignores paging offsets/counts in its remote search implementation. |
| `searchAttr`, `store` | Constructed/overwritten by W; not independent database-adapter controls. |
| `values`, `storepath`, `storeid`, `storecaption`, `fullTextSearch` | Used by BaseCombo.creating for local selects; dbSelect overrides that creation path. Do not import these as verified dbSelect database options. |

The open families above are explicitly part of this audit's completeness
boundary. They do not imply that all arbitrary spellings or all inherited Dojo
properties behave usefully on a database select.

## 3. Python model enrichment, query forwarding and internal parameters

### Model-aware field declarations

`field()` and related builders inspect `fieldobj.relatedColumn()` and its joiner.
They can supply `dbtable`, `alternatePkey`, `_storename`, `lbl`, `searchDelay`,
`ignoreCase`, `method`, `size`, `_guess_width`, `hasDownArrow`, `_class`,
`selected_*` defaults and validation/`wdg_*` attributes from the model.

The same layer consumes `zoom`, `zoom_*`, inherited `enableZoom`, and constructs
`lbl_href`, `lbl_pkey` or `lbl__zoomKw*` and `lbl_connect_onclick` for a related
record. `checkpref` and `checkpref_*` are also inherited from target-table
metadata. `protected` and `unmodifiable` are field policy/presentation inputs.
These need application/model services beyond a plain SQL connection.

`caption_field` is a table/model convention; passing it directly to dbSelect is
not equivalent to setting `rowcaption`. Likewise `caption` is not the standard
dbSelect caption-configuration parameter. `related_table`, `caption_field`,
`relating_column`, `related_column`, `field_getter` and `gridcell` also occur in
grid/field integration; they are not additional query operations.

### Open server kwargs

Besides condition values and custom-method arguments, the SQL query accepts:
`distinct`, `offset`, `group_by`, `having`, `for_update`, `relationDict`,
`sqlparams`, `bagFields`, `joinConditions`, `sqlContextName`,
`excludeLogicalDeleted`, `ignorePartition`, `subtable`, `addPkeyColumn`,
`ignoreTableOrderBy`, `locale`, `checkPermissions`, `aliasPrefix`, and arbitrary
SQL parameter names. `_storename`, `excludeDraft`, `columns`, `where`,
`order_by` and `limit` are also SQL query keywords but already handled by the
outer method/call sites.

This is an **extension surface, not a promise that all these keys work through
a plain widget declaration**. W forwards a specific set plus `condition_*`;
direct server calls and custom handlers can supply more. Duplicate keywords
can conflict with arguments supplied explicitly by dbSelect. For example,
`excludeLogicalDeleted` is forced on identity lookup, and the default search
explicitly discards a `where` in its extra kwargs. A bare `where=`/`st=` seen in
application code is therefore not evidence of a valid alternate condition API.

`ignorePartition` and `subtable` refer to Genropy application-model semantics;
`distinct` is a relational operation but its effect depends on the selected
columns and aggregation. Exposing these as arbitrary passthrough parameters
would hide the actual portable contract.

### Transport/internal names

`_sourceNode`, generated `_id`/`_querystring`, `rpc_sync`, resolver `rpc_*`,
`temp_dbstore`, page/request identity and tenant context belong to transport.
The resolver also understands `timeout`, `sync`, `preventCache`, `handleAs`,
`load`, `error`, `_onCalling` and `_onResult`. The ordinary dbSelect creation
path does **not** forward all of those simply because the generic resolver can
consume them. A custom resolver/service must explicitly connect such options.

`_hdbselect` belongs to the hierarchical-select integration; it prevents one
identity-caption shortcut. It is not evidence that plain dbSelect implements
hierarchy browsing. `changeInTable` is a subscription that clears cached
identities; `cache_time=60` is a hard-coded store setting, not a documented
dbSelect `cacheTime` declaration.

## 4. Result contract also carries capabilities

The server returns `(result Bag, result attributes)`:

- Each result row carries `_pkey`, `caption`, projected field values and possible
  `_is_invalid_item`, `_customclasses_preferred` or `_customClasses` attributes.
- Result attributes include `columns`, localized `headers`, `resultClass`,
  `dbselect_time`, optional `errors`, and additions from `applymethod`.
- Node labels are sanitized and must not be confused with record identities.
- `selectedRecord` copies the projection and row metadata; it does not load the
  complete database record.

A portable service must preserve the distinction between selected identity,
display caption, projected fields, row eligibility and request-level errors or
relaxation notices. Those concepts can have a different transport representation
without forcing the widget to know the backend.

## 5. Observed caveats: accepting a parameter is not honoring it

1. **Case flag:** `ignoreCase` is unused by the default server handler. Custom
   handlers can consume it. A advertised case-sensitive mode needs actual tests.
2. **SQLite versus PostgreSQL regex:** the Genropy SQLite adapter replaces
   `~*` with `REGEXP`, whose callback uses Python `re.compile(..., re.U).match`.
   That is neither case-insensitive nor an anywhere search equivalent to
   PostgreSQL `~*`. Its ILIKE-to-LIKE rewrite also needs a defined case/Unicode
   policy. Sharing the Genropy adapter does not prove identical search semantics.
3. **Falsy identities:** both server and query store use truthiness for identity
   dispatch. Numeric zero must be specified and tested in Gramlot's contract.
4. **Limit/arrow:** a truthy explicit limit survives `hasDownArrow=True`, contrary
   to the old “always overrides limit” documentation. Zero searchDelay cannot be
   requested through the current `|| 300` initialization.
5. **Alternate keys:** lookup and selected identity can use `alternatePkey`, but
   exclusion continues to use physical primary keys. Do not conflate these.
6. **Invalid rows:** `invalidItemCondition` is evaluated on search, not lookup;
   the implemented message is `invalidItem_message`, not the example's
   `invalidItemCondition_message`.
7. **HTTP method precedence:** `attributes.httpMethod || feature ? 'WSK' : null`
   evaluates the OR as the ternary condition. A truthy explicit method can select
   WSK rather than preserve its string. This is an observed source-level caveat,
   not a browser reproduction performed in this audit.
8. **Weak conditions:** initial disabling with selectmethod/no condition happens
   before the search branch re-reads table metadata. Boolean and string modes,
   defaults and custom handlers need separate cases in contract tests.
9. **Reactive conditions:** the not-null path searches up to two options and can
   auto-select the only option. Otherwise it invalidates caches and revalidates
   the current identity; stale replies are guarded. This behavior is richer than
   clearing a dependent dropdown.
10. **Custom captions/store aliases:** `store_caption` changes searchAttr, while
    Q checks `query.caption`; `_updateSelect` reads `caption` explicitly. A
    custom alias must be verified across all layers.

These findings should become deliberate decisions, not silent compatibility
changes or accidental obligations to copy legacy defects.

## 6. Proposed adapter capability matrix

The matrix describes feasible responsibilities and required prerequisites.
It is **not an implementation status table**: no common-contract Genropy,
SQLAlchemy or fake adapter has been implemented by this audit. The existing
Gramlot dbSelect is an explicit-endpoint prototype and lacks several shared
widget behaviors listed above.

| Capability | Genropy-backed service | SQLAlchemy + SQLite | Fake |
| --- | --- | --- | --- |
| Search and exact lookup by scalar key | Existing legacy operations to adapt | Feasible; physical search/lookup already exercised on the copied dataset | Feasible over in-memory rows |
| Extra/hidden fields, basic sorting, exclusion, limits | Existing legacy query machinery | Straightforward for mapped physical columns | Straightforward within its implemented predicate/projection subset |
| Composite keys | Not established by dbSelect scalar/alternate-key API | ORM support alone does not define widget identity | Needs the same explicit key encoding/contract |
| Default labels, caption/search fields | Available from Genropy model | Needs explicit model/configuration; reflection does not choose business captions | Needs table descriptors |
| Caption masks, null choice, selected outputs, popup headers | Existing behavior mixed across server/UI | Common Gramlot work plus descriptor values | Same common work |
| Basic field predicates and bound parameters | Genropy SQL grammar | Portable subset/compiler needed; cannot run `$`/`@` strings verbatim | Interpreter for the same agreed subset |
| Relation paths (`@...`) | Model resolver and joins available | Needs logical relation mapping and join compilation | Needs relation descriptors/evaluation; may be deferred |
| Virtual/formula columns, macros | Genropy model/compiler, subject to dialect | Explicit translations/expressions required | Explicit computations required |
| Full legacy search fallback and case behavior | Existing, with dialect caveats above | Deliberately implement and test; SQLite defaults do not guarantee parity | Deliberately implement; no reason to assume parity |
| Preferred/invalid rows and weak filters | Existing search policies | Common orchestration if predicates can be evaluated | Same; reject unsupported predicate requests |
| Draft/logical deletion | Available where table metadata defines it | Requires mapped status fields and policy | Requires matching descriptor and semantics |
| Partition/subtable/store routing | Genropy-specific model/resources | Needs explicitly designed equivalent, not automatic | Usually outside first scope; unsupported unless implemented |
| Uniqueness/existence validation | Additional legacy services | Additional common validation operations, not just select | Can be implemented over the complete in-memory table |
| selectmethod/applymethod | Existing page callbacks use Genropy objects | Common callback API or declared Genropy-only extension | Same distinction |
| Cache invalidation on changes | Existing host events/page ecosystem | Requires notification service; SQLAlchemy query support is insufficient | Common local notification possible |
| Zoom to related record / preferences | Host page and model features | Separate application capabilities | Separate application capabilities |
| Labels, input state, validation presentation, menu, selection writeback | Common Gramlot component/services | Same | Same |

**Genropy cannot honestly be labeled “supports everything” without qualifiers.**
Some behaviors depend on a full legacy page/host, some on table metadata, some on
the SQL dialect, and some parameters have the implementation gaps above. A plain
GnrApp database adapter is not the whole legacy `app.dbSelect` service.

## 7. How to expose partial support clearly

Proposed design, with names still open:

1. Define a common minimum: search, exact lookup, a stable typed identity,
   caption, projected fields, null/no-match distinctions and explicit failures.
2. Describe optional capabilities in terms of behavior: relation traversal,
   expression profiles, draft policy, weak filters, invalid-row flags, store
   routing, model metadata and notifications. Use per-table information where
   capability depends on the table or configured expression.
3. Resolve effective capabilities when binding the configured adapter/model.
   Dynamic table/condition changes must be checked again. A blanket boolean
   `supports_conditions` is insufficient if only equality on physical columns
   works; the supported expression subset is part of the contract.
4. Reject unsupported semantic requirements with a precise error naming the
   parameter/expression, logical table and missing capability. Never silently
   drop `condition`, `exclude`, draft restrictions or invalidity policy.
5. Permit a fallback only when explicitly part of the contract: for instance,
   weak-condition relaxation retains its notice and does not relax independent
   authorization constraints. UI-only choices should be owned by the widget.
6. Keep a declared extension mechanism for native Genropy semantics rather than
   disguising arbitrary legacy query kwargs as backend-independent parameters.

Illustrative diagnostic, not approved API spelling:

```text
dbSelect demo.customer: condition uses relation @state.region.
The configured fake adapter supports predicates on physical fields only.
```

The proposed split is: shared select UI and result handling; a host-independent
database service for lookup/search policies; adapter-specific query/model/resource
work; host-specific RPC and notification transport. `dataRecord` should reuse the
same table descriptors, identities, projections/errors and resource boundary,
while retaining its distinct full-record operation.

## 8. Three capability tiers — owner direction, 2026-09-15

The owner selects three tiers: a mandatory minimum, common nice-to-have
capabilities, and adapter-specific extensions. The taxonomy is agreed; the
membership proposed below and the public declaration syntax are not yet frozen.

### Mandatory minimum — proposed membership

- Configured logical tables, a stable scalar identity and a display caption.
- Bounded text search and exact identity lookup, including caption restoration.
- Physical record loading for dataRecord, preserving agreed value types and
  keeping record metadata separate from fields.
- Explicit empty selection, no match, missing record and operational errors.
- Basic field projection, physical-field equality filters with bound values,
  identity exclusion and deterministic ordering. These support the first
  dependent-select example without requiring a relation-expression language.
- Resource acquisition and cleanup, plus a declared scope for requests.

Search matching, identity types, null/missing semantics, filter syntax and limit
policy must be specified before this minimum can become a conformance claim.
Each adapter must pass the same minimum contract tests.

### Common optional capabilities — proposed membership

These retain common names, meanings and tests across adapters:

- Multicolumn search, richer predicates and explicit case/Unicode policies.
- Relation traversal and virtual/computed fields.
- Compound captions and model-derived labels/defaults.
- Preferred rows, invalid-row predicates and weak-condition relaxation.
- Draft/logical-deletion policies, further validation services and notifications.
- Additional identity schemes such as composite keys, if later standardized.

Browser features such as labelBox, popup rendering, selected-value writeback and
validation presentation remain common component capabilities. Their presence
must not depend on which database adapter is configured. For example,
auxColumns needs field projection plus the common multicolumn renderer; it is
not intrinsically an optional SQLAlchemy feature.

### Adapter-specific extensions

An adapter may add explicitly identified extensions, with its own documentation
and tests, without changing the meaning of minimum or common optional features.
Candidate examples are Genropy-native macros, partition/subtable semantics and
store routing, or backend-specific full-text search operators in a particular
SQLAlchemy dialect. Exact names and namespaces remain to design.

Using an extension intentionally narrows portability. If two adapters need the
same extension with the same semantics, consider promoting it into the common
optional tier. An unsupported semantic requirement still produces an explicit
error; being optional does not authorize silently ignoring a requested option.

An adapter's declaration should state its minimum-contract version, supported
common optional capabilities and available native extensions, with per-table or
per-dialect qualifications where needed. Partial implementation of the minimum
is an incomplete adapter, not a different compliant profile.

## 9. Contract verification before claiming support

Run identical fixtures through each declared capability implementation:

- Exact lookup, missing identity, numeric zero, alternate key, duplicates and
  caption restoration independently of text search.
- Physical projections, automatically requested selected fields, caption masks,
  hidden versus displayed columns, null row placement and empty results.
- Conditions and parameter changes, excluded keys, current values outside the
  selectable set, and a delayed old response after changing/clearing the value.
- Boolean/string weak conditions, preferred order, invalid items and their
  messages on both search and lookup, with explicitly selected semantics.
- ASCII/non-ASCII case matching, multiple words, wildcard characters, no-match
  fallback, bounded results and limit zero policy.
- Draft/deleted rows, relation paths, virtual columns and model defaults only
  where declared; unsupported requests must fail rather than degrade silently.
- Resource acquisition/cleanup on success and failure, preserving Genropy's
  same-worker context/query/materialization/cleanup requirement.

This audit performed source analysis and inventory checks, not the above full
browser/database matrix. Coverage checks confirmed that all 25 named server
parameters and every keyword list extracted by DynamicBaseCombo/dbBaseCombo
appear in this report. A direct call to the legacy SQLite regexp implementation
with `(^|\\W)smith` returned false for both `John Smith` and `john smith`, and
true for `smith`, confirming its start-of-string matching behavior.
The previous SQLite dataset experiment establishes only
physical-row copying and basic SQLAlchemy reads, not all dbSelect capabilities.
