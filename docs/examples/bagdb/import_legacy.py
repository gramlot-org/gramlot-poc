"""Import the complete test_invoice CSV snapshot; never connect to a database."""
import argparse
import ast
import csv
import hashlib
import json
import re
from pathlib import Path


def literal(node, default=None):
    try:
        return ast.literal_eval(node)
    except (ValueError, TypeError):
        return default


def metadata(path):
    tree = ast.parse(path.read_text())
    fields, relations, omitted = {}, {}, []
    key = 'id'
    for node in ast.walk(tree):
        if not isinstance(node, ast.Call) or not isinstance(node.func, ast.Attribute):
            continue
        name = node.func.attr
        attrs = {kw.arg: literal(kw.value) for kw in node.keywords if kw.arg}
        if name == 'table':
            key = attrs.get('pkey', key)
        if name == 'column' and node.args:
            if len(node.args) > 1:
                attrs.setdefault('dtype', literal(node.args[1]))
            fields[literal(node.args[0])] = attrs
        if name in ('formulaColumn', 'aliasColumn', 'pyColumn', 'joinColumn', 'compositeColumn', 'subQueryColumn') and node.args:
            omitted.append({'name': literal(node.args[0]), 'kind': name})
        if name == 'relation' and node.args:
            column = node.func.value
            if isinstance(column, ast.Call) and isinstance(column.func, ast.Attribute) and column.func.attr == 'column':
                relations[literal(column.args[0])] = literal(node.args[0])
    return key, fields, relations, omitted


def convert(legacy, output):
    csvdir = legacy / 'projects/test_invoice/data/export'
    sources = sorted(csvdir.glob('*.csv'))
    if len(sources) != 18:
        raise ValueError('Expected the complete 18-table test_invoice export')
    if output.exists():
        raise FileExistsError(output)
    schemas, datasets, provenance = {}, {}, {}
    for source in sources:
        name = source.stem
        model = legacy / ('projects/gnrcore/packages/adm/model/user.py' if name == 'user'
                          else f'projects/test_invoice/packages/invc/model/{name}.py')
        key, attrs, relations, omitted = metadata(model)
        with source.open(newline='', encoding='utf-8') as stream:
            reader = csv.DictReader(stream)
            rows = list(reader)
            columns = reader.fieldnames
        fields = {}
        for column in columns:
            info = attrs.get(column, {})
            original = info.get('dtype') or ('DH' if column.endswith('_ts') else
                'B' if column == '__is_draft' else 'L' if column in ('_row_count', 'df_fbcolumns') else 'T')
            # Preserve exact CSV decimal/date/XML text until those capabilities exist.
            dtype = 'L' if original in ('I', 'L') else 'B' if original == 'B' else 'T'
            fields[column] = dict(dtype=dtype, sourceDtype=original, primaryKey=column == key,
                                  nullable=column != key, label=re.sub(r'^!!(?:\[[^\]]+\])?', '', info.get('name_long', column)))
            if column in relations:
                fields[column]['sourceReference'] = relations[column]
        if name == 'product_type':
            fields['parent_id']['sourceReference'] = 'product_type.id'
        schemas[name] = dict(table=name, sourceTable=('adm.' if name == 'user' else 'invc.') + name,
                             primaryKey=key, fields=fields, omittedComputedFields=omitted)
        datasets[name] = rows
        provenance[name] = dict(rows=len(rows), csv=str(source.relative_to(legacy)),
            csvSha256=hashlib.sha256(source.read_bytes()).hexdigest(),
            model=str(model.relative_to(legacy)), modelSha256=hashlib.sha256(model.read_bytes()).hexdigest())
    for schema in schemas.values():
        for field in schema['fields'].values():
            ref = field.get('sourceReference')
            if not ref:
                continue
            target, column = ref.split('.')[-2:]
            if target in schemas and schemas[target]['primaryKey'] == column:
                field['references'] = f'{target}.{column}'
    for folder in ('struct', 'data'):
        (output / folder).mkdir(parents=True)
    def write(path, obj):
        path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + '\n')
    for name in schemas:
        write(output / 'struct' / f'{name}.json', schemas[name])
        write(output / 'data' / f'{name}.json', datasets[name])
    write(output / 'manifest.json', dict(format=1, tables=provenance,
        totalRows=sum(len(rows) for rows in datasets.values()),
        valuePolicy='CSV strings preserved verbatim; loader maps empty strings to null like legacy tests; integer/boolean fields converted explicitly. Decimal/date/XML remain text.',
        scope='All exported physical columns and rows. Computed fields, triggers, composite joins and external relations are not implemented.'))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('legacy', type=Path)
    parser.add_argument('output', type=Path)
    args = parser.parse_args()
    convert(args.legacy.resolve(), args.output.resolve())
