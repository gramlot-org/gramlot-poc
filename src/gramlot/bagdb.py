"""Experimental file-backed fixture loader for the browser BagDB adapter.

Files seed a memory database; this module does not provide write persistence.
"""
import json
from pathlib import Path
from urllib.parse import quote
from genro_bag import Bag


def load_bagdb_directory(directory):
    """Load paired struct/<table>.json and data/<table>.json into a Bag.

    JSON data retains CSV lexical values. Empty strings map to null, matching
    the legacy importer; L/B values are converted explicitly. Other values stay
    strings (including decimals and dates). Registry exposes every table.
    """
    directory = Path(directory)
    schemas = {p.stem: json.loads(p.read_text()) for p in sorted((directory / 'struct').glob('*.json'))}
    if not schemas or set(schemas) != {p.stem for p in (directory / 'data').glob('*.json')}:
        raise ValueError('Expected matching nonempty struct and data tables')
    fixture = Bag(dict(struct=Bag(), data=Bag()))
    registry = {}
    for table, schema in schemas.items():
        fields = schema['fields']
        key = schema['primaryKey']
        for field, attrs in fields.items():
            fixture.set_item(f'struct.{table}.{field}', None, attrs)
        fixture.set_item(f'data.{table}', Bag())
        registry[table] = dict(table=table)
        seen = set()
        for row in json.loads((directory / 'data' / f'{table}.json').read_text()):
            if set(row) != set(fields):
                raise ValueError(f'Field mismatch in {table}')
            values = {}
            for field, value in row.items():
                dtype = fields[field]['dtype']
                if value == '' or value is None:
                    value = None
                elif dtype == 'L':
                    value = int(value)
                    if abs(value) > 9007199254740991:
                        raise ValueError('Integer exceeds JavaScript safe range')
                elif dtype == 'B':
                    if str(value).lower() not in ('true', 'false', 't', 'f', '1', '0'):
                        raise ValueError(f'Invalid boolean: {table}.{field}')
                    value = str(value).lower() in ('true', 't', '1')
                values[field] = value
            identity = values[key]
            if identity is None or identity in seen:
                raise ValueError(f'Missing or duplicate identity in {table}')
            seen.add(identity)
            label = 'r_' + quote(str(identity), safe="~()*!'-_").replace('.', '%2E')
            fixture.set_item(f'data.{table}.{label}', Bag(values))
    return fixture, registry
