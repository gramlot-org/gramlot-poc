# Inspector live roots

Status: **living PoC contract; not accepted clean-core behavior**.

No PoC namespace is assigned, so no stable ID is invented.

## Contract

Configure `inspector: {data_root: 'data_root', source_root: 'source_root'}` or pass
the same keys to `gramlot.inspector.open(...)` / `toggle(...)`.

- `data_root`: dotted Data path resolving to a Bag.
- `source_root`: Source node ID (`node_id`, including Python's transported `nodeId`);
  the inspector uses that node's child Source Bag.

The inspector receives the actual live branches. Edits mutate their real nodes through
the existing application live transaction; siblings are not shown or addressable.
Paths are relative to the configured roots. Missing/scalar roots fail closed with an
empty Bag and error, never full application fallback. Invalid option types are
rejected. Unspecified roots remain full application for compatibility, including
default options and `inspector: true`.

Origins resolve on mount or an `open()` / `toggle()` origin change. Nested mutations
remain live; after wholesale root replacement, set the origins again. This is an
application inspection boundary, not browser security isolation.

## Evidence and status

The regression verifies real scoped Data/Source rendering and writeback, sibling
isolation, per-call changes, invalid roots and full defaults. Clean-core review remains
required. No release, publication or deployment is implied.

Property labels use a neutral `#888` background and white text, including the primary value label. Bag-valued nodes omit the primary value row; their attributes remain editable without replacing the nested Bag.

Hover-activated deletion uses the relationTree favorites trash icon as its visual reference: a 12px outlined SVG in muted gray, revealed on row hover or keyboard focus, and visible on touch devices. Inspector attribute removal follows this convention and retains its undo action.
