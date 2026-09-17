# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Declarative, same-origin boolean channels between a page and one child frame."""
from genro_builders.builder import element


class FrameChannelDeclarations:
    @element(
        sub_tags="",
        _meta={
            "webcomponent": True,
            "render_tag": "gnr-framechannel",
            "propertyAttributes": ["value", "target"],
        },
    )
    def frameChannel(self, **kwargs):
        """Bind a named boolean value across one same-origin parent/child boundary."""
        ...
