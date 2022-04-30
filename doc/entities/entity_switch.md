# Switch Entity

A switch entity can turn something on or off and the current state should be readable by the integration driver.

If the state can't be read, the `readable` option property can be set to `false`. This should be avoided
whenever possible, because the remote either has to assume the current state, or the UI needs to ask the user
for the current state.

If the switch controls a light source, then the [light entity](entity_light.md) is usually a better choice.

## Features

| Name   | R   | W   | Description                                                                                                                                    |
|--------|-----|-----|------------------------------------------------------------------------------------------------------------------------------------------------|
| on_off | ✅   | ✅   | Default feature of a switch. Always present, even if not specified.                                                                            |
| toggle | ❌   | ✅   | Toggle support. If there's no native support, the remote will use the current state of the switch to send the corresponding on or off command. |

### Attributes

Entity attributes are controlled by features. Multiple features can act on the same attribute. See Events on how to
notify the remote about an updated attribute. The attributes have to be listed as properties under `attributes` with
their current value.

| Attribute | Features | Type | Values            | Description                                                                                                                                |
|-----------|----------|------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| state     | on_off   | enum | [States](#states) | State of the switch, it's either on or off.                                                                                                |
|           | toggle   |      |                   | Toggle inverts the current state. If the driver doesn't provide the toggle feature, the remote uses the current value and calls on or off. |

### States

The switch entity provides the following entity `state` values:

| Value | Description        |
|-------|--------------------|
| ON    | The switch is on.  |
| OFF   | The switch is off. |

See [common entity states](README.md#states).

### Device classes

Optional switch type. This can be used by the UI to represent the entity with a different icon, behaviour etc.

| Name   | Description                                      |
|--------|--------------------------------------------------|
| outlet | The switch represents a switchable power outlet. |
| switch | Generic switch.                                  |

### Options

| Name     | Type    | Default | Description                                                                                                                                              |
|----------|---------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| readable | boolean | true    | If set to false the current state of the switch cannot be read. This will make the switch stateless and the UI might ask the user for the current state. |

## Integration API

### Commands

The integration driver has to implement a handler for the `entity_command` message to process the following command
requests in `msg_data.cmd_id`.

| cmd_id    | Parameters    | Description                                                               |
|-----------|---------------|---------------------------------------------------------------------------|
| on        | -             | Put the switch in the on state.                                           |
| off       | -             | Put the switch in the off state.                                          |
| toggle    | -             | Toggle the current switch state, either from on -> off or from off -> on. |

### Events

The `entity_change` event must be emitted by the integration driver if the state or an attribute of the switch changes.

The following attributes must be included:

| Attribute     | Description                   |
|---------------|-------------------------------|
| state         | New entity [state](#states).  |

### Command examples

#### on

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "switch",
    "entity_id": "switch-1",
    "cmd_id": "on"
  }
}
```

#### off

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "switch",
    "entity_id": "switch-1",
    "cmd_id": "off"
  }
}
```

#### toggle

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "switch",
    "entity_id": "switch-1",
    "cmd_id": "toggle"
  }
}
```

### Event examples

#### Switched on

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "switch",
    "entity_id": "switch-1",
    "attributes": {
      "state": "on"
    }
  }
}
```

#### Switched off

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "switch",
    "entity_id": "switch-1",
    "attributes": {
      "state": "off"
    }
  }
}
```
