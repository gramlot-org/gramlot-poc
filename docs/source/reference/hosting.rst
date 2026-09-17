Hosting integration contract
============================

Gramlot owns page discovery and invocation, typed transport, and the browser
runtime description. Server integration packages connect those facilities to
their framework through the public ``gramlot.hosting`` facade. Importing this
facade does not import Django, FastAPI, Starlette, or Genropy.

Public facade
-------------

The supported host-facing imports are::

   from gramlot.hosting import (
       DEFAULT_PREFIX,
       PageRegistry,
       RuntimeAssetMount,
       RuntimeAssets,
       ServiceParameterError,
       render_document,
       script_json,
   )
   from gramlot.transport import (
       TYTX_FORMAT,
       TYTX_MEDIA_TYPE,
       from_tytx,
       to_tytx,
   )

These names form the maintained integration contract. Modules under
``gramlot.contrib._shared`` remain private implementation details.

Page registry
-------------

``PageRegistry`` discovers trusted, flat ``pages/*.py`` modules. Its ``pages``
property is a read-only mapping of page names to page classes.
``registered_method(page_name, method_name)`` returns the effective
``gramlot.page.PageMethod``, or ``None`` when no method has that name.

Call ``await registry.invoke(page_name, role, method_name, params, request=None)``
to invoke a Data or Source method. Every invocation creates a fresh page and,
for Source methods, a fresh Source builder. Gramlot validates named parameters,
injects explicitly annotated ``gramlot.page.InvocationContext`` parameters,
checks the registered role, and materializes results within the host's worker
boundary. ``ServiceParameterError`` distinguishes parameter binding failures
from exceptions raised by application code.

Hosts subclass the registry to provide ``run_sync`` and may override
``create_page``, ``prepare_page``, ``invoke_sync``, ``materialize_result``, and
``require_page``. These hooks let a host select its worker, attach request
services, keep database-backed materialization inside that worker, and translate
page lookup according to its own routing policy.

Runtime assets
--------------

``RuntimeAssets`` provides ``prefix``, ``base_url``, ``entry_url``,
``import_map()``, and ``document_template()``. ``asset_mounts()`` returns an
immutable tuple of frozen ``RuntimeAssetMount`` descriptors. Each descriptor has
``name``, an absolute ``url_prefix`` ending in ``/``, a resolved ``directory``,
and an ``immutable`` cache-policy flag.

A manifest-backed browser build produces one immutable mount under its build ID.
The default constructor raises ``ValueError`` if that manifest is missing, so an
installed host cannot silently fall back to mutable source files. Pass
``development=True`` to explicitly permit grouped, non-immutable source mounts;
a valid manifest still takes precedence when that option is enabled. The host
serves these descriptors and does not need to know Gramlot's package layout.

``render_document`` fills Gramlot's default startup document. ``script_json``
escapes ``<`` so JSON values cannot terminate their containing script element.

Transport
---------

``TYTX_FORMAT`` is ``json`` and ``TYTX_MEDIA_TYPE`` is
``application/vnd.tytx+json``. ``to_tytx`` snapshots mutable Source and Data
values before encoding. ``from_tytx`` uses the same registered Gramlot types, so
hosts preserve Source snapshots, Bags, resolvers, decimals, and other TYTX values
without framework-specific conversion.
