"""Packaging rejects source-only resources that cannot support a default host."""

import json

import pytest

from hatch_build import CustomBuildHook


def test_build_hook_rejects_missing_compiled_browser_manifest(tmp_path):
    resources = tmp_path / 'src/gramlot/resources'
    resources.mkdir(parents=True)
    (resources / 'manifest.json').write_text(json.dumps({'sources': {}, 'assets': {}}))
    hook = CustomBuildHook(
        str(tmp_path), {}, None, None, str(tmp_path / 'dist'), 'wheel',
    )

    with pytest.raises(RuntimeError, match='build_browser_distribution.py'):
        hook.initialize('standard', {})
