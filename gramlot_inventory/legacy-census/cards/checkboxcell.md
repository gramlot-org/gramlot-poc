# checkboxcell

## Identity

- **Identity:** `checkboxcell`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrGridStruct`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::checkboxcell:L183`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `field` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `falseclass` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the css class for the false state |
| `trueclass` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the css class for the true state |
| `nullclass` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the css class for the null state, the optional third state that you can |
| `classes` | not declared | optional | `'row_checker'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `action` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | allow to execute a javascript callback. For more information, check the |
| `name` | not declared | optional | `' '` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `calculated` | not declared | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | boolean. TODO |
| `radioButton` | not declared | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | boolean. TODO |
| `threestate` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | boolean. If ``True``, create a third state (the "null" state) besides the ``True`` |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

- **Forwarded keyword names:** `action`, `calculated`, `classes`, `dtype`, `field`, `format_falseclass`, `format_nullclass`, `format_onclick`, `format_trueclass`, `name`, `threestate`

- **Conditions:** `threestate is True`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::checkboxcell:L183`: Return a :ref:`checkboxcell` :param field: TODO :param falseclass: the css class for the false state :param trueclass: the css class for the true state :param nullclass: the css class for the null state, the optional third state that you can specify through the **threestate** parameter :param classes: TODO :param action: allow to execute a javascript callback. For more information, check the :ref:`action_attr` page :param name: TODO :param calculated: boolean. TODO :param radioButton: boolean. TODO :param threestate: boolean. If ``True``, create a third state (the "null" state) besides the ``True`` and the ``False`` state
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::checkboxcell:L183`

```python
def checkboxcell(self, field=None, falseclass=None,
                     trueclass=None,nullclass=None, classes='row_checker', action=None, name=' ',
                     calculated=False, radioButton=False,threestate=None, **kwargs):
        """Return a :ref:`checkboxcell`
        
        :param field: TODO
        :param falseclass: the css class for the false state
        :param trueclass: the css class for the true state
        :param nullclass: the css class for the null state, the optional third state that you can
                          specify through the **threestate** parameter
        :param classes: TODO
        :param action: allow to execute a javascript callback. For more information, check the
                       :ref:`action_attr` page
        :param name: TODO
        :param calculated: boolean. TODO
        :param radioButton: boolean. TODO
        :param threestate: boolean. If ``True``, create a third state (the "null" state) besides the ``True``
                           and the ``False`` state"""
        if not field:
            field = '_checked'
            calculated = True
        falseclass = falseclass or ('checkboxOff' if not radioButton else falseclass or 'radioOff')
        trueclass = trueclass or ('checkboxOn' if not radioButton else trueclass or 'radioOn')
        
        threestate = threestate or False
        if threestate is True:
            nullclass = nullclass or ('checkboxOnOff' if not radioButton else nullclass or 'radioOnOff')
        elif threestate == 'disabled':
            nullclass = 'dimmed checkboxOnOff'
        elif threestate == 'hidden':
            nullclass = 'hidden'
        self.cell(field, name=name, format_trueclass=trueclass, format_falseclass=falseclass,format_nullclass=nullclass,
                  classes=classes, calculated=calculated, format_onclick="""
                                                                    var threestate ='%(threestate)s';
                                                                    var rowpath = '#'+this.widget.absIndex(kw.rowIndex);
                                                                    var sep = this.widget.datamode=='bag'? '.':'?';
                                                                    var valuepath=rowpath+sep+'%(field)s';
                                                                    var storebag = this.widget.storebag();                                                                    
                                                                    var blocked = this.form? this.form.isDisabled() : false;
                                                                    var checked = storebag.getItem(valuepath);
                                                                    if (blocked || ((checked===null) && (threestate=='disabled'))){
                                                                        return;
                                                                    }
                                                                    if(threestate=='True'){
                                                                        checked = checked===false?true:checked===true?null:false;
                                                                    }else{
                                                                        checked = !checked;
                                                                    }
                                                                    storebag.setItem(valuepath, checked);
                                                                    this.publish('checked_%(field)s',{row:this.widget.rowByIndex(kw.rowIndex),
                                                                                                      pkey:this.widget.rowIdByIndex(kw.rowIndex),
                                                                                                      checked:checked});
                                                                    %(action)s
                                                                    """ % dict(field=field, action=action or '',threestate=threestate)
                  , dtype='B', **kwargs)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.checkboxcell(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/gridstruct.py::GnrGridStruct::checkboxcell:L183`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
