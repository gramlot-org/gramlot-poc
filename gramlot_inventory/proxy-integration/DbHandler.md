# DbHandler

## Identity

- **Identity:** `gramlot.database.DbHandler`; proxy name `dbhandler`
- **Type:** proxy/integration contract
- **Level:** COMPOSED
- **Purpose:** expose generic database endpoints while delegating resource access
  and row retrieval to a backend-specific implementation.
- **Status:** sperimentale; `dbselect` implementato, record/selection endpoints da implementare

## Bases, mixins and composition

`DbHandler` is an abstract base class. It composes a concrete, decorated
`dbselect` endpoint with the abstract `open(table)` hook and the `SelectTable`
reader protocol. `DbPageMixin` contributes no Source node or page endpoint; it
registers `{'dbhandler': DbHandler}` so dotted RPC dispatch can traverse the
proxy. This is therefore a composed proxy/integration contract, not a low-level
controller.

## Common parameters

### `dbselect` endpoint

| Parameter | Type | Presence | Default | Bindings | Constraints |
| --- | --- | --- | --- | --- | --- |
| `dbtable` | logical table string | required | none | resolved by the composing `dbSelect` controller | Nonempty and validated by backend configuration. |
| `_querystring` | string | optional | `''` | `dbSelect` supplies current search text | Wildcards and spaces are literal. |
| `_id` | string, integer or `None` | optional | `None` | supplied for identity restoration | `0` is valid; empty string selects search. |
| `ignoreCase` | boolean | optional | `True` | may originate from a Source binding | Exact boolean required. |
| `limit` | integer | optional | `10` | may originate from a Source binding | From 1 through 100. |

The application-side `dbSelect` helper conditionally requires `dbtable` when no
explicit `rpcmethod` is supplied. That authoring optionality does not mean a
configured handler may ignore `dbtable`.

## Behavior, output and errors

Identity lookup calls `SelectTable.lookup()`. Text search calls prefix matching
first and containment only when a nonempty query has no prefix results. The
response is `{rows, identifier: 'id', caption: 'caption', metadata: {match}}`.
Rows must use unique nonempty string/integer `id` values and non-null captions.
Invalid types, missing logical tables and out-of-range limits raise `ValueError`.
Resource acquisition and cleanup occur inside the context returned by `open()`.

## Abstract extension hooks

- `DbHandler.open(table)` returns a context manager yielding `SelectTable`.
- `SelectTable.lookup(identity)` performs exact identity lookup.
- `SelectTable.search(text, match, ignore_case, limit)` performs deterministic
  prefix or containment search.

Additional proxy endpoints must use `@endpoint` and the specialized proxy class
must be explicitly registered. This card does not document SQLite, SQLAlchemy or
Genropy implementations.

## Generic example

```python
from gramlot.database import DbHandler, DbPageMixin
from gramlot.page import WebPage

class Page(DbPageMixin, WebPage):
    dbhandler: DbHandler  # host setup supplies a concrete instance

    def main(self, root):
        root.dbSelect(value='^customer_id', dbtable='customers', lbl='Customer')
```

## Code and evidence

- `src/gramlot/database.py`: abstract base, reader protocol, endpoint and mixin.
- `src/gramlot/grammar/logic.py::dbSelect`: composition into
  `dbhandler.dbselect` and rejection of unsupported minimum-service options.
- `src/gramlot/contrib/_shared/pages.py`: recursive registered proxy discovery
  and dispatch.
- `docs/guides/database-handlers-and-proxies.md`: maintained shared contract.

## Incompatibilità Genropy legacy

The current minimum deliberately excludes advanced dbSelect behavior such as
`auxColumns`; the owner reserves that capability for Genropy. Full endpoint,
metadata and invalid-value comparison is **da verificare**.
