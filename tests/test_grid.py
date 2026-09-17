"""The Python shorthand produces the same mounted grid contract as JavaScript."""
import os
from pathlib import Path
import subprocess

from gramlot.builder import GramlotBuilder
from gramlot.transport import to_tytx


def test_python_grid_transport():
    builder = GramlotBuilder('main')
    grid = builder.root.quickGrid(value='^rows', selectedKey='^selected', height='220px')
    grid.column('name', name='Name', width=160)
    grid.column('amount', dtype='N', places=2)
    assert grid.node.node_tag == 'grid'
    assert grid.node.get_attr('store') == '^rows'
    root = Path(__file__).resolve().parents[1]
    env = dict(os.environ, GRAMLOT_CLIENT_MODULES=str(root / 'build/test-client'))
    result = subprocess.run(
        ['node', '--experimental-loader', str(root / 'tests/lab_loader.mjs'),
         '--input-type=module', '-e', '''
import {readFileSync} from 'node:fs';
import {fromTytx} from 'genro-tytx';
import {HtmlBuilder} from './js/dom/src/contrib/html/html-builder.js';
import {verifyGrid} from './js/dom/tests/grid-integration.test.js';
class Page extends HtmlBuilder {static wc_requires = ['grid'];}
const builder = new Page('main');
builder.loadSource(fromTytx(readFileSync(0, 'utf8'), 'json'));
verifyGrid(builder);
'''], input=to_tytx(builder.source, 'json'), text=True,
        capture_output=True, cwd=root, env=env, timeout=30,
    )
    assert result.returncode == 0, result.stdout + result.stderr


def test_legacy_structure_authoring_is_plain_bag_on_transport():
    from gramlot.grid import GridStruct
    from gramlot.transport import snapshot
    from genro_bag import Bag

    struct = GridStruct()
    row = struct.view().rows(headerClasses='compact')
    row.cell('code', name='Code', width='90px')
    row.cell('code', name='Repeated code', width=0)
    result = snapshot(struct)
    assert type(result) is Bag
    assert type(result.get_item('view_0.rows_0')) is Bag
    assert result.get_node('view_0.rows_0').attr['headerClasses'] == 'compact'
    assert result.get_node('view_0.rows_0.cell_0').attr['width'] == '90px'
    assert result.get_node('view_0.rows_0.cell_1').attr['width'] == 0
    assert result.get_item('view_0.rows_0.cell_0') == ''
def test_columnsets_keep_flat_cells_and_defaults():
    from gramlot.grid import GridStruct
    struct = GridStruct()
    rows = struct.view().rows()
    group = rows.columnset('amounts', name='Amounts', cells_width=90,
                           columns=[dict(field='quantity', dtype='L', totalize=True)])
    group.cell('price', width=110, dtype='N')
    assert struct.get_item('info.columnsets').get_node('amounts').attr['name'] == 'Amounts'
    assert len(rows) == 2
    assert rows.get_node('cell_0').attr['columnset'] == 'amounts'
    assert rows.get_node('cell_0').attr['width'] == 90
    assert rows.get_node('cell_1').attr['width'] == 110
