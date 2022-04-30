# Cover Entity

Entity for covering or opening things like blinds, window covers, curtains, etc. The entity _features_ specify the
abilities of the cover and the controllable properties, whereas the _device class_ specifies the UI representation.

## Features

| Name             | R   | W   | Description                                                   |
|------------------|-----|-----|---------------------------------------------------------------|
| open             | ✅   | ✅   | The cover can can be opened.                                  |
| close            | ✅   | ✅   | The cover can can be closed.                                  |
| stop             | ❌   | ✅   | Opening, closing or setting the position can be stopped.      |
| position         | ✅   | ✅   | The cover can be moved to a specific position, e.g. 30% open. |
| 🚧 tilt          | ✅   | ✅   | The cover supports being tilted up and down.                  |
| 🚧 tilt_stop     | ❌   | ✅   | Tilting the cover can be stopped.                             |
| 🚧 tilt_position | ✅   | ✅   | The cover can be moved to a specific tilt position.           |

🚧 Planned feature.

If no `tilt*` features are specified in the cover entity, the remote UI will not show the tilt support and the
integration driver does not need to support the required tilt commands and events.

## Attributes

| Attribute        | Features      | Type | Values            | Description                                                       |
|------------------|---------------|------|-------------------|-------------------------------------------------------------------|
| state            | open close    | enum | [States](#states) | Default entity state attribute. Influenced by the cover commands. |
|                  | stop          |      |                   |                                                                   |
| position         | position      | int  | 0..100            | Current position of the cover: 0 = closed, 100 = open.            |
|                  | open close    |      | 0 / 100           | Position is set to min / max if the state reaches CLOSED / OPEN.  |
| 🚧 tilt_position | tilt_position | int  | 0..100            | Current tilt position of the cover: 0 = no tilt, 100 = max tilt.  |
|                  | tilt_stop     |      |                   |                                                                   |
|                  | tilt          |      | 0 / 100           | Tilt position is set to min / max when tilted up or down.         |

### States

The cover entity provides the following entity `state` values:

| Value   | Description                                                                       |
|---------|-----------------------------------------------------------------------------------|
| OPENING | The cover is in the process of opening. Either fully opened or to a set position. |
| OPEN    | The cover is in the open state.                                                   |
| CLOSING | The cover is in the process of closing. Either fully closed or to a set position. |
| CLOSED  | The cover is in the closed state.                                                 |

See [common entity states](README.md#states).

### Device classes

Optional cover type. This can be used by the UI to represent the cover with a different icon, behaviour etc.

| Name      | Description                                                      |
|-----------|------------------------------------------------------------------|
| blind     | Window blinds or shutters which can be opened, closed or tilted. |
| curtain   | Window curtain or drapes which can be opened or closed.          |
| garage    | Controllable garage door.                                        |
| shade     | Sun shades which can be opened to protect an area from the sun.  |
| 🚧 door   | Controllable door which can be opened and closed.                |
| 🚧 gate   | Controllable gate which can be opened and closed.                |
| 🚧 window | A window which can be opened, closed or tilted.                  |

### Options

None: the cover entity doesn't support additional options.

## Integration API

### Commands

The integration driver has to implement a handler for the `entity_command` message to process the following command
requests in `msg_data.cmd_id`.

| cmd_id       | Parameters    | Description                                               |
|--------------|---------------|-----------------------------------------------------------|
| open         | -             | Open the cover.                                           |
| close        | -             | Close the cover.                                          |
| stop         | -             | Stop the current cover open, close or position operation. |
| position     | position      | Set the cover to the given position.                      |
| 🚧 tilt      | tilt_position | Tilt the cover to the given position.                     |
| 🚧 tilt_up   | -             | Tilt the cover fully up.                                  |
| 🚧 tilt_down | -             | Tilt the cover fully down.                                |
| 🚧 tilt_stop | -             | Stop current tilt operation.                              |

### Events

The `entity_change` event must be emitted by the integration driver if the state or an attribute of the cover changes.

The following attributes are supported:

| Attribute        | Description                   |
|------------------|-------------------------------|
| state            | New entity [state](#states).  |
| position         | Current cover position value. |
| 🚧 tilt_position | Current tilt position value.  |

At least one attribute must be specified in the `entity_change` message. If the entity `state` and a `position`
attribute changed at the same time, they may both be included in the same message. It's also valid to always send every
attribute.

### Command examples

#### open

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "cover",
    "entity_id": "blind-1",
    "cmd_id": "open"
  }
}
```

#### close

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "cover",
    "entity_id": "blind-1",
    "cmd_id": "close"
  }
}
```

#### stop

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "cover",
    "entity_id": "blind-1",
    "cmd_id": "stop"
  }
}
```

#### position

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "cover",
    "entity_id": "blind-1",
    "cmd_id": "open",
    "params": {
      "position": 70
    }
  }
}
```

#### tilt

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "cover",
    "entity_id": "blind-1",
    "cmd_id": "open",
    "params": {
      "tilt_position": 45
    }
  }
}
```

#### tilt_down

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "cover",
    "entity_id": "blind-1",
    "cmd_id": "tilt_down"
  }
}
```

#### tilt_up

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "cover",
    "entity_id": "blind-1",
    "cmd_id": "tilt_up"
  }
}
```

#### tilt_stop

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "cover",
    "entity_id": "blind-1",
    "cmd_id": "tilt_stop"
  }
}
```

### Event examples

#### State change event

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "cover",
    "entity_id": "blind-1",
    "attributes": {
      "state": "OPENING",
      "position": 72
    }
  }
}
```

#### Cover position change event

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "cover",
    "entity_id": "blind-1",
    "attributes": {
      "position": 72
    }
  }
}
```

#### Cover tilt position change event

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "cover",
    "entity_id": "blind-1",
    "attributes": {
      "tilt_position": 50
    }
  }
}
```
