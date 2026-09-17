# fullScreenDialog

## Identity

- **Identity:** `fullScreenDialog`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::fullScreenDialog:L289`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `backTitle` | not declared | optional | `'!!Back'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `_class`, `_dlg`, `action`, `background_color`, `border_bottom`, `childname`, `color`, `cursor`, `font_weight`, `fullScreen`, `height`, `style`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::fullScreenDialog:L289`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::fullScreenDialog:L289`

```python
def fullScreenDialog(self,backTitle='!!Back',**kwargs):
        dlg = self.dialog(fullScreen=True,**kwargs)
        frame = dlg.framePane(childname='center')
        bar = frame.top.slotBar('backTitle,*',_class='slotbar_toolbar_lg',font_weight='bold',
                             color='var(--mainWindow-color)',border_bottom='1px solid silver')
        btn = bar.backTitle.lightButton(action="_dlg.hide();",_dlg=dlg.js_widget,style='display:flex;align-items:center;',cursor='pointer')
        btn.div(_class="iconbox leftOut",height='25px',background_color='var(--mainWindow-color)')
        btn.div(backTitle)
        return dlg
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.fullScreenDialog(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::fullScreenDialog:L289`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
