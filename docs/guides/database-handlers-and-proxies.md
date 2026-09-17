# Database handlers and endpoint proxy chains

## Names and responsibilities

`DbHandler` is the abstract base class for database services. It includes shared
behavior: concrete backends do not need to reimplement request validation or the
minimum dbSelect search policy. `SqliteDbHandler` is the current implementation;
`GenropyDbHandler` remains planned.

`dbhandler` is the proxy attribute on a page. A proxy groups exposed methods in
its own namespace. `DbPageMixin` registers that attribute's endpoint contract;
it does not contain the endpoint or create a database connection.

```python
class Page(DbPageMixin, WebPage):
    def main(self, root):
        root.dbSelect(dbtable='invc.customer', value='^customer_id')
```

Application setup supplies a `SqliteDbHandler` instance as `page.dbhandler`.
The widget calls `dbhandler.dbselect` automatically. See the
[SQLite PoC](../examples/sqlite-dbselect/README.md) for executable setup.

## Implementing a database handler

The contract is documented directly in `gramlot.database`:

| Member | Responsibility |
| --- | --- |
| `DbHandler.dbselect(...)` | Concrete `@endpoint`: validates parameters, selects lookup or search, applies prefix-to-containment fallback, returns the widget envelope. |
| `DbHandler.open(table)` | Abstract hook: validates the exposed logical table and returns a context manager for one invocation. |
| `SelectTable.lookup(identity)` | Backend reader: returns the matching row or an empty list. |
| `SelectTable.search(text, match, ignore_case, limit)` | Backend reader: literal matching with filtering before limiting and deterministic caption/key ordering. |

The reader returns ordinary dictionaries containing `id` and `caption`.
Identity is a nonempty string or integer, including zero; caption is non-null
text. Prefix search falls back to containment only when it finds no rows.
An empty query lists the first rows. The limit is 1–100.

Resources must be released on success and failure. The common base imports no
SQLAlchemy or HTTP host. A shared handler must keep request state in its reader;
a host may instead attach a request-specific handler during `prepare_page`.
The SQLite implementation uses read-only connections and Unicode casefold for
insensitive matching. Backend-specific capabilities require explicit contracts;
auxiliary columns remain reserved for Genropy.

## Dotted endpoint names traverse registered proxies

Dots express a chain of proxy objects. For `aaa.bbb.ccc`, the page owns `aaa`,
that proxy owns `bbb`, and the final proxy exposes the endpoint `ccc`:

```python
from gramlot.page import WebPage, endpoint

class Leaf:
    @endpoint
    def ccc(self, value: str) -> str:
        return value.upper()

class Group:
    endpoint_proxies = {'bbb': Leaf}

    def __init__(self):
        self.bbb = Leaf()

class Page(WebPage):
    endpoint_proxies = {'aaa': Group}

    def __init__(self):
        self.aaa = Group()

    def main(self, root):
        root.dataRpc('result', method='aaa.bbb.ccc', value='hello')
```

Each intermediate attribute must be registered in its owner's
`endpoint_proxies` dictionary. Registration is recursive at page discovery;
cyclic type registrations are rejected. At invocation, each object must be an
instance of its registered class, and the final method must remain decorated
with `@endpoint`. Private names and arbitrary attribute traversal are excluded.
Proxy endpoints currently have the Data role; Source methods remain page methods.

Registrations and method implementations follow ordinary Python inheritance.
An undecorated override hides an endpoint. New subclass endpoints become public
only when the specialized class is registered. Dictionaries are inherited as
ordinary attributes, not automatically merged between mixins; combine mappings
explicitly when a page needs multiple groups:

```python
endpoint_proxies = {**DbPageMixin.endpoint_proxies, 'aaa': Group}
```

Use a dotted string for the RPC method reference. Automatic conversion of a
bound proxy method into its full path is not implemented. Existing page methods
and one-level names such as `dbhandler.dbselect` retain their behavior. The
shared dispatcher provides this facility independently of the HTTP host.

## Verification

Tests cover nested generic dispatch, SQLite calls over HTTP using both
`dbhandler.dbselect` and `services.database.dbselect`, inherited methods, hidden
overrides, invalid instances at each hop, cycles and unregistered paths.
