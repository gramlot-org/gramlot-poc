# Scalar values in a tree

Use `showValues=True` to display scalar leaf values beside their captions:

```python
root.urlResolver('snapshot', url='/api/snapshot', pollInterval=2)
root.storeTree(store='^snapshot', showValues=True)
```

This option is off by default. Zero, false and null remain visible; text is
rendered as text, including strings that contain HTML. Bag-valued nodes remain
expandable branches. It is a read-only presentation of the Bag, not a value
editor or a schema-specific formatter. Snapshot replacement updates the values
using the tree's existing selection and expansion preservation.
