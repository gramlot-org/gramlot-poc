# Inspector live roots

Status: **living PoC contract; not accepted clean-core behavior**.

No PoC documentation namespace has been assigned, so this guide does not invent
stable document or block IDs.

## Configuration

The Inspector can scope its two live origins through application options:

```javascript
new Application(host, builder, {
    inspector: {data_root: 'data_root', source_root: 'source_root'},
});
```

`data_root` is a dotted path that must resolve to a Bag in the application's Data.
`source_root` is a Source node ID: it matches the node's `node_id` attribute and the
`nodeId` spelling transported by Python declarations. The inspector displays the
Source Bag owned by that node, not the wrapper node itself.

The same keys can override configured origins when opening or toggling:

```javascript
await gramlot.inspector.open({data_root: 'data_root', source_root: 'source_root'});
await gramlot.inspector.toggle({data_root: 'data_root', source_root: 'source_root'});
```

Omitting a key preserves the existing full-application behavior for that origin.
`inspector: true`, an empty inspector options object and an unconfigured application
therefore continue to expose the complete application Data and Source.

## Live scope and failure behavior

The scoped tree and editor receive the actual application-owned Bag branches. They do
not clone or mirror state. A supported edit uses the existing `Application.live()`
path and mutates the selected Data or Source node in place, so ordinary bindings and
rendering react. Paths displayed by the inspector are relative to the selected root.
Nodes outside either branch are neither displayed nor addressable by its editor.

An explicit root that does not resolve, resolves to a scalar, or names a Source node
without a Bag value fails closed. That origin receives an empty inspector Bag and an
error detail; it never falls back to the whole application. Invalid option types are
rejected.

Roots are resolved when the inspector is mounted or when `open()` / `toggle()` sets
origins. Mutations inside the resolved Bag remain live. After replacing an entire
root Bag or Source wrapper, call `open()` with the roots again to resolve the new
branch. This scope is an inspection boundary inside one application, not a browser
security boundary.

## Verification and destination status

The focused regression uses real nested Data and Source Bags. It verifies scoped tree
contents, Data and Source writeback, unchanged siblings, per-call origin changes,
fail-closed missing roots, and backwards-compatible full roots for default and
`inspector: true` applications.

This PoC change still requires a bounded port and destination review. It does not
authorize a release, publication or deployment.

Property labels use a neutral `#888` background and white text, including the primary value label. Bag-valued nodes omit the primary value row; their attributes remain editable without replacing the nested Bag.

Hover-activated deletion uses the relationTree favorites trash icon as its visual reference: a 12px outlined SVG in muted gray, revealed on row hover or keyboard focus, and visible on touch devices. Inspector attribute removal follows this convention and retains its undo action.
