# apiResolver concept and openApiResolver

## Identity

- **Identity:** owner taxonomy label `apiResolver`; verified public declaration
  `openApiResolver`
- **Type:** controller
- **Level:** COMPOSED
- **Purpose:** fetch an OpenAPI document in the browser and publish a navigable
  Bag representation into Data.
- **Status:** implementato come `openApiResolver`; nessun alias `apiResolver`

## Bases, mixins and composition

`openApiResolver()` calls the shared `_http_resolver()` authoring helper, which
encodes nested bindings and emits a low-level `dataController`. That controller
calls `gramlot.resolvers.load`. The related `openApiClient()` expands into three
controllers, while `openApiForm()` expands into a `div` plus one controller.
These facts place the resolver family among composed controllers. They do not
make it an implemented recipe API.

## Common parameters

| Parameter | Type | Presence | Default | Bindings | Constraints |
| --- | --- | --- | --- | --- | --- |
| `destination` | Data path string | required | none | relative to controller datapath | Must be nonempty. |
| `url` | string | required | none | `^` reloads; `=` is sampled | Browser CORS applies. |
| `status` | Data path | optional | absent | treated as a destination path | Receives state and error Bag. |
| `method` | HTTP method string | optional | service default | may be bound | Intended mainly through the shared HTTP resolver options. |
| `qs`, `headers`, `body` | object | optional | absent | nested `^` and `=` bindings are encoded | Body is JSON-oriented. |
| `timeout` | seconds | optional | `30` | may be bound | `0` disables timeout. |
| `pollInterval` | seconds | optional | `0` | may be bound | Requests do not overlap. |
| `_on_start` | boolean | optional | `True` | no | Suppresses initial load when false. |
| `_onResult`, `_onError` | JavaScript callback body | optional | absent | controller scope | Trusted application code. |

## Behavior, output and errors

The controller fetches in the browser, cancels stale work and writes status as
`loading`, `ready` or `error`. A successful OpenAPI 3.x JSON document becomes a
Bag with `info`, `api.<tag>.<operationId>`, selected top-level metadata and the
complete `spec`. Previous Data remains after failure. Missing path parameters
during later explicit operation calls raise an error. YAML and external `$ref`
fetching are not implemented.

## Abstract extension hooks

`_onResult` may replace the result and `_onError` handles request failure.
Standalone JavaScript `OpenApiResolver` also exposes `operationResolver()` for
explicit calls; discovery itself does not invoke operations.

## Generic example

```python
root.openApiResolver('schema', url='^apiUrl', status='requestState', timeout=30)
```

## Code and evidence

- `src/gramlot/grammar/resolvers.py`: verified public name and expansion through
  `_http_resolver()` into `dataController`.
- `js/dom/src/resolvers/service.js`: browser resolver service.
- `docs/guides/http-resolvers.md`: behavior and limits.
- `docs/guides/openapi-client.md`: related composed client/form declarations.

## Incompatibilità Genropy legacy

The Bag layout follows the Python `OpenApiResolver` convention, but a complete
legacy behavior and parameter comparison is **da verificare**. There is no
verified Gramlot `apiResolver` alias.
