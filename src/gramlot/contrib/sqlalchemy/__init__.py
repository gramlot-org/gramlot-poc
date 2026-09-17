# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Optional SQLAlchemy integration. The initial reader supports SQLite only."""
from .sqlite import SqliteDbHandler, TableConfig

__all__ = ['SqliteDbHandler', 'TableConfig']
