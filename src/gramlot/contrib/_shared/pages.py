"""Host-independent page discovery, service contracts and invocation lifecycle."""
import importlib.util
import sys
import uuid
import re
import inspect
from decimal import Decimal
from pathlib import Path
from types import MappingProxyType
from typing import Any, Mapping
from genro_bag import Bag
from gramlot.page import InvocationContext, PageMethod, PageMethodRole, WebPage, page_methods
from gramlot.store import ExclusiveBagStore
from gramlot.transport import TYTX_FORMAT as _TYTX_FORMAT
from gramlot.transport import TYTX_MEDIA_TYPE as _TYTX_MEDIA_TYPE

PAGES_DIRECTORY = 'pages'
DEFAULT_PREFIX = '/page'
RESERVED_PAGE_NAMES = {'recipe', '_runtime'}
TYTX_FORMAT = _TYTX_FORMAT
TYTX_MEDIA_TYPE = _TYTX_MEDIA_TYPE
RPC_VALUE_TYPES = {str, int, float, bool, Decimal, Bag, dict, list, type(None)}

class ServiceParameterError(ValueError):
    """A request could not be bound to a registered service signature."""

class PageRegistry:
    """One host-owned registry; every invocation creates a fresh page and Source."""
    def __init__(self, directory: str | Path | None = None, *,
                 prefix: str = DEFAULT_PREFIX, title: str = 'Gramlot'):
        self.directory = Path(directory if directory is not None else Path.cwd()).expanduser().resolve()
        self.title = title
        self.prefix = prefix
        if not re.fullmatch(r'/[a-z][a-z0-9_-]*(?:/[a-z][a-z0-9_-]*)*', prefix):
            raise ValueError('Use an absolute prefix such as /page, without a trailing slash')
        self.page_sources = {}
        self.page_classes = self.load_pages()
        self.page_methods = {
            name: self._registered_methods(page_class)
            for name, page_class in self.page_classes.items()
        }
        self.store = ExclusiveBagStore()

    @property
    def pages(self) -> Mapping[str, type[WebPage]]:
        """Return the discovered page classes through a read-only live view."""
        return MappingProxyType(self.page_classes)

    def registered_method(self, page_name: str, method_name: str) -> PageMethod | None:
        """Return one allowlisted page method without exposing the mutable registry."""
        return self.page_methods.get(page_name, {}).get(method_name)

    def load_pages(self) -> dict:
        """Discover flat pages/ files at startup. Ignore underscore files and folders.

        Each trusted file defines Page(WebPage). Package-relative imports are
        outside this initial contract. Mutable pages are created per request.
        """
        directory = self.directory / PAGES_DIRECTORY
        if not directory.is_dir():
            raise ValueError(f'Pages directory not found: {directory}')
        pages = {}
        for source in sorted(directory.glob('*.py')):
            name = source.stem
            if name.startswith('_') or not source.is_file():
                continue
            if not re.fullmatch(r'[a-z][a-z0-9_-]*', name) or name in RESERVED_PAGE_NAMES:
                raise ValueError(f'Invalid or reserved page filename: {source.name}')
            if not source.resolve().is_relative_to(directory.resolve()):
                raise ValueError(f'Page file must remain inside {directory}: {source.name}')
            module_name = f'_gramlot_page_{uuid.uuid4().hex}'
            spec = importlib.util.spec_from_file_location(module_name, source)
            module = importlib.util.module_from_spec(spec)
            sys.modules[module_name] = module
            try:
                source_text = source.read_text(encoding="utf-8")
                exec(compile(source_text, str(source), "exec"), module.__dict__)
                page_class = getattr(module, 'Page', None)
                if (not isinstance(page_class, type)
                        or not issubclass(page_class, WebPage)
                        or page_class.__module__ != module_name
                        or page_class.main is WebPage.main):
                    raise ValueError('Define a local class Page(WebPage) with main(self, root)')
                if not isinstance(getattr(page_class, 'title', name), str):
                    raise ValueError('Page.title must be a string')
            except Exception as error:
                sys.modules.pop(module_name, None)
                raise ValueError(f'Cannot load page {source}: {error}') from error
            pages[name] = page_class
            self.page_sources[name] = source_text
        return pages

    async def invoke(
        self,
        name: str,
        role: PageMethodRole,
        method: str,
        params: Mapping[str, object],
        request: object | None = None,
    ) -> object:
        """Invoke an allowlisted method on a fresh page with framework-owned context."""
        page_class = self.require_page(name)
        registered = self.page_methods[name].get(method)
        if registered is None or registered.role != role:
            raise LookupError(f'{role} service {method!r} is not registered')
        page = self.create_page(page_class)
        supplied = dict(params)
        context = InvocationContext(
            page_name=name, method_name=method, role=role,
            store=self.store, request=request,
        )
        self.prepare_page(page, context)
        if not registered.proxy_path:
            bound_method = registered.function.__get__(page, page_class)
        else:
            proxy = page
            for namespace, proxy_type in registered.proxy_path:
                proxy = getattr(proxy, namespace)
                if not isinstance(proxy, proxy_type):
                    raise TypeError(f'Invalid proxy instance: {namespace}')
            bound_method = getattr(proxy, method.rsplit('.', 1)[1])
            if (not inspect.ismethod(bound_method)
                    or getattr(bound_method, '__gramlot_page_role__', None) != 'data'):
                raise LookupError(f'Proxy endpoint {method!r} is not exposed')
        signature = self._resolved_signature(bound_method)
        for parameter in signature.parameters.values():
            if parameter.annotation is InvocationContext:
                if parameter.name in supplied:
                    raise ServiceParameterError(f'{parameter.name} is framework controlled')
                supplied[parameter.name] = context
        builder = None
        positional = []
        if role == 'source':
            builder = page.source_builder('main')
            destination = builder.root
            if method == 'main' and page_class.example_view:
                from gramlot.examples import example_panel
                destination = example_panel(builder.root, self.page_sources[name], name.replace('_', ' ').replace('-', ' ').title())
            positional.append(destination)
        try:
            arguments = signature.bind(*positional, **supplied)
            arguments.apply_defaults()
            self._validate_rpc_values(signature, arguments.arguments)
        except (TypeError, ValueError) as error:
            raise ServiceParameterError(str(error)) from error
        if inspect.iscoroutinefunction(bound_method):
            result = await bound_method(*arguments.args, **arguments.kwargs)
            result = self.materialize_result(page, result)
        else:
            result = await self.run_sync(
                self.invoke_sync, page, bound_method, arguments.args, arguments.kwargs,
            )
            if inspect.isawaitable(result):
                result = await result
        if role == 'source':
            if result is not None:
                raise TypeError(f'Source method {method} must build into root and return None')
            return builder.source
        self._validate_rpc_value('return', result, signature.return_annotation)
        return result

    async def _invoke(self, name: str, role: PageMethodRole, method: str,
                      params: Mapping[str, object], request: Any = None):
        """Compatibility wrapper for adapters migrating to :meth:`invoke`."""
        return await self.invoke(name, role, method, params, request)

    def create_page(self, page_class):
        """Create one fresh page; hosts may override this to attach their services."""
        return page_class()

    def prepare_page(self, page, context) -> None:
        """Host extension hook to attach request context before dispatch."""

    def invoke_sync(self, page, method, args, kwargs):
        """Host extension hook to run and materialize a call in one worker."""
        result = method(*args, **kwargs)
        if inspect.isawaitable(result):
            return result
        return self.materialize_result(page, result)

    def materialize_result(self, page, result):
        """Host extension hook called before the invocation boundary is released."""
        return result

    @staticmethod
    def _registered_methods(page_class: type[WebPage]):
        methods = page_methods(page_class)
        for name, registered in methods.items():
            function = registered.function
            role = registered.role
            if role == 'source' and name == 'main' and function is WebPage.main:
                continue
            if not re.fullmatch(r'[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)*', name):
                raise ValueError(f'Invalid service method name: {name}')
            signature = PageRegistry._resolved_signature(function)
            parameters = list(signature.parameters.values())
            if not parameters or parameters[0].name != 'self':
                raise ValueError(f'Service method {name} must be an instance method')
            external = parameters[1:]
            if role == 'source':
                if not external or external[0].name != 'root':
                    raise ValueError(f'Source method {name} must begin with root')
                external = external[1:]
                if signature.return_annotation not in (inspect.Signature.empty, None, type(None)):
                    raise ValueError(f'Source method {name} must return None')
            for parameter in external:
                if parameter.kind not in (
                    inspect.Parameter.POSITIONAL_OR_KEYWORD,
                    inspect.Parameter.KEYWORD_ONLY,
                ):
                    raise ValueError(f'Service method {name} requires named parameters')
                if parameter.annotation is InvocationContext:
                    continue
                PageRegistry._validate_rpc_annotation(
                    f'{name}.{parameter.name}', parameter.annotation,
                )
            if role == 'data':
                PageRegistry._validate_rpc_annotation(
                    f'{name}.return', signature.return_annotation,
                )
        return methods

    @staticmethod
    def _validate_rpc_annotation(name: str, annotation) -> None:
        if annotation is None:
            annotation = type(None)
        if annotation in (inspect.Signature.empty, Any):
            return
        if annotation not in RPC_VALUE_TYPES:
            raise ValueError(
                f'RPC annotation {name} must be a supported TYTX scalar, Bag, dict or list',
            )

    @staticmethod
    def _validate_rpc_value(name: str, value, annotation) -> None:
        if annotation is InvocationContext:
            if not isinstance(value, InvocationContext):
                raise TypeError(f'{name} must be InvocationContext')
            return
        if annotation is None:
            annotation = type(None)
        if annotation in (inspect.Signature.empty, Any):
            return
        if annotation is int:
            valid = type(value) is int
        elif annotation is float:
            valid = type(value) in (int, float)
        else:
            valid = isinstance(value, annotation)
        if not valid:
            raise TypeError(
                f'{name} must be {annotation.__name__}, got {type(value).__name__}',
            )

    @staticmethod
    def _validate_rpc_values(signature, values) -> None:
        for name, value in values.items():
            if name == 'root':
                continue
            PageRegistry._validate_rpc_value(name, value, signature.parameters[name].annotation)

    @staticmethod
    def _resolved_signature(function):
        annotations = inspect.get_annotations(function, eval_str=True)
        signature = inspect.signature(function)
        parameters = [
            parameter.replace(annotation=annotations.get(parameter.name, parameter.annotation))
            for parameter in signature.parameters.values()
        ]
        return signature.replace(
            parameters=parameters,
            return_annotation=annotations.get('return', signature.return_annotation),
        )

    async def run_sync(self, function, *args):
        """Required host hook selecting a worker policy for synchronous calls."""
        raise NotImplementedError

    def require_page(self, name: str) -> type[WebPage]:
        """Return a discovered page class or raise ``KeyError``."""
        return self.page_classes[name]
