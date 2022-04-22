# Button Entity

A button entity can fire an event or start an action which cannot be further controlled once started.

This can be used for "fire and forget" commands, e.g. running a system command, sending an IR code, restart a
device, reset something etc.

A button is stateless. To represent something that can be turned on and off, the [switch](entity_switch.md) entity
should be used.

## Features

| Name  | R   | W   | Description                                                         |
|-------|-----|-----|---------------------------------------------------------------------|
| press | ❌   | ✅   | Default feature of a button. Always present, even if not specified. |

### States

The button entity only supports the `ON` state and the [common entity states](entities.md#states).

| Value     | Description              |
|-----------|--------------------------|
| AVAILABLE | The button is available. |

### Device Classes

None.

### Options

None: the button entity doesn't support additional options.

## Integration API

### Commands

The integration driver has to implement a handler for the `entity_command` message to process the following command
requests in `msg_data.cmd_id`.

| cmd_id | Parameters | Description      |
|--------|------------|------------------|
| push   | -          | Push the button! |

### Events

None: the button entity is stateless and the remote doesn't need to be notified when the button was pressed externally.

### Command examples

#### push

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "button",
    "entity_id": "button-1",
    "command_id": "push"
  }
}
```
