# Gramlot repository transition

Date: 2026-09-16. [Consolidation guide](00-consolidating-gramlot.md).
[Expanded version](../docs/00-01-repository-transition.md).

## 1. Target

- **1.1** Rename current repository to `gramlot-poc`. Keep history, branches, tags,
  pages, examples, tests, inventory, dirty work and future experiments.
- **1.2** PoC repository name changes; Python distribution/import remains `gramlot`.
- **1.3** Create a history-independent `gramlot` for reviewed product code and docs.
  No bulk copy and no nested `versione2/`.
- **1.4** PoC owns evolution/evidence. New Gramlot owns authoritative constitution,
  product overview and accepted ports.

## 2. Preserve

- **2.1** Preserve tracked, untracked and ignored files, including assets, databases,
  environments and generated material. No blanket commit/stash/reset/clean.
- **2.2** Preserve dirty main checkout plus Data RPC and chartBox linked worktrees.
- **2.3** Existing Codex project/conversations follow PoC with the same identities.
  New Gramlot gets a separate project and LLM context.
- **2.4** Old compatibility symlink names continue to point to PoC.
- **2.5** PoC and new Gramlot use separate environments: both may import as `gramlot`.

## 3. Verified blockers

- **3.1** Current: `/Users/gporcari/Sviluppo/gramlot/gramlot`, `develop`, `e2127a1`,
  origin `gramlot-org/gramlot`.
- **3.2** Dirty: 620 tracked changed paths and 39 untracked entries; both linked
  worktrees also dirty. Ignored files require a separate inventory.
- **3.3** Linked-worktree pointers reach the current Git directory. Repair them before
  a new repository occupies the old path.
- **3.4** Demo launcher uses `ROOT/gramlot`; environments/state contain old paths.
- **3.5** FastAPI/Django development and locks use `../gramlot`; FastAPI CI checks out
  `gramlot-org/gramlot`. New repo creation would silently switch these consumers.

## 4. Preflight

- **4.1** Stop path-dependent servers/watchers/tasks; record what must restart.
- **4.2** For all three worktrees record path, branch, HEAD, upstream, remotes, status,
  binary diffs, untracked/ignored inventories, worktree pointers and manifests.
- **4.3** Create and verify a fresh dated recovery snapshot outside the repository.
- **4.4** Verify GitHub name availability/permissions, visibility/default branches,
  protections, Actions settings, hooks, releases and storage.
- **4.5** GitHub mutation and sibling filesystem changes need their execution-tool
  permissions. No package publication or deployment belongs to this transition.

## 5. Local sequence

- **5.1** Atomically move complete `gramlot/` to `gramlot-poc/`; never recreate by clone.
- **5.2** Retarget compatibility symlinks to PoC, preserving their old names.
- **5.3** Repair worktrees; every `.git` pointer must resolve into `gramlot-poc/.git`.
- **5.4** Compare all HEAD/branch/status records with preflight; mismatch stops work.
- **5.5** Point launcher/docs/current consumers to PoC; clear only confirmed stale
  process state. Preserve logs.
- **5.6** Update existing Codex project root without recreating its identity.
- **5.7** Smoke-check all worktrees, representative tests/assets and example host.
- **5.8** Do not create local `gramlot/` until worktree-pointer verification passes.

## 6. Consumer split

- **6.1** Current demos and compatibility suites explicitly use `gramlot-poc`.
- **6.2** Change FastAPI/Django editable sources and locks to `../gramlot-poc` initially.
  Point current FastAPI CI to `gramlot-org/gramlot-poc`.
- **6.3** Add separately named clean-core lanes only when required contracts exist.
- **6.4** Historical implementation links target PoC. Product links target clean
  Gramlot only after their content lands.
- **6.5** Never depend on GitHub rename redirects: the old name will identify the new
  repository after creation.

## 7. Remote sequence

- **7.1** Rename existing GitHub repository to `gramlot-poc`; verify identity, history,
  issues, releases, tags, branches and settings.
