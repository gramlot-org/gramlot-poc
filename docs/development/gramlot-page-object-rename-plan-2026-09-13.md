# Rename the page object from genro to gramlot

Status: implemented and verified locally; review pending, publication excluded.
Owner decision, 2026-09-13: the Gramlot page-management object is named `gramlot`,
to avoid confusion and conflicts with legacy Genropy's `genro`. Migrate all
references to that object in code, examples, tests, maintained documentation and
the website. Framework checkpoint: `e2127a1`, pushed to `origin/develop`.

## Scope and owner-confirmed contract

Owner correction: Gramlot ignores `genro`; the external `genro-*` libraries it
uses are a separate matter. This is a naming migration, not interoperability
work. Do not add legacy detection, handling, compatibility or coexistence tests.

The application supplied to authored browser code becomes `gramlot`:
`gramlot.data`, `gramlot.publish(...)`, `gramlot.serverCall(...)`,
`gramlot.resolvers`, `gramlot.openapi`, `gramlot.inspector` and any other existing
Application services. This changes its name, not the services' behavior.
Function callbacks receive `args.gramlot`; string scripts receive `gramlot` in
their execution scope. Rename local variables called `genro` when they represent
the Gramlot Application, including tests and runnable documentation.

Migration policy: make this an intentional breaking rename, with no
compatibility alias, automatic fallback or dual injection under `genro`.
Migrate runtime, Python-generated scripts and consumers together. Old stored
Source/controller strings require regeneration or an explicit source migration;
no runtime compatibility mechanism is part of this work.

Keep the internal class `Application`, the `application` ownership properties
and lifecycle event payloads unless the audit finds a direct naming requirement.
The current shared startup does not assign `window.genro`: lexical script scope
and a browser global are separate. This rename does not introduce a singleton
`window.gramlot`. A global access API, if desired later, needs a separate decision
that accounts for multiple applications on one page.

Preserve genuine external names (`genro-bag-js`, `genro-tytx`, `genro-builders`,
Python `genro_*` packages), `gnr-*` custom element tags, Genropy classes, deployment
identities. Genuine legacy source and protocol documentation are outside this
rename, not runtime compatibility exceptions. Preserve original
transcripts and `docs/history/`; update current guidance and add dated supersession
notes to historical design records where necessary. Do not falsify recorded old
behavior. Every remaining `genro` match must have a classified reason to remain.

## Verified change surfaces

| Area | Files / responsibility |
| --- | --- |
| Script and action execution | `js/dom/src/services/recipe-runtime.js`: trusted arguments passed to script evaluation |
| Controllers and callback arguments | `js/dom/src/logic/runtime.js`: string/function execution and reactive/topic context |
| JS-generated declarations | `js/dom/src/resolvers/service.js`: generated resolver controller strings |
| OpenAPI services | `js/dom/src/services/openapi-client.js`: argument destructuring and resolver calls |
| Python-generated browser code | `src/gramlot/grammar/resolvers.py`, `src/gramlot/examples.py`: resolver/OpenAPI/inspector scripts |
| Runtime descriptions | `application.js`, `source-bag.js`, `services/topics.js` and related API comments |
| Tests | Actions, topics, forms, stores, components, layout, writeback, runtime consumer contracts and generated-source assertions |
| Examples | Gallery cases; teaching lessons 11, 14 and 15; other Python/JS recipes and downloadable examples found by the complete inventory |
| Documentation | Publish/subscribe, server calls, OpenAPI guides, Sphinx sources, handbooks, current context and architecture records |
| Distribution | Prepared resources, ESM bundle, typed recipes, runtime manifests/hashes, teaching/gallery output and downloadable artifacts |
| Website | `../gramlot-site`: installed/pinned Gramlot runtime, `build.py`, `web/runner.js`, widgets/demos, code views, exports and generated `dist/` |
| Other consumers | `/Users/gporcari/Sviluppo/genro_ng/gramlot-rosetta`: installed runtime, recipes, shared setup and source views; framework-owned FastAPI/Django examples |

A first search of tracked source finds many external dependency-name matches;
raw word counts are not a migration scope. Site authored-code inspection has not
found an active `genro.` application call, but updating and verifying its bundled
runtime remains necessary. Generated output and any preserved runnable examples
must be audited explicitly, not inferred from that result.

## Execution sequence

### 1. Establish the baseline and complete the inventory

- Keep `e2127a1` as the rollback reference and execute new work from `develop`.
- Record the consumer checkout revisions, installed wheels, public pins and
  generated-asset provenance. Site was clean but five commits ahead of its remote
  tracking branch; Rosetta was clean but one ahead at inspection. Do not assume
  the framework push backed up those separate repositories.
- Search tracked code, embedded JS strings, callback keys, generated source,
  manifests, code-view fixtures and documentation. Separately inspect generated
  artifacts and classify matches as page object, genuine legacy, dependency,
  historical record or unrelated identity. Search spelling/case variants as well.
- Record the existing three gallery failures caused by missing `remoteSelect`
  cases. Repair that baseline separately before relying on a full green gallery
  build; do not attribute it to this rename or weaken tests.

