# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Host-independent, Python-first presentation for Gramlot showcases."""
from __future__ import annotations

import base64
from dataclasses import dataclass
from functools import wraps
import inspect
import json
from importlib.resources import files
from pathlib import Path
import re
from textwrap import dedent
from typing import Callable, Iterable

from genro_bag import Bag
from gramlot.page import WebPage

_ID = re.compile(r"[a-z][a-z0-9_-]*")
_GROUP = re.compile(r"[A-Za-z][A-Za-z0-9 _-]*")


@dataclass(frozen=True, slots=True)
class ShowcaseLesson:
    """One lesson in a shared showcase catalog."""
    id: str
    title: str
    group: str
    order: int
    description: str = ""
    capabilities: tuple[str, ...] = ()

    def __post_init__(self):
        if not _ID.fullmatch(self.id):
            raise ValueError(f"Invalid lesson id: {self.id!r}")
        if not self.title.strip():
            raise ValueError("Lesson title cannot be empty")
        if any(not _GROUP.fullmatch(part) for part in self.group_parts):
            raise ValueError(f"Invalid lesson group: {self.group!r}")
        if isinstance(self.order, bool) or not isinstance(self.order, int):
            raise TypeError("Lesson order must be an integer")
        object.__setattr__(self, "capabilities", tuple(self.capabilities))

    @property
    def group_parts(self):
        return tuple(part.strip() for part in self.group.split("/") if part.strip())


@dataclass(frozen=True, slots=True)
class ShowcaseCatalog:
    """Validated lesson order and host-selectable URL strategy."""
    lessons: tuple[ShowcaseLesson, ...]
    default: str
    page_url: str | Callable[[ShowcaseLesson], str]

    def __init__(self, lessons: Iterable[ShowcaseLesson], default=None,
                 page_url: str | Callable[[ShowcaseLesson], str] = "/page/{id}/"):
        ordered = tuple(sorted(lessons, key=lambda lesson: (lesson.order, lesson.id)))
        if not ordered:
            raise ValueError("A showcase catalog requires at least one lesson")
        ids = [lesson.id for lesson in ordered]
        if len(set(ids)) != len(ids):
            raise ValueError("Showcase lesson ids must be unique")
        selected = default or ordered[0].id
        if selected not in ids:
            raise ValueError(f"Unknown default lesson: {selected!r}")
        if not callable(page_url) and "{id}" not in page_url:
            raise ValueError("A string page_url must contain {id}")
        object.__setattr__(self, "lessons", ordered)
        object.__setattr__(self, "default", selected)
        object.__setattr__(self, "page_url", page_url)

    def url_for(self, lesson):
        return self.page_url(lesson) if callable(self.page_url) else self.page_url.format(id=lesson.id)


def _resource_text(name):
    return files(__package__).joinpath(name).read_text(encoding="utf-8")


def get_showcase_directory() -> Path:
    """Return the packaged demo root for adapters requiring filesystem discovery."""
    path = Path(str(files(__package__).joinpath("demo")))
    if not path.is_dir():
        raise FileNotFoundError("The showcase requires a filesystem package installation")
    return path


SHOWCASE_DIRECTORY = get_showcase_directory()


