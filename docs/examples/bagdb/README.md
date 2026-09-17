# BagDB database laboratory

Python Source uses dbSelect, dataRecord, dataSelection/grid and the shared
relationTree. All 18 tables of the legacy test_invoice CSV export are loaded
through the JavaScript BagDB adapter: 17,538 rows, including states, regions,
postcodes/suburbs, products, annual prices, staff and notes.

[Contract](../../development/020-bagdb-laboratory.md).
[Common library](../../development/021-bagdb-library.md).

## 1. Files and reproducibility

`mydb/struct/<table>.json` describes exported physical fields and direct relations.
`mydb/data/<table>.json` contains every CSV row and column, preserving original
string values, ordering and decimal text. `mydb/manifest.json` records per-table
counts and SHA-256 hashes of source CSV/model files. Paths are relative to the
legacy repository. The snapshot is local PoC evidence, not a published dataset.

Regenerate into a new directory:

```sh
.venv/bin/python docs/examples/bagdb/import_legacy.py /path/to/genropy /tmp/new-mydb
```

`gramlot.bagdb.load_bagdb_directory()` loads these files into a fixture Bag and
registry during Python page generation. BagDB owns a browser-memory copy. Editing
JSON requires regenerating the static page; browser changes do not write files.

## 2. Comparable scope and limits

Empty CSV cells become null, as in the legacy test importer. Integer and boolean
columns use L/B; decimal, date/time and XML values remain exact text with the
original type recorded in `sourceDtype`. BagDB still advertises only T/L/R/B:
numeric decimal sorting/arithmetic, date operations and XML semantics are absent.
Implicit system fields use explicit fixture defaults; schema extraction is not a
complete reconstruction of GenroPy's compiled model or validation constraints.

All exported physical data is present. Computed fields are listed as omitted in
schema files; composite joins, triggers, hierarchy operations and references to
tables outside the 18-table export are not implemented. `sourceReference` retains
external reference evidence; only internal single-primary-key references become
BagDB relations. Field groups remain GenroPy-specific.

The page selects a customer referenced by the first invoice and displays that
customer's invoices, ordered by date. Amounts display preserved decimal text.
All tables are registered for metadata and adapter queries; the page is a customer
scenario, not a full CRUD interface for every table.

## 3. Verification

All 18 CSV/JSON pairs were compared field-for-field and row-for-row. Python tests
check counts, value preservation and Source authoring. The complete JS fixture
test instantiates BagDB (validating every PK/FK), reads a customer and invoices,
searches names and expands bounded model metadata. Local Node observation:
initialization about 0.55 s, combined reads/model about 8.95 s. These are single-run
evidence, not a performance guarantee; whole-database snapshot copying is still
an optimization gap. Browser interaction is verified separately.

Browser verification: Pacific Welding Specialists loads with eight invoices;
Clear empties record/grid and Restore initial customer reloads both. The generic
relationTree renders fields and direct/inverse relation branches without groups.
The first browser navigation exceeded 30 seconds before completing; startup
and whole-Bag copy cost remain measured limitations of this full-size fixture.

Imported display labels omit legacy localization prefixes (`!!`, `!![it]`).
This is label cleanup, not a localization implementation; source CSV data is unchanged.
