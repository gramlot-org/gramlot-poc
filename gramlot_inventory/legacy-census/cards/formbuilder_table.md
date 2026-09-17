# formbuilder_table

## Identity

- **Identity:** `formbuilder_table`
- **Type:** component/helper
- **Level:** COMPOSED
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `table`, `tbody`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formbuilder_table:L1097`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `cols` | not declared | optional | `1` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | set the number of columns |
| `table` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`database table <table>` name on which the query will be executed, |
| `tblclass` | not declared | optional | `'formbuilder'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the standard class for the formbuilder. Default value is ``'formbuilder'``, |
| `lblclass` | not declared | optional | `'gnrfieldlabel'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | set CSS label style |
| `lblpos` | not declared | optional | `'L'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | set label position: ``L``: set label on the left side of text field |
| `byColumn` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `_class` | not declared | optional | `''` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | for CSS style |
| `fieldclass` | not declared | optional | `'gnrfield'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the CSS class appended to every formbuilder's child |
| `colswidth` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `lblalign` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Set horizontal label alignment (It seems broken... TODO) |
| `lblvalign` | not declared | optional | `'top'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | set vertical label alignment |
| `fldalign` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | set field horizontal align |
| `fldvalign` | not declared | optional | `'top'` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | set field vertical align |
| `disabled` | not declared | optional | `False` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | If ``True``, user can't act on the object (write, drag...). For more information, |
| `rowdatapath` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `head_rows` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |
| `spacing` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `boxMode` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `formlet` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | for the complete list of the ``**kwargs``, check the :ref:`fb_kwargs` section |

- **Consumed kwargs:** `border_spacing`, `dbtable`, `excludeCols`, `fbname`, `table`, `tdf_padding`, `tdl_padding`

- **Forwarded keyword names:** `_class`, `boxMode`, `byColumn`, `cols`, `colswidth`, `commonKwargs`, `dbtable`, `excludeCols`, `fieldclass`, `fldalign`, `fldvalign`, `head_rows`, `lblalign`, `lblclass`, `lblpos`, `lblvalign`, `min_height`, `padding_top`, `rowdatapath`, `tdf_border`, `tdf_height`, `tdf_width`, `tdl_border`, `tdl_height`

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formbuilder_table:L1097`: In :ref:`formbuilder` you can put dom and widget elements; its most classic usage is to create a :ref:`form` made by fields and layers, and that's because formbuilder can manage automatically fields and their positioning :param cols: set the number of columns :param table: the :ref:`database table <table>` name on which the query will be executed, in the form ``packageName.tableName`` (packageName is the name of the :ref:`package <packages>` to which the table belongs to) :param tblclass: the standard class for the formbuilder. Default value is ``'formbuilder'``, that actually it is the unique defined CSS class :param lblclass: set CSS label style :param lblpos: set label position: ``L``: set label on the left side of text field ``T``: set label on top of text field :param _class: for CSS style :param fieldclass: the CSS class appended to every formbuilder's child :param lblalign: Set horizontal label alignment (It seems broken... TODO) :param lblvalign: set vertical label alignment :param fldalign: set field horizontal align :param fldvalign: set field vertical align :param disabled: If ``True``, user can't act on the object (write, drag...). For more information, check the :ref:`disabled` attribute :param rowdatapath: TODO :param head_rows: TODO :param **kwargs: for the complete list of the ``**kwargs``, check the :ref:`fb_kwargs` section
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formbuilder_table:L1097`

