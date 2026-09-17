# mobileFormBuilder

## Identity

- **Identity:** `mobileFormBuilder`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::mobileFormBuilder:L961`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `margin_right` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `_class` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `cols`

- **Forwarded keyword names:** `_class`, `border_spacing`, `enableZoom`, `fld_html_label`, `fld_width`, `fldalign`, `formlet`, `lbl_font_size`, `lbl_font_weight`, `lbl_padding_top`, `lbl_text_align`, `lblpos`, `margin_right`, `width`

- **Conditions:** `kwargs.get('cols', 1) > 1`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::mobileFormBuilder:L961`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::mobileFormBuilder:L961`

```python
def mobileFormBuilder(self,margin_right=None,_class=None,**kwargs):
        margin_right = margin_right or '10px'
        box = self.div(margin_right=margin_right)
        fld_width='100%'
        if kwargs.get('cols',1)>1:
            fld_width = f'calc(100% - {margin_right})'
        pars = dict(border_spacing='8px 0px', 
                        width='100%',fld_width=fld_width,lblpos='T',
                        lbl_text_align='left',lbl_font_size='.8em',
                        lbl_padding_top='4px',enableZoom=False,
                        lbl_font_weight='bold',fldalign='left',
                        fld_html_label=True,
                        _class=_class or 'mobilefields',
                        formlet=False)
        pars.update(kwargs)
        return box.formbuilder(**pars)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.mobileFormBuilder(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::mobileFormBuilder:L961`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
