// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
/** Explicit CDN provider for Python/text source viewers; local editors stay local. */
const versions = {
    codemirror: '6.0.2',
    '@codemirror/state': '6.7.4',
    '@codemirror/view': '6.43.11',
    '@codemirror/language': '6.12.4',
    '@codemirror/lang-python': '6.2.1',
    '@codemirror/theme-one-dark': '6.1.3',
};
const dependencies = ['@codemirror/state', '@codemirror/view', '@codemirror/language']
    .map(name => `${name}@${versions[name]}`).join(',');
const modules = new Map();
function load(name) {
    if (!modules.has(name)) {
        // State has no CodeMirror dependencies: extra overrides would create
        // a second module URL and break extension identity checks.
        const query = name === '@codemirror/state' ? '' : `deps=${dependencies}&`;
        const url = `https://esm.sh/${name}@${versions[name]}?${query}target=es2022`;
        modules.set(name, import(url).catch(error => { modules.delete(name); throw error; }));
    }
    return modules.get(name);
}
export async function loadCodeMirrorFromCdn(language = 'text') {
    if (!['python', 'text'].includes(language)) throw new Error('CDN CodeMirror supports Python and text');
    const [core, state, theme, python] = await Promise.all([
        load('codemirror'), load('@codemirror/state'), load('@codemirror/theme-one-dark'),
        language === 'python' ? load('@codemirror/lang-python') : null,
    ]);
    return {EditorView: core.EditorView, basicSetup: core.basicSetup,
        EditorState: state.EditorState, oneDark: theme.oneDark,
        languageExtension: python ? python.python() : null};
}
