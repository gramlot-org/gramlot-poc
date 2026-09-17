# Genro ASGI server application GUI — 2026-09-14

## Owner decision

Genro ASGI may depend optionally on Gramlot and provide the integration itself.
The extra is named `genro-asgi[gui]`. Hosting and administration pages belong in
the existing `genro_asgi_server_app.ServerApplication`, not a separate adapter
distribution. Gramlot retains no dependency on Genro ASGI.

## Local implementation

The sibling Genro ASGI checkout now contains the optional host, Python monitor
and password login, under `src/genro_asgi_server_app/gui/`. Its
`docs/guides/gui.md` describes routes, explicit API-only mode, authentication,
the runnable loopback example, and release limitations.

Two reusable Gramlot capabilities support the monitor:

- `urlResolver(..., pollInterval=2)`: schedule the next request after completion;
  cancel request and timer together when the Source owner disappears. Zero
  disables scheduled refresh; changing policy triggers one immediate request.
- `storeTree(..., showValues=True)`: display scalar leaf values alongside labels,
  including zero, false and null, using text content rather than interpreted HTML.

The monitor uses ordinary Python Source, Data Bags, bindings, URL resolvers and
components. Contributor mount keys are read using Bag array paths, including
the empty root mount and keys containing dots. Application-local DOM, event
wiring and fetch implementations are absent. Generic tree panels are the first
slice; the monitor does not execute third-party `panel_source` modules.

## Verification

- Genro ASGI server-application suite with the installed local Gramlot wheel:
  170 passed. Without Gramlot: 164 passed, one GUI test module skipped.
- Gramlot HTTP resolver tests: seven passed; tree and scalar-value tests: 20 passed.
- Genro ASGI lint and diff whitespace checks passed.
- A local Gramlot wheel and browser distribution were built. A separate local
  environment loaded Gramlot from the installed wheel, reusing the existing
  Genro ASGI environment's dependencies for the host.
- Browser: password login, monitor rendering, live uptime and request counter,
  tab retention across polls, pause retaining the timestamp and manual refresh
  while paused were observed. Runtime assets came from the packaged browser
  build. Login declares empty-string defaults and `live=True`; an empty submit
  followed by valid credentials was verified in the foreground browser. No
  real mobile device verification is claimed.

No commit, push or publication is included. Gramlot 0.1.5 metadata alone does not
prove availability of these local additions in a published artifact. Existing
uncommitted work in Gramlot and unrelated Genro ASGI files was preserved.
