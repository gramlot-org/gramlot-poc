# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Shared showcase authoring and shell contracts."""
import inspect
from textwrap import dedent

import pytest
from genro_bag import Bag
from gramlot.builder import GramlotBuilder
from gramlot.showcase import ShowcaseCatalog, ShowcaseLesson, ShowcasePage, ShowcaseShellPage


def descendants(bag):
    for node in bag.nodes:
        yield node
        if isinstance(node.value, Bag):
            yield from descendants(node.value)


class LessonPage(ShowcasePage):
    def main(self, root):
        root.data(".greeting", "Hello")
        root.h1("^.greeting")


LESSONS = (
    ShowcaseLesson("hello", "Hello", "First steps", 20, "A bound greeting."),
    ShowcaseLesson("intro", "Introduction", "First steps/Orientation", 10),
)


class ShellPage(ShowcaseShellPage):
    catalog = ShowcaseCatalog(LESSONS, default="intro", page_url="lessons/{id}.html")
    host_label = "Standalone"


def build(page):
    builder = GramlotBuilder("main")
    page.main(builder.root)
    return builder.source


def test_lesson_receives_scoped_live_root_and_displays_exact_author_main():
    nodes = list(descendants(build(LessonPage())))
    live = next(node for node in nodes if node.attr.get("nodeId") == "source_root")
    assert live.attr["datapath"] == "data_root"
    live_nodes = list(descendants(live.value))
    assert any(node.node_tag == "h1" and node.value == "^.greeting" for node in live_nodes)
    assert any(node.attr.get("destination") == ".greeting" for node in live_nodes)
    editor = next(node for node in nodes if node.node_tag == "codeMirror")
    assert editor.attr["value"] == dedent(inspect.getsource(LessonPage._showcase_author_main))
    assert "_showcase_workspace" not in editor.attr["value"]
    assert inspect.signature(LessonPage.main) == inspect.signature(LessonPage._showcase_author_main)


def test_shell_builds_nested_navigation_and_closable_strategy_urls():
    nodes = list(descendants(build(ShellPage())))
    navigation = next(node.attr["value"] for node in nodes
                      if node.attr.get("destination") == "showcase.navigation")
    nav_nodes = list(descendants(navigation))
    assert [node.attr.get("caption") for node in nav_nodes] == [
        "First steps", "Orientation", "Introduction", "Hello",
    ]
    assert [node.attr.get("lessonId") for node in nav_nodes if node.attr.get("lessonId")] == [
        "intro", "hello",
    ]
    controller = next(node.attr["func"] for node in nodes if node.node_tag == "dataController")
    assert '"url":"lessons/intro.html"' in controller
    assert "node.getAttr('lessonId') === lesson.id" in controller
    assert "closable: true" in controller
    assert "pane.iframe({src: lesson.url" in controller
    assert not any(node.node_tag == "iframe" for node in nodes)


def test_catalog_rejects_duplicate_and_unroutable_metadata():
    with pytest.raises(ValueError, match="unique"):
        ShowcaseCatalog((LESSONS[0], LESSONS[0]))
    with pytest.raises(ValueError, match="contain"):
        ShowcaseCatalog((LESSONS[0],), page_url="/fixed/")


def test_opening_pages_are_root_leaves_and_inspector_is_embedded():
    from gramlot.showcase.demo_catalog import CATALOG
    from gramlot.showcase.demo.pages.index import Page
    assert all(not lesson.group_parts for lesson in CATALOG.lessons[:3])
    builder = GramlotBuilder('main')
    Page().main(builder.root)
    nodes = list(descendants(builder.source))
    tree = next(n.attr['value'] for n in nodes
                if n.attr.get('destination') == 'showcase.navigation')
    assert [n.attr['caption'] for n in tree.nodes[:3]] == [lesson.title for lesson in CATALOG.lessons[:3]]
    assert all(not isinstance(n.value, Bag) for n in tree.nodes[:3])
    assert ShowcasePage.source_inspection['presentation'] == 'embedded'
    assert ShowcasePage.source_inspection['target'] == '.example-inspector-host'
    lesson = GramlotBuilder('main')
    LessonPage().main(lesson.root)
    lesson_nodes = list(descendants(lesson.source))
    assert {'source', 'inspector'} <= {n.attr.get('pageName') for n in lesson_nodes}
    assert not any(n.attr.get('class_') == 'example-tools' for n in lesson_nodes)
