"""Generate the reviewable legacy-source census used by gramlot_inventory.

This script performs static analysis only. It does not import Genropy or Gramlot.
Generated cards intentionally distinguish syntactic evidence from inferred API
semantics and preserve open **kwargs boundaries.
"""
from __future__ import annotations

import ast
import json
import re
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LEGACY = Path('/Users/gporcari/Sviluppo/Genropy/genropy/gnrpy/gnr/web')
PRIMARY_DIRS = (LEGACY / 'gnrwebstruct', LEGACY / 'widgets')
CARDS = ROOT / 'legacy-census' / 'cards'


@dataclass
class Decl:
    source: Path
    owner: str | None
    node: ast.FunctionDef | ast.AsyncFunctionDef
    kind: str
    owner_bases: tuple[str, ...] = ()
    registrations: set[str] = field(default_factory=set)

    @property
    def ref(self) -> str:
        rel = self.source.relative_to(LEGACY.parent.parent.parent.parent)
        owner = f'::{self.owner}' if self.owner else ''
        return f'{rel}{owner}::{self.node.name}:L{self.node.lineno}'


def direct_declarations(path: Path) -> tuple[list[Decl], list[tuple[str, str, int]]]:
    tree = ast.parse(path.read_text(), filename=str(path))
    declarations: list[Decl] = []
    excluded: list[tuple[str, str, int]] = []
    for item in tree.body:
        if isinstance(item, (ast.FunctionDef, ast.AsyncFunctionDef)):
            kind = 'internal helper' if item.name.startswith('_') else 'module helper'
            declarations.append(Decl(path, None, item, kind))
            for nested in ast.walk(item):
                if nested is not item and isinstance(nested, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    excluded.append((nested.name, 'nested implementation closure', nested.lineno))
        elif isinstance(item, ast.ClassDef):
            excluded.append((item.name, 'class or namespace container; direct methods are mapped individually', item.lineno))
            class_bases = tuple(ast.unparse(base) for base in item.bases)
            for member in item.body:
                if isinstance(member, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    if member.name.startswith('__'):
                        kind = 'internal protocol method'
                    elif member.name.startswith('_'):
                        kind = 'internal helper'
                    else:
                        kind = 'public authoring declaration'
                    declarations.append(Decl(path, item.name, member, kind, class_bases))
                    for nested in ast.walk(member):
                        if nested is not member and isinstance(nested, (ast.FunctionDef, ast.AsyncFunctionDef)):
                            excluded.append((f'{item.name}.{nested.name}', 'nested implementation closure', nested.lineno))
    return declarations, excluded


def literal_registrations(path: Path) -> set[str]:
    """Collect literal names from namespace lists and direct child/tag calls."""
    tree = ast.parse(path.read_text(), filename=str(path))
    names: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Assign):
            targets = {t.id for t in node.targets if isinstance(t, ast.Name)}
            if targets & {'htmlNS', 'dijitNS', 'dojoxNS', 'gnrNS'}:
                try:
                    value = ast.literal_eval(node.value)
                except Exception:
                    continue
                if isinstance(value, (list, tuple)):
                    names.update(str(v) for v in value if isinstance(v, str))
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute):
            if node.func.attr in {'child', '_', 'htmlChild'} and node.args:
                try:
                    value = ast.literal_eval(node.args[0])
                except Exception:
                    continue
                if isinstance(value, str) and value:
                    names.add(value)
    return names


def defaults(node: ast.FunctionDef | ast.AsyncFunctionDef) -> list[tuple[str, str, str]]:
    args = list(node.args.posonlyargs) + list(node.args.args)
    if args and args[0].arg in {'self', 'cls'}:
        args = args[1:]
    positional_defaults = [None] * (len(args) - len(node.args.defaults)) + list(node.args.defaults)
    result = []
    for arg, default in zip(args, positional_defaults):
        annotation = ast.unparse(arg.annotation) if arg.annotation else 'not declared'
        result.append((arg.arg, 'required' if default is None else 'optional',
                       'none' if default is None else f'`{ast.unparse(default)}`', annotation))
    for arg, default in zip(node.args.kwonlyargs, node.args.kw_defaults):
        annotation = ast.unparse(arg.annotation) if arg.annotation else 'not declared'
        result.append((arg.arg, 'required' if default is None else 'optional',
                       'none' if default is None else f'`{ast.unparse(default)}`', annotation))
    if node.args.vararg:
        result.append((f'*{node.args.vararg.arg}', 'optional variadic', 'empty tuple', 'not declared'))
    if node.args.kwarg:
        result.append((f'**{node.args.kwarg.arg}', 'open extension boundary', 'empty mapping', 'not declared'))
    return result


