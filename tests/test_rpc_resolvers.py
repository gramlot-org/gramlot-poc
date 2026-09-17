"""Host-independent lazy resolver and relation-tree authoring contracts."""

import pytest
from genro_bag import Bag
from genro_bag.resolver import BagResolver
from genro_tytx import from_tytx

from gramlot.resolvers import RpcResolver
from gramlot.transport import to_tytx


def test_rpc_resolver_survives_nested_transport_without_loading():
    bag = Bag()
    resolver = RpcResolver(
        method="relation_tree", params={"table": "invc.customer", "path": ["@invoices"]},
    )
    bag.set_item("invoices", resolver, _attributes={"caption": "Invoices"})
    wire = to_tytx({"ok": True, "result": bag})
    result = from_tytx(wire, transport="json")["result"]
    node = next(iter(result))
    assert isinstance(node.resolver, RpcResolver)
    assert node.resolver.serialize()["kwargs"]["params"]["path"] == ["@invoices"]
    assert node.attr["caption"] == "Invoices"
    assert node.get_value(static=True) is None
    assert next(iter(bag)).resolver is resolver


def test_unadapted_resolver_fails_without_running():
    class Unexpected(BagResolver):
        def load(self):
            pytest.fail("Transport must not execute a resolver")

    bag = Bag()
    bag.set_item("branch", Unexpected())
    with pytest.raises(TypeError, match="Only RpcResolver"):
        to_tytx(bag)


def test_relation_tree_authoring_declares_component_with_isolated_rpc_stores():
    from gramlot.builder import GramlotBuilder

    builder = GramlotBuilder()
    first = builder.root.relationTree("invc.customer", selectedPath="^selected")
    second = builder.root.relationTree("invc.invoice")
    assert first.node.node_tag == "relationTree"
    assert first.node.attr["table"] == "invc.customer"
    assert first.node.attr["store"] != second.node.attr["store"]
    assert first.node.attr["selectedPath"] == "^selected"
    declarations = list(builder.source)
    assert [node.node_tag for node in declarations] == [
        "dataRpc", "relationTree", "dataRpc", "relationTree",
    ]
    assert declarations[0].attr["table"] == "invc.customer"
    assert declarations[0].attr["destination"] == first.node.attr["store"][1:]
