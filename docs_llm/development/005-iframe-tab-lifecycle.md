# Iframe tab lifecycle reconciliation

Status: **living PoC correction; not accepted clean-core behavior**.

No PoC documentation namespace is assigned, so no stable ID is invented.

## Problem and correction

Adding and selecting a dynamic `gnr-tabcontainer` pane in one Source transaction
could replace the whole mounted container when old/new child counts differed. This
reloaded surviving iframe documents and lost their independent Gramlot runtime/Data.

The bounded `target-wrapper.js` correction applies only to `gnr-tabcontainer` when
children have unique stable Source target IDs and retained order is unchanged. It
patches attributes, removes closed children, inserts new children and reconciles
survivors in place. Reorder, missing/duplicate IDs and other containers use the
existing fallback. No application state workaround or iframe state copy is added.

## Evidence and status

The layout regression adds/selects a second iframe tab in one live transaction,
then closes the first. Surviving iframe elements, documents and runtime markers keep
identity in both directions. Focused suite: 17 passed. The regression fails when the
bounded block is removed and passes when restored. Browser acceptance preserves
edited Welcome/Counter Data while new showcase tabs open; reopen after close is fresh.

Required local preview payload: Gramlot 0.1.5 build `dc3956c3b99a966c`.
Earlier `3bca85304c002e75` reproduces the lifecycle defect. These are preview build
IDs, not releases. A bounded port and clean-product review remain required; no
publication or deployment is authorized.
