// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import {loadPythonHighlighter} from '/_assets/dom/editor-dependencies.js';

export async function highlightRecipes(root) {
    const recipes = root.querySelectorAll('.python-recipe');
    if (!recipes.length) { return; }
    try {
        const hljs = await loadPythonHighlighter();
        for (const recipe of recipes) {
            if (!recipe.dataset.highlighted) { hljs.highlightElement(recipe); }
        }
    } catch (error) {
        // The original source remains readable if syntax highlighting fails.
        console.warn('Python syntax highlighting unavailable', error);
    }
}
