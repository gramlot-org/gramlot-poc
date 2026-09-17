# Managing components, controllers and recipes in Gramlot

**Review draft — 15 September 2026.**

This guide consolidates the architectural and organizational decisions discussed
through the inventory work. It is intended for framework developers and
application authors. APIs still under discussion remain provisional.

We distinguish **agreed** decisions, **implemented** behavior verified in source,
and choices **to be defined**. An implemented PoC is not a stable published feature.

## 1. Applications are expressed through Gramlot

**Agreed.** Gramlot applications, examples and PoCs use Source, Data Bags,
bindings, controllers, resolvers and shared components to build their interface
and handle interactions and requests.

The intended authors are Python programmers. Pages are authored in Python first,
and examples show their actual source. Small local JavaScript fragments are
acceptable; hiding an application inside a large JavaScript string does not
satisfy this approach.

When a capability is missing, implement it in the framework and then use it in
the page. DOM construction and native events belong inside components. Pages
must not introduce parallel manual DOM, state or HTTP request machinery.

## 2. Source, Data and DOM are different layers

- **Source** describes application structure and behavior.
- **Data** holds the state used by bindings and controllers.
- **DOM** represents the interface in the browser.

A Source node does not necessarily produce DOM. For example, `dataFormula`
belongs to Source but computes a Data value. A recipe can produce several
Source nodes, including both visual and logical declarations.

Every inventory card must explain what is constructed and where its result appears.

## 3. Terminology

| Concept | Responsibility | Example |
| --- | --- | --- |
| Visual component / widget | Exposes an interface connected to the Gramlot model | `textBox`, `dbSelect` |
| Controller | Executes logic, reacts to Data or events, writes results | `dataFormula`, `dataController`, `dataRpc` |
| Recipe | Builds a reusable set of Source nodes | A box with a label, input and button |
| Mixin | Adds a class capability without being a standalone node | Control decoration, proxy registration |
| Service / handler | Provides shared behavior behind a contract | `DbHandler` |
| Proxy | Exposes a group of services in a namespace | `page.dbhandler` |
| Database implementation | Implements the contract for a data system | `SqliteDbHandler` |
| Server adapter | Connects pages and services to an HTTP host | FastAPI, Django, Genro ASGI |

Historical documents sometimes use “recipe” for a grammar declaration. In this
guide it means **Source composition**. Historical terminology alone does not
establish a declaration's current category.

## 4. Low-level and composed building blocks

**Agreed.** The inventory distinguishes low-level and composed components and
controllers. Level describes construction, not importance or implementation size.

A low-level controller is a declaration executed directly by the runtime, such
as `dataFormula`. A composed controller uses lower-level declarations and
services. The concept called `apiResolver` in the discussion is composed: the
current `openApiResolver` API generates a `dataController` using the resolver
service. This does not establish a public `apiResolver` alias.

Visual composition has two forms:

1. A component can coordinate several controls internally while retaining one
   public Source node.
2. A helper can expand into several ordinary Source nodes. This visual
   composition can be organized as a recipe.

Cards must make this distinction explicit. Counting internal DOM elements is
not enough to classify a declaration as a recipe.

The initial inventory taxonomy remains under review during the census and must
preserve this distinction.

## 5. Components: public contracts and internal implementations

**Agreed.** In the discussed model, an adapted Web Component occupies one Source
node. Its internal DOM is not expanded into the caller's Source. Its public
contract describes parameters, value, events, bindings and lifecycle.

The direction is to provide shared bases for input families and add cross-cutting
capabilities through mixins and collaborators. Conceptual names discussed, such
as `GramlotComponent` and `GramlotInputComponent`, must not be presented as
available classes merely because they illustrate the desired hierarchy.

**Implemented in the alpha:** current browser bases are `GramlotElement` and
`ControlElement`, obtained through `getComponentBases`. The former owns lifecycle
and resource cleanup; the latter supports the single-native-control shape and
incorporates `Decorated` and `FieldState`.

More elaborate hierarchies for text, typed and composite inputs, popups and menus
need verification family by family. A base designed for one native input is not
necessarily appropriate for every widget.

## 6. Mixins: shared capabilities with explicit responsibilities

**Agreed direction.** Validation, field state and label presentation are shared
capabilities and should not be rewritten in each input.

A “validation mixin” does not imply a separate validation engine in every mixin.
In the current implementation:

- `Decorated` installs the `WidgetLabel` collaborator.
- `FieldState` presents state and errors, including accessibility information.
- `FormField` and `Validator` remain responsible for validation and Data writes.
- `InputNullState` is a composed state machine rather than another mixin to
  apply indiscriminately.

The same distinction applies to label boxes and containers. Sharing a capability
does not require all components to share the same DOM structure.

