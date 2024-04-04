# Remote Entity

A remote entity can send commands to a controllable device.

## Features

| Name     | R | W  | Description                                                                                                                                    |
|----------|---|----|------------------------------------------------------------------------------------------------------------------------------------------------|
| send_cmd | ❌ | ✅  | Default feature of a remote entity. Always present, even if not specified.                                                                     |
| on_off   | ✅ | ✅  | Remote has on and off commands.                                                                                                                |
| toggle   | ❌ | ✅  | Toggle support. If there's no native support, the remote will use the current state of the remote to send the corresponding on or off command. |

- R: readable
    - ✅ Feature has a readable attribute to retrieve the current or available values.
    - ❌ Feature value(s) cannot be read.
- W: writeable
    - ✅ Feature has one or multiple commands to trigger an action or set a value.
    - ❌ No corresponding command(s), only the current value(s) of the feature can be read.

### Attributes

Entity attributes are controlled by features. Multiple features can act on the same attribute. See Events on how to
notify the remote about an updated attribute. The attributes have to be listed as properties under `attributes` with
their current value.

| Attribute | Features | Type | Values            | Description                                                                                                                                |
|-----------|----------|------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| state     | on_off   | enum | [States](#states) | State of the controlled device, it's either on or off.                                                                                     |
|           | toggle   |      |                   | Toggle inverts the current state. If the driver doesn't provide the toggle feature, the remote uses the current value and calls on or off. |

### States

The remote entity provides the following entity `state` values:

| Value | Description                   |
|-------|-------------------------------|
| ON    | The controlled device is on.  |
| OFF   | The controlled device is off. |

See [common entity states](README.md#states).

### Device classes

None.

### Options

Optional features of the remote entity.

| Name               | Type   | Values | Default | Description                                                                                                                       |
|--------------------|--------|--------|---------|-----------------------------------------------------------------------------------------------------------------------------------|
| supported_commands | array  | string | []      | Optional list of supported commands. If not provided, the integration driver has to document the available commands for the user. |

## Integration API

### Commands

The integration driver has to implement a handler for the `entity_command` message to process the following command
requests in `msg_data.cmd_id`.

| cmd_id            | Parameters | Type         | Description                                                                                  |
|-------------------|------------|--------------|----------------------------------------------------------------------------------------------|
| on                | -          |              | Send the on-command to the controlled device.                                                |
| off               | -          |              | Send the off-command.                                                                        |
| toggle            | -          |              | Toggle the current remote of the controlled device, either from on -> off or from off -> on. |
| send_cmd          | command    | String(30)   | A single command.                                                                            |
|                   | repeat     | Number       | Optional: how many times the command shall be repeated. Defaults to 1 if not specified.      |
|                   | delay      | Number       | Optional: delay in milliseconds between repeated commands.                                   |
|                   | hold       | Number       | Optional: time in milliseconds before a command is released. Defaults to 0 if not specified. |
| send_cmd_sequence | sequence   | String array | Command list. Same defaults are used as for the `send` command.                              |
|                   | repeat     | Number       | Optional: how many times each command shall be repeated.                                     |
|                   | delay      | Number       | Optional: delay in milliseconds between commands.                                            |
|                   | hold       | Number       | Optional: time in milliseconds before each command is released.                              |

- A command may not include whitespace characters.
- The maximum length of a command name is 30 characters.
- A command name may not be any of the defined `cmd_id`: on, off, toggle, send_cmd, send_cmd_sequence
- If no `delay` parameter is included, the integration driver has to choose an appropriate delay based on the controlled device.

### Events

The `entity_change` event must be emitted by the integration driver if the state or an attribute of the remote device
changes.

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
    "entity_type": "remote",
    "entity_id": "remote-1",
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
    "entity_type": "remote",
    "entity_id": "remote-1",
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
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "toggle"
  }
}
```

#### send command

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "send_cmd",
    "params": {
      "command": "DPAD_UP"
    }
  }
}
```

#### send long-press command

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "send_cmd",
    "params": {
      "command": "ENTER",
      "hold": 800
    }
  }
}
```

#### send repeated command

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "send_cmd",
    "params": {
      "command": "VOLUME_DOWN",
      "repeat": 5
    }
  }
}
```

#### send sequence

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "send_cmd_sequence",
    "params": {
      "sequence": ["1", "2", "3", "ENTER"],
      "delay": 100
    }
  }
}
```

### Event examples

#### device was turned on

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "attributes": {
      "state": "on"
    }
  }
}
```

#### device was turned off

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "attributes": {
      "state": "off"
    }
  }
}
```
