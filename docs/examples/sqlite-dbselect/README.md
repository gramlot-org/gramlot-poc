# Minimal SQLite dbSelect

Experimental, read-only dbSelect on the SQLite copy of `test_invoice_pg`.
The application is authored in Python with ordinary Gramlot Source, Data,
bindings and the existing select component. The page displays its Python source.

## Run

From the framework checkout, install the optional database dependency and the
sibling FastAPI host into the same environment:

```sh
pip install -e '.[sqlalchemy]'
pip install -e ../gramlot-fastapi
python docs/examples/sqlite-dbselect/serve.py
```

Open <http://127.0.0.1:8054/page/index/>. The default database is the existing
local experiment at `temp/test-invoice-sqlite-poc/data/invoice-copy.db`; it is
ignored recovery/test data, not bundled with the example. Use `--database PATH`
to select another existing SQLite file. This example expects `invc_customer`
with a scalar primary key `id` and text `account_name`. Adjust `TableConfig`
in `serve.py` to expose another schema.

## Proxy architecture

```text
page.dbhandler → SqliteDbHandler(DbHandler)
RPC dbhandler.dbselect → inherited DbHandler.dbselect → SQLite reader
```

`DbPageMixin` declares `endpoint_proxies = {'dbhandler': DbHandler}`. Application
setup assigns the concrete instance to `page.dbhandler`; the page defines no
customer endpoint. The handler combines the previous service and adapter roles.
`GenropyDbHandler` is a future specialization, not implemented in this slice.

Proxy registration is a generic page facility. For another service, register its
class under another namespace in `endpoint_proxies`, attach an instance of that
class, and decorate its public methods with `@endpoint`. The dispatcher allows
only registered proxy chains (`namespace.method` or `aaa.bbb.ccc`); it does not
traverse arbitrary attributes. See the [handler and proxy contract](../../guides/database-handlers-and-proxies.md).
An undecorated override cannot be called remotely.
Proxy instances may be attached in the host's `prepare_page` hook for per-request
context. This read-only example shares the handler and acquires a database
connection for each invocation.

## Boundaries

```python
root.dbSelect(dbtable='invc.customer', value='^customer_id',
              ignoreCase=True, limit=10, lbl='Customer')
```

- `DbPageMixin` exposes the common `dbhandler.dbselect` endpoint through
  the page host. The application setup supplies its `dbhandler` proxy.
- `DbHandler` owns validation, prefix-first search and the widget response.
- `SqliteDbHandler` in `gramlot.contrib.sqlalchemy` owns reflection, connections
  and SQL. `TableConfig` explicitly maps logical tables to identity/caption
  columns. Unknown tables are rejected. Connections use SQLite read-only mode.
- The core service imports neither SQLAlchemy nor FastAPI. SQLAlchemy is an
  optional dependency; the host is supplied by the sibling repository.

Search falls back to containment **only if prefix matching returns no rows**.
The query is literal, including `%`, `_` and spaces. Case-insensitive matching
uses Unicode casefold; it does not remove accents or implement locale collation.
Case-sensitive matching preserves case. SQL filters before applying `limit`
(integer 1–100), with deterministic caption/key ordering. Empty search lists
the first rows. Identity lookup supports string and integer keys, including 0,
and restores the caption of a previously selected record.

The minimum path returns only identity and caption. Advanced parameters such as
`auxColumns` and `condition` are rejected during Python declaration; aux columns
remain reserved for Genropy. A custom `method` is deferred. The existing explicit
`rpcmethod` provider path remains available. This slice does not implement
dataRecord, a fake adapter, composite keys, or other SQLAlchemy dialects.

The existing widget's debounce and busy behavior applies: concurrent requests
are refused and stale results discarded, without automatic replay.

## Verification

`tests/test_sqlite_dbselect.py` covers matching, Unicode, literal wildcards,
identity restoration, validation, allowed tables, enforced read-only access,
service exposure and Python declarations. Together with existing page-service
and component tests, 20 Python tests pass; the existing select-provider JS suite
adds two passing tests. Live browser checks exercise the copied invoice data,
selection binding and restored captions.
