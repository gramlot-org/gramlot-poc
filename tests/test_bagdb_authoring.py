"""Bounded DB declarations remain Python-first and carry reactive inputs."""
from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path
import pytest
from gramlot.builder import GramlotBuilder
from gramlot.transport import to_tytx


def test_database_declarations_and_fixture_page():
    root = GramlotBuilder('main').root
    tree = root.dataRelationTree('model', adapter='local', dbtable='people', maxDepth=2)
    assert tree.node.node_tag == 'dataRelationTree'
    assert tree.node.attr['maxDepth'] == 2
    widget = root.relationTree('people', adapter='local', storepath='tree')
    assert widget.node.node_tag == 'relationTree'
    assert widget.node.attr['store'] == '^tree'
    assert widget.node.attr['modelDialect'] == 'generic'
    with pytest.raises(ValueError, match='GenroPy-specific'):
        root.relationTree('people', adapter='local', groupDescending=True)
    record = root.dataRecord('record', adapter='local', dbtable='people', pkey='^id')
    assert record.node.node_tag == 'dataRecord'
    assert record.node.attr['pkey'] == '^id'
    assert record.node.attr['_on_start'] is True
    assert root.dataRecord('empty', adapter='local', dbtable='people', pkey=None).node.attr['pkey'] is None
    assert root.dataSelection('rows', adapter='local', dbtable='people', limit='^limit').node.attr['limit'] == '^limit'
    assert root.dbSelect(dbadapter='local', dbtable='people').node.attr['dbadapter'] == 'local'
    with pytest.raises(TypeError):
        root.dbSelect(dbadapter='local', dbtable='people', rpcmethod='server.method')
    with pytest.raises(TypeError):
        root.dataRecord('', adapter='local', dbtable='people', pkey=0)
    path = Path(__file__).resolve().parents[1] / 'docs/examples/bagdb/pages/index.py'
    spec = spec_from_file_location('bagdb_lab', path)
    module = module_from_spec(spec)
    spec.loader.exec_module(module)
    recipe = GramlotBuilder('main')
    module.Page().main(recipe.root)
    encoded = to_tytx(recipe.source, 'json')
    assert 'bagDb' in encoded and 'dataSelection' in encoded and 'dataRecord' in encoded


def test_complete_file_fixture_preserves_records_and_exact_decimal_text():
    import json
    from gramlot.bagdb import load_bagdb_directory
    directory = Path(__file__).resolve().parents[1] / 'docs/examples/bagdb/mydb'
    manifest = json.loads((directory / 'manifest.json').read_text())
    fixture, registry = load_bagdb_directory(directory)
    assert len(registry) == 18
    assert sum(len(fixture.get_item(f'data.{table}')) for table in registry) == 17538
    for table, evidence in manifest['tables'].items():
        source = json.loads((directory / 'data' / f'{table}.json').read_text())
        actual = fixture.get_item(f'data.{table}')
        assert len(actual) == evidence['rows'] == len(source)
        schema = json.loads((directory / 'struct' / f'{table}.json').read_text())
        for node, row in zip(actual.nodes, source):
            for field, lexical in row.items():
                value = node.value.get_item(field)
                if lexical == '':
                    assert value is None
                elif schema['fields'][field]['dtype'] == 'T':
                    assert value == lexical
    assert fixture.get_item('struct.invoice.gross_total') is None
    assert fixture.get_node('struct.invoice.gross_total').attr['sourceDtype'] == 'money'
