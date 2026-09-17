# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Configure the SQLite adapter once, then mount ordinary Python pages."""
import argparse
from pathlib import Path

from gramlot.contrib.sqlalchemy import SqliteDbHandler, TableConfig
from gramlot_fastapi import GramlotApplication

HERE = Path(__file__).resolve().parent
DEFAULT_DATABASE = HERE.parents[2] / 'temp/test-invoice-sqlite-poc/data/invoice-copy.db'


def create_app(database=DEFAULT_DATABASE):
    handler = SqliteDbHandler(database, {
        'invc.customer': TableConfig('invc_customer', 'id', 'account_name'),
    })
    try:
        app = GramlotApplication(HERE, title='SQLite dbSelect')
        initial = handler.dbselect('invc.customer', _querystring='Smith', limit=1)['rows']
        for page in app.gramlot_pages.page_classes.values():
            page.dbhandler = handler
            page.initial_customer = initial[0]['id'] if initial else None
    except Exception:
        handler.close()
        raise
    return app, handler


def main():
    import uvicorn
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--database', type=Path, default=DEFAULT_DATABASE)
    parser.add_argument('--port', type=int, default=8054)
    options = parser.parse_args()
    app, handler = create_app(options.database)
    try:
        uvicorn.run(app, host='127.0.0.1', port=options.port)
    finally:
        handler.close()


if __name__ == '__main__':
    main()