class ShowcasePage(WebPage):
    """Give a lesson author a scoped live root and its exact Python source."""
    source_inspection = {
        "launcher": False, "data_root": "data_root", "source_root": "source_root",
        "presentation": "embedded", "target": ".example-inspector-host",
    }
    show_source = True
    _showcase_author_main = None

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        author_main = cls.__dict__.get("main")
        if author_main is None:
            return
        if not inspect.isfunction(author_main):
            raise TypeError("ShowcasePage.main must be an instance method")

        @wraps(author_main)
        def wrapped(self, root):
            return self._showcase_workspace(root, author_main)

        cls._showcase_author_main = author_main
        cls.main = wrapped

    def _showcase_workspace(self, root, author_main):
        root.styleSheet(_resource_text("showcase.css"))
        root.data("data_root", Bag())
        root.data("showcaseLesson.sourceVisible", self.show_source)
        root.dataFormula("showcaseLesson.sourceDisplay", "visible ? 'block' : 'none'",
                         visible="^showcaseLesson.sourceVisible", _on_start=True)
        root.dataFormula("showcaseLesson.sourceToggleLabel",
                         "visible ? 'Hide source' : 'Show source'",
                         visible="^showcaseLesson.sourceVisible", _on_start=True)
        layout = root.borderContainer(height="100vh", class_="example-workspace")
        root.frameChannel(channel='showcase-tools', value='^showcaseLesson.sourceVisible')
        center = layout.contentPane(region="center", class_="example-center")
        live = center.div(nodeId="source_root", datapath="data_root", class_="example-live")
        source = layout.contentPane(region="right", width="480px", splitter=True,
                                    display="^showcaseLesson.sourceDisplay",
                                    class_="example-source")
        root.data('showcaseLesson.toolTab', 'source')
        tabs = source.tabContainer(selectedPage='^showcaseLesson.toolTab', height='100%',
                                   class_='example-tool-tabs')
        code = tabs.contentPane(pageName='source', title='Source', height='100%')
        inspection = tabs.contentPane(pageName='inspector', title='Inspector', height='100%')
        inspection.div(class_='example-inspector-host', height='100%')
        root.dataController(
            "if (visible && tab === 'inspector') gramlot.inspector.open();",
            visible='^showcaseLesson.sourceVisible', tab='^showcaseLesson.toolTab',
        )
        filename = Path(inspect.getsourcefile(author_main) or "lesson.py").name
        code.div(f"{filename} · Page.main", class_="example-source-title")
        source_text = dedent(inspect.getsource(author_main))
        for method_name in getattr(self, "showcase_source_methods", ()):
            source_text += "\n" + dedent(inspect.getsource(getattr(type(self), method_name)))
        code.codeMirror(value=source_text, language="python",
                          readonly=True, provider="cdn", class_="source-code",
                          **{"aria-label": "Python source"})
        if author_main(self, live) is not None:
            raise TypeError("Showcase Page.main must build into root and return None")


