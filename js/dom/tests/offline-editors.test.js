import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {setupDom} from './dom.js';
import {
    loadCodeMirror,
    loadHtmlEditorDependencies,
    loadMarkdownEditorDependencies,
    loadPythonHighlighter,
    loadJoditLibrary,
} from '../src/editor-dependencies.js';

test('editor dependency graph loads locally with shared module identities', async () => {
    const dom = setupDom();
    globalThis.Node = dom.window.Node;
    const [codeMirror, html, markdown, highlighter, Jodit] = await Promise.all([
        loadCodeMirror('python'),
        loadHtmlEditorDependencies(),
        loadMarkdownEditorDependencies(),
        loadPythonHighlighter(),
        loadJoditLibrary(),
    ]);
    assert.equal(typeof codeMirror.EditorView, 'function');
    assert.ok(codeMirror.languageExtension);
    assert.equal(html.model.Schema, markdown.model.Schema);
    assert.equal(html.state.EditorState, markdown.state.EditorState);
    assert.equal(highlighter.getLanguage('python').name, 'Python');
    for (const control of ['eraser', 'outdent', 'indent', 'hr', 'find', 'selectall', 'fullsize']) {
        assert.ok(Jodit.defaultOptions.controls[control], `${control} toolbar control is registered`);
    }
    for (const plugin of ['clean-html', 'clipboard', 'indent', 'hr', 'search', 'fullsize',
        'select', 'select-cells', 'resize-cells', 'table-keyboard-navigation']) {
        assert.ok(Jodit.plugins.get(plugin), `${plugin} plugin is registered`);
    }
});

test('shipped editor sources have no executable remote imports', async () => {
    const sources = await Promise.all([
        '../../pages/src/codemirror-component.js',
        '../../pages/src/recipe-highlight.js',
        '../src/collections/html-editor.js',
        '../src/collections/markdown-editor.js',
        '../src/collections/jodit-dependencies.js',
        '../src/editor-dependencies.js',
    ].map(path => readFile(new URL(path, import.meta.url), 'utf8')));
    for (const source of sources) {
        assert.doesNotMatch(source, /import\s*\(\s*['"]https?:\/\//);
        assert.doesNotMatch(source, /https?:\/\/(?:cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|esm\.sh|unpkg\.com)/);
    }
});
