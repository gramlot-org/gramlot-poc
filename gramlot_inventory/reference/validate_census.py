"""Validate generated census coverage, card schema and local Markdown links."""
from __future__ import annotations

import ast
import re
from pathlib import Path

import generate_census as census

REQUIRED = (
    'Identity',
    'Bases, mixins and composition',
    'Common parameters',
    'Behavior, output and errors',
    'Primary Python implementation evidence',
    'Abstract extension hooks',
    'Generic example',
    'Code and evidence',
    'Incompatibilità Genropy legacy',
)


def main() -> None:
    errors: list[str] = []
    declarations = []
    registrations = set()
    for directory in census.PRIMARY_DIRS:
        for path in sorted(directory.glob('*.py')):
            found, _ = census.direct_declarations(path)
            declarations.extend(found)
            registrations |= census.literal_registrations(path)
    keys = {decl.node.name.lower() for decl in declarations} | {name.lower() for name in registrations}
    cards = list(census.CARDS.glob('*.md'))
    if len(cards) != len(keys):
        errors.append(f'expected {len(keys)} cards, found {len(cards)}')
    card_names = {path.stem.lower() for path in cards}
    spellings = {name.lower(): name for name in registrations}
    for decl in declarations:
        spellings[decl.node.name.lower()] = decl.node.name
    expected_names = {census.safe_name(spellings[key]).lower() for key in keys}
    for name in sorted(expected_names - card_names):
        errors.append(f'missing card {name}')
    for path in cards:
        text = path.read_text()
        headings = re.findall(r'^## (.+)$', text, re.M)
        for heading in REQUIRED:
            if heading not in headings:
                errors.append(f'{path}: missing {heading}')
        if not headings or headings[-1] != 'Incompatibilità Genropy legacy':
            errors.append(f'{path}: final section is not exact')
        if '**Status:**' not in text:
            errors.append(f'{path}: missing status')
    for path in census.ROOT.rglob('*.md'):
        for target in re.findall(r'\[[^]]+\]\(([^)#]+)(?:#[^)]+)?\)', path.read_text()):
            if '://' not in target and not (path.parent / target).resolve().exists():
                errors.append(f'{path}: broken link {target}')
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'coverage: {len(declarations)} declarations + {len(registrations)} literal names -> {len(cards)} cards')
    print('schema, final-section and local-link checks: passed')


if __name__ == '__main__':
    main()