def body_evidence(node: ast.AST) -> dict[str, set[str]]:
    found = defaultdict(set)
    for part in ast.walk(node):
        if isinstance(part, ast.Call):
            call = ast.unparse(part.func)
            if call.endswith(('.pop', '.get', '.setdefault')) and part.args:
                try:
                    key = ast.literal_eval(part.args[0])
                except Exception:
                    key = None
                if isinstance(key, str):
                    found['consumed kwargs'].add(key)
            if 'extract_kwargs' in call:
                for kw in part.keywords:
                    if kw.arg:
                        try:
                            value = ast.literal_eval(kw.value)
                        except Exception:
                            value = ast.unparse(kw.value)
                        found['prefix families'].add(f'{kw.arg}={value!r}')
            if call.endswith('.startswith') and part.args:
                try:
                    value = ast.literal_eval(part.args[0])
                except Exception:
                    value = None
                if isinstance(value, str):
                    found['prefix families'].add(value + '*')
                elif isinstance(value, tuple):
                    found['prefix families'].update(str(v) + '*' for v in value if isinstance(v, str))
            for kw in part.keywords:
                if kw.arg:
                    found['forwarded keyword names'].add(kw.arg)
            if isinstance(part.func, ast.Attribute) and part.func.attr in {'child', '_', 'htmlChild'}:
                if part.args:
                    try:
                        tag = ast.literal_eval(part.args[0])
                    except Exception:
                        tag = None
                    if isinstance(tag, str):
                        found['delegates to'].add(tag)
        if isinstance(part, ast.Compare):
            text = ast.unparse(part)
            if any(token in text for token in ('kwargs', 'None', "'*", 'False', 'True')):
                found['conditions'].add(text)
        if isinstance(part, ast.Subscript) and isinstance(part.value, ast.Name) and part.value.id in {'kwargs', 'attributes'}:
            try:
                key = ast.literal_eval(part.slice)
            except Exception:
                key = None
            if isinstance(key, str):
                found['consumed kwargs'].add(key)
        if isinstance(part, ast.Dict):
            for key_node in part.keys:
                try:
                    key = ast.literal_eval(key_node)
                except Exception:
                    key = None
                if isinstance(key, str):
                    found['produced/forwarded fields'].add(key)
    return found


def doc_params(node: ast.AST) -> dict[str, str]:
    doc = ast.get_docstring(node) or ''
    output = {}
    for name, desc in re.findall(r':param\s+([^:]+):\s*([^\n]+)', doc):
        output[name.strip()] = ' '.join(desc.split())
    in_args = False
    for line in doc.splitlines():
        stripped = line.strip()
        if stripped in {'Args:', 'Arguments:', 'Parameters:'}:
            in_args = True
            continue
        if in_args and stripped and not line.startswith((' ', '\t')):
            in_args = False
        if in_args:
            match = re.match(r'\s*([A-Za-z_][A-Za-z0-9_]*):\s*(.+)', line)
            if match:
                output.setdefault(match.group(1), ' '.join(match.group(2).split()))
    return output


def current_names() -> dict[str, set[str]]:
    names: dict[str, set[str]] = defaultdict(set)
    for path in (ROOT.parent / 'src/gramlot/grammar').glob('*.py'):
        tree = ast.parse(path.read_text(), filename=str(path))
        for node in ast.walk(tree):
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) and not node.name.startswith('_'):
                names[node.name.lower()].add(f'{path.relative_to(ROOT.parent)}:L{node.lineno}')
    catalogue = ROOT.parent / 'js/dom/src/components/builtin-components.json'
    if catalogue.exists():
        data = json.loads(catalogue.read_text())
        for collection in data.get('collections', []):
            for component in collection.get('components', []):
                names[component['name'].lower()].add('js/dom/src/components/builtin-components.json')
    return names


