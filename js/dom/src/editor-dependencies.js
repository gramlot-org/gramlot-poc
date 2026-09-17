// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
// Keep the large editor libraries lazy while giving every editor one local,
// bundled dependency graph. prepare_assets.py also bundles this module for the
// explicit development=True source runtime.

let codeMirrorCore;
function loadCodeMirrorCore() {
    return codeMirrorCore ||= Promise.all([
        import('codemirror'),
        import('@codemirror/state'),
        import('@codemirror/theme-one-dark'),
    ]).then(([core, state, theme]) => ({
        EditorView: core.EditorView,
        basicSetup: core.basicSetup,
        EditorState: state.EditorState,
        oneDark: theme.oneDark,
    }));
}

const codeMirrorLanguages = {
    python: () => import('@codemirror/lang-python').then(module => module.python()),
    css: () => import('@codemirror/lang-css').then(module => module.css()),
    xml: () => import('@codemirror/lang-xml').then(module => module.xml()),
    html: () => import('@codemirror/lang-xml').then(module => module.xml()),
    text: async () => null,
    markdown: async () => null,
};

export async function loadCodeMirror(language) {
    const loadLanguage = codeMirrorLanguages[language]
        || (() => import('@codemirror/lang-javascript').then(module => module.javascript()));
    const [core, languageExtension] = await Promise.all([
        loadCodeMirrorCore(),
        loadLanguage(),
    ]);
    return {...core, languageExtension};
}

let proseMirrorCore;
function loadProseMirrorCore() {
    return proseMirrorCore ||= Promise.all([
        import('prosemirror-model'),
        import('prosemirror-state'),
        import('prosemirror-view'),
        import('prosemirror-commands'),
        import('prosemirror-keymap'),
        import('prosemirror-history'),
    ]).then(([model, state, view, commands, keymap, history]) => ({
        model, state, view, commands, keymap, history,
    }));
}

export async function loadHtmlEditorDependencies() {
    const [core, basic] = await Promise.all([
        loadProseMirrorCore(),
        import('prosemirror-schema-basic'),
    ]);
    return {...core, basic};
}

let markdownDependencies;
export function loadMarkdownEditorDependencies() {
    return markdownDependencies ||= Promise.all([
        loadProseMirrorCore(),
        import('markdown-it'),
        import('prosemirror-markdown'),
    ]).then(([core, markdownIt, markdown]) => ({
        ...core,
        md: new markdownIt.default({html: false}),
        markdown,
    }));
}

let pythonHighlighter;
export function loadPythonHighlighter() {
    return pythonHighlighter ||= Promise.all([
        import('highlight.js/lib/core'),
        import('highlight.js/lib/languages/python'),
    ]).then(([core, python]) => {
        const highlighter = core.default;
        highlighter.registerLanguage('python', python.default);
        return highlighter;
    });
}

let joditLibrary;
export function loadJoditLibrary() {
    return joditLibrary ||= import('jodit').then(async module => {
        await Promise.all([
            import('jodit/esm/plugins/clean-html/clean-html.js'),
            import('jodit/esm/plugins/clipboard/clipboard.js'),
            import('jodit/esm/plugins/fullsize/fullsize.js'),
            import('jodit/esm/plugins/hr/hr.js'),
            import('jodit/esm/plugins/indent/indent.js'),
            import('jodit/esm/plugins/search/search.js'),
            import('jodit/esm/plugins/select/select.js'),
            import('jodit/esm/plugins/select-cells/select-cells.js'),
            import('jodit/esm/plugins/resize-cells/resize-cells.js'),
            import('jodit/esm/plugins/table-keyboard-navigation/table-keyboard-navigation.js'),
        ]);
        return module.Jodit;
    });
}
