# paletteTree

## Identity

- **Identity:** `paletteTree`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GenroWidgets`, `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
Direct construction/delegation targets found in the Python bodies: `PaletteTree`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::paletteTree:L483`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `paletteCode` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO. If no *datapath* is specified, the *paletteCode* will be used as *datapath* |
| `datapath` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | allow to create a hierarchy of your data’s addresses into the datastore. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `autoslots`, `datapath`, `paletteCode`

- **Conditions:** `datapath is None`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.
### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::PaletteTree:L329`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `sub_tags`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::paletteTree:L483`: Return a :ref:`palettetree` :param paletteCode: TODO. If no *datapath* is specified, the *paletteCode* will be used as *datapath* :param datapath: allow to create a hierarchy of your data’s addresses into the datastore. For more information, check the :ref:`datapath` and the :ref:`datastore` pages
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::PaletteTree:L329`: Palette containing a tree widget. Args: **kwargs: paletteCode, title, storepath, dockTo, width, height.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::paletteTree:L483`

```python
def paletteTree(self, paletteCode, datapath=None, **kwargs):
        """Return a :ref:`palettetree`
        
        :param paletteCode: TODO. If no *datapath* is specified, the *paletteCode* will be used as *datapath*
        :param datapath: allow to create a hierarchy of your data’s addresses into the datastore.
                         For more information, check the :ref:`datapath` and the :ref:`datastore` pages
        """
        datapath= datapath or 'gnr.palettes.%s' %paletteCode if datapath is None else datapath
        palette = self.child('PaletteTree',paletteCode=paletteCode,datapath=datapath,
                             autoslots='top,left,right,bottom',**kwargs)
        return palette
```

### `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::PaletteTree:L329`

```python
def PaletteTree(self, **kwargs):
        """Palette containing a tree widget.

        Args:
            **kwargs: paletteCode, title, storepath, dockTo, width, height.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.paletteTree(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::paletteTree:L483`
- `genropy/gnrpy/gnr/web/widgets/genro.py::GenroWidgets::PaletteTree:L329`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
