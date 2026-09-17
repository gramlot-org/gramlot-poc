"""Public, server-independent hosting contract for integration packages."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

import pytest
from genro_bag import Bag

import gramlot.hosting as hosting
from gramlot.builder import GramlotBuilder
from gramlot.hosting import (
    DEFAULT_PREFIX,
    PageRegistry,
    RuntimeAssetMount,
    RuntimeAssets,
    ServiceParameterError,
    render_document,
    script_json,
)
from gramlot.page import InvocationContext, PageMethod
from gramlot.transport import TYTX_FORMAT, TYTX_MEDIA_TYPE, from_tytx, to_tytx


PAGE_SOURCE = '''
from gramlot.page import InvocationContext, WebPage, endpoint, source

class Base:
    @endpoint
    def inherited(self, value: str) -> str:
        return value

class Page(Base, WebPage):
    def __init__(self):
        self.calls = 0

    def main(self, root, context: InvocationContext):
        root.h1(context.page_name)

    @source
    def fragment(self, root, label: str):
        root.p(label)

    @endpoint
    def details(self, value: int, context: InvocationContext) -> dict:
        self.calls += 1
        return {
            'calls': self.calls,
            'method': context.method_name,
            'page': context.page_name,
            'request': context.request,
            'role': context.role,
            'value': value,
        }

    @endpoint
    async def async_value(self, value: str) -> str:
        return value
'''


class TestRegistry(PageRegistry):
    __test__ = False

    def __init__(self, *args, **kwargs):
        self.events = []
        self.contexts = []
        super().__init__(*args, **kwargs)

    async def run_sync(self, function, *args):
        result = function(*args)
        self.events.append('worker-released')
        return result

    def prepare_page(self, page, context: InvocationContext) -> None:
        self.contexts.append(context)

    def materialize_result(self, page, result):
        self.events.append('materialized')
        return result


@pytest.fixture
def registry(tmp_path):
    pages = tmp_path / 'pages'
    pages.mkdir()
    (pages / 'sample.py').write_text(PAGE_SOURCE)
    return TestRegistry(tmp_path)


def test_hosting_imports_do_not_load_server_frameworks():
    script = '''
import importlib.abc
import sys

blocked = {'django', 'fastapi', 'starlette', 'genropy'}
class Blocker(importlib.abc.MetaPathFinder):
    def find_spec(self, fullname, path=None, target=None):
        if fullname.split('.', 1)[0] in blocked:
            raise AssertionError(f'server import attempted: {fullname}')

sys.meta_path.insert(0, Blocker())
import gramlot.hosting
import gramlot.page
import gramlot.transport
'''
    result = subprocess.run(
        [sys.executable, '-c', script],
        cwd=Path(__file__).resolve().parents[1],
        text=True,
        capture_output=True,
        timeout=15,
    )
    assert result.returncode == 0, result.stderr


def test_hosting_facade_exports_only_the_supported_contract():
    assert hosting.__all__ == [
        'DEFAULT_PREFIX',
        'PageRegistry',
        'RuntimeAssetMount',
        'RuntimeAssets',
        'ServiceParameterError',
        'render_document',
        'script_json',
    ]


async def test_registry_public_lookup_context_and_fresh_invocations(registry):
    assert DEFAULT_PREFIX == '/page'
    assert set(registry.pages) == {'sample'}
    with pytest.raises(TypeError):
        registry.pages['other'] = registry.pages['sample']
    page_classes = registry.page_classes
    registry.page_classes = {}
    assert not registry.pages
    registry.page_classes = page_classes

    registered = registry.registered_method('sample', 'details')
    assert isinstance(registered, PageMethod)
    assert registered.role == 'data'
    assert registry.registered_method('sample', 'missing') is None
    assert registry.registered_method('missing', 'details') is None

    request = {'request_id': 'one'}
    first = await registry.invoke('sample', 'data', 'details', {'value': 3}, request)
    second = await registry.invoke('sample', 'data', 'details', {'value': 4}, request)
    assert first == {
        'calls': 1,
        'method': 'details',
        'page': 'sample',
        'request': request,
        'role': 'data',
        'value': 3,
    }
    assert second['calls'] == 1
    assert registry.contexts[-1].store is registry.store
    assert registry.events[-2:] == ['materialized', 'worker-released']

    first_source = await registry.invoke('sample', 'source', 'main', {})
    second_source = await registry.invoke('sample', 'source', 'main', {})
    assert first_source is not second_source
    assert len(first_source) == len(second_source) == 1
    assert await registry.invoke('sample', 'data', 'async_value', {'value': 'ready'}) == 'ready'


async def test_registry_preserves_legacy_invoke_and_validates_parameters(registry):
    assert await registry._invoke('sample', 'data', 'inherited', {'value': 'old'}) == 'old'
    with pytest.raises(ServiceParameterError, match='framework controlled'):
        await registry.invoke(
            'sample', 'data', 'details', {'value': 1, 'context': InvocationContext},
        )
    with pytest.raises(ServiceParameterError):
        await registry.invoke('sample', 'data', 'details', {'unexpected': True})
    with pytest.raises(LookupError, match='source service'):
        await registry.invoke('sample', 'source', 'details', {'value': 1})


@pytest.mark.parametrize('transport', ['json', 'msgpack'])
def test_transport_constants_and_registered_types_round_trip(transport):
    builder = GramlotBuilder('roundtrip')
    builder.root.h1('Typed source')
    data = Bag()
    data.set_item('answer', 42)

    decoded = from_tytx(
        to_tytx({'source': builder.source, 'data': data}, transport),
        transport,
    )
    assert TYTX_FORMAT == 'json'
    assert TYTX_MEDIA_TYPE == 'application/vnd.tytx+json'
    assert type(decoded['source']).__name__ == 'SourceSnapshot'
    assert isinstance(decoded['data'], Bag)
    assert decoded['data'].get_item('answer') == 42


def _compiled_runtime(tmp_path, *, development=False):
    entries = {
        'gramlot-dom': 'esm/dom.js',
        'gramlot-builder': 'esm/builder.js',
        'gramlot-page-startup': 'esm/startup.js',
    }
    for relative in entries.values():
        target = tmp_path / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text('export {};')
    (tmp_path / 'manifest.json').write_text(json.dumps({
        'schemaVersion': 1,
        'buildId': '0123456789abcdef',
        'entryPoints': entries,
    }))
    return RuntimeAssets('/ui', browser_directory=tmp_path, development=development)


def test_compiled_runtime_exposes_one_immutable_mount(tmp_path):
    runtime = _compiled_runtime(tmp_path)
    assert runtime.asset_mounts() == (RuntimeAssetMount(
        name='browser',
        url_prefix='/ui/_runtime/0123456789abcdef/',
        directory=tmp_path.resolve(),
        immutable=True,
    ),)
    assert runtime.entry_url == '/ui/_runtime/0123456789abcdef/esm/startup.js'
    assert runtime.import_map() == {
        'gramlot-dom': '/ui/_runtime/0123456789abcdef/esm/dom.js',
        'gramlot-builder': '/ui/_runtime/0123456789abcdef/esm/builder.js',
    }
    assert _compiled_runtime(tmp_path, development=True).asset_mounts()[0].immutable


def test_source_runtime_exposes_grouped_nonimmutable_mounts(tmp_path):
    runtime = RuntimeAssets('/ui', browser_directory=tmp_path, development=True)
    mounts = runtime.asset_mounts()
    assert isinstance(mounts, tuple)
    assert {mount.name for mount in mounts} == {
        'bag', 'common', 'decimal', 'dom', 'msgpack', 'pages', 'tytx',
    }
    assert all(mount.url_prefix.startswith(runtime.base_url) for mount in mounts)
    assert all(mount.url_prefix.endswith('/') for mount in mounts)
    assert all(not mount.immutable for mount in mounts)
    assert next(mount for mount in mounts if mount.name == 'common').directory == (
        runtime.frontend_directory
    )
    assert runtime.entry_url == runtime.base_url + 'common/entry.js'
    assert runtime.import_map()['gramlot-dom'] == runtime.base_url + 'dom/index.js'


def test_missing_manifest_requires_explicit_development_mode(tmp_path):
    with pytest.raises(ValueError, match='development=True'):
        RuntimeAssets('/ui', browser_directory=tmp_path)


@pytest.mark.parametrize(
    ('manifest', 'message'),
    [
        ({'schemaVersion': 2}, 'schema'),
        ({
            'schemaVersion': 1,
            'buildId': '0123456789abcdef',
            'entryPoints': {
                'gramlot-dom': 'dom.js',
                'gramlot-builder': 'builder.js',
            },
        }, 'gramlot-page-startup'),
    ],
)
def test_runtime_rejects_invalid_required_manifest_entries(tmp_path, manifest, message):
    (tmp_path / 'manifest.json').write_text(json.dumps(manifest))
    with pytest.raises(ValueError, match=message):
        RuntimeAssets('/ui', browser_directory=tmp_path)


def test_document_helpers_escape_script_markup(tmp_path):
    runtime = _compiled_runtime(tmp_path)
    startup = {'payload': '</script><script>alert(1)</script>'}
    template = '<title>__TITLE__</title><script>__IMPORTS__</script>' \
        '<script>__STARTUP__</script><script src="__ENTRY__"></script>'
    rendered = render_document(template, runtime, '<Gramlot>', startup)
    assert '<title>&lt;Gramlot&gt;</title>' in rendered
    assert '</script><script>alert(1)</script>' not in rendered
    assert r'\u003c/script>\u003cscript>alert(1)\u003c/script>' in rendered
    assert script_json({'markup': '<b>'}) == r'{"markup": "\u003cb>"}'
    assert json.loads(script_json({'markup': '<b>'})) == {'markup': '<b>'}
