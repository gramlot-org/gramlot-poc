How Gramlot works
=================

A page is a Python class whose ``main(root)`` method describes an interface.
Calling ``root.h1('Hello World')`` adds a heading to a Source tree. It does not
send HTML immediately or manipulate the browser from Python.

The builder records structure and attributes. The transport serializes that
structure using TYTX, which preserves typed values. The JavaScript runtime
loads the structure, creates the DOM and handles browser-side interaction.

.. image:: ../_static/request-flow.svg
   :alt: Browser requests HTML, then a recipe; Python builds Source and returns TYTX; the browser mounts the interface.
   :width: 100%

Three responsibilities
----------------------

* **Page authoring** describes elements and widgets through ``WebPage`` and
  ``GramlotBuilder``. Plain Python methods can share authoring code.
* **Runtime** renders and updates the interface in JavaScript. Bag provides
  structured data; Source describes the interface. They have different roles.
* **Server adapter** serves the startup document, library assets and recipe
  responses. Integration packages use the same authoring core.

Python recipes execute on the server when the browser requests a recipe.
Declarative browser logic is executed in JavaScript, not reactively evaluated
by Python. A later browser-side change does not imply another Python call or
an automatically synchronized server datastore.

For readers coming from React
-----------------------------

A Python recipe describes the interface that the Gramlot runtime will create.
It is not a React component executed in the browser. Python runs first on the
server, then the browser receives a typed description. Source is not JSX,
and Gramlot does not provide a React renderer in this adapter.

An integration adapter can supply the shared browser bootstrap, so application
pages do not need their own JavaScript entry point.

For readers coming from Vue
---------------------------

There is no per-page single-file component in the introductory Python path.
The Python builder describes structure; the browser runtime handles widgets
and binding. The server recipe is not rerun automatically for every data edit.
The framework supports browser-side behavior, but this initial guide does not
attempt a complete Vue-to-Gramlot binding reference.

Current boundaries
------------------

Server integrations remain optional. Install the adapter for the host framework
you use. Production deployment policy belongs to that application and adapter.