class ShowcaseShellPage(WebPage):
    """Build nested catalog navigation and closable iframe lesson tabs."""
    title = "gramlot.showcase"
    host_label = "Gramlot"
    catalog = None
    source_inspection = False

    def main(self, root):
        if not isinstance(self.catalog, ShowcaseCatalog):
            raise TypeError("ShowcaseShellPage.catalog must be a ShowcaseCatalog")
        root.styleSheet(_resource_text("showcase.css"))
        root.styleSheet(_resource_text("navigation-tree.css"))
        root.data('showcase.navigationVisible', True)
        root.data('showcase.toolsVisible', True)
        root.frameChannel(mode='sender', channel='showcase-tools',
                          target='^showcase.active', value='^showcase.toolsVisible')
        root.dataFormula('showcase.navigationDisplay', "visible ? 'block' : 'none'",
                         visible='^showcase.navigationVisible', _on_start=True)
        paths = self._navigation_data(root)
        layout = root.borderContainer(height="100vh", class_="showcase-shell")
        masthead = layout.contentPane(region='top', height='116px', class_='showcase-masthead')
        header = masthead.div(class_='showcase-header')
        logo = base64.b64encode(files(__package__).joinpath("gramlot-logo.png").read_bytes()).decode()
        header.img(src=f"data:image/png;base64,{logo}", alt="Gramlot", class_="showcase-logo")
        brand = header.div(class_="showcase-brand")
        brand.strong("gramlot.showcase")
        brand.span("A Gramlot SPA · learn one concept at a time")
        header.span(self.host_label, class_="host-badge")
        toolbar = masthead.div(class_='showcase-toolbar')
        toolbar.button('', class_='sidebar-toggle sidebar-toggle-left', title='Toggle navigation',
                       action="this.SET('showcase.navigationVisible', !this.GET('showcase.navigationVisible'));",
                       **{'aria-label': 'Toggle navigation', 'aria-expanded': '^showcase.navigationVisible'})
        toolbar.button('', class_='sidebar-toggle sidebar-toggle-right',
                       title='Toggle Source and Inspector sidebar',
                       action="this.SET('showcase.toolsVisible', !this.GET('showcase.toolsVisible'));",
                       **{'aria-label': 'Toggle Source and Inspector sidebar',
                          'aria-expanded': '^showcase.toolsVisible'})
        sidebar = layout.contentPane(region="left", width="250px", height="100%",
                                     splitter=True, class_="showcase-navigation", display="^showcase.navigationDisplay")
        sidebar.h2("Showcase")
        sidebar.storeTree(store="^showcase.navigation", selectedPath="^showcase.requested",
                          labelAttribute="caption", class_="nav-tree")
        self._tabs(layout, paths)

    def _navigation_data(self, root):
        tree = Bag()
        groups = {}
        paths = {}
        group_count = 0
        for lesson_count, lesson in enumerate(self.catalog.lessons):
            parent = []
            for depth, caption in enumerate(lesson.group_parts):
                key = lesson.group_parts[:depth + 1]
                if key not in groups:
                    group_count += 1
                    path = ".".join((*parent, f"group_{group_count:03d}"))
                    tree.set_item(path, Bag(), _attributes={"caption": caption})
                    groups[key] = path
                parent = groups[key].split(".")
            path = ".".join((*parent, f"lesson_{lesson_count:03d}"))
            tree.set_item(path, None, _attributes={"caption": lesson.title,
                          "lessonId": lesson.id, "description": lesson.description})
            paths[lesson.id] = path
        root.data("showcase.navigation", tree)
        root.data("showcase.requested", paths[self.catalog.default])
        root.data("showcase.active", None)
        return paths

    def _tabs(self, layout, paths):
        center = layout.contentPane(region="center", height="100%", min_height="0",
                                    class_="showcase-center")
        tabs = center.tabContainer(nodeId="showcase-tabs", selectedPage="^showcase.active",
                                   height="100%", class_="showcase-tabs")
        definitions = {
            paths[lesson.id]: {"id": lesson.id, "title": lesson.title,
                               "url": self.catalog.url_for(lesson)}
            for lesson in self.catalog.lessons
        }
        encoded = json.dumps(definitions, ensure_ascii=False, separators=(",", ":"))
        tabs.dataController(
            """
const lessons = %s;
const lesson = lessons[String(requested || '')];
if (!lesson) return;
const tabs = wrapSource(this.parentNode);
const existing = this.parentBag.getNodes().find(
    node => node.getAttr('lessonId') === lesson.id);
let pane = existing ? wrapSource(existing) : null;
if (!pane) {
    const opened = this.parentBag.getNodes().filter(node => node.getAttr('lessonId'));
    if (opened.length >= 6) this.parentBag.popNode(opened[0].label);
    pane = tabs.contentPane({nodeId: 'showcase-tab-' + lesson.id,
        lessonId: lesson.id, pageName: lesson.id, title: lesson.title, closable: true, height: '100%%'});
    pane.iframe({src: lesson.url, name: lesson.id, title: lesson.title + ' example',
        width: '100%%', height: '100%%', class: 'showcase-frame'});
}
this.SET('showcase.active', lesson.id);
queueMicrotask(() => {
    if (this.GET('showcase.requested') === requested) {
        this.SET('showcase.requested', null);
    }
});
""" % encoded, requested="^showcase.requested", _on_start=True)


__all__ = ["SHOWCASE_DIRECTORY", "ShowcaseCatalog", "ShowcaseLesson", "ShowcasePage",
           "ShowcaseShellPage", "get_showcase_directory"]
