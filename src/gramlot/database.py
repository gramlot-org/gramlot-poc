# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Experimental, host-independent minimum database-select service."""
from abc import ABC, abstractmethod
from typing import ContextManager, Protocol

from gramlot.page import endpoint


class SelectTable(Protocol):
    """Invocation-scoped reader supplied by a concrete DbHandler.

    Rows are ordinary dictionaries with unique nonempty ``id`` (str or int)
    and non-null text ``caption``. No native database rows cross this boundary.
    """

    def lookup(self, identity: str | int) -> list[dict]:
        """Return one row for the key, or an empty list. Zero is a valid key."""
        ...

    def search(self, text: str, *, match: str, ignore_case: bool, limit: int) -> list[dict]:
        """Return at most limit rows in deterministic caption/key order.

        ``match`` is ``prefix`` or ``contains``. Treat text literally, including
        spaces, percent signs and underscores; an empty prefix matches all rows.
        Apply the requested case policy and filter before limiting results.
        """
        ...


class DbHandler(ABC):
    """Base database service, exposed as the page's ``dbhandler`` proxy.

    Subclasses implement ``open`` and its SelectTable reader. They inherit the
    concrete ``dbselect`` endpoint, including request validation, prefix-first
    fallback policy and portable response shape. SqliteDbHandler is the first
    implementation; importing this base requires no database or HTTP package.

    DbPageMixin registers the endpoint contract. Application/host setup supplies
    a concrete instance as ``page.dbhandler`` before invocation. Connections and
    transactions belong to the subclass, not to the application page. A shared
    handler must keep request state in the invocation-scoped reader.

    Additional endpoints require @endpoint and registration of the specialized
    class. Genropy-specific features are outside this minimum contract.
    """

    @abstractmethod
    def open(self, table: str) -> ContextManager[SelectTable]:
        """Return a context manager yielding a reader for a logical table.

        Validate table exposure here, acquire resources on entry and release
        them on both success and failure. ``table`` is an application-configured
        logical name, never an unrestricted SQL fragment supplied by the client.
        This method is a backend hook and is not an RPC endpoint.
        """
        raise NotImplementedError

    @endpoint
    def dbselect(self, dbtable: str, *, _querystring: str = '', _id=None,
               ignoreCase: bool = True, limit: int = 10) -> dict:
        """Search captions or resolve an identity through the concrete reader.

        ``_id`` selects exact lookup when it is neither None nor an empty string.
        Otherwise search ``_querystring`` by prefix, falling back to containment
        only when there are no prefix results. ``ignoreCase`` must be a bool;
        ``limit`` is an integer from 1 through 100. Invalid inputs raise ValueError.

        Return rows, identifier='id', caption='caption' and metadata.match
        ('identity', 'prefix' or 'contains'), using the existing select protocol.
        Auxiliary columns, custom methods and record writes are not implemented.
        """
        if not isinstance(dbtable, str) or not dbtable:
            raise ValueError('dbSelect requires a configured logical table')
        if not isinstance(_querystring, str):
            raise ValueError('dbSelect search text must be a string')
        if type(ignoreCase) is not bool:
            raise ValueError('ignoreCase must be True or False')
        if type(limit) is not int or not 1 <= limit <= 100:
            raise ValueError('dbSelect limit must be an integer between 1 and 100')
        if _id is not None and type(_id) not in (str, int):
            raise ValueError('dbSelect identity must be a string or integer')
        with self.open(dbtable) as table:
            if _id is not None and _id != '':
                rows = table.lookup(_id)
                match = 'identity'
            else:
                # Spaces and wildcard characters are literal user text.
                rows = table.search(_querystring, match='prefix',
                                    ignore_case=ignoreCase, limit=limit)
                match = 'prefix'
                if not rows and _querystring:
                    rows = table.search(_querystring, match='contains',
                                        ignore_case=ignoreCase, limit=limit)
                    match = 'contains'
        return dict(rows=rows, identifier='id', caption='caption', metadata={'match': match})


class DbPageMixin:
    """Register ``dbhandler.dbselect`` without adding methods to the page.

    Compose before WebPage in the MRO. Setup must attach a DbHandler instance;
    this mixin neither constructs a backend nor owns its lifetime. To register
    other proxies too, explicitly combine their endpoint_proxies mappings on
    the page: these mappings follow normal Python attribute inheritance.
    """

    endpoint_proxies = {'dbhandler': DbHandler}
    dbhandler: DbHandler
