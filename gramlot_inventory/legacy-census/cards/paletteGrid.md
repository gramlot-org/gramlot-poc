# paletteGrid

## Identity

- **Identity:** `paletteGrid`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `paletteGrid`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::paletteGrid:L495`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `paletteCode` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | create the paletteGrid :ref:`nodeid` (if no *gridId* is defined) |
| `struct` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the name of the method that defines the :ref:`struct` |
| `columns` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | it represents the :ref:`columns` to be returned by the "SELECT" |
| `structpath` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `datapath` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | allow to create a hierarchy of your data’s addresses into the datastore. |
| `viewResource` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | in the kwargs you find: |

- **Consumed kwargs:** `gridId`

- **Forwarded keyword names:** `autoslots`, `columns`, `datapath`, `paletteCode`, `struct`, `structpath`, `viewResource`

- **Conditions:** `datapath is None`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::paletteGrid:L495`: Return a :ref:`palettegrid` :param paletteCode: create the paletteGrid :ref:`nodeid` (if no *gridId* is defined) and create the paletteGrid :ref:`datapath` (if no *datapath* is defined) :param struct: the name of the method that defines the :ref:`struct` :param columns: it represents the :ref:`columns` to be returned by the "SELECT" clause in the traditional sql query. For more information, check the :ref:`sql_columns` section :param structpath: TODO :param datapath: allow to create a hierarchy of your data’s addresses into the datastore. For more information, check the :ref:`datapath` and the :ref:`datastore` pages :param kwargs: in the kwargs you find: * *dockButton*: boolean. if ``True``, TODO * *grid_filteringGrid*: the path of the :ref:`grid` that handle the :ref:`struct`. For example, in the :ref:`th` component the standard path for a grid is ``th.view.grid`` * *grid_filteringColumn*: allow the sincronization between the choosen columns and the not choosen ones (so, if user drag a column in a grid, then this column doesn't appear anymore in the palette) The syntax is:: grid_filteringColumn='id:COLUMN' Where ``COLUMN`` is the name of a :ref:`column` TODO * *title*: the title of the paletteGrid
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::paletteGrid:L495`

```python
def paletteGrid(self, paletteCode=None, struct=None,
                     columns=None, structpath=None, 
                     datapath=None,viewResource=None, **kwargs):
        """Return a :ref:`palettegrid`
        
        :param paletteCode: create the paletteGrid :ref:`nodeid` (if no *gridId* is defined)
                            and create the paletteGrid :ref:`datapath` (if no *datapath* is defined)
        :param struct: the name of the method that defines the :ref:`struct`
        :param columns: it represents the :ref:`columns` to be returned by the "SELECT"
                        clause in the traditional sql query. For more information, check the
                        :ref:`sql_columns` section
        :param structpath: TODO
        :param datapath: allow to create a hierarchy of your data’s addresses into the datastore.
                         For more information, check the :ref:`datapath` and the :ref:`datastore` pages
        :param kwargs: in the kwargs you find:
                       
                       * *dockButton*: boolean. if ``True``, TODO
                       * *grid_filteringGrid*: the path of the :ref:`grid` that handle the :ref:`struct`.
                         For example, in the :ref:`th` component the standard path for a grid is ``th.view.grid``
                       * *grid_filteringColumn*: allow the sincronization between the choosen columns and the
                         not choosen ones (so, if user drag a column in a grid, then this column doesn't appear
                         anymore in the palette)
                         
                         The syntax is::
                         
                            grid_filteringColumn='id:COLUMN'
                            
                         Where ``COLUMN`` is the name of a :ref:`column` TODO
                            
                       * *title*: the title of the paletteGrid
        """
        datapath= datapath or 'gnr.palettes.%s' %paletteCode if datapath is None else datapath
        structpath = structpath or '.grid.struct'
        kwargs['gridId'] = kwargs.get('gridId') or '%s_grid' %paletteCode
        paletteGrid = self.child('paletteGrid',paletteCode=paletteCode,
                                structpath=structpath,datapath=datapath,
                                viewResource=viewResource,
                                autoslots='top,left,right,bottom',**kwargs)
        if struct or columns or not structpath:
            paletteGrid.gridStruct(struct=struct,columns=columns)
        return paletteGrid
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.paletteGrid(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::paletteGrid:L495`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
