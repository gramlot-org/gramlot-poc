# Gramlot 0.1.5 — candidate release notes

Status: local candidate, not a published release. Review the complete selected
commit range before publishing; the working tree also contains concurrent
framework feature work. These notes cover the integration/distribution change.

- Public `gramlot.hosting` page invocation and browser asset interfaces for host adapters.
- Public typed decoding through `gramlot.transport.from_tytx`.
- Django integration is maintained in the separate `gramlot-django` package.
- Browser modules and lazy resources are included in the Python distribution;
  the matching standalone ZIP has the same manifest/build ID.
- Missing compiled runtime assets now produce an explicit error; source fallback
  requires `development=True`.

Application callbacks use `gramlot`, as established in the existing 0.1.5 source
migration. There is no old `genro` callback alias. FastAPI integration uses the
separate adapter; retained legacy import paths delegate to that package.

The project remains pre-alpha. This release does not deploy consumer sites.
