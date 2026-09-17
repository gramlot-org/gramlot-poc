"""Compatibility imports for :mod:`gramlot_fastapi.runtime`."""

from gramlot.contrib._shared.runtime import PACKAGE_ASSET_DIRECTORIES
from gramlot_fastapi.runtime import (
    BrowserStaticFiles,
    RuntimeAssets,
    SourceStaticFiles,
)

__all__ = [
    "PACKAGE_ASSET_DIRECTORIES",
    "BrowserStaticFiles",
    "RuntimeAssets",
    "SourceStaticFiles",
]
