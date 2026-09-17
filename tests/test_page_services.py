"""Host-independent page role discovery contracts."""

import pytest

from gramlot.page import WebPage, endpoint, page_methods, source


def test_registered_proxy_dispatch_is_generic_and_allowlisted(tmp_path):
    import asyncio
    from gramlot.contrib._shared.pages import PageRegistry, ServiceParameterError

    pages = tmp_path / 'pages'
    pages.mkdir()
    (pages / 'index.py').write_text('''from gramlot.page import WebPage, endpoint
class Greeting:
    @endpoint
    def hello(self, name: str):
        return 'Hello ' + name
    def internal(self):
        raise AssertionError('must not be called')
class Group:
    endpoint_proxies = {'bbb': Greeting}
    bbb = Greeting()
class Page(WebPage):
    endpoint_proxies = {'greeting': Greeting, 'aaa': Group}
    greeting = Greeting()
    aaa = Group()
    def main(self, root):
        root.p('Example')
''')

    class Registry(PageRegistry):
        def require_page(self, name):
            return self.page_classes[name]

        async def run_sync(self, function, *args):
            return function(*args)

    registry = Registry(tmp_path)
    def invoke(method, **params):
        return asyncio.run(registry._invoke('index', 'data', method, params))
    assert invoke('greeting.hello', name='Ada') == 'Hello Ada'
    assert invoke('aaa.bbb.hello', name='Ada') == 'Hello Ada'
    for method in ('greeting.internal', 'greeting.__class__',
                   'greeting.hello.extra', 'other.hello', 'aaa.bbb.internal',
                   'aaa.bbb.__class__', 'aaa.unknown.hello'):
        with pytest.raises(LookupError):
            invoke(method)
    with pytest.raises(ServiceParameterError):
        invoke('greeting.hello', unexpected=True)
    page_class = registry.page_classes['index']
    original = page_class.aaa.bbb
    page_class.aaa.bbb = object()
    with pytest.raises(TypeError, match='Invalid proxy'):
        invoke('aaa.bbb.hello', name='Ada')
    page_class.aaa.bbb = original
    page_class.aaa = object()
    with pytest.raises(TypeError, match='Invalid proxy'):
        invoke('aaa.bbb.hello', name='Ada')
    proxy_class = type(page_class.greeting)
    class Hidden(proxy_class):
        def hello(self, name):
            raise AssertionError('undecorated override must not be called')
    page_class.greeting = Hidden()
    with pytest.raises(LookupError):
        invoke('greeting.hello', name='Ada')
    page_class.greeting = object()
    with pytest.raises(TypeError, match='Invalid proxy'):
        invoke('greeting.hello', name='Ada')


def test_proxy_registration_rejects_cycles_and_nonpublic_paths():
    class Branch:
        pass
    class Page(WebPage):
        endpoint_proxies = {'branch': Branch}

    Branch.endpoint_proxies = {'again': Branch}
    with pytest.raises(TypeError, match='cycles'):
        page_methods(Page)
    Branch.endpoint_proxies = {'page': Page}
    with pytest.raises(TypeError, match='cycles'):
        page_methods(Page)
    for name in ('_private', 'two.parts', ''):
        Branch.endpoint_proxies = {name: DataMixin}
        with pytest.raises(TypeError, match='public names'):
            page_methods(Page)


class DataMixin:
    @endpoint
    def label(self, value: str) -> str:
        return f"mixin:{value}"


class SourceMixin:
    @source
    def fragment(self, root, value: str) -> None:
        root.p(value)


class MroPage(DataMixin, SourceMixin, WebPage):
    def main(self, root):
        root.h1("main")


def test_roles_follow_effective_python_mro_and_plain_mixins():
    methods = page_methods(MroPage)
    assert {name: method.role for name, method in methods.items()} == {
        "label": "data", "fragment": "source", "main": "source",
    }
    assert methods["label"].origin is DataMixin
    assert methods["fragment"].origin is SourceMixin
    assert methods["main"].origin is MroPage

    class Hidden(MroPage):
        def label(self, value: str) -> str:
            return value

    assert "label" not in page_methods(Hidden)

    class Reexposed(MroPage):
        @endpoint
        def label(self, value: str) -> str:
            return super().label(value).upper()

    assert page_methods(Reexposed)["label"].origin is Reexposed
    assert Reexposed().label("x") == "MIXIN:X"


def test_diamond_mro_and_double_decoration_are_ordinary_and_explicit():
    class Root:
        @endpoint
        def chain(self, value: str) -> str:
            return value

    class Left(Root):
        @endpoint
        def chain(self, value: str) -> str:
            return f"L{super().chain(value)}"

    class Right(Root):
        @endpoint
        def chain(self, value: str) -> str:
            return f"R{super().chain(value)}"

    class Diamond(Left, Right, WebPage):
        def main(self, root): ...

    assert Diamond().chain("x") == "LRx"
    assert page_methods(Diamond)["chain"].origin is Left
    with pytest.raises(TypeError, match="already has"):
        source(endpoint(lambda self: None))

    class InvalidMain(WebPage):
        @endpoint
        def main(self, root): ...

    with pytest.raises(TypeError, match="implicit Source role"):
        page_methods(InvalidMain)
