# formbuilder_formlet

## Identity

- **Identity:** `formbuilder_formlet`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formbuilder_formlet:L1067`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `cols` | not declared | optional | `1` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | number of grid columns (default 1) |
| `table` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | dotted table name (e.g. ``'myapp.mytable'``); falls back to page maintable |
| `formlet` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | formlet code to load a pre-defined formlet definition |
| `lblpos` | not declared | optional | `'L'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | legacy label-position shorthand – ``'L'`` (left), ``'T'`` (top), |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | forwarded to :meth:`formlet`; any ``lbl_*`` / ``fld_*`` / ``row_*`` |

- **Consumed kwargs:** `item_lbl_side`

- **Forwarded keyword names:** `columns`, `formletCode`, `pop`, `slice_prefix`, `table`

- **Produced/forwarded fields:** `B`, `L`, `R`, `T`

- **Conditions:** `'item_lbl_side' not in kwargs`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formbuilder_formlet:L1067`: Formlet-based backend for :meth:`formbuilder` when the *use_formlets* preference is active. Translates legacy ``formbuilder`` parameters into the :meth:`formlet` / gridbox attribute convention (``item_lbl_*``, ``item_fld_*``, …) and delegates to :meth:`formlet`. :param cols: number of grid columns (default 1) :param table: dotted table name (e.g. ``'myapp.mytable'``); falls back to page maintable :param formlet: formlet code to load a pre-defined formlet definition :param lblpos: legacy label-position shorthand – ``'L'`` (left), ``'T'`` (top), ``'R'`` (right), ``'B'`` (bottom). Converted to ``item_lbl_side`` unless that kwarg is already present. :param kwargs: forwarded to :meth:`formlet`; any ``lbl_*`` / ``fld_*`` / ``row_*`` prefixed keys are automatically promoted to their ``item_*`` equivalents.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formbuilder_formlet:L1067`

```python
def formbuilder_formlet(self, cols=1, table=None, formlet=None, lblpos='L', **kwargs):
        """Formlet-based backend for :meth:`formbuilder` when the *use_formlets* preference is active.

        Translates legacy ``formbuilder`` parameters into the :meth:`formlet` / gridbox
        attribute convention (``item_lbl_*``, ``item_fld_*``, …) and delegates to
        :meth:`formlet`.

        :param cols: number of grid columns (default 1)
        :param table: dotted table name (e.g. ``'myapp.mytable'``); falls back to page maintable
        :param formlet: formlet code to load a pre-defined formlet definition
        :param lblpos: legacy label-position shorthand – ``'L'`` (left), ``'T'`` (top),
                       ``'R'`` (right), ``'B'`` (bottom).  Converted to ``item_lbl_side``
                       unless that kwarg is already present.
        :param kwargs: forwarded to :meth:`formlet`; any ``lbl_*`` / ``fld_*`` / ``row_*``
                       prefixed keys are automatically promoted to their ``item_*`` equivalents.
        """
        commonPrefix = ('lbl_', 'fld_', 'row_', 'tdf_', 'tdl_')
        commonKwargs = {f'item_{k}': kwargs.pop(k) for k in list(kwargs.keys()) if len(k) > 4 and k[0:4] in commonPrefix}
        commonKwargs.update(dictExtract(kwargs, 'item_', pop=False, slice_prefix=False))
        kwargs.update(commonKwargs)

        if lblpos and 'item_lbl_side' not in kwargs:
            lblpos_map = {'L': 'left', 'T': 'top', 'R': 'right', 'B': 'bottom'}
            kwargs['item_lbl_side'] = lblpos_map.get(lblpos, 'left')

        return self.formlet(columns=cols, table=table or self.page.maintable,
                            formletCode=formlet, **kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.formbuilder_formlet(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formbuilder_formlet:L1067`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
