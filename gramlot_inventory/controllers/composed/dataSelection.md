# dataSelection

## Identity

- **Identity:** `dataSelection`
- **Type:** controller
- **Level:** COMPOSED
- **Purpose:** load an ordered collection of portable records into Data through
  a generic database service contract.
- **Status:** local BagDB PoC implemented; portable product acceptance pending

## Current local experiment — 2026-09-17

Python declaration, Source-owned store, reactive loading and Data Bag output now exist.
See [GP-020](../../../docs/development/020-bagdb-laboratory.md). The JavaScript read
adapter is the current experimental boundary; the server-first notes below are
historical proposals, not a requirement to route local BagDB through RPC.
Advanced legacy parity and remote-provider conformance remain unimplemented.

## Earlier proposal: bases, mixins and composition

Legacy `dataSelection` expands into a `dataRpc` call to `app.getSelection`.
The proposed Gramlot direction composes shared RPC controller behavior with a
generic `DbHandler` endpoint and a backend-specific reader. Existing `rpcStore`
and `selectionStore` contracts are relevant infrastructure but do not constitute
an implemented `dataSelection` database helper.

## Common parameters

These are bounded candidates, not implemented support and not the full
46-parameter legacy server signature.

| Parameter | Type | Presence | Default | Bindings | Constraints |
| --- | --- | --- | --- | --- | --- |
| `destination` | Data path | required | none | output path is relative | Portable collection shape remains to settle. |
| `dbtable` | configured logical table string | required | none | literal or controller input binding | Must map to an allowlisted backend resource. |
| `columns` | allowed scalar column list | conditional | unsettled | literal or sampled input | Cannot expose arbitrary SQL. |
| `limit` | positive integer | optional | bounded default unsettled | literal, `^` or `=` | One pagination layer should be defined. |
| `offset` | nonnegative integer | optional | `0` candidate | literal, `^` or `=` | Distinct legacy row slicing is not implied. |
| `order_by` | portable deterministic order | conditional | unsettled | literal or sampled input | Must use a typed/allowlisted contract, not raw SQL. |
| filters | typed filter object | optional future capability | absent | nested binding behavior to define | Operators and null semantics must be approved first. |
| `_onResult`, `_onError` | JavaScript callback body | optional | absent | shared RPC controller scope | Common controller callbacks. |

## Behavior, output and errors

The earlier audit had no implementation; current local selection behavior follows GP-020. The first
contract must define row and metadata shape, pagination, deterministic ordering,
missing/empty results and validation errors. Legacy `totalrows`,
`totalRowCount` and `countOnly` have different meanings and must not be merged
implicitly.

## Abstract extension hooks

Database acquisition and row normalization are expected backend hooks on the
generic handler boundary. Typed filtering and count hooks remain design work;
this card does not invent method names.

## Generic example

Historical legacy authoring shape; the current experiment uses explicit adapter/dbtable parameters:

```python
root.dataSelection('customers', table='sales.customer',
                   columns='$id,$name', limit=50, order_by='$name,$id')
```

## Code and evidence

- Legacy discovery:
  `gnrpy/gnr/web/gnrwebstruct/dojo11.py::dataSelection` composes `dataRpc`.
- `docs/development/datarecord-dataselection-legacy-audit-2026-09-15.md`:
  parameter census, caveats and explicitly proposed next contract.
- `src/gramlot/grammar/logic.py`: existing generic RPC/store infrastructure,
  without a `dataSelection` helper.

## Incompatibilità Genropy legacy

Frozen selections, SQL/model expressions, relation dictionaries, saved views,
permission checks, logical deletion, aggregate variants and other advanced
legacy capabilities are outside this bounded generic proposal. Exact comparison
and capability allocation are **da verificare**.
