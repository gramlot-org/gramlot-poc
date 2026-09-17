"""Bounded Data RPC authoring contracts."""

from decimal import Decimal

import pytest

from gramlot.builder import GramlotBuilder
from gramlot.page import WebPage, endpoint


class AuthoringPage(WebPage):
    @endpoint
    def area(self, base: Decimal, height: Decimal) -> Decimal:
        return base * height / Decimal("2")


def test_python_callable_authoring_and_legacy_shapes():
    page = AuthoringPage()
    builder = GramlotBuilder("main")
    declaration = builder.root.dataRpc(
        ".result", page.area, base="^base", height="=height", _on_start=True,
    )
    assert declaration.node.node_tag == "dataRpc"
    assert declaration.node.attr["method"] == "area"
    assert declaration.node.attr["_meta"] == {"data_element": "rpc"}
    assert builder.root.dataRpc(page.area, base="^base").node.get_attr("destination") is None
    assert builder.root.dataRpc(None, "area", base="^base").node.get_attr("method") == "area"

    class NotAPage:
        @endpoint
        def area(self): ...

    with pytest.raises(TypeError, match="bound and marked"):
        builder.root.dataRpc("result", NotAPage().area)
    with pytest.raises(TypeError, match="bound and marked"):
        builder.root.dataRpc("result", lambda: None)


def test_removed_concurrency_option_is_rejected():
    with pytest.raises(TypeError, match="_concurrency is not supported"):
        GramlotBuilder("main").root.dataRpc("result", "method", _concurrency="latest")
