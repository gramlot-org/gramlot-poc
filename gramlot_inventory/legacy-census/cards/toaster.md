# toaster

## Identity

- **Identity:** `toaster`
- **Type:** component
- **Level:** LOW-LEVEL
- **Purpose:** source-backed census entry; detailed product purpose is taken from the declarations below.
- **Status:** da implementare

## Bases, mixins and composition

Declared by `DojoxWidgets`.
Declaring-class bases: none or module-level declaration.
No literal child/delegation target is present in the primary Python bodies.

## Common parameters

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::toaster:L162`

| Parameter | Type | Presence | Default | Bindings | Constraints / consumer |
| --- | --- | --- | --- | --- | --- |
| `messageTopic` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Topic name; messages published here are displayed. |
| `defaultType` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Default message type ('message','warning','error','fatal'). |
| `positionDirection` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Slide-in origin ('br-up','br-left','bl-up','bl-right', |
| `duration` | int \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | Time in ms to show the message. |
| `separator` | str \| None | optional | `None` | Legacy Source binding syntax may be accepted; exact consumer must be followed. | HTML string to separate consecutive messages. |
| `**kwargs` | not declared | open extension boundary | empty mapping | Arbitrary names may include bindings; the boundary is open. | No parameter docstring in the primary declaration. |

`**kwargs` is not a closed parameter set. The declaration forwards or interprets additional names; user-defined callbacks, prefixed attributes and downstream widget/server consumers can extend it. Only statically discoverable names are listed above.

## Behavior, output and errors

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::toaster:L162`: Notification message that slides in from a screen corner. Args: messageTopic: Topic name; messages published here are displayed. defaultType: Default message type ('message','warning','error','fatal'). positionDirection: Slide-in origin ('br-up','br-left','bl-up','bl-right', 'tr-down','tr-left','tl-down','tl-right'). duration: Time in ms to show the message. separator: HTML string to separate consecutive messages.
- Runtime output, precedence, ignored parameters and raised errors require following the implementation consumers; absence here is recorded as unresolved rather than inferred.

## Primary Python implementation evidence

### `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::toaster:L162`

```python
def toaster(self, messageTopic: str | None = None,
                defaultType: str | None = None,
                positionDirection: str | None = None,
                duration: int | None = None,
                separator: str | None = None,
                **kwargs):
        """Notification message that slides in from a screen corner.

        Args:
            messageTopic: Topic name; messages published here are displayed.
            defaultType: Default message type ('message','warning','error','fatal').
            positionDirection: Slide-in origin ('br-up','br-left','bl-up','bl-right',
                'tr-down','tr-left','tl-down','tl-right').
            duration: Time in ms to show the message.
            separator: HTML string to separate consecutive messages.
        """
        ...
```


## Abstract extension hooks

Statically visible extension families: none in the primary declaration bodies.
Open `**kwargs`, callbacks and dynamically selected handlers remain extension boundaries and cannot be finitely enumerated from signatures alone.

## Generic example

```python
# Legacy discovery example; availability in Gramlot depends on Status.
root.toaster(...)
```

## Code and evidence

- `genropy/gnrpy/gnr/web/widgets/dojox.py::DojoxWidgets::toaster:L162`
- Name appears in a literal legacy namespace registration list or child/tag construction.

## Incompatibilità Genropy legacy

No current Gramlot declaration with the same case-insensitive name was found. Status: **da implementare**. Detailed runtime comparison is **da verificare**.