Each mixin card must identify its base requirements, added capabilities,
overridden members and lifecycle interactions. Resources must be released when
an instance is removed, and reconnection must not multiply subscriptions or listeners.

Python builder declaration mixins, browser mixins and server mixins use a similar
composition technique but operate at different layers and are not interchangeable.

## 7. Recipes: reusable Source construction

**Agreed and exercised in a PoC.** A recipe constructs HTML, components,
controllers and other compositions. Its expansion remains inspectable as ordinary
Source, without a synthetic component hiding the contents.

An ordinary Python function already supports reusable construction:

```python
def customer_field(pane, value):
    box = pane.div()
    box.dbSelect(dbtable='invc.customer', value=value, lbl='Customer')
    return box

# Inside main(), on a page with its database service configured:
customer_field(root, '^customer_id')
```

This example composes declarations. Search remains the database service's
responsibility. The returned container is an ordinary Source node.

### The @recipe decorator

**Planned, not implemented at this guide's checkpoint.** The requested shorthand
is `pane.recipe_name(...)`, implicitly passing the parent to the Python routine.
Explicit calls, inheritance, ordinary arguments and return values must retain
normal Python semantics.

The decorator must not introduce a persistent browser recipe node or require a
JavaScript translation. Name resolution, collisions and imported-function
registration need definition and verification before the API is available.

### Python and JavaScript have different execution timing

A Python `if` decides which nodes to construct before transport. Bindings on
those generated nodes can remain reactive in the browser.

A JavaScript recipe can construct Source without Python. A JS function is not
inherently reactive: the experiment uses a controller to insert and remove nodes
when Data changes. Full Python/JavaScript execution equivalence has not been promised.

The experimental recipe manifest publishes parameters, documentation and reusable
Python source. Its final format, automatic loading and general registry are not
settled. Converting the IDE into a recipe remains separate from the small PoC.

## 8. Data controllers and database services

`dataRecord` and `dataSelection` are controllers. Their legacy Python helpers
produce `dataRpc`, delegating to `getRecord` and `getSelection` respectively.

The census separates controller responsibilities—destination, activation,
bindings and callbacks—from database and application-model behavior.

- `dataRecord` loads one record. Identity, missing-record behavior and result
  shape need explicit contracts.
- `dataSelection` loads a collection. Projection, filters, ordering, limits and
  counts need explicit contracts.

**To be implemented under the new DbHandler contract.** The audit identifies
25 record and 46 selection server parameters. This does not authorize copying
all of them into the common minimum. Legacy semantics include two pagination
layers, new and sample records, relations, protections and frozen selections.

## 9. The database proxy

**Agreed and implemented in the PoC.** The page exposes `dbhandler`; the widget
calls `dbhandler.dbselect`. `DbHandler` is the base and `SqliteDbHandler` is the
current specialization.

```text
Page → dbhandler → SqliteDbHandler
                     inherits DbHandler.dbselect
                     implements open and the SQLite reader
```

`DbHandler` includes shared behavior as well as abstract hooks. `dbselect`
validates requests, handles search and identity lookup, and prepares responses.
The subclass supplies table access through `open()` and a reader implementing
`search()` and `lookup()`.

`DbPageMixin` registers the proxy without adding one endpoint per table to the
page. A customer page does not need its own `lookup_customers` for a standard dbSelect.

In the PoC, this replaces the earlier `DatabaseSelect` / `SQLiteAdapter` split.
The proposed `db_dbselecthandler` prefix addressed page namespace collisions;
the proxy groups those methods under `dbhandler` instead.

### Proxy chains

**Implemented.** `aaa.bbb.ccc` traverses `aaa`, then `bbb`, and invokes `ccc`.
Each intermediate proxy must be registered through `endpoint_proxies`; the final
method must be decorated with `@endpoint`.

The dispatcher checks types at each hop, rejects cyclic registrations and does
not traverse arbitrary attributes. Proxy maps follow normal Python inheritance;
combine maps explicitly when composing multiple mixins. Chains currently expose
Data endpoints; Source methods remain on the page.

## 10. Minimum contracts, common options and implementation extensions

**Agreed.** There are three groups:

1. A minimum every implementation of the contract must support.
2. Optional common capabilities.
3. Implementation-specific extensions.

Argument optionality and capability support are different dimensions.
`ignoreCase` is optional in a call because it has a default, but both case modes
belong to the agreed dbSelect minimum.

Standard dbSelect provides identity and caption, prefix search followed by
containment, and case-sensitive/insensitive matching. The PoC falls back to
containment only when prefix matching returns no rows. Changing that behavior
requires an explicit semantic decision.

**Product decision:** advanced features remain Genropy differentiators, including
for commercial reasons. `auxColumns` is reserved for Genropy; custom `method`
selection is a potential common option. SQLAlchemy's technical capabilities do
not automatically authorize adding every feature to the standard contract.

