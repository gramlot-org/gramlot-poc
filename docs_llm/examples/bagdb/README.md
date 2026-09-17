# BagDB database laboratory

## 1. Files

18 legacy test_invoice tables; 17,538 rows. Full CSV values and ordering in
`mydb/data/<table>.json`; physical schema in `mydb/struct/<table>.json`;
counts and source CSV/model hashes in `mydb/manifest.json`.
Importer: `docs/examples/bagdb/import_legacy.py LEGACY NEW_DIRECTORY`.

Python `gramlot.bagdb.load_bagdb_directory()` builds fixture/registry. JS BagDB
owns memory copy. JSON edits need page regeneration; no write-back persistence.

## 2. Scope

Every exported column/row retained. Empty → null; integers/booleans → L/B;
decimals/dates/XML → exact text, original `sourceDtype` recorded. No decimal/date
operations, computed fields, composite joins, triggers or hierarchy operations.
Implicit fields use fixture defaults; not full compiled GenroPy schema parity.
Internal single-PK relations enabled; external references only recorded.
Generic model has no field groups.

Customer page uses Source, dbSelect, dataRecord, dataSelection/grid, relationTree.
Initial customer comes from first invoice; amounts display exact source text.
All tables registered; not a full CRUD UI.

## 3. Evidence

18 CSV/JSON pairs match exactly. Python checks counts, values, authoring.
JS full fixture validates all PK/FKs, record, selection, search, model.
Node observation: ~0.55 s initialization; ~8.95 s combined reads/model.
Single run, no performance guarantee; snapshot-copy optimization remains open.

[Contract](../../development/020-bagdb-laboratory.md).
[Library](../../development/021-bagdb-library.md).

Browser verification: Pacific Welding Specialists loads with eight invoices;
Clear empties record/grid and Restore initial customer reloads both. The generic
relationTree renders fields and direct/inverse relation branches without groups.
The first browser navigation exceeded 30 seconds before completing; startup
and whole-Bag copy cost remain measured limitations of this full-size fixture.

Imported display labels omit legacy localization prefixes (`!!`, `!![it]`).
This is label cleanup, not a localization implementation; source CSV data is unchanged.
