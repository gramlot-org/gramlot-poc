# struct_method

## Identity

- **Identity:** `struct_method`
- **Type:** recipe/registration contract
- **Level:** COMPOSED
- **Purpose:** source-backed census entry; detailed product purpose is internal support for public declarations.
- **Status:** solo riferimento legacy

## Bases, mixins and composition

Declared by module-level helpers.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::struct_method:L40`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `func_or_name` | not declared | required | none | Legacy Source binding syntax may be accepted; exact consumer must be followed. | No parameter docstring in the primary declaration. |

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::struct_method:L40`: A decorator. Allow to register a new method (in a page or in a component) that will be available in the web structs:: @struct_method def includedViewBox(self, bc, ...): pass def somewhereElse(self, bc): bc.includedViewBox(...) If the method name includes an underscore, only the part that follows the first underscore will be the struct method's name:: @struct_method def iv_foo(self, bc, ...): pass def somewhereElse(self, bc): bc.foo(...) You can also pass a name explicitly:: @struct_method('bar') def foo(self, bc, ...): pass def somewhereElse(self, bc): bc.bar(...)
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::struct_method:L40`

```python
def struct_method(func_or_name):
    """A decorator. Allow to register a new method (in a page or in a component)
    that will be available in the web structs::

        @struct_method
        def includedViewBox(self, bc, ...):
            pass

        def somewhereElse(self, bc):
            bc.includedViewBox(...)

    If the method name includes an underscore, only the part that follows the first
    underscore will be the struct method's name::

        @struct_method
        def iv_foo(self, bc, ...):
            pass

        def somewhereElse(self, bc):
            bc.foo(...)

    You can also pass a name explicitly::

        @struct_method('bar')
        def foo(self, bc, ...):
            pass

        def somewhereElse(self, bc):
            bc.bar(...)"""
    def register(name, func):
        func_name = func.__name__
        existing_name = GnrDomSrc._external_methods.get(name, None)
        if existing_name and (existing_name != func_name):
            # If you want to override a struct_method, be sure to call its implementation method in the same way as the original.
            # (Otherwise, the result would NOT  be well defined due to uncertainty in the mixin process at runtime plus the fact that the GnrDomSrc is global)
            raise StructMethodError(
                    "struct_method %s is already tied to implementation method %s" % (repr(name), repr(existing_name)))
        GnrDomSrc._external_methods[name] = func_name

    if isinstance(func_or_name, str):
        name = func_or_name

        def decorate(func):
            register(name, func)
            return func

        return decorate
    else:
        name = func_or_name.__name__
        if '_' in name:
            name = name.split('_', 1)[1]
        register(name, func_or_name)
        return func_or_name
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
# Internal/reference symbol; no public authoring call.
```

## Code and evidence

- `genropy/gnrpy/gnr/web/gnrwebstruct/base.py::struct_method:L40`

## Incompatibilità Genropy legacy

This is internal/reference legacy machinery rather than a public Gramlot contract; applicability is **da verificare**.