def category(name: str, decls: list[Decl]) -> tuple[str, str]:
    lower = name.lower()
    controller_names = {'data', 'dataformula', 'datacontroller', 'datascript', 'datarpc',
                        'dataremote', 'datarecord', 'dataselection', 'remote'}
    if lower in controller_names or lower.endswith(('resolver', 'store')):
        level = 'COMPOSED' if lower in {'datarecord', 'dataselection', 'remote'} else 'LOW-LEVEL'
        return 'controller', level
    if lower in {'struct_method', 'structmethod'}:
        return 'recipe/registration contract', 'COMPOSED'
    if any(d.kind != 'public authoring declaration' for d in decls) and not any(
            d.kind == 'public authoring declaration' for d in decls):
        return 'internal/reference helper', 'N/A'
    delegates = set().union(*(body_evidence(d.node).get('delegates to', set()) for d in decls))
    if delegates and any(tag.lower() != lower for tag in delegates):
        return 'component/helper', 'COMPOSED'
    return 'component', 'LOW-LEVEL'


def safe_name(name: str) -> str:
    return re.sub(r'[^A-Za-z0-9_.-]+', '_', name)


def render_card(name: str, decls: list[Decl], registered: bool, implementation_refs: set[str]) -> str:
    kind, level = category(name, decls)
    public = any(d.kind == 'public authoring declaration' for d in decls) or registered
    implemented = bool(implementation_refs)
    status = ('implementato; corrispondenza di portata da verificare' if implemented
              else ('da implementare' if public else 'solo riferimento legacy'))
    lines = [f'# {name}', '', '## Identity', '', f'- **Identity:** `{name}`',
             f'- **Type:** {kind}', f'- **Level:** {level}',
             f'- **Purpose:** source-backed census entry; detailed product purpose is '
             f'{"taken from the declarations below" if public else "internal support for public declarations"}.',
             f'- **Status:** {status}', '', '## Bases, mixins and composition', '']
    owners = sorted({d.owner for d in decls if d.owner})
    lines.append('Declared by ' + (', '.join(f'`{o}`' for o in owners) if owners else 'module-level helpers') + '.')
    bases = sorted({base for d in decls for base in d.owner_bases})
    lines.append('Declaring-class bases: ' +
                 (', '.join(f'`{base}`' for base in bases) if bases else 'none or module-level declaration.'))
    all_delegate = sorted(set().union(*(body_evidence(d.node).get('delegates to', set()) for d in decls)))
    if all_delegate:
        lines.append('Direct construction/delegation targets found in the Python bodies: ' +
                     ', '.join(f'`{x}`' for x in all_delegate) + '.')
    else:
        lines.append('No literal child/delegation target is present in the primary Python bodies.')
    lines += ['', '## Common parameters', '']
    for d in decls:
        lines += [f'### `{d.ref}`', '', '| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |',
                  '| --- | --- | --- | --- | --- | --- |']
        descriptions = doc_params(d.node)
        for param, presence, default, annotation in defaults(d.node):
            bare = param.lstrip('*')
            desc = descriptions.get(bare) or descriptions.get(f'**{bare}') or 'No parameter docstring in the primary declaration.'
            binding = 'Legacy Source binding syntax may be accepted; exact consumer must be followed.' if not param.startswith('*') else 'Arbitrary names may include bindings; the boundary is open.'
            lines.append(f'| `{param}` | {annotation.replace("|", "\\|")} | {presence} | {default} | {binding} | {desc.replace("|", "\\|")} |')
        evidence = body_evidence(d.node)
        for label in ('consumed kwargs', 'prefix families', 'forwarded keyword names',
                      'produced/forwarded fields', 'conditions'):
            if evidence.get(label):
                lines += ['', f'- **{label.capitalize()}:** ' + ', '.join(f'`{x}`' for x in sorted(evidence[label]))]
        if d.node.args.kwarg:
            lines += ['', f'`**{d.node.args.kwarg.arg}` is not a closed parameter set. The declaration forwards or '
                      'interprets additional names; user-defined callbacks, prefixed attributes and downstream '
                      'widget/server consumers can extend it. Only statically discoverable names are listed above.']
    lines += ['', '## Behavior, output and errors', '']
    for d in decls:
        doc = (ast.get_docstring(d.node) or '').strip()
        summary = ' '.join(doc.split()) if doc else 'No behavior docstring is present in the primary declaration.'
        lines.append(f'- `{d.ref}`: {summary}')
    lines.append('- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.')
    lines += ['', '## Primary Python implementation evidence', '']
    for d in decls:
        source = d.source.read_text()
        segment = ast.get_source_segment(source, d.node) or ast.unparse(d.node)
        lines += [f'### `{d.ref}`', '', '```python', segment, '```', '']
    lines += ['', '## Abstract extension hooks', '']
    prefixes = sorted(set().union(*(body_evidence(d.node).get('prefix families', set()) for d in decls)))
    lines.append('Statically visible extension families: ' + (', '.join(f'`{x}`' for x in prefixes) if prefixes else 'none in the primary declaration bodies.'))
    lines.append('Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.')
    example = ((f"root.{name}(...)" if name.isidentifier() else f"root.child({name!r}, ...)")
               if public else '# Internal/reference symbol; no public authoring call.')
    lines += ['', '## Generic example', '', '```python',
              '# Legacy discovery example; availability in Gramlot depends on Status.',
              example, '```', '', '## Code and evidence', '']
    lines.extend(f'- `{d.ref}`' for d in decls)
    if registered:
        lines.append('- Name appears in a literal legacy namespace registration list or child/tag construction.')
    if implementation_refs:
        lines.append('- Current Gramlot name-level evidence: ' +
                     ', '.join(f'`{ref}`' for ref in sorted(implementation_refs)) + '.')
    lines += ['', '## Incompatibilità Genropy legacy', '']
    if implemented:
        lines.append('A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.')
    elif public:
        lines.append('No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.')
    else:
        lines.append('This is internal/reference legacy machinery rather than a public Gramlot contract; applicability is **da verificare**.')
    return '\n'.join(lines) + '\n'


