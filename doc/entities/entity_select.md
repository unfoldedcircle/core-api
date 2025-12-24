# Select Entity

> [!NOTE]
> The [Home Assistant integration](https://github.com/unfoldedcircle/integration-home-assistant) is used as the first
> reference implementation.

The select entity offers a limited set of selectable options.
The available options are defined by the integration driver. They can be a static list or dynamically generated and
changed at runtime.

## Features

The select entity has no features.

### Attributes

| Attribute      | Type   | Values            | Description                           |
|----------------|--------|-------------------|---------------------------------------|
| state          | enum   | [States](#states) | Optional state of the select entity.  |
| current_option | string |                   | The currently selected option.        |
| options        | list   | _text_            | The available options to choose from. |

### States

The `state` attribute is optional for a select entity and defaults to `ON` if not specified.

The select entity only supports the `ON` state and the [common entity states](README.md#states).

| Value | Description                 |
|-------|-----------------------------|
| ON    | The selection is available. |

### Device Classes

None.

### Options

None.

## Integration API

### Commands

The integration driver has to implement a handler for the `entity_command` message to process the following command
requests in `msg_data.cmd_id`.

| cmd_id          | Parameters | Description                                                                                            |
|-----------------|------------|--------------------------------------------------------------------------------------------------------|
| select_option   | option     | Select a specific option. The `option` parameter must be one of the values in the `options` attribute. |
| select_first    | -          | Select the first option in the list.                                                                   |
| select_last     | -          | Select the last option in the list.                                                                    |
| select_next     | cycle      | Select the next option in the list. If `cycle` is true, it wraps around to the first option.           |
| select_previous | cycle      | Select the previous option in the list. If `cycle` is true, it wraps around to the last option.        |

### Events

The `entity_change` event must be emitted by the integration driver if the state or an attribute of the select entity changes.

The following attributes are supported:

| Attribute      | Description                        |
|----------------|------------------------------------|
| state          | New entity [state](#states).       |
| current_option | Currently selected option changed. |
| options        | Available options changed.         |

At least one attribute must be specified in the `entity_change` message. If the entity `state` and a `select-entity`
attribute changed at the same time, they may both be included in the same message. It's also valid to always send every
attribute.

### Command examples

#### select_option

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "select",
    "entity_id": "select-1",
    "cmd_id": "select_option",
    "params": {
      "option": "foobar"
    }
  }
}
```

#### select_first

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "select",
    "entity_id": "select-1",
    "cmd_id": "select_first"
  }
}
```

#### select_last

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "select",
    "entity_id": "select-1",
    "cmd_id": "select_last"
  }
}
```

#### select_next

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "select",
    "entity_id": "select-1",
    "cmd_id": "select_next",
    "params": {
      "cycle": true
    }
  }
}
```

#### select_previous

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "select",
    "entity_id": "select-1",
    "cmd_id": "select_previous",
    "params": {
      "cycle": false
    }
  }
}
```

### Event examples

#### Option changed

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "select",
    "entity_id": "select-1",
    "attributes": {
      "current_option": "Foobar"
    }
  }
}
```

#### Options list and current option changed

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "select",
    "entity_id": "select-1",
    "attributes": {
      "options": ["Foo", "Bar", "Foobar"],
      "current_option": "Bar"
    }
  }
}
```