Formal capability negotiation is not implemented. The PoC rejects some advanced
parameters on the minimum path; the inventory must not imply a general
negotiation system already exists.

## 11. Server hosts and databases are independent choices

**Agreed.** FastAPI, Django and Genro ASGI host pages and calls. SQLite and Genropy
provide database services. A SQLite dbSelect does not belong to FastAPI merely
because that host serves the PoC.

Core contracts remain independent of server and database packages. At this
checkpoint, SQLAlchemy support is optional in `gramlot.contrib.sqlalchemy`;
FastAPI and Django hosts live in sibling repositories. Extracted integrations
must not be restored into core just to simplify an example's startup.

Physical package locations may evolve. Responsibility boundaries remain the
basis for documenting integrations.

## 12. Inventory: base contracts and parallel catalogues

**Agreed in this discussion.** Each card is a Markdown file. The base inventory
describes implementation-independent contracts, including concrete shared
behavior already implemented in base classes.

Initial organization:

```text
gramlot_inventory/
  components/       low-level, composed; input, layout and other families
  controllers/      low-level, composed
  recipes/
  mixins/           capability families and application layers
  proxy-integration/
```

The final folder structure remains under review. Parallel inventories cover
database implementations and server adapters. A SQLite or FastAPI card links to
the base contract and adds configuration, dependencies, extension-hook
implementation and specific behavior. The base card does not require a
SQLite/Genropy comparison matrix.

### Base card contents

- Identity, category, level, purpose, status and relationship to Source/Data/DOM.
- Bases, mixins and composed dependencies.
- Parameters: name, meaning, type, required/optional/conditional status,
  default, bindings, constraints and provenance.
- Guaranteed behavior: activation, results, events, errors and lifecycle.
- Abstract methods and extension points with their contracts.
- Generic example, source references and evidence.
- A final legacy incompatibility section.

The owner originally specified the inventory labels **“da implementare”**,
**“da verificare”** and the final heading **“Incompatibilità Genropy legacy”**.
These identify “to be implemented”, “to be verified” and “Genropy legacy
incompatibilities” respectively. The existing inventory uses those explicit
labels; decision documents and site guides are written in English.

Known legacy features absent from Gramlot must be marked as unimplemented. Cards
must distinguish observed legacy behavior from a proposed new contract. This
status neither makes an API available nor decides whether it belongs in core
or an extension.

An incomplete compatibility comparison must be marked as unverified. Not having
found differences is not proof of compatibility.

### Complete coverage, not just representative cards

**Required.** The census starts from legacy `gnrwebstruct/` and
`gnrpy/gnr/web/widgets/`, then follows inheritance, expansions, browser
implementations and server services to recover parameters and verified peculiarities.

A `**kwargs` signature is insufficient. Follow forwarded, consumed and renamed
arguments, prefix families such as `apply_*`, effective defaults and special
values. Application-defined arguments form an open extension boundary, not a
finite list to invent.

The coverage index must map every declaration to a card or a reasoned exclusion,
such as an internal helper. Complete primary-source coverage does not by itself
prove all downstream semantics. Unresolved consumer behavior must remain explicit.

## 13. Applying these decisions to new work

The following workflow is proposed as a practical application of these decisions:

1. Look for the item in the inventory and existing bases.
2. Determine whether it needs a component, controller, composition or service.
3. Document its public contract and shared behavior first.
4. Separate abstract hooks from specific implementations.
5. Write a Python example using Gramlot for application behavior.
6. Verify the relevant contract, bindings, instance isolation and resource cleanup.
7. Update status, evidence and incompatibilities without hiding limitations.

Reuse should follow a verified shared responsibility. Similar names or a shared
need for database access do not alone justify the same base class.

## 14. Open decisions

- Final component hierarchy names and scope.
- `@recipe` registration, manifest and discovery details.
- Final classification of visual compositions in the inventory.
- Minimum dataRecord/dataSelection contracts and response shapes.
- General optional-capability protocol.
- GenropyDbHandler and its advanced services.
- Parallel inventory locations and complete downstream semantic verification.

## References

- [Context and decisions](../context/README.md).
- [Base class and mixin review](../development/gramlot-components-architecture-review-2026-09-11.md).
- [Existing component development guide](component-development.md).
- [Recipe composition experiment](../examples/recipes/README.md).
- [Python decorator plan](../development/python-recipe-decorator-plan-2026-09-14.md).
- [DbHandler and proxy chains](database-handlers-and-proxies.md).
- [SQLite PoC](../examples/sqlite-dbselect/README.md).
- [dbSelect audit](../development/dbselect-parameters-and-adapter-capabilities-2026-09-15.md).
- [dataRecord/dataSelection audit](../development/datarecord-dataselection-legacy-audit-2026-09-15.md).
- [Inventory](../../gramlot_inventory/README.md).