```python
def formbuilder_table(self, cols=1, table=None, tblclass='formbuilder',
                    lblclass='gnrfieldlabel', lblpos='L',byColumn=None,
                    _class='', fieldclass='gnrfield',
                    colswidth=None,
                    lblalign=None, lblvalign='top',
                    fldalign=None, fldvalign='top', disabled=False,
                    rowdatapath=None, head_rows=None,spacing=None,boxMode=None,
                    formlet=None,**kwargs):
        """In :ref:`formbuilder` you can put dom and widget elements; its most classic usage is to create
        a :ref:`form` made by fields and layers, and that's because formbuilder can manage automatically
        fields and their positioning
        
        :param cols: set the number of columns
        :param table: the :ref:`database table <table>` name on which the query will be executed,
                      in the form ``packageName.tableName`` (packageName is the name of the
                      :ref:`package <packages>` to which the table belongs to)
        :param tblclass: the standard class for the formbuilder. Default value is ``'formbuilder'``,
                         that actually it is the unique defined CSS class
        :param lblclass: set CSS label style
        :param lblpos: set label position: ``L``: set label on the left side of text field
                       ``T``: set label on top of text field
        :param _class: for CSS style
        :param fieldclass: the CSS class appended to every formbuilder's child
        :param lblalign: Set horizontal label alignment (It seems broken... TODO)
        :param lblvalign: set vertical label alignment
        :param fldalign: set field horizontal align
        :param fldvalign: set field vertical align
        :param disabled: If ``True``, user can't act on the object (write, drag...). For more information,
                         check the :ref:`disabled` attribute
        :param rowdatapath: TODO
        :param head_rows: TODO
        :param **kwargs: for the complete list of the ``**kwargs``, check the :ref:`fb_kwargs` section"""
        if spacing:
            h_padding = float((kwargs.get('border_spacing') or '6px').replace('px',''))/2
            kwargs['border_spacing'] = '0px'
            v_padding = float(spacing)/2
            padding = '%spx %spx %spx %spx' %(v_padding,h_padding,v_padding,h_padding)
            kwargs['tdf_padding'] = padding
            kwargs['tdl_padding'] = padding

        dbtable = table or kwargs.get('dbtable') or self.getInheritedAttributes().get('table') or self.page.maintable
        if kwargs.get('fbname'):
            kwargs['fbname'] = kwargs['fbname'] if not dbtable else '%s:%s' %(dbtable,kwargs['fbname'])
        commonPrefix = ('lbl_', 'fld_', 'row_', 'tdf_', 'tdl_')
        commonKwargs = {k:kwargs.pop(k) for k in list(kwargs.keys()) if len(k) > 4 and k[0:4] in commonPrefix}

        #commonKwargs = dict([(k, kwargs.pop(k)) for k in list(kwargs.keys()) if len(k) > 4 and k[0:4] in commonPrefix])
        tbl = self.child('table', _class='%s %s' % (tblclass, _class), **kwargs).child('tbody')
        formNode = self.parentNode.attributeOwnerNode('formId') if self.parentNode else None
        excludeCols = kwargs.pop('excludeCols',None)
        if formNode:
            if not hasattr(formNode,'_mainformbuilder'):
                formNode._mainformbuilder = tbl
            if formNode.attr.get('excludeCols'):
                excludeCols = formNode.attr.pop('excludeCols')
        
        tbl.fbuilder = GnrFormBuilder(tbl, cols=int(cols), dbtable=dbtable,
                                      lblclass=lblclass, lblpos=lblpos, lblalign=lblalign, fldalign=fldalign,
                                      fieldclass=fieldclass,
                                      lblvalign=lblvalign, fldvalign=fldvalign,
                                      rowdatapath=rowdatapath,
                                      head_rows=head_rows, 
                                      excludeCols=excludeCols,
                                      byColumn=byColumn,colswidth=colswidth,
                                      boxMode=boxMode,
                                      commonKwargs=commonKwargs)
        
        inattr = self.getInheritedAttributes()
        if hasattr(self.page,'_legacy'):
            tbl.childrenDisabled = disabled
        if colswidth:
            colswidth = colswidth.split(',')
            if len(colswidth)==1:
                colsvalue=colswidth[0]
                if colsvalue == 'auto':
                    x = 100. / cols
                    colsvalue ='%s%%' % x
                colswidth = [colsvalue]

            for w in range(cols):
                k=w if w <len(colswidth) else len(colswidth) -1
                tbl.div(tdf_width=colswidth[k],tdl_height='0px', tdl_border='0',tdf_border='0', tdf_height='0px',min_height='0px', padding_top='0px')

        return tbl
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.formbuilder_table(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::formbuilder_table:L1097`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
