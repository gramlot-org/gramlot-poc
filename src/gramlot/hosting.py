# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Supported host-extension API for server integration packages."""

from gramlot.contrib._shared.pages import DEFAULT_PREFIX, PageRegistry, ServiceParameterError
from gramlot.contrib._shared.runtime import (
    RuntimeAssetMount,
    RuntimeAssets,
    render_document,
    script_json,
)

__all__ = [
    'DEFAULT_PREFIX',
    'PageRegistry',
    'RuntimeAssetMount',
    'RuntimeAssets',
    'ServiceParameterError',
    'render_document',
    'script_json',
]
