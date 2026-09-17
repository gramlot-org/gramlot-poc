# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Stateless Python pages and their explicitly exposed service methods."""

from __future__ import annotations

from dataclasses import dataclass
from inspect import isfunction
from typing import Any, Callable, Literal

from .builder import GramlotBuilder


PageMethodRole = Literal["data", "source"]


def _page_method(role: PageMethodRole):
    def decorate(function: Callable) -> Callable:
        if not isfunction(function):
            raise TypeError(f"@{role} can decorate only an instance method")
        previous = getattr(function, "__gramlot_page_role__", None)
        if previous is not None:
            raise TypeError(f"{function.__name__} already has the {previous!r} page role")
        function.__gramlot_page_role__ = role
        return function
    return decorate


endpoint = _page_method("data")
source = _page_method("source")


@dataclass(frozen=True, slots=True)
class InvocationContext:
    """Framework-owned context supplied to an explicitly annotated parameter."""

    page_name: str
    method_name: str
    role: PageMethodRole
    store: Any = None
    request: Any = None


@dataclass(frozen=True, slots=True)
class PageMethod:
    """One effective, allowlisted method selected by ordinary Python MRO."""

    name: str
    role: PageMethodRole
    function: Callable
    origin: type
    proxy_path: tuple[tuple[str, type], ...] = ()


def page_methods(page_class: type["WebPage"]) -> dict[str, PageMethod]:
    """Discover the effective marked methods, including plain library mixins.

    The first definition of a name in the MRO is final for exposure. Therefore an
    undecorated override hides an inherited marker and a redecorated override may
    deliberately select a new role. ``main`` is the sole implicit exception.
    ``endpoint_proxies`` maps public attribute names to proxy classes. Each
    class may register further proxies; discovery flattens this acyclic graph
    into dotted endpoint names. Instances are supplied by page/host setup and
    checked against the registered types during invocation.
    """
    if not isinstance(page_class, type) or not issubclass(page_class, WebPage):
        raise TypeError("page_methods expects a WebPage class")
    discovered: dict[str, PageMethod] = {}
    shadowed: set[str] = set()
    for owner in page_class.__mro__:
        for name, value in vars(owner).items():
            if name in shadowed:
                continue
            shadowed.add(name)
            declared_role = getattr(value, "__gramlot_page_role__", None)
            if name == "main" and declared_role not in (None, "source"):
                raise TypeError("main has the implicit Source role and cannot be an endpoint")
            role = "source" if name == "main" else declared_role
            if role is None:
                continue
            if role not in ("data", "source") or not isfunction(value):
                raise TypeError(f"Exposed page method {name} must be an instance method")
            discovered[name] = PageMethod(name, role, value, owner)
    _proxy_methods(page_class, discovered)
    return discovered


def _proxy_methods(container, discovered, path=(), ancestors=()):
    """Flatten explicit proxy registrations, rejecting cyclic type graphs."""
    if container in ancestors:
        raise TypeError('Endpoint proxy registrations must not contain cycles')
    registrations = getattr(container, 'endpoint_proxies', {})
    if not isinstance(registrations, dict):
        raise TypeError('endpoint_proxies must be a mapping of names to classes')
    for namespace, proxy_type in registrations.items():
        if (not isinstance(namespace, str) or not namespace.isidentifier()
                or namespace.startswith('_') or not isinstance(proxy_type, type)):
            raise TypeError('Endpoint proxies require public names and registered classes')
        proxy_path = (*path, (namespace, proxy_type))
        prefix = '.'.join(name for name, _ in proxy_path)
        seen = set()
        for owner in proxy_type.__mro__:
            for name, value in vars(owner).items():
                if name in seen:
                    continue
                seen.add(name)
                role = getattr(value, '__gramlot_page_role__', None)
                if role is None:
                    continue
                if role != 'data' or not isfunction(value) or name.startswith('_'):
                    raise TypeError('Proxy services must be public @endpoint instance methods')
                qualified = f'{prefix}.{name}'
                discovered[qualified] = PageMethod(
                    qualified, role, value, owner, proxy_path)
        _proxy_methods(proxy_type, discovered, proxy_path, (*ancestors, container))


class WebPage:
    """Subclass with ordinary Python inheritance."""

    source_builder = GramlotBuilder
    client_builder = ("gramlot-dom", "HtmlBuilder")
    client_setup: tuple[str, str] | None = None
    source_inspection = True
    example_view = False
    endpoint_proxies: dict[str, type] = {}

    def main(self, root):
        """Populate the source tree."""
        raise NotImplementedError


__all__ = [
    "InvocationContext", "PageMethod", "WebPage", "endpoint", "page_methods", "source",
]
