# field

## Identity

- **Identity:** `field`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc_dojo_11`.
Declaring-class bases: `GnrDomSrc`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::field:L866`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `field` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | MANDATORY - the column name to which field refers to. For more information, |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | * **lbl**: Set the label of the field. If you don't specify it, then |

- **Consumed kwargs:** `lbl`, `tag`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::field:L866`: ``field`` is used to view, select and modify data included in a database :ref:`table`. Its type is inherited from :ref:`the type of data <datatype>` contained in the table to which ``field`` refers. For example, if the ``field`` is related to a column with the dtype set to "L" (integer number), then the relative widget is a :ref:`numbertextbox`, if the related column has a dtype set to "D", then the relative widget is a :ref:`datetextbox`, and so on .. note:: ``field`` MUST be a child of the :ref:`formbuilder` form widget, and ``formbuilder`` itself MUST have a :ref:`datapath` for inner relative path gears :param field: MANDATORY - the column name to which field refers to. For more information, check the :ref:`field_attr_field` section :param kwargs: * **lbl**: Set the label of the field. If you don't specify it, then ``field`` will inherit it from the :ref:`name_long` attribute of the requested data * **rowcaption**: the textual representation of a record in a user query. For more information, check the :ref:`rowcaption` section
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::field:L866`

```python
def field(self, field=None, **kwargs):
        """``field`` is used to view, select and modify data included in a database :ref:`table`.

        Its type is inherited from :ref:`the type of data <datatype>` contained in the table to which
        ``field`` refers. For example, if the ``field`` is related to a column with the dtype set
        to "L" (integer number), then the relative widget is a :ref:`numbertextbox`, if the related
        column has a dtype set to "D", then the relative widget is a :ref:`datetextbox`, and so on

        .. note:: ``field`` MUST be a child of the :ref:`formbuilder` form widget, and
                  ``formbuilder`` itself MUST have a :ref:`datapath` for inner relative path gears
        
        :param field: MANDATORY - the column name to which field refers to. For more information,
                      check the :ref:`field_attr_field` section
        :param kwargs:
        
                       * **lbl**: Set the label of the field. If you don't specify it, then
                         ``field`` will inherit it from the :ref:`name_long` attribute of the requested data
                       * **rowcaption**: the textual representation of a record in a user query.
                         For more information, check the :ref:`rowcaption` section
        """
        newkwargs = self.prepareFieldAttributes(field, **kwargs)
        kwargs.pop('lbl',None)
        newkwargs.update(kwargs)
        tag = newkwargs.pop('tag')
        handler = getattr(self,tag)
        return handler(**newkwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.field(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/dojo11.py::GnrDomSrc_dojo_11::field:L866`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
