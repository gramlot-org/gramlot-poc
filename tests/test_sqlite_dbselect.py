"""Minimum select behavior against a real read-only SQLite database."""
import importlib.util
import sqlite3
from pathlib import Path

import pytest

pytest.importorskip('sqlalchemy')

from gramlot.builder import GramlotBuilder
from gramlot.contrib.sqlalchemy import SqliteDbHandler, TableConfig
from gramlot.database import DbHandler, DbPageMixin
from gramlot.page import WebPage, page_methods


@pytest.fixture
def service(tmp_path):
    path = tmp_path / 'choices.db'
    with sqlite3.connect(path) as connection:
        connection.execute('CREATE TABLE customer (id INTEGER PRIMARY KEY, name TEXT NOT NULL)')
        connection.executemany('INSERT INTO customer VALUES (?, ?)', [
            (0, 'Smith zero'), (1, 'Smith Alpha'), (2, 'John Smith'),
            (3, 'Élodie'), (4, 'Straße'), (5, '100%_Real'),
        ])
    adapter = SqliteDbHandler(path, {'customers': TableConfig('customer', 'id', 'name')})
    try:
        yield adapter, path
    finally:
        adapter.close()


def test_prefix_wins_contains_is_only_a_fallback_and_limit_is_applied(service):
    select, _ = service
    result = select.dbselect('customers', _querystring='smith', limit=1)
    assert result['rows'] == [{'id': 1, 'caption': 'Smith Alpha'}]
    assert result['metadata']['match'] == 'prefix'
    result = select.dbselect('customers', _querystring='ohn')
    assert result['rows'] == [{'id': 2, 'caption': 'John Smith'}]
    assert result['metadata']['match'] == 'contains'
    assert select.dbselect('customers', _querystring='missing')['rows'] == []


@pytest.mark.parametrize('text, expected', [('éL', 'Élodie'), ('STRASSE', 'Straße')])
def test_unicode_casefold_and_sensitive_matching(service, text, expected):
    select, _ = service
    assert select.dbselect('customers', _querystring=text)['rows'][0]['caption'] == expected
    assert select.dbselect('customers', _querystring=text, ignoreCase=False)['rows'] == []
    assert select.dbselect('customers', _querystring=expected, ignoreCase=False)['rows']


def test_literal_wildcards_and_identity_lookup_including_zero(service):
    select, _ = service
    assert select.dbselect('customers', _querystring='%_')['rows'] == [
        {'id': 5, 'caption': '100%_Real'}]
    for key in [0, '0']:
        result = select.dbselect('customers', _id=key)
        assert result['rows'] == [{'id': 0, 'caption': 'Smith zero'}]
        assert result['metadata']['match'] == 'identity'
    assert select.dbselect('customers', _id='garbage')['rows'] == []
    assert select.dbselect('customers', _id=1234)['rows'] == []


@pytest.mark.parametrize('kwargs', [{'limit':0}, {'limit':101}, {'limit':True},
                                  {'ignoreCase':'false'}, {'_id':False}, {'_querystring':None}])
def test_invalid_requests_fail_explicitly(service, kwargs):
    select, _ = service
    with pytest.raises(ValueError):
        select.dbselect('customers', **kwargs)


def test_table_allowlist_readonly_and_cleanup_after_failure(service):
    select, _ = service
    with pytest.raises(ValueError, match='not configured'):
        select.dbselect('sqlite_master')
    from sqlalchemy.exc import OperationalError
    with pytest.raises(OperationalError):
        with select.open('customers') as reader:
            reader.connection.exec_driver_sql("DELETE FROM customer")
    assert len(select.dbselect('customers', _querystring='', limit=100)['rows']) == 6


def test_declaration_and_mixin_work_without_a_host_specific_page():
    class Page(DbPageMixin, WebPage):
        def main(self, root):
            root.dbSelect(dbtable='customers', value='^key', ignoreCase=False, limit=5)
    builder = GramlotBuilder()
    Page().main(builder.root)
    node = builder.source.nodes[0] if hasattr(builder.source, 'nodes') else next(iter(builder.source))
    assert node.attr['rpcmethod'] == 'dbhandler.dbselect'
    assert node.attr['kw_dbtable'] == 'customers'
    assert node.attr['kw_ignoreCase'] is False
    assert node.attr['kw_limit'] == 5
    assert page_methods(Page)['dbhandler.dbselect'].origin is DbHandler
    for unsupported in ['auxColumns', 'condition', 'selected_email']:
        with pytest.raises(ValueError, match=unsupported):
            builder.root.dbSelect(dbtable='customers', **{unsupported:'x'})
    assert builder.root.dbSelect(rpcmethod='custom').node.attr['rpcmethod'] == 'custom'


def test_example_source_contains_only_gramlot_application_behavior():
    path = Path(__file__).parents[1] / 'docs/examples/sqlite-dbselect/pages/index.py'
    text = path.read_text()
    assert not any(token in text for token in ['fetch(', 'createElement', 'addEventListener',
                                             'sqlalchemy', 'sqlite3'])
    spec = importlib.util.spec_from_file_location('sqlite_example_page', path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    builder = GramlotBuilder()
    module.Page().main(builder.root)
    assert 'dbhandler.dbselect' in page_methods(module.Page)


def test_proxy_sqlite_roundtrip_through_fastapi(service, tmp_path):
    host = pytest.importorskip('gramlot_fastapi')
    from fastapi.testclient import TestClient
    from genro_tytx import to_tytx, from_tytx

    pages = tmp_path / 'pages'
    pages.mkdir()
    (pages / 'index.py').write_text('''from gramlot.page import WebPage
from gramlot.database import DbPageMixin, DbHandler
class Services:
    endpoint_proxies = {'database': DbHandler}
class Page(DbPageMixin, WebPage):
    endpoint_proxies = {**DbPageMixin.endpoint_proxies, 'services': Services}
    services = Services()
    def main(self, root):
        root.dbSelect(dbtable='customers', value='^customer')
''')
    app = host.GramlotApplication(tmp_path, db_handler=service[0])
    app.gramlot_pages.page_classes['index'].services.database = service[0]
    with TestClient(app) as client:
        def call(method, params):
            return client.post(f'/page/index/rpc/{method}',
                               content=to_tytx(params, transport='json'),
                               headers={'content-type': 'application/vnd.tytx+json'})
        response = call('dbhandler.dbselect', {'dbtable': 'customers', '_id': 0})
        assert response.status_code == 200
        result = from_tytx(response.text, transport='json')
        assert result['ok'] is True
        assert result['result']['rows'] == [{'id': 0, 'caption': 'Smith zero'}]
        response = call('services.database.dbselect', {'dbtable': 'customers', '_id': 0})
        assert response.status_code == 200
        assert from_tytx(response.text, transport='json') == result
        for method in ['dbhandler.close', 'dbhandler.open', 'dbhandler.engine.dispose']:
            assert call(method, {}).status_code == 404
        assert call('dbhandler.dbselect', {'dbtable': 'customers', 'auxColumns': 'name'}).status_code == 422
