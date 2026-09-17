# formbuilder

## Identity

- **Identity:** `formbuilder`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formbuilder:L990`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `*args` | not declared | optional variadic | empty tuple | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `dbtable`, `formlet`, `item_lbl_side`, `table`, `useFormlet`

- **Forwarded keyword names:** `pkg`

- **Conditions:** `kwFormlet is not False`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formbuilder:L990`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formbuilder:L990`

```python
def formbuilder(self,*args,**kwargs):
        dbtable = kwargs.get('table') 
        if not dbtable:
            dbtable = kwargs.get('dbtable') or self.getInheritedAttributes().get('table')
            kwargs['table'] = dbtable
        defaultUseFormlet = self.page.pageOptions.get('useFormlet') or \
                            self.page.getPreference('theme.use_formlets',pkg='sys')
        if dbtable and not defaultUseFormlet:
            useFormletCb = getattr(self.page.db.table(dbtable),'useFormlet',None)
            if useFormletCb:
                defaultUseFormlet = useFormletCb()

        kwFormlet = kwargs.get('formlet')
        if kwFormlet is not False and defaultUseFormlet:
            kwargs.setdefault('item_lbl_side','left')
            return self.formbuilder_formlet(*args,**kwargs)
        else:
            return self.formbuilder_table(*args,**kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.formbuilder(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formbuilder:L990`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
