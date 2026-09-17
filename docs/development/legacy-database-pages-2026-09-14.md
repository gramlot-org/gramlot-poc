# Isolated legacy-hosted database pages

The owner requested a customer dbSelect and a state grid under the normal menu,
using test_invoice_pg as the reference while avoiding interference with concurrent
instances and debugging sessions.

## Local layout

The isolated experiment is in `temp/legacy-database-poc/` in this checkout:

- `gnrpy/gnr/`: copy of the current legacy Python server, including its Gramlot adapter.
- `projects/test_invoice/packages/`: copy of the reference application's packages.
- `projects/test_invoice/instances/test_invoice_pg_gramlot/`: copied instance and
  site configuration, with the same reference database and separate site identity.
- Dedicated server port 8098 and daemon port 40414.
- The existing PoC virtualenv supplies dependencies; no packages were changed.

The copied menu retains its existing entries and adds `Customer selection` and
`States` beside `Hello World` under `GramlotPages`. All three use ordinary Python
Gramlot pages. The new pages perform read queries only. No database clone was made.
The reference `test_invoice_pg` package and other running servers were not modified
by this slice. The reference instance config declares sys, adm and invc; its invc
menu contains the existing Invoicer entries. Matching a different expected full
menu requires identifying that reference configuration, not granting extra roles.

## RPC slice

The copied adapter now configures the existing Gramlot server-call service and
routes `/<page>/_rpc/{data|source}/<method>` to methods selected by `page_methods`.
It uses TYTX request/response envelopes, validates method role and Python argument
binding, requires POST and the TYTX content type, and rejects a mismatched Origin.
Invocation is synchronous in the WSGI request thread with the host database and
normal site cleanup. No application-specific browser request code was introduced.

This remains a local public-page prototype. It does not implement protected-page
authorization, asynchronous endpoints, legacy notifications or write transactions.
The site's normal login still governs access to its legacy menu; that alone is not
an authorization check on the prototype's direct page/RPC URLs.

## Verified

- Browser: customer search for `smith`, selection and bound identity/name/locality/
  postcode/state fields; eight actual states/territories, with VIC selection.
- HTTP regression script `temp/legacy-database-poc/verify.py`: state rows, customer
  search and identity lookup, rejection of an undecorated method and bad arguments.
- The new menu declarations are in the isolated package; a fresh site login is
  required for the separate instance's menu session.

Open <http://127.0.0.1:8098/>. This is local work only; no commit, push or release.
