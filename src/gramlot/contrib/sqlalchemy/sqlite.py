# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Read-only SQLite table adapter with explicit Unicode search semantics."""
from contextlib import contextmanager
from dataclasses import dataclass
from pathlib import Path
import sqlite3

from gramlot.database import DbHandler

from sqlalchemy import MetaData, Table, create_engine, func, select


@dataclass(frozen=True)
class TableConfig:
    """Map an exposed logical table to physical identity/caption columns."""

    table: str
    identifier: str
    caption: str


class SqliteDbHandler(DbHandler):
    """Own a read-only engine; acquire/release one connection per invocation.

    Only explicitly registered tables and scalar primary keys are exposed.
    Search uses literal prefix/containment, Python Unicode casefold when
    requested, and SQL filtering before LIMIT. No Genropy or host dependency.
    """

    def __init__(self, path: str | Path, tables: dict[str, TableConfig]):
        path = Path(path).expanduser().resolve(strict=True)
        if not path.is_file():
            raise ValueError('SQLite database must be an existing file')

        def connect():
            connection = sqlite3.connect(path.as_uri() + '?mode=ro', uri=True,
                                         check_same_thread=False)
            connection.create_function('gramlot_casefold', 1,
                lambda text: text.casefold() if text is not None else None,
                deterministic=True)
            return connection

        self.engine = create_engine('sqlite://', creator=connect)
        self.tables = {}
        try:
            metadata = MetaData()
            for name, config in tables.items():
                if not isinstance(name, str) or not name:
                    raise ValueError('Logical table names must be nonempty strings')
                table = Table(config.table, metadata, autoload_with=self.engine,
                              resolve_fks=False)
                key = table.c[config.identifier]
                caption = table.c[config.caption]
                if list(table.primary_key.columns) != [key]:
                    raise ValueError(f'{name}: minimum dbSelect requires one primary-key column')
                if key.type.python_type not in (str, int) or caption.type.python_type is not str:
                    raise ValueError(f'{name}: use a string/integer identity and text caption')
                self.tables[name] = (table, key, caption)
        except Exception:
            self.close()
            raise

    @contextmanager
    def open(self, table: str):
        if table not in self.tables:
            raise ValueError(f'dbSelect table is not configured: {table}')
        with self.engine.connect() as connection:
            yield _TableReader(connection, *self.tables[table])

    def close(self):
        self.engine.dispose()


class _TableReader:
    def __init__(self, connection, table, key, caption):
        self.connection, self.table = connection, table
        self.key, self.caption = key, caption

    def _rows(self, predicate, limit):
        statement = (select(self.key.label('id'), self.caption.label('caption'))
                     .where(predicate)
                     .order_by(self.caption, self.key).limit(limit))
        rows = [dict(row) for row in self.connection.execute(statement).mappings()]
        if any(row['id'] is None or row['id'] == '' or row['caption'] is None for row in rows):
            raise ValueError('Configured dbSelect rows require a nonempty identity and caption')
        return rows

    def lookup(self, identity):
        if self.key.type.python_type is int:
            try:
                converted = int(identity)
            except (ValueError, TypeError):
                return []
            if str(converted) != str(identity):
                return []
            identity = converted
        else:
            identity = str(identity)
        return self._rows(self.key == identity, 1)

    def search(self, text, *, match, ignore_case, limit):
        column = func.gramlot_casefold(self.caption) if ignore_case else self.caption
        text = text.casefold() if ignore_case else text
        if match == 'prefix':
            predicate = func.substr(column, 1, len(text)) == text
        elif match == 'contains':
            predicate = func.instr(column, text) > 0
        else:
            raise ValueError(f'Unsupported search mode: {match}')
        return self._rows(predicate, limit)
