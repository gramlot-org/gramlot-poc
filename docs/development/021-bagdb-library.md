# 021 · BagDB common library

Document ID: **GP-021**. Status: **transferred to Gramlot PoC, 2026-09-17; acceptance pending**.

[Compact view](../../docs_llm/development/021-bagdb-library.md).

`BagDB` is a small JavaScript utility for fixtures and demos. It owns one Bag with
`struct` and `data` branches. It belongs to Gramlot common DB code and has no host, filesystem or UI dependencies.
This is not a database adapter or a dbSelect implementation.

<a id="gp-021-005"></a>

## 005 · Structure and calls

```js
import {Bag} from 'genro-bag-js';
import {BagDB} from './database/common/bagdb.js';

const db = new BagDB();
const customers = db.setTable('customers');
customers.setColumn('id', {dtype: 'T', primaryKey: true});
customers.setColumn('name', {dtype: 'T', nullable: false});
const orders = db.setTable('orders');
orders.setColumn('id', {dtype: 'L', primaryKey: true});
orders.setColumn('customer_id', {dtype: 'T'});
orders.setRelation('customer_id', 'customers', 'id');

db.insertRow('customers', {id: 'c1', name: 'Alice'});
db.insertRow('orders', {id: 1, customer_id: 'c1'});
db.updateRow('customers', 'c1', {name: 'Alicia'});
db.getRow('customers', 'c1'); // detached object; missing key returns null
db.getRows('customers', {where: {id: 'c1'}, limit: 10});
db.getRows('customers', {
    text: {field: 'name', value: 'ali', match: 'startsWith', caseSensitive: false},
    limit: 10,
});
db.deleteRow('orders', 1);
db.deleteRow('customers', 'c1');
```

`setTable(name)` creates the declaration and empty data table if missing, otherwise
preserves them, and returns a handle. It accepts no column declarations.
`setColumn(name, attributes)` creates a column or merges supplied attributes,
preserving unspecified ones. `setRelation(column, targetTable, targetKey)` separately
sets the FK; `references` is not accepted by `setColumn`. Handles remain valid after
later schema changes. Raw `Bag` input with `struct`/`data` is still accepted by the
constructor; column declarations live in node attributes under `struct.<table>`.

Empty tables may temporarily have no PK while being declared; row insertion and
keyed reads require a PK. A declared PK cannot be removed or change dtype, even on
an empty table. Schema changes validate a candidate snapshot, including all existing
rows and FKs, before taking effect. Incompatible changes throw without altering the
original. New nullable columns fill existing rows with null; new required columns
on populated tables are rejected. There are no implicit defaults or conversions.
Schema changes copy and validate the whole database; they are intended for small
fixtures and occasional declarations, not high-throughput updates.

Each populated table has exactly one immutable primary key (`T` or `L`). Columns support a
small subset of existing TYTX dtype codes: `T` string, `L` safe integer, `R` finite
number, `B` boolean. There is no coercion. Other dtypes are explicitly rejected.
Missing values become `null`, permitted unless `nullable: false` or `primaryKey`.
Table/column names match `[A-Za-z][A-Za-z0-9_]*`. String keys may be empty or contain
path punctuation; row labels are `r_` plus URI-encoded key text with dots encoded
as `%2E`. Numeric keys retain their numeric type in their column.

FKs refer only to an existing table's PK with exactly the same dtype. Null FKs are
allowed when nullable. Duplicate PKs, missing FK targets, PK changes and deleting
a referenced row throw before mutation. Self-references are allowed; deleting the
self-referencing row alone is allowed if no other row refers to it.

Construction validates the schema and all initial rows, normalizing omitted fields
to null. Repeated sibling labels in the input Bag are rejected before copying,
including duplicate row labels, so TYTX reconstruction cannot silently merge them.
The input Bag is copied. `db.bag` returns a full detached Bag snapshot;
row reads and successful insert/update calls return detached scalar objects.
Mutating those results does not modify the database.

`getRows` ANDs exact `where` comparisons with an optional literal text filter.
Text matching is `contains` by default or explicitly `startsWith`; matching is
case-sensitive unless `caseSensitive: false`. Results keep insertion order, with
no ranking or implicit fallback. Default limit is 50; zero returns no rows.
PK reads use direct Bag node lookup. Queries and FK deletion checks scan rows;
there are no additional indexes or concurrent writers.

<a id="gp-021-010"></a>

## 010 · Persistence and limits

Pass an optional `{save: async payload => ...}` constructor option. `close()` waits
for that callback with the complete native `Bag.toTytx()` JSON transport string.
Read persisted text using `new BagDB(Bag.fromTytx(payload), {save})`. Loading and
storage selection belong to the caller; the utility performs no I/O.

Concurrent close calls share one pending save. Writes are rejected during close
and after success. A failed save rejects and permits writes or a close retry.
Repeated successful close calls do not save again. Reads remain available after
close. Without a save callback, close only closes the in-memory database.
Browser tab shutdown is not a reliable save trigger; use explicit close.

Text values ending in reserved TYTX type suffixes (`::xx`) are outside the
supported input contract. This is an accepted limitation; no escaping is provided.

There are no joins, cascades, SQL, generated keys, migrations, transactions across
calls, column/table removal or renaming, custom dtypes or component-specific selection policies.
This change adds no browser UI or standalone application integration.

<a id="gp-021-015"></a>

## 015 · Verification

From `js/dom`, `node --test tests/bagdb.test.js` covers CRUD/integrity, dtype checks, special keys,
explicit query parameters, input/snapshot isolation, malformed loaded data,
self-references, native TYTX round-trip, async close failure/retry and atomic builder
schema changes with existing data.
The transferred suite passes 10 tests. Import paths shown above are relative to the runtime src directory. The utility is also exported as BagDB by gramlot-dom. See GP-020 for adapter and component integration.
