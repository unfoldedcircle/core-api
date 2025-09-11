# Sensor Entity

A sensor entity provides measured values from devices or dedicated hardware sensors.  
The device class specifies the type of sensor and links it with a default unit of measurement to display in the user
interface.

- The `custom` device class allows arbitrary text values and unit labels.
- The `temperature` device class performs automatic conversion between °C and °F.

## Features

The sensor entity has no features.

### Attributes

| Attribute | Type            | Values            | Description                                             |
|-----------|-----------------|-------------------|---------------------------------------------------------|
| state     | enum            | [States](#states) | Optional state of the sensor.                           |
| value     | number / string |                   | The native measurement value of the sensor.             |
| unit      | string          |                   | Optional unit of the `value` if no default unit is set. |

The `unit` attribute can be specified in the `entity_change` event and takes precedence over the associated default unit
in the `device_class` or the specified `custom_unit` in the options.

If an integration driver gets the current unit from an external system together with the current value, it's recommended
to pass it on.  
If the integration driver is in control of the unit, and it can't change at runtime, the unit can be specified in the
available entity definition as `options.custom_unit` and then omitted in `entity_change` events.

### States

The `state` attribute is optional for a sensor.

The sensor entity only supports the `ON` state and the [common entity states](README.md#states). 

| Value | Description                                         |
|-------|-----------------------------------------------------|
| ON    | The sensor is available and providing measurements. |

### Device Classes

The device class specifies the type of sensor. Default if not specified: `custom`.

| Name        | Default unit | Description                                                                                                                                |
|-------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| custom      |              | Generic sensor with custom unit                                                                                                            |
| battery     | %            | Battery charge in %                                                                                                                        |
| current     | A            | Electrical current in ampere                                                                                                               |
| energy      | kWh          | Energy in kilowatt-hour                                                                                                                    |
| humidity    | %            | Humidity in %                                                                                                                              |
| power       | W            | Power in watt or kilowatt                                                                                                                  |
| temperature | °C           | Temperature with automatic °C, °F conversion, depending on remote settings. Use `native_unit` option if the temperature is measured in °F. |
| voltage     | V            | Voltage in volt                                                                                                                            |
| binary      |              | Binary sensor. The binary specific device class is stored in the `unit` attribute.                                                         |

#### Binary Device Class

The `binary` device class allows specifying a binary sensor with two states in the `value` attribute: `on` and `off`.

These values can mean different things depending on the `unit` attribute. For example, a binary sensor with the `unit`
attribute set to `sound`: `on` means sound detected and `off` means no sound detected. For `unit` set to `window`: `on`
means the window is open and `off` means the window is closed.

If the `unit` attribute is not specified, the binary sensor is a generic on/off sensor.

🚧 Supported unit values are the Home Assistant binary sensor device classes: <https://www.home-assistant.io/integrations/binary_sensor/#device-class>

### Options

| Name         | Type   | Default | Description                                                                                                                     |
|--------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------|
| custom_unit  | text   |         | Unit label for a custom sensor if `device_class` is not specified or to override a default unit.                                |
| native_unit  | text   |         | The sensor's native unit of measurement to perform automatic conversion. Applicable to device classes: `temperature`.           |
| decimals     | number | 0       | Number of decimal places to show in the UI if the sensor provides the measurement as a number. Not applicable to string values. |
| 🚧 min_value | number |         | Optional minimum value of the sensor output. This can be used in the UI for graphs or gauges.                                   |
| 🚧 max_value | number |         | Optional maximum value of the sensor output. This can be used in the UI for graphs or gauges.                                   |

## Integration API

### Commands

The sensor entity doesn't support any commands.

### Events

The `entity_change` event must be emitted by the integration driver if the state or an attribute of a sensor changes.

The following attributes are supported:

| Attribute | Description                                                                                              |
|-----------|----------------------------------------------------------------------------------------------------------|
| state     | Optional entity [state](#states).                                                                        |
| value     | The current sensor value.                                                                                |
| unit      | Optional: the unit of measurement for the given `value`. If omitted, the configured entity unit is used. |

- At least one attribute must be specified in the `entity_change` message.
  - If the sensor `value` and `unit` attributes change at the same time, both must be included in the same message.
  - It's also valid to always send every attribute.
- Only sending the `unit` attribute is not valid.
- If the state is never sent, the sensor is considered available (`ON`).

### Event Examples

#### State Change Event

Sensor with a number value:

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "sensor",
    "entity_id": "sensor-1",
    "attributes": {
      "value": 21.2,
      "unit": "°C"
    }
  }
}
```

Sensor with a string value:

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "sensor",
    "entity_id": "sensor-2",
    "attributes": {
      "value": "231",
      "unit": "V"
    }
  }
}
```

Sensor coming online with the current value:

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "sensor",
    "entity_id": "sensor-1",
    "attributes": {
      "state": "ON",
      "value": 21.5,
      "unit": "°C"
    }
  }
}
```

Binary sensor event:

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "sensor",
    "entity_id": "sensor-bin1",
    "attributes": {
      "state": "ON",
      "value": "off",
      "unit": "running"
    }
  }
}
```