- **7.2** Set PoC `origin` to its canonical new URL; verify destinations without pushing
  unrelated dirty work.
- **7.3** Land explicit PoC references in current CI/consumers; pause unresolved jobs.
- **7.4** Re-scan old URLs and classify each remaining occurrence.
- **7.5** Create new `gramlot` only after those gates. Verify no PoC job switched.

## 8. New repository seed

- **8.1** Create local clean `gramlot/` after local/consumer gates; use new Git history.
- **8.2** Seed: Apache license/notices, README, repository instructions, paired
  constitution and `01-overview`; add code/testing skeleton only with agreed contract.
- **8.3** PoC `00` remains evolution authority. Replace ambiguous PoC product-doc copies
  with exact pointers after admission to new Gramlot.
- **8.4** Create separate Codex project/LLM. Use `main` consolidated/default and
  `develop` for new development when branches are established.

## 9. Port protocol

- **9.1** Stable port ID.
- **9.2** PoC sends card/evidence, contract/boundaries, minimal code/docs, tests,
  differences, provisional dependencies and open questions.
- **9.3** New Gramlot records acceptance or concrete revisions under the same ID.
- **9.4** Feed accepted lessons into later PoC ports.
- **9.5** LLMs report constitutional conflicts; only owner amends architecture.

## 10. Done gates

- **10.1** All PoC files/worktrees preserved and pointers repaired.
- **10.2** PoC representative tests/assets/demo work after rename.
- **10.3** Current and clean consumers select repositories explicitly.
- **10.4** Two verified GitHub identities and correct local remotes.
- **10.5** New Gramlot has clean history and authoritative product docs.
- **10.6** Separate LLM roots, port IDs and Python environments.
- **10.7** Workspace map documents both repositories, symlinks and adapters.

## 11. Readiness

- **11.1** Feasible, but unsafe as an uncoordinated rename because of dirty worktrees,
  pointer paths, launcher paths and adapter sources.
- **11.2** Record visibility, constitution filename and bootstrap PoC CI lanes before
  execution. These do not change the approved architecture.
- **11.3** Failure before new-repo creation: restore directory/symlinks from verified
  snapshot. Later failure: preserve both trees and repair references; never overwrite.

## 12. Execution record — 2026-09-16

- **12.1** Completed: living `gramlot-poc` and clean `gramlot` exist locally and on
  GitHub. PoC identity/history and all three worktrees are preserved. Both public;
  new product main/develop contain only the reviewed documentation seed.
- **12.2** Full recovery copies of eight checkouts/worktrees were hash-verified,
  including ignored files. Private checkpoint: workspace
  `.migration/20260916-repository-split/`; never commit/publish it.
- **12.3** Compatibility links and worktree pointers target PoC. Current adapter
  sources/locks/environments and FastAPI local CI explicitly use PoC. Rosetta's
  published workflow reference was updated with deployment suppressed during the
  commit; its previous enabled state was restored.
- **12.4** Existing Codex project identity follows PoC; new product has a separate
  project. Active desktop sessions may need reopening to adopt updated roots.
- **12.5** Verification: 43 PoC Python tests, 422 JS tests; FastAPI 45 passed/2 skipped;
  Django 33 passed. Adapter lint/docs passed. Git integrity passed. Three demo
  routes returned HTTP 200 on ports 8051, 8063 and 8026.
- **12.6** Demo startup now builds the required compiled browser payload. Its legacy
  environment uses the extracted local FastAPI adapter. Django uses its existing
  extracted adapter environment and preserves the original demo database.
- **12.7** Product constitution and overview are authoritative in new Gramlot;
  PoC product copies are pointers. Existing unrelated dirty work is preserved,
  not bulk-committed. No package release or application deployment performed.
- **12.8** Old static wheel-check environments remain recovery/testing evidence;
  recreate before future use rather than relying on obsolete installation provenance.
