# checkNodeId

## Identity

- **Identity:** `checkNodeId`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::checkNodeId:L148`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `nodeId` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | the :ref:`nodeid` |

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::checkNodeId:L148`: Check if the :ref:`nodeid` is already existing or not :param nodeId: the :ref:`nodeid`
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::checkNodeId:L148`

```python
def checkNodeId(self, nodeId):
        """Check if the :ref:`nodeid` is already existing or not
        
        :param nodeId: the :ref:`nodeid`"""
        assert nodeId not in self.register_nodeId,'%s is duplicated' %nodeId
        self.page._register_nodeId[nodeId] = self
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.checkNodeId(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::checkNodeId:L148`

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
