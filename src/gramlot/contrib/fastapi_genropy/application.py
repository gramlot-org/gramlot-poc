"""Compatibility imports for :mod:`gramlot_fastapi.genropy`."""

from gramlot_fastapi.genropy import (
    GenropyPage,
    GenropyPageCollection,
    column_subquery_paths,
    create_genropy_application,
    group_relation_fields,
    legacy_to_gramlot,
    mount_genropy,
)

__all__ = [
    "GenropyPage",
    "GenropyPageCollection",
    "column_subquery_paths",
    "create_genropy_application",
    "group_relation_fields",
    "legacy_to_gramlot",
    "mount_genropy",
]
