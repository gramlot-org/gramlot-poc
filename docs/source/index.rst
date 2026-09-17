Gramlot documentation
=====================

Gramlot lets you describe an interface in Python and render it with its
JavaScript runtime in the browser. Start with a page recipe, then choose how
to serve it. Server adapters live in integration packages.

This English manual documents the current alpha. It starts the user-facing
manual and reference; it is not yet an exhaustive widget or JavaScript API
catalogue.

Integrations
------------

**FastAPI integration** is maintained in a separate repository. Use
`gramlot-fastapi <https://github.com/gramlot-org/gramlot-fastapi>`_ to serve
discovered Python pages or compose them with an existing FastAPI application.

**Django integration** is maintained in a separate repository. Add Gramlot
pages to an existing Django project with `gramlot-django <https://github.com/gramlot-org/gramlot-django>`_.

.. toctree::
   :maxdepth: 2
   :caption: Learn Gramlot

   guide/overview
   guide/components

.. toctree::
   :maxdepth: 2
   :caption: Reference

   reference/pages
   reference/hosting
   reference/labled-box
   reference/formlet
   reference/validation
   reference/textbox-area
   reference/inspector
   reference/local-logic
   reference/select-providers

Choose an integration package for a runnable host.