Exit: a reviewed file inventory and a reproducible baseline for each consumer.

### 2. Migrate the runtime contract and executable sources together

- Change injected `genro` keys to `gramlot` in action/controller execution.
- Change service destructuring, generated controller strings, Python declarations
  and all current runnable consumers of the old context in one coherent change.
- Preserve `this`, `sourceNode`, binding resolution, event data, lifecycle and
  service behavior. Keep runtime-supplied context authoritative when a topic
  payload or binding also contains a `gramlot` key.
- Rename relevant test variables and update positive assertions; do not perform
  a repository-wide blind string replacement.

Exit: source-runtime and cross-language contract checks pass with the new name.

### 3. Verify the renamed API across execution paths

- Test string and function controllers, startup and reactive triggers, topic
  callbacks, button actions and delayed actions with the new context.
- Test resolver/OpenAPI code emitted by Python and JavaScript, inspector launch,
  RPC success/error handlers, and hosted/standalone startup.
- Mount two Gramlot applications: each receives its own `gramlot` instance;
  messages, Data, callbacks and disposal remain isolated.
- A reserved `gramlot` context value supplied by a payload must not replace the
  real application. This verifies the existing context precedence under its new
  name; it does not introduce interaction with any other runtime.
- Test serialized Python Source after browser hydration, not just direct JS
  construction. Audit retained/exported scripts for old-context calls.

Exit: tests demonstrate the renamed API's behavior, rather than merely
asserting that source text contains a different word.

### 4. Update documentation and rebuild distributable artifacts

- Update maintained API explanations, snippets, example comments and source views.
  Add migration guidance showing `genro.publish(...)` → `gramlot.publish(...)`,
  `args.genro` → `args.gramlot`, and the need to regenerate saved Source.
- Rebuild resources, browser distribution, handbooks, Sphinx output, teaching and
  gallery pages, Python/TYTX snapshots and downloadable standalone examples from
  their authoritative sources. Never patch minified/generated output by hand.
- Verify a clean installed wheel and browser payload together; update hashes and
  cache/version identifiers through the normal build system. Check that no stale
  service worker or cached HTML pairs new scripts with an old runtime.
- Run an exclusion-aware residual scan over both maintained sources and artifacts.
  Maintain explicit exceptions for legacy examples and migration documentation.

Exit: shipped code, rendered documentation and displayed source all agree.

### 5. Validate the website and other consumers with the new package

- Install an identifiable locally built wheel into isolated site/Rosetta preview
  environments using their supported preview mechanisms. Do not use sibling
  source overrides or prematurely change a published dependency pin.
- Rebuild the site, its examples, source views and downloadable standalone HTML.
  Rebuild and test Rosetta against the same candidate package. Keep React/Vue and
  other independent implementations behaviorally unchanged.
- Exercise representative UI actions, pub/sub, Data bindings, remote operations,
  inspector and page disposal in the browser. Test the exported standalone page
  separately from its host. Include the existing FastAPI/Django examples.
- Inspect rendered documentation and visible code for stale object names. Check
  release/container/cache consistency before any production rollout.

Exit: source tests, clean-package tests, consumer tests and browser checks pass;
every remaining old-name occurrence is intentional and documented.

## Implementation outcome — 2026-09-13

The runtime injects only `gramlot` into action and controller contexts. Python and
JavaScript resolver/OpenAPI declarations, inspector launchers, maintained examples,
tests and generated browser assets use the same name. Runtime-owned context wins
over authored attributes and topic payload fields. Two mounted applications retain
independent instances, topics, Data and disposal.

The browser source suite passes 410 tests. The prepared-client Python suite passes
190 tests with 2 optional skips when the manual HTTP server test is excluded.
The coordinator then reran that test with local listening permitted: it passed
(191 Python tests passed across the two runs). Sphinx HTML, 24 teaching lessons
and 34 gallery pages build successfully.
The missing gallery baseline was repaired with standalone callbackSelect and chart
cases; host-dependent components point to their actual hosted examples and focused
tests.

The candidate wheel and browser distribution use build id `7ab73df3f830ff64`.
Gramlot Rosetta rebuilt from that wheel and passes 89 tests. The site rebuilt its
three Python/JavaScript example pairs; all six mount checks pass before the existing
site assertion that numberTextBox uses native `type=number` fails against the
framework's intentional text editor. The rename does not alter that component.
Browser review verified the renamed publish/subscribe source and interactions; the
inspector opened with populated Data and Source trees. A MutationObserver
TypeError was also captured during the host bridge; it did not prevent opening
the inspector, and its attribution to the baseline has not been verified.

An exclusion-aware scan leaves `genro` only in external `genro-*` dependencies,
Genropy/history/provenance references and the explicit migration note. No alias,
fallback, legacy detection or global singleton was added.

## Delivery and release boundary

Deliver reviewed implementation commits, the classified residual inventory,
test results and a migration note. Framework,
website and Rosetta publication/deployment remain explicit later actions, with
coordinated dependency pins and matching runtime assets. Rollback must restore
each consumer's previous application/package/assets together, not merely rename
one JavaScript variable back.