def main() -> None:
    declarations: list[Decl] = []
    exclusions = []
    registrations = set()
    source_files = sorted(path for directory in PRIMARY_DIRS for path in directory.glob('*.py'))
    for path in source_files:
        found, nested = direct_declarations(path)
        declarations.extend(found)
        exclusions.extend((path, *item) for item in nested)
        registrations |= literal_registrations(path)
    grouped: dict[str, list[Decl]] = defaultdict(list)
    spelling: dict[str, str] = {}
    for decl in declarations:
        key = decl.node.name.lower()
        grouped[key].append(decl)
        spelling.setdefault(key, decl.node.name)
    for name in registrations:
        spelling.setdefault(name.lower(), name)
        grouped.setdefault(name.lower(), [])
    current = current_names()
    public_keys = {key for key, values in grouped.items()
                   if any(d.kind == 'public authoring declaration' for d in values)
                   or key in {x.lower() for x in registrations}}
    CARDS.mkdir(parents=True, exist_ok=True)
    expected = set()
    for key in sorted(grouped):
        name = spelling[key]
        path = CARDS / f'{safe_name(name)}.md'
        expected.add(path)
        path.write_text(render_card(name, grouped[key], key in {x.lower() for x in registrations},
                                    current.get(key, set())))
    for stale in CARDS.glob('*.md'):
        if stale not in expected:
            stale.unlink()

    manifest = ['# Legacy coverage manifest', '',
                'Generated by `reference/generate_census.py` from the two owner-selected Python source trees.', '',
                f'- Primary files: **{len(source_files)}**',
                f'- Direct module/class declarations: **{len(declarations)}**',
                f'- Literal registered/constructed names: **{len(registrations)}**',
                f'- Unique cards: **{len(grouped)}**',
                f'- Explicit class/container and nested-closure exclusions: **{len(exclusions)}**',
                f'- Public authoring declarations: **{sum(d.kind == "public authoring declaration" for d in declarations)}**',
                f'- Internal/protocol/module helpers: **{sum(d.kind != "public authoring declaration" for d in declarations)}**', '',
                f'- Name-level current Gramlot matches: **{sum(key in current for key in grouped)}**',
                f'- Public legacy identities marked `da implementare`: **{sum(key not in current for key in public_keys)}**', '',
                '## Source files', '']
    manifest.extend(f'- `{p}`' for p in source_files)
    manifest += ['', '## Declaration and registration mapping', '',
                 '| Identity | Classification | Coverage | Card |', '| --- | --- | --- | --- |']
    for key in sorted(grouped):
        name = spelling[key]
        kinds = ', '.join(sorted({d.kind for d in grouped[key]})) or 'literal registration without direct declaration'
        refs = '; '.join(d.ref for d in grouped[key]) or 'namespace/tag literal'
        manifest.append(f'| `{name}` | {kinds} | {refs.replace("|", "\\|")} | [card](cards/{safe_name(name)}.md) |')
    manifest += ['', '## Reasoned exclusions', '',
                 'Nested function definitions are implementation closures, not independently authorable nodes. '
                 'They remain mapped here so the extraction has no silent omissions.', '',
                 '| Symbol | Reason | Source |', '| --- | --- | --- |']
    for path, name, reason, line in exclusions:
        manifest.append(f'| `{name}` | {reason} | `{path}:L{line}` |')
    (ROOT / 'legacy-census' / 'coverage-manifest.md').write_text('\n'.join(manifest) + '\n')

    # Secondary evidence index: exact identifier references outside the primary
    # declarations. These are navigation candidates, not semantic claims.
    genropy_root = LEGACY.parents[2]
    secondary_files = sorted(
        list((LEGACY).rglob('*.py'))
        + list((genropy_root / 'gnrjs').rglob('*.js'))
    )
    primary_set = set(source_files)
    spell_to_key = {spelling[key]: key for key in grouped}
    pattern = re.compile(r'(?<![A-Za-z0-9_])(' + '|'.join(
        re.escape(name) for name in sorted(spell_to_key, key=len, reverse=True)
    ) + r')(?![A-Za-z0-9_])')
    consumers: dict[str, set[Path]] = defaultdict(set)
    for path in secondary_files:
        if path in primary_set:
            continue
        try:
            source = path.read_text(errors='replace')
        except OSError:
            continue
        for match in pattern.finditer(source):
            consumers[spell_to_key[match.group(1)]].add(path)
    index = ['# Secondary implementation-reference index', '',
             'This index lists files containing exact identifier references outside the primary '
             'declaration files. A hit is a navigation aid for consumer review; it does not prove '
             'that a parameter or behavior is active.', '',
             '| Identity | Referencing files |', '| --- | --- |']
    for key in sorted(grouped):
        refs = sorted(consumers.get(key, set()))
        rendered = '<br>'.join(f'`{path.relative_to(genropy_root)}`' for path in refs) or 'none found'
        index.append(f'| `{spelling[key]}` | {rendered} |')
    (ROOT / 'legacy-census' / 'implementation-reference-index.md').write_text('\n'.join(index) + '\n')

    unresolved = ['# Unresolved implementation evidence', '',
                  'The syntactic census is complete for direct declarations and literal registrations in the primary Python trees. '
                  'The following evidence cannot be resolved mechanically and remains review work:', '',
                  '- Dynamic registrations or names computed outside literal namespace lists.',
                  '- Parameters consumed only after `**kwargs` forwarding into JavaScript, server endpoints, database models or application-defined handlers.',
                  '- Exact binding support for each individual parameter.',
                  '- Runtime precedence among mixins, widget adapters, prefixed kwargs and dynamically selected methods.',
                  '- Parameters accepted but ignored, deprecated branches and bugs outside the primary Python declaration body.',
                  '- Semantic correspondence where Gramlot and legacy share a name but implement different scopes.', '',
                  'Use [the secondary implementation-reference index](implementation-reference-index.md) to navigate '
                  'exact-name consumer candidates without mistaking occurrence for verified behavior.', '',
                  'These are explicit evidence limits, not claims of compatibility or implementation.', '']
    (ROOT / 'legacy-census' / 'unresolved-evidence.md').write_text('\n'.join(unresolved))


if __name__ == '__main__':
    main()
