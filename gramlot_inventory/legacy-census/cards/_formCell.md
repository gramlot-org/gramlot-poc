# _formCell

## Identity

- **Identity:** `_formCell`
- **Type:** internal/reference helper
- **Level:** N/A
- **Purpose:** source-backed census entry; detailed product purpose is internal support for public declarations.
- **Status:** solo riferimento legacy

## Bases, mixins and composition

Declared by `GnrFormBuilder`.
Declaring-class bases: `object`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::_formCell:L244`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `r` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `c` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |
| `field` | not declared | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |

- **Consumed kwargs:** `_class`, `align`, `checkpref`, `colspan`, `dbfield`, `dtype`, `fldalign`, `fldvalign`, `ghost`, `hidden`, `hiddenGroup`, `html_label`, `lbl`, `lbl_href`, `lblalign`, `lblvalign`, `margin_left`, `onCreated`, `onCreating`, `placeholder`, `rowspan`, `tag`, `vertical_align`

- **Prefix families:** `==*`, `fld_*`, `lbl_*`, `row_*`, `tdf_*`, `tdl_*`

- **Forwarded keyword names:** `_class`, `align`, `childcontent`, `childname`, `hidden`, `href`, `vertical_align`

- **Conditions:** `'_class' in lbl_kwargs`, `field is not None`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::_formCell:L244`: No behavior docstring is present in the primary declaration.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::_formCell:L244`

```python
def _formCell(self, r, c, field=None):
        row = self.getRow(r)
        row_attributes = dict()
        td_field_attr = dict()
        td_lbl_attr = dict()
        lbl = ''
        lblvalue = None
        tag = None
        excludeCols = self.excludeCols
        rowspan, colspan = 1, 1
        lblalign, fldalign = self.lblalign, self.fldalign
        lblvalign, fldvalign = self.lblvalign, self.fldvalign
        lbl_kwargs = {}
        if self.colswidth=='auto':
            lbl_kwargs.setdefault('margin_left','5px')
        lblhref = None
        if field is not None:
            f = dict(self.commonKwargs)
            f.update(field)
            field = f
            lbl = field.pop('lbl', '')
            dbfield = field.get('dbfield')
            if dbfield and excludeCols and dbfield.split('.')[-1] in excludeCols:
                field.setdefault('hidden',True)
            if field.get('checkpref'):
                lbl_kwargs['checkpref'] = field['checkpref']
                lbl_kwargs.update(dictExtract(field,'checkpref_'))
            if 'hidden' in field and 'lbl_hidden' not in field:
                onCreating = field.get('onCreating') or ''
                field['onCreating'] = """
                    %s
                    this._startHidden = objectPop(arguments[0],'hidden');
                """ %onCreating
                onCreated = field.get('onCreated') or ''
                field['onCreated'] = """%s
                    this._hiddenTargets = [];
                    var tdNode = this.attributeOwnerNode('tag','td');
                    this._hiddenTargets.push(tdNode.domNode)
                    var lblTdNode = tdNode.getChild('%s');
                    if(lblTdNode && lblTdNode.domNode){
                        this._hiddenTargets.push(lblTdNode.domNode);
                    }
                    var hiddenGroup = this.attr.hiddenGroup;
                    if(hiddenGroup){
                        var tblNode = this.attributeOwnerNode('tag','table');
                        tblNode._hiddenGroups = tblNode._hiddenGroups || {};
                        tblNode._hiddenGroups[hiddenGroup] = this._hiddenTargets;
                    }
                    var that = this;
                    genro.src.onBuiltCall(function(){
                        that.setHidden(that._startHidden);
                        delete that._startHidden;
                    },1);
                """ %(onCreated,self._lblCellPath(r,c))
            if field.get('hiddenGroup') and 'hidden' not in field:
                onCreated = field.get('onCreated') or ''
                field['onCreated'] = """%s
                    var hiddenGroup = this.attr.hiddenGroup;
                    var tblNode = this.attributeOwnerNode('tag','table');
                    var tdNode = this.attributeOwnerNode('tag','td');
                    var groupHiddenTargets = tblNode._hiddenGroups[hiddenGroup];
                    groupHiddenTargets.push(tdNode.domNode)
                    var lblTdNode = tdNode.getChild('%s');
                    if(lblTdNode && lblTdNode.domNode){
                        groupHiddenTargets.push(lblTdNode.domNode);
                    }
                """ %(onCreated,self._lblCellPath(r,c))
            if lbl and '_valuelabel' not in field and not lbl.startswith('=='):  #BECAUSE IT CANNOT CALCULATE ON THE FIELD SOURCENODE SCOPE
                field['_valuelabel'] = lbl
            if 'lbl_href' in field:
                lblhref = field.pop('lbl_href')
                lblvalue = lbl
                lbl = None
            for k in list(field.keys()):
                attr_name = k[4:]
                if attr_name == 'class':
                    attr_name = '_class'
                if k.startswith('row_'):
                    row_attributes[attr_name] = field.pop(k)
                elif k.startswith('lbl_'):
                    lbl_kwargs[attr_name] = field.pop(k)
                elif k.startswith('fld_'):
                    v = field.pop(k)
                    if attr_name not in field:
                        field[attr_name] = v
                elif k.startswith('tdf_'):
                    td_field_attr[attr_name] = field.pop(k)
                elif k.startswith('tdl_'):
                    td_lbl_attr[attr_name] = field.pop(k)
               
            if field.pop('html_label',None) and field.get('dtype') =='B':
                field['label'] = lbl
                lbl = None
            lblalign, fldalign = field.pop('lblalign', lblalign), field.pop('fldalign', fldalign)
            lblvalign, fldvalign = field.pop('lblvalign', lblvalign), field.pop('fldvalign', fldvalign)
            tag = field.pop('tag', None)
            rowspan = int(field.pop('rowspan', '1'))
            cspan = int(field.pop('colspan', '1'))
            if cspan > 1:
                for cs in range(c + 1, c + cspan):
                    if ((self.lblpos == 'L') and ('c_%i_l' % cs in list(row.keys()))) or (
                    (self.lblpos == 'T') and ('c_%i' % cs in list(row[0].keys()))):
                        colspan = colspan + 1
                    else:
                        break
                        
        kwargs = {}
        if self.lblpos == 'L':
            if rowspan > 1:
                kwargs['rowspan'] = str(rowspan)
            lbl_kwargs.update(kwargs)
            lblvalign = lbl_kwargs.pop('vertical_align', lblvalign)
            lblalign = lbl_kwargs.pop('align', lblalign)
            if '_class' in lbl_kwargs:
                lbl_kwargs['_class'] = self.lblclass + ' ' + lbl_kwargs['_class']
            else:
                lbl_kwargs['_class'] = self.lblclass
            _tdl_cls = ('fb_lbl ' + td_lbl_attr.pop('_class', '')).strip()
            if lblhref:
                cell = row.td(childname='c_%i_l' % c, _class=_tdl_cls, childcontent=lbl, align=lblalign, vertical_align=lblvalign, **td_lbl_attr)
                if lblvalue:
                    lbl_kwargs['tabindex'] = -1 # prevent tab navigation to the zoom link
                    cell.a(childcontent=lblvalue, href=lblhref, **lbl_kwargs)
            else:
                if self.boxMode:
                    kwargs['lbl'] = lbl
                    for k,v in lbl_kwargs.items():
                        kwargs[f'lbl_{k}'] = v
                    row.td(childname='c_%i_l' % c, hidden=True)
                else:
                    cell = row.td(childname='c_%i_l' % c, _class=_tdl_cls, align=lblalign, vertical_align=lblvalign, **td_lbl_attr)
                    if lbl:
                        cell.div(childcontent=lbl, **lbl_kwargs)
            for k, v in list(row_attributes.items()):
                # TODO: warn if row_attributes already contains the attribute k (and it has a different value)
                row.parentNode.attr[k] = v
            if colspan > 1:
                kwargs['colspan'] = str(colspan * 2 - 1)
            kwargs.update(td_field_attr)
            td = row.td(childname='c_%i_f' % c, align=fldalign, vertical_align=fldvalign, _class='%s tag_%s' %(self.fieldclass,tag), **kwargs)
            if colspan > 1:
                for cs in range(c + 1, c + colspan):
                    row.delItem('c_%i_l' % cs)
                    row.delItem('c_%i_f' % cs)
            if rowspan > 1:
                for rs in range(r + 1, r + rowspan):
                    row = self.getRow(rs)
                    for cs in range(c, c + colspan):
                        row.delItem('c_%i_l' % cs)
                        row.delItem('c_%i_f' % cs)
        elif self.lblpos == 'T':
            if colspan > 1:
                kwargs['colspan'] = str(colspan)
            lbl_kwargs.update(kwargs)
            lblvalign = lbl_kwargs.pop('vertical_align', lblvalign)
            lblalign = lbl_kwargs.pop('align', lblalign)
            if '_class' in lbl_kwargs:
                lbl_kwargs['_class'] = self.lblclass + ' ' + lbl_kwargs['_class']
            else:
                lbl_kwargs['_class'] = self.lblclass
            
            row[0].td(childname='c_%i' % c, childcontent=lbl, align=lblalign, vertical_align=lblvalign, **lbl_kwargs)
            if lbl:
                row[0].attributes.pop('hidden',None)
            td = row[1].td(childname='c_%i' % c, align=fldalign, vertical_align=fldvalign, **kwargs)
            for k, v in list(row_attributes.items()):
                # TODO: warn if row_attributes already contains the attribute k (and it has a different value)
                row[0].parentNode.attr[k] = v
                row[1].parentNode.attr[k] = v
                
            if colspan > 1:
                for cs in range(c + 1, c + colspan):
                    row[0].delItem('c_%i' % cs)
                    row[1].delItem('c_%i' % cs)
                        
        if tag:
            field['placeholder'] = field.get('placeholder',field.pop('ghost', None))
            if self.byColumn and not 'tabindex' in field:
                field['tabindex'] = (c+1)*100+r+1
            obj = td.child(tag, **field)
            return obj
```


## Abstract extension hooks

Statically visible extension families: `==*`, `fld_*`, `lbl_*`, `row_*`, `tdf_*`, `tdl_*`
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
# Internal/reference symbol; no public authoring call.
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/formbuilder.py::GnrFormBuilder::_formCell:L244`

## Incompatibilità Genropy legacy

This is internal/reference legacy machinery rather than a public Gramlot contract; applicability is **da verificare**.
