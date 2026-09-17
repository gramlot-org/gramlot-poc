# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Run the packaged Python shell through the real JavaScript DOM runtime."""
import asyncio
import os
from pathlib import Path
import subprocess

from gramlot.contrib._shared.pages import PageRegistry
from gramlot.showcase import SHOWCASE_DIRECTORY
from gramlot.transport import to_tytx


ROOT = Path(__file__).resolve().parents[1]


class Registry(PageRegistry):
    async def run_sync(self, function, *args):
        return function(*args)


def test_shell_group_and_lessons_settle_without_reactive_cycle():
    source = asyncio.run(Registry(SHOWCASE_DIRECTORY).invoke("index", "source", "main", {}))
    result = subprocess.run(
        [
            "node",
            "--experimental-loader",
            str(Path.cwd() / "tests" / "lab_loader.mjs"),
            str(ROOT / "tests" / "showcase_shell_runtime.mjs"),
        ],
        cwd=Path(os.environ["GRAMLOT_CLIENT_MODULES"]),
        input=to_tytx(source, "json"),
        text=True,
        capture_output=True,
        timeout=30,
    )
    assert result.returncode == 0, result.stderr
    assert "settles without controller cycles" in result.stdout
