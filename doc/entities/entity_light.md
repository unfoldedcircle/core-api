# Light Entity

A light entity can be switched on and off and depending on its features, the light source can be further
controlled like setting brightness, hue, color saturation and color temperature.

The [HSV color model](https://en.wikipedia.org/wiki/HSL_and_HSV) is used for adjusting color and brightness.

## Features

| Name              | R   | W   | Description                                                                                                                                   |
|-------------------|-----|-----|-----------------------------------------------------------------------------------------------------------------------------------------------|
| on_off            | ✅   | ✅   | Default feature of a light source. Always present, even if not specified.                                                                     |
| toggle            | ❌   | ✅   | Toggle support. If there's no native support, the remote will use the current state of the light to send the corresponding on or off command. |
| dim               | ✅   | ✅   | Light source supports dimming.                                                                                                                |
| color             | ✅   | ✅   | The color of the light source can be adjusted.                                                                                                |
| color_temperature | ✅   | ✅   | The color temperature of the light source can be adjusted.                                                                                    |

### Attributes

| Attribute         | Features          | Type | Values            | Description                                                                                      |
|-------------------|-------------------|------|-------------------|--------------------------------------------------------------------------------------------------|
| state             | on_off            | enum | [States](#states) | Default entity state attribute. Influenced by the entity commands.                               |
|                   | toggle            |      |                   |                                                                                                  |
| hue               | color             | int  | 0..360            | Color wheel: 0-360 degree                                                                        |
| saturation        | color             | int  | 0..255            |                                                                                                  |
| brightness        | dim               | int  | 0..255            |                                                                                                  |
| color_temperature | color_temperature | int  | 0..100            | Color temperature percentage: a higher value means a warmer color. 0% = coldest, 100% = warmest. |

### States

The light entity provides the following entity `state` values:

| Value | Description                |
|-------|----------------------------|
| ON    | The light is switched on.  |
| OFF   | The light is switched off. |

See [common entity states](README.md#states).

### Device Classes

None.

### Options

| Name                    | Type   | Values | Default | Description                                                                                                                  |
|-------------------------|--------|--------|---------|------------------------------------------------------------------------------------------------------------------------------|
| color_temperature_steps | number | 2..100 | 100     | Number of color temperature steps of the light source. Some lamps only support 3 modes, where others can be adjusted freely. |

## Integration API

### Commands

The integration driver has to implement a handler for the `entity_command` message to process the following command
requests in `msg_data.cmd_id`.

| cmd_id | Parameters        | Description                                                    |
|--------|-------------------|----------------------------------------------------------------|
| on     | -                 | Turn the light on. Optionally set brightness and color values: |
|        | brightness        | - dim the light to the given percentage value.                 |
|        | hue, saturation   | - adjust the color of the light.                               |
|        | color_temperature | - adjust the color temperature.                                |
| off    | -                 | Turn the light off.                                            |
| toggle | -                 | Toggle the light from on -> off or from off -> on.             |

### Events

The `entity_change` event must be emitted by the integration driver if the state or an attribute of the light changes.

The following attributes are supported:

| Attribute         | Description                                                                                                                   |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------|
| state             | New entity [state](#states).                                                                                                  |
| brightness        | Current brightness.                                                                                                           |
| hue               | Current hue value.                                                                                                            |
| saturation        | Current saturation value.                                                                                                     |
| color_temperature | Current color temperature. The possible values are influenced by `color_temperature_steps`. E.g. with 3 steps: \[0, 50, 100\] |

### Command examples

#### on

Default request:

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "light",
    "entity_id": "light-1",
    "cmd_id": "on"
  }
}
```

Request with setting brightness value:
```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "light",
    "entity_id": "light-1",
    "cmd_id": "on",
    "params": {
      "brightness": 140
    }
  }
}
```

Request with setting color temperature:
```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "light",
    "entity_id": "light-1",
    "cmd_id": "on",
    "params": [
      {
        "color_temperature": 70
      }
    ]
  }
}
```

Request with setting light color:
```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "light",
    "entity_id": "light-1",
    "cmd_id": "on",
    "params": [
      {
        "hue": 180,
        "saturation": 200
      }
    ]
  }
}
```

#### off

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "light",
    "entity_id": "light-1",
    "cmd_id": "off"
  }
}
```

#### toggle

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "light",
    "entity_id": "light-1",
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
    "entity_type": "light",
    "entity_id": "light-1",
    "attributes": {
      "state": "ON"
    }
  }
}
```

The additional brightness and color attributes can be added as well:

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "light",
    "entity_id": "light-1",
    "attributes": {
      "state": "ON",
      "brightness": 180,
      "hue": 180,
      "saturation": 150
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
    "entity_type": "light",
    "entity_id": "light-1",
    "attributes": {
      "state": "OFF"
    }
  }
}
```
