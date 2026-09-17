# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Authoring declarations for browser-owned local data logic."""
from genro_builders.builder import element


class LogicElementDeclarations:
    """Gramlot-owned server provider tags added to the generic HTML grammar."""

    @element(sub_tags='', _meta={'data_element': 'store'})
    def bagDb(self, **kwargs): ...

    @element(sub_tags='', _meta={'data_element': 'controller'})
    def dataRecord(self, **kwargs): ...

    @element(sub_tags='', _meta={'data_element': 'controller'})
    def dataRelationTree(self, **kwargs): ...

    @element(sub_tags='', _meta={'data_element': 'controller'})
    def dataSelection(self, **kwargs): ...

    @element(sub_tags='', _meta={'data_element': 'rpc'})
    def dataRpc(self, **kwargs): ...

    @element(sub_tags='', _meta={'data_element': 'rpc'})
    def rpcStore(self, **kwargs): ...

    @element(sub_tags='', _meta={'data_element': 'store'})
    def bagStore(self, **kwargs): ...

    @element(sub_tags='', _meta={'data_element': 'source'})
    def remoteSource(self, **kwargs): ...


class LogicDeclarations:
    """Mixin for the :class:`gramlot.builder.AuthoringNode` facade."""

    def bagDb(self, *, adapter, source, tables):
        """Register a Source-owned local BagDB from an immutable fixture snapshot."""
        if not all(isinstance(v, str) and v for v in (adapter, source)):
            raise TypeError('bagDb requires adapter and a Data source path')
        if not isinstance(tables, dict) or not tables:
            raise TypeError('bagDb requires a table registry')
        return self._declaration('bagDb', adapter=adapter, source=source, tables=tables)

    def dataRelationTree(self, destination, *, adapter, dbtable, maxDepth=3,
                         maxNodes=100, statuspath=None, _on_start=True):
        """Materialize bounded model metadata for the shared storeTree component."""
        return self._database_read('dataRelationTree', destination, adapter, dbtable,
                                   maxDepth=maxDepth, maxNodes=maxNodes,
                                   statuspath=statuspath, _on_start=_on_start)

    def dataRecord(self, destination, *, adapter, dbtable, pkey, fields=None,
                   statuspath=None, _on_start=True):
        """Read one record through a named JS adapter; missing writes None."""
        return self._database_read('dataRecord', destination, adapter, dbtable,
                                   pkey=pkey, fields=fields, statuspath=statuspath,
                                   _on_start=_on_start)

    def dataSelection(self, destination, *, adapter, dbtable, where=None, fields=None,
                      orderBy=None, limit=50, statuspath=None, _on_start=True):
        """Read a bounded collection into a Bag with row attributes for grids."""
        return self._database_read('dataSelection', destination, adapter, dbtable,
                                   where=where, fields=fields, orderBy=orderBy,
                                   limit=limit, statuspath=statuspath, _on_start=_on_start)

    def _database_read(self, tag, destination, adapter, dbtable, **attrs):
        if not all(isinstance(v, str) and v for v in (destination, adapter, dbtable)):
            raise TypeError('Database reads require destination, adapter and dbtable')
        result = self._declaration(tag, destination=destination, adapter=adapter,
                                  dbtable=dbtable, **attrs)
        if tag == 'dataRecord' and attrs.get('pkey') is None:
            result.node.set_attr({'pkey': None}, _remove_null_attributes=False)
        return result

    def dataSetter(self, destination, value, **attrs):
        """Assign ``value`` to a Data destination when this branch is installed."""
        if not isinstance(destination, str) or not destination:
            raise TypeError('dataSetter destination must be a nonempty string')
        declaration = self._declaration('dataSetter', destination=destination, **attrs)
        # Generic Bag authoring removes null attributes by default. A setter's
        # explicit None is data, so retain it deliberately on the Source node.
        declaration.node.set_attr({'value': value}, _remove_null_attributes=False)
        return declaration

    def data(self, destination, value, **attrs):
        """Compatibility spelling for :meth:`dataSetter`."""
        return self.dataSetter(destination, value, **attrs)

    def dataFormula(self, destination, formula, **attrs):
        """Declare a JavaScript expression which writes ``destination``."""
        if 'func' in attrs:
            raise TypeError('dataFormula uses formula; func is not supported')
        if not isinstance(destination, str) or not destination:
            raise TypeError('dataFormula destination must be a nonempty string')
        if not isinstance(formula, str) or not formula:
            raise TypeError('dataFormula requires a nonempty JavaScript expression')
        return self._declaration('dataFormula', destination=destination, formula=formula, **attrs)

    def dataController(self, func, **attrs):
        """Declare a JavaScript side-effect script (stored as ``func`` on Source)."""
        if not isinstance(func, str) or not func:
            raise TypeError('dataController requires a nonempty JavaScript script')
        return self._declaration('dataController', func=func, **attrs)

    @staticmethod
    def _page_method_reference(method, expected_role):
        if callable(method):
            from gramlot.page import WebPage

            owner = getattr(method, '__self__', None)
            function = getattr(method, '__func__', method)
            if (not isinstance(owner, WebPage)
                    or getattr(function, '__gramlot_page_role__', None) != expected_role):
                decorator = '@endpoint' if expected_role == 'data' else '@source'
                raise TypeError(
                    f'Callable page methods must be bound and marked {decorator}'
                )
            return function.__name__
        if not isinstance(method, str) or not method:
            raise TypeError('Service method must be a nonempty logical name')
        return method

    def dbSelect(self, *, rpcmethod=None, dbtable=None, dbadapter=None, **attrs):
        if dbadapter is not None:
            if rpcmethod is not None or not dbtable:
                raise TypeError("Local dbSelect requires dbtable and no rpcmethod")
            return self._declaration("dbSelect", dbadapter=dbadapter, dbtable=dbtable, **attrs)
        if rpcmethod is None:
            if not isinstance(dbtable, str) or not dbtable:
                raise TypeError('dbSelect requires dbtable or an explicit rpcmethod')
            unsupported = {'auxColumns', 'columns', 'hiddenColumns', 'rowcaption',
                           'condition', 'exclude', 'order_by', 'alternatePkey',
                           'weakCondition', 'preferred', 'invalidItemCondition',
                           'excludeDraft', 'subtable', 'ignorePartition', 'dbstore',
                           '_storename', 'selectmethod', 'applymethod', 'method', 'table',
                           'distinct', 'selectedRecord', 'auxColumns_template'}
            rejected = set(attrs) & unsupported
            rejected.update(k for k in attrs if k.startswith(('condition_', 'kw_')))
            rejected.update(k for k in attrs if k.startswith('selected_')
                            and k not in ('selected_id', 'selected_caption'))
            if rejected:
                raise ValueError('Minimum dbSelect does not support: ' + ', '.join(sorted(rejected)))
            attrs.update(kw_dbtable=dbtable, kw_ignoreCase=attrs.pop('ignoreCase', True),
                         kw_limit=attrs.pop('limit', 10))
            rpcmethod = 'dbhandler.dbselect'
        elif dbtable is not None:
            attrs['dbtable'] = dbtable
        return self._declaration("dbSelect", rpcmethod=self._page_method_reference(rpcmethod, "data"), **attrs)

    def remoteSelect(self, *, rpcmethod, **attrs):
        return self._declaration("remoteSelect", rpcmethod=self._page_method_reference(rpcmethod, "data"), **attrs)

    def dataRpc(self, destination, method=None, **params):
        """Call an explicitly exposed server method through the shared RPC service.

        ``destination`` may be omitted when the first argument is a marked bound
        page method.  A callable is serialized as its logical method name; Python
        code is never sent to the browser.
        """
        if callable(destination) and method is None:
            destination, method = None, destination
        if '_concurrency' in params:
            raise TypeError('_concurrency is not supported; dataRpc owns one pending call')
        method = self._page_method_reference(method, 'data')
        if destination is not None and (not isinstance(destination, str) or not destination):
            raise TypeError('dataRpc destination must be a nonempty string or None')
        attrs = dict(method=method, **params)
        if destination is not None:
            attrs['destination'] = destination
        return self._declaration('dataRpc', **attrs)

    def rpcStore(self, rpcmethod, *, storeCode, storepath, _identifier, **params):
        """Declare a named RPC collection; typed rows become a browser Bag."""
        if '_concurrency' in params:
            raise TypeError('_concurrency is not supported')
        if '_onStart' in params:
            params['_on_start'] = params.pop('_onStart')
        for name, value in dict(storeCode=storeCode, storepath=storepath,
                                _identifier=_identifier).items():
            if not isinstance(value, str) or not value:
                raise TypeError(f'{name} must be a nonempty string')
        return self._declaration('rpcStore', method=self._page_method_reference(rpcmethod, 'data'),
                                 storeCode=storeCode, storepath=storepath,
                                 _identifier=_identifier, **params)

    def bagStore(self, *, storeCode, storepath, _identifier=None, datamode='bag'):
        """Declare a shared collection over an existing Data Bag."""
        if not storeCode or not storepath:
            raise TypeError('bagStore requires storeCode and storepath')
        return self._declaration('bagStore', storeCode=storeCode, storepath=storepath,
                                 _identifier=_identifier, datamode=datamode)

    def selectionStore(self, rpcmethod, *, chunkSize=None, **params):
        """Declare a backend-independent selection, optionally loaded in pages."""
        if chunkSize is not None:
            if isinstance(chunkSize, bool) or not isinstance(chunkSize, int) or chunkSize < 1:
                raise ValueError('chunkSize must be a positive integer')
            params['_chunkSize'] = chunkSize
        return self.rpcStore(rpcmethod, _storeType='VirtualSelection' if chunkSize else 'Selection', **params)

    def formStore(self, storeType='memory', *, loadmethod=None, savemethod=None, **attributes):
        """Configure the enclosing form's memory, item, collection or RPC store."""
        from genro_builders.builder import SourceBagNode
        if not isinstance(self.node, SourceBagNode) or self.node.node_tag != 'form':
            raise TypeError('formStore must be configured on a form')
        if storeType not in ('memory', 'item', 'collection', 'subform', 'hierarchical', 'record'):
            raise ValueError('Unknown form store type')
        if storeType == 'record':
            if loadmethod is None or savemethod is None:
                raise TypeError('Record store requires loadmethod and savemethod')
            attributes.update(loadmethod=self._page_method_reference(loadmethod, 'data'),
                              savemethod=self._page_method_reference(savemethod, 'data'))
        self.node.attr.update(storeType=storeType, **attributes)
        return self

    def fsStore(self, *, root, path='', rpcmethod='directory_selection', **params):
        """Declare a flat, read-only directory collection."""
        params.setdefault('_identifier', 'path')
        return self.rpcStore(rpcmethod, root=root, path=path, _storeType='FileSystem', **params)

    def remote(self, method, **params):
        """Configure this existing contentPane with server-built Source.

        The provider is a transparent child owned by the container. This initial
        experiment deliberately supports only contentPane destinations.
        """
        from genro_builders.builder import SourceBagNode

        if not isinstance(self.node, SourceBagNode) or self.node.node_tag != 'contentPane':
            raise TypeError('remote is currently supported only on an existing contentPane')
        method = self._page_method_reference(method, 'source')
        params.setdefault('_on_start', True)
        return self._declaration('remoteSource', method=method, **params)
