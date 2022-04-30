# Climate Entity

A climate entity controls heating, ventilation and air conditioning (HVAC) devices. This can range from simple fans to
personal air conditioning units to integrated building devices. 

## Features

| Name                        | R   | W   | Description                                                                                                                                 |
|-----------------------------|-----|-----|---------------------------------------------------------------------------------------------------------------------------------------------|
| on_off                      | ✅   | ✅   | The device can be turned on and off. The active HVAC mode after power on is device specific and must be reflected in the `state` attribute. |
| heat                        | ❌   | ✅   | The device supports heating.                                                                                                                |
| cool                        | ❌   | ✅   | The device supports cooling.                                                                                                                |
| current_temperature         | ✅   | ❌   | The device can measure the current temperature.                                                                                             |
| target_temperature          | ✅   | ✅   | The device supports a target temperature for heating or cooling.                                                                            |
| 🚧 target_temperature_range | ✅   | ✅   | The device supports a target temperature range.                                                                                             |
| 🚧 fan                      | ❌   | ✅   | The device has a controllable fan.                                                                                                          |

### Attributes

Entity attributes are controlled by features. Multiple features can act on the same attribute.

| Attribute                  | Features                 | Type   | Values            | Description                                            |
|----------------------------|--------------------------|--------|-------------------|--------------------------------------------------------|
| state                      | on_off                   | enum   | [States](#states) | State of the climate device, corresponds to HVAC mode. |
|                            | heat                     |        |                   |                                                        |
|                            | cool                     |        |                   |                                                        |
|                            | fan                      |        |                   |                                                        |
| current_temperature        | current_temperature      | number |                   |                                                        |
| target_temperature         | target_temperature       | number |                   |                                                        |
| 🚧 target_temperature_high | target_temperature_range | number |                   |                                                        |
| 🚧 target_temperature_low  | target_temperature_range | number |                   |                                                        |
| 🚧 fan_mode                | fan                      | enum   |                   |                                                        |

See [entity options](#options) for temperature unit and ranges.

### States

The climate entity provides the following entity `state` values and represents the currently set HVAC mode of the device:

| Value     | Description                                                                                                           |
|-----------|-----------------------------------------------------------------------------------------------------------------------|
| OFF       | The climate device is switched off.                                                                                   |
| HEAT      | The device is set to heating, optionally to a set target temperature.                                                 |
| COOL      | The device is set to cooling, optionally to a set target temperature.                                                 |
| HEAT_COOL | The device is set to heat or cool to a target temperature range.                                                      |
| FAN       | Fan-only mode without heating or cooling.                                                                             |
| AUTO      | The device is set to automatic mode. This is device dependant, e.g. according to a schedule, presence detection, etc. |

Note: the current mode may not be the active state of the device. E.g. if the mode is set to `AUTO` the climate unit 
may be heating, cooling, idle, etc. at a specific point in time.

See [common entity states](README.md#states).

### Device Classes

None.

### Options

| Name                    | Type   | Default | Description                                                                                                                    |
|-------------------------|--------|---------|--------------------------------------------------------------------------------------------------------------------------------|
| temperature_unit        | enum   | CELSIUS | The unit of temperature measurement: `CELSIUS`, `FAHRENHEIT`. If not specified, the remote settings are used.                  |
| target_temperature_step | number | 0.5 / 1 | Step value for the UI for setting the target temperature. Defaults: `CELSIUS` = 0.5, 'FAHRENHEIT` = 1. Smallest step size: 0.1 |
| max_temperature         | number | 30      | Maximum temperature to show in the UI for the target temperature range.                                                        |
| min_temperature         | number | 10      | Minimum temperature to show in the UI for the target temperature range.                                                        |
| 🚧 fan_modes            | enum   |         |                                                                                                                                |

🚧 Planned feature.

## Integration API

### Commands

The integration driver has to implement a handler for the `entity_command` message to process the following command
requests within `msg_data.cmd_id`.

- The command request must be acknowledged with a `result` response message.
- Once the value has been set or confirmed by the physical device, an `entity_change` event message with the new
  value(s) must be sent.

| cmd_id                      | Parameters       | Description                              |
|-----------------------------|------------------|------------------------------------------|
| on                          | -                | Switch on the climate device.            |
| off                         | -                | Switch off the climate device.           |
| hvac_mode                   | enum             | Set the device to heating, cooling, etc. |
| target_temperature          | temperature      | Change the target temperature            |
| 🚧 target_temperature_range | temperature_high |                                          |
|                             | temperature_low  |                                          |
| 🚧 fan_mode                 | enum             |                                          |

### Events

The `entity_change` event must be emitted by the integration driver if the state or an attribute of the climate device
changes. Either after an`entity_command` or if the climate device has been updated externally through a user or another
system. This keeps the remote in sync with the real state of the entity without the need of constant polling.

The following attributes are supported:

| Attribute                  | Description                            |
|----------------------------|----------------------------------------|
| hvac_mode                  | New HVAC mode. See [state](#states).   |
| current_temperature        | Current temperature value.             |
| target_temperature         | Changed target temperature value.      |
| 🚧 target_temperature_high | Changed high target temperature value. |
| 🚧 target_temperature_low  | Changed low target temperature value.  |
| 🚧 fan_mode                | Changed fan mode.                      |

At least one attribute must be specified in the `entity_change` message. If the entity `state` and a climate
attribute changed at the same time, they may both be included in the same message. It's also valid to always send every
attribute.

### Command examples

#### on

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "climate",
    "entity_id": "climate-1",
    "cmd_id": "on"
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
    "entity_type": "climate",
    "entity_id": "climate-1",
    "cmd_id": "off"
  }
}
```

#### hvac_mode

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "climate",
    "entity_id": "climate-1",
    "cmd_id": "hvac_mode",
    "attributes": {
      "hvac_mode": "COOL"
    }
  }
}
```

Combined with target temperature

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "climate",
    "entity_id": "climate-1",
    "cmd_id": "hvac_mode",
    "attributes": {
      "hvac_mode": "COOL",
      "target_temperature": 23
    }
  }
}
```

#### target_temperature

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "climate",
    "entity_id": "climate-1",
    "cmd_id": "target_temperature",
    "attributes": {
      "target_temperature": 23
    }
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
    "entity_type": "climate",
    "entity_id": "climate-1",
    "attributes": {
      "hvac_mode": "HEAT",
      "current_temperature": 19.5,
      "target_temperature": 21.0
    }
  }
}
```
