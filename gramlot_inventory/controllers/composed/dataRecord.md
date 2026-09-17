# dataRecord

## Identity

- **Identity:** `dataRecord`
- **Type:** controller
- **Level:** COMPOSED
- **Purpose:** load one database record into Data through a generic database
  service contract.
- **Status:** local BagDB PoC implemented; portable product acceptance pending

## Current local experiment — 2026-09-17

Python declaration, Source-owned store, reactive loading and Data Bag output now exist.
See [GP-020](../../../docs/development/020-bagdb-laboratory.md). The JavaScript read
adapter is the current experimental boundary; the server-first notes below are
historical proposals, not a requirement to route local BagDB through RPC.
Advanced legacy parity and remote-provider conformance remain unimplemented.

## Earlier proposal: bases, mixins and composition

Legacy `dataRecord` expands authoring into a `dataRpc` call to `app.getRecord`.
The proposed Gramlot direction keeps Data destination, reactive execution and
callbacks in common controller behavior while a `DbHandler` supplies the generic
endpoint and backend subclasses supply database access. At that audit date no declaration or record endpoint existed; the local declaration
is now implemented, while a shared server record endpoint is still absent.

## Common parameters

These are bounded candidates for a portable first contract, not implemented
support and not the full 25-parameter legacy server signature.

| Parameter | Type | Presence | Default | Bindings | Constraints |
| --- | --- | --- | --- | --- | --- |
| `destination` | Data path | required | none | relative path; `^` applies to inputs, not destination | Output shape must be settled first. |
| `dbtable` | configured logical table string | required | none | literal or sampled/reactive input to the composed RPC | Must not be unrestricted client SQL. |
| `pkey` | scalar identity | required for existing-record load | none | literal, `^` or `=` | Key `0` must remain valid; missing and new records are distinct. |
| missing policy | enum/boolean, exact spelling unsettled | optional | unsettled | ordinary controller parameter rules | Must define error versus explicit missing result. |
| `_onResult`, `_onError` | JavaScript callback body | optional | absent | shared RPC controller scope | Common controller callbacks, not database hooks. |

## Behavior, output and errors

The earlier audit had no implementation; current local output and errors follow GP-020. The pending contract must
define portable record fields, identity/missing metadata and errors before an
endpoint is added. It must not silently inherit legacy grid serialization,
new-record sentinels, locks, protection metadata or relation resolvers.

## Abstract extension hooks

Expected generic hooks belong on `DbHandler`; concrete database opening and row
normalization belong to backend implementations. Exact record hooks are not yet
approved and therefore are not named here.

## Generic example

Historical legacy authoring shape; the current experiment uses explicit adapter/dbtable parameters:

```python
root.dataRecord('customer', table='sales.customer', pkey='^customer_id')
```

## Code and evidence

- Legacy discovery:
  `gnrpy/gnr/web/gnrwebstruct/dojo11.py::dataRecord` composes `dataRpc`.
- `docs/development/datarecord-dataselection-legacy-audit-2026-09-15.md`:
  complete legacy parameter audit and explicitly unimplemented portable proposal.
- `src/gramlot/database.py`: current `DbHandler` has only `dbselect`.

## Incompatibilità Genropy legacy

Known legacy capabilities including new/sample records, locks, protection
metadata, eager relations, virtual columns and loading callbacks are not in the
bounded portable proposal. Exact compatibility choices are **da verificare**.
