# XXX Entity

## Features


| Name | R   | W   | Description |
|------|-----|-----|-------------|
|      | ✅   | ✅   |             |
|      | ❌   | ✅   |             |
|      | ✅   | ❌   |             |

### Attributes

Entity attributes are controlled by features. Multiple features can act on the same attribute.

| Attribute | Features | Type | Values            | Description      |
|-----------|----------|------|-------------------|------------------|
| state     | on_off   | enum | [States](#states) | State of the ### |
|           |          |      |                   |                  |
|           |          |      |                   |                  |

### States

The entity `state` attribute holds the following values:

| Value | Description             |
|-------|-------------------------|
| ON    | The ### is switched on  |
| OFF   | The ### is switched off |

See [common entity states](entities.md#states).

### Device Classes

| Name | Description |
|------|-------------|
|      |             |
|      |             |

### Options


| Name | Type | Default | Description |
|------|------|---------|-------------|
|      |      |         |             |
|      |      |         |             |


## Integration API

### Commands

The integration driver has to implement a handler for the `entity_command` message to process the following command
requests in `msg_data.cmd_id`.

| cmd_id | Parameters | Description |
|--------|------------|-------------|
| X      | -          |             |
| Y      | foo        |             |
| Z      | bar        |             |

### Events

The `entity_change` event must be emitted by the integration driver if the state or an attribute of the ### changes.

The following attributes are supported:

| Attribute | Description                  |
|-----------|------------------------------|
| state     | New entity [state](#states). |
| X         | Current ### value.           |
| Y         | Current ### value.           |

At least one attribute must be specified in the `entity_change` message. If the entity `state` and a `###`
attribute changed at the same time, they may both be included in the same message. It's also valid to always send every
attribute.

### Command examples

#### foo

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "###",
    "entity_id": "###-1",
    "cmd_id": "foo"
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
    "entity_type": "###",
    "entity_id": "###-1",
    "attributes": {
      "state": "###",
      "foobar": 72
    }
  }
}
```
