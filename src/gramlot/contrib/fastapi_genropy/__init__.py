"""Compatibility imports for :mod:`gramlot_fastapi.genropy`."""

from gramlot_fastapi.genropy import (
    GenropyPage,
    GenropyPageCollection,
    create_genropy_application,
    legacy_to_gramlot,
    mount_genropy,
)

__all__ = [
    "GenropyPage", "GenropyPageCollection", "create_genropy_application",
    "legacy_to_gramlot", "mount_genropy",
]
