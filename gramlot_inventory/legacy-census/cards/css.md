# css

## Identity

- **Identity:** `css`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** implementato; corrispondenza di portata da verificare

## Bases, mixins and composition

Declared by `GnrDomSrc`.
Declaring-class bases: `GnrStructData`
Direct construction/delegation targets found in the Python bodies: `css`.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::css:L914`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `rule` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | dict or list of CSS rules |
| `styleRule` | not declared | optional | `''` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | TODO |

- **Forwarded keyword names:** `childcontent`

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::css:L914`: Handle the CSS rules :param rule: dict or list of CSS rules :param styleRule: TODO
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::css:L914`

```python
def css(self, rule, styleRule=''):
        """Handle the CSS rules
        
        :param rule: dict or list of CSS rules
        :param styleRule: TODO"""
        if ('{' in rule):
            styleRule = rule
            rule = styleRule.split('{')[0]
            rule = rule.strip()
        else:
            if not styleRule.endswith(';'):
                styleRule = styleRule + ';'
            styleRule = '%s {%s}' % (rule, styleRule)
        return self.child('css', childcontent=styleRule)
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.css(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::GnrDomSrc::css:L914`
- Name appears in a literal legacy namespace registration list or child/tag construction.
- Current Gramlot name-level evidence: `src/gramlot/grammar/resources.py:L15`, `src/gramlot/grammar/resources.py:L8`.

## Incompatibilità Genropy legacy

A current Gramlot declaration with the same case-insensitive name was found; complete parameter and runtime compatibility is **da verificare**.
