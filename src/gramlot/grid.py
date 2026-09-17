# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Legacy-style structure authoring; transport snapshots contain ordinary Bags."""
from genro_bag import Bag


class GridStruct(Bag):
    """Declare view/rows/cell nodes with column definitions in attributes."""

    def _branch(self, tag, attrs):
        child = GridStruct()
        child._struct_root = getattr(self, '_struct_root', self)
        index = 0
        while self.get_node(f'{tag}_{index}') is not None:
            index += 1
        self.set_item(f'{tag}_{index}', child, tag=tag, **attrs)
        return child

    def view(self, **attrs):
        return self._branch('view', attrs)

    def rows(self, **attrs):
        return self._branch('rows', attrs)

    def columnset(self, code=None, name=None, columns=None, **attrs):
        """Declare a legacy column group; its cells remain in the flat rows Bag."""
        if not code:
            raise ValueError('columnset requires a code')
        root = getattr(self, '_struct_root', self)
        info = root.get_item('info')
        if info is None:
            info = Bag()
            root.set_item('info', info)
        groups = info.get_item('columnsets')
        if groups is None:
            groups = Bag()
            info.set_item('columnsets', groups)
        group = GridStruct()
        group._struct_root = root
        group._columnset_rows = self
        group._columnset_code = code
        group._cell_defaults = {key[6:]: value for key, value in attrs.items() if key.startswith('cells_')}
        groups.set_item(code, group, tag='columnset', code=code, name=name or code,
                        **{key: value for key, value in attrs.items() if not key.startswith('cells_')})
        for definition in columns or []:
            definition = dict(definition)
            tag = definition.pop('tag', group._cell_defaults.get('tag', 'cell'))
            if tag != 'cell':
                raise ValueError(f'Unsupported columnset cell tag: {tag}')
            group.cell(**definition)
        return group

    def cell(self, field=None, name=None, width=None, dtype=None, **attrs):
        if hasattr(self, '_columnset_rows'):
            defaults = {key: value for key, value in self._cell_defaults.items() if key != 'tag'}
            defaults.update(attrs)
            defaults['columnset'] = self._columnset_code
            for key, value in [('name', name), ('width', width), ('dtype', dtype)]:
                if value is not None:
                    defaults[key] = value
            return self._columnset_rows.cell(field, **defaults)
        index = 0
        while self.get_node(f'cell_{index}') is not None:
            index += 1
        definition = dict(attrs, tag='cell', field=field, name=name or field,
                          width=width, dtype=dtype)
        definition = {key: value for key, value in definition.items() if value is not None}
        self.set_item(f'cell_{index}', '', **definition)
        return self.get_node(f'cell_{index}')
