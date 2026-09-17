# Iframe tab lifecycle reconciliation

Status: **living PoC correction; not accepted into the clean Gramlot product**.

No PoC documentation namespace has been assigned. This document therefore does
not invent a stable document or block ID.

## Problem

A live Source transaction can append a `contentPane` to a `gnr-tabcontainer` and
select it at the same time. The attribute render can arrive while the mounted
container still has the previous child count. Generic reconciliation then replaces
the complete tab-container element. Any surviving iframe is detached and recreated,
which reloads its document and loses that independent Gramlot page's runtime and Data.

The FastAPI `gramlot.showcase` exposed the defect: an edited Counter survived normal
tab switching, but reset when a new Formula iframe tab was opened.

## Bounded correction

`js/dom/src/target-wrapper.js` handles the add/remove case specifically for
`gnr-tabcontainer`. When all rendered children have unique stable Source target IDs
and retained children keep their relative order, reconciliation:

1. patches the container attributes;
2. removes children absent from the new Source;
3. inserts genuinely new children at their requested position; and
4. reconciles retained children in place without detaching them.

Reordering existing tabs, duplicate or missing child IDs, other containers and
unsupported structures retain the previous generic fallback. The correction does
not introduce application state recovery or iframe-specific state copying; it keeps
the original DOM nodes and browser documents alive.

## Verification

`js/dom/tests/layout-containers.test.js` mounts one closable iframe tab, adds and
selects a second tab in one `gramlot.live()` transaction, and verifies that the
first iframe element, document and runtime marker are unchanged. It then closes the
first tab through `closePage(0)` and verifies the second iframe's element, document
and marker remain unchanged.

The focused layout suite passes 17 tests. As a negative control, the new regression
fails against the same staged runtime with the bounded reconciliation block removed,
because the tab-container identity changes. It passes with the block restored.

Browser acceptance with `gramlot.showcase` confirms that edited Welcome and Counter
Data survives opening additional iframe tabs, while closing and reopening a page
still creates a fresh child runtime as intended.

## Preview payload and destination status

Local Gramlot 0.1.5 browser payload `dc3956c3b99a966c` was built from the current
prepared source baseline plus this bounded correction. Earlier payload
`3bca85304c002e75` reproduces the replacement and is incompatible with the showcase
persistence requirement. These are local preview build identifiers, not releases.

The patch still requires a bounded port and destination review before it can become
accepted clean-core behavior. No package publication, release or deployment is
authorized by this PoC correction.
