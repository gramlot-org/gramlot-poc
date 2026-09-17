# setFields

## Identity

- **Identity:** `setFields`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrFormBuilder`.
Declaring-class bases: `object`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::setFields:L114`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `fields` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `rowstart` | not declared | optional | `0` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `colstart` | not declared | optional | `0` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::setFields:L114`: TODO :param fields: TODO :param rowstart: TODO :param colstart: TODO
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::setFields:L114`

```python
def setFields(self, fields, rowstart=0, colstart=0):
        """TODO
        
        :param fields: TODO
        :param rowstart: TODO
        :param colstart: TODO
        """
        for field in fields:
            self.setField(field)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.setFields(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::setFields:L114`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
