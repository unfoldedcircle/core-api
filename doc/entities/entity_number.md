# Number Entity

The number entity holds a single numeric value which can be read and set. It is the writable counterpart of the
[sensor entity](entity_sensor.md) and the numeric counterpart of the [select entity](entity_select.md).

The value range, step size, and unit are defined by the integration driver in the entity options. The Remote renders a
number entity as a slider or as a value field with increment and decrement buttons, depending on where it is used:

- On a profile page the entity is shown with its default representation.
- In an activity user interface, the [slider widget](../ui-widgets.md#slider) can be bound to the `value` feature and
  positioned freely in the page grid.
- The Remote 3 touch-slider can be assigned to the `value` feature.

Typical use cases are device settings which don't fit any other entity, for example an amplifier's bass level, the zoom
of a camera, a projector's lens shift, the speed of a fan, or a custom "scene intensity" value.

## Features

| Name  | R  | W  | Description                                                                |
|-------|----|----|----------------------------------------------------------------------------|
| value | ✅ | ✅ | Default feature of a number entity. Always present, even if not specified. |

- R: readable
    - ✅ Feature has a readable attribute to retrieve the current value.
- W: writeable
    - ✅ Feature has one or multiple commands to set the value.

If the current value cannot be read from the device, the `readable` option can be set to `false`. See [Options](#options).

### Attributes

| Attribute | Type   | Values            | Description                                                         |
|-----------|--------|-------------------|---------------------------------------------------------------------|
| state     | enum   | [States](#states) | Optional state of the number entity.                                |
| value     | number |                   | The current value. Must be within the `min` and `max` option range. |

### States

The `state` attribute is optional for a number entity and defaults to `ON` if not specified.

The number entity only supports the `ON` state and the [common entity states](README.md#states).

| Value | Description                                 |
|-------|---------------------------------------------|
| ON    | The number entity is available.             |

### Device Classes

None. Device classes for default icons and value formatting might be added in the future, e.g. `percentage`, `volume`,
`brightness`, `temperature`, `duration`.

### Options

| Name     | Type    | Default | Description                                                                                                                                                     |
|----------|---------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| min      | number  | 0       | Minimum value (inclusive).                                                                                                                                      |
| max      | number  | 100     | Maximum value (inclusive).                                                                                                                                      |
| step     | number  | 1       | Step size between values. Smallest step size: 0.01. Also used as default step for the `increment` and `decrement` commands.                                     |
| decimals | integer | 0       | Number of decimal places to show in the UI. 0 = integer value.                                                                                                  |
| unit     | text    |         | Optional unit label of the value, shown next to the value in the UI. E.g. `%`, `dB`, `°C`.                                                                      |
| readable | boolean | true    | If set to false, the current value cannot be read from the device and the driver will not send `value` attribute updates. The Remote keeps the last sent value. |

The option vocabulary is the same as for the `number` field in the [driver setup settings](../integration-driver/driver-setup.md).

Notes:

- The options are static and are read when the entity is configured in the Remote. If the value range of a device
  changes, the integration driver has to send an updated entity definition with the `entity_available` event. Dynamic
  ranges in the entity attributes are not supported.
- The Remote UI uses `(max - min) / step` to determine the number of positions. A very large number of positions might
  be rendered as a value field instead of a slider.
- With `readable: false` the Remote does not expect an `entity_change` event after a command and shows the last value
  sent to the driver. This should be avoided whenever possible.

## Integration API

### Commands

The integration driver has to implement a handler for the `entity_command` message to process the following command
requests in `msg_data.cmd_id`.

| cmd_id    | Parameters | Description                                                                                                                     |
|-----------|------------|---------------------------------------------------------------------------------------------------------------------------------|
| set_value | value      | Set the value. The `value` parameter is within the `min` and `max` option range. The driver may round the value to `step`.       |
|           | duration   | Optional: transition time in milliseconds to reach the new value, if supported by the device. Drivers may ignore this parameter. |
| increment | step       | Increase the value by `step`. If not specified, the `step` option is used. The value is clamped at `max`.                        |
| decrement | step       | Decrease the value by `step`. If not specified, the `step` option is used. The value is clamped at `min`.                        |

The `increment` and `decrement` commands are used for physical button mappings, e.g. `VOLUME_UP` and `VOLUME_DOWN`, and
for D-pad navigation when a slider widget has the focus. The Remote does not calculate the new value itself, since the
driver knows the actual value of the device.

### Events

The `entity_change` event must be emitted by the integration driver if the state or the value of the number entity
changes. Either after an `entity_command` or if the value has been updated otherwise, e.g. externally through a user or
another system.

The following attributes are supported:

| Attribute | Description                  |
|-----------|------------------------------|
| state     | New entity [state](#states). |
| value     | Current value.               |

At least one attribute must be specified in the `entity_change` message. If the entity `state` and the `value`
attribute changed at the same time, they may both be included in the same message. It's also valid to always send every
attribute.

The Remote shows the value set by the user immediately and then follows the `value` attribute in the `entity_change`
event. If the driver doesn't confirm the new value within a few seconds, the UI falls back to the last known value.
Drivers should therefore send the `entity_change` event as soon as the device has applied the new value.

### Entity definition example

```json
{
  "entity_id": "amp-1_bass",
  "entity_type": "number",
  "device_id": "amp-1",
  "name": {
    "en": "Bass"
  },
  "options": {
    "min": -10,
    "max": 10,
    "step": 0.5,
    "decimals": 1,
    "unit": "dB"
  }
}
```

### Command examples

#### set_value

```json
{
  "kind": "req",
  "id": 129,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "number",
    "entity_id": "amp-1_bass",
    "cmd_id": "set_value",
    "params": {
      "value": 2.5
    }
  }
}
```

With a transition time:

```json
{
  "kind": "req",
  "id": 129,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "number",
    "entity_id": "light-1_scene_intensity",
    "cmd_id": "set_value",
    "params": {
      "value": 80,
      "duration": 2000
    }
  }
}
```

#### increment

```json
{
  "kind": "req",
  "id": 130,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "number",
    "entity_id": "amp-1_bass",
    "cmd_id": "increment"
  }
}
```

If the `step` parameter is not specified, the `step` option of the entity is used.

#### decrement

```json
{
  "kind": "req",
  "id": 131,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "number",
    "entity_id": "amp-1_bass",
    "cmd_id": "decrement",
    "params": {
      "step": 1
    }
  }
}
```

### Event examples

#### Value changed

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "number",
    "entity_id": "amp-1_bass",
    "attributes": {
      "value": 2.5
    }
  }
}
```

#### Entity coming online with the current value

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "number",
    "entity_id": "amp-1_bass",
    "attributes": {
      "state": "ON",
      "value": 0
    }
  }
}
```
