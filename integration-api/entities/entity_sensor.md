# Sensor Entity

A sensor entity provides measured values from devices or dedicated hardware sensors.  
The device class specifies the type of sensor and links it with a default unit of measurement to display in the user
interface.

- The `custom` device class allows arbitrary UI labels and units.
- The `temperature` device class performs automatic conversion between °C and °F.

## Features

The sensor entity has no features.

### Attributes

| Attribute | Type            | Values            | Description                                 |
|-----------|-----------------|-------------------|---------------------------------------------|
| state     | enum            | [States](#states) | State of the sensor.                        |
| value     | number / string |                   | The native measurement value of the sensor. |

### States

The sensor entity only supports the `ON` state and the [common entity states](entities.md#states). 

| Value | Description                                         |
|-------|-----------------------------------------------------|
| ON    | The sensor is available and providing measurements. |

### Device classes

The device class specifies the type of sensor.

| Name        | Default unit | Description                                                                                                                                |
|-------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| custom      |              | Generic sensor with custom label and unit                                                                                                  |
| battery     | %            | Battery charge in %                                                                                                                        |
| current     | A            | Electrical current in ampere                                                                                                               |
| energy      | kWh          | Energy in kilowatt-hour                                                                                                                    |
| humidity    | %            | Humidity in %                                                                                                                              |
| power       | W            | Power in watt or kilowatt                                                                                                                  |
| temperature | °C           | Temperature with automatic °C, °F conversion, depending on remote settings. Use `native_unit` option if the temperature is measured in °F. |
| voltage     | V            | Voltage in volt                                                                                                                            |

### Options

| Name         | Type   | Default | Description                                                                                                                     |
|--------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------|
| custom_label | text   |         | Label for a custom sensor if `device_class` is not specified or to override a default unit.                                     |
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
  - If the entity `state` and the `value` attribute changed at the same time, they may both be included in the message.
  - It's also valid to always send every attribute.
- The `state` attribute is optional for a sensor.
  - If the state is never sent, the sensor is considered available.
- Only sending the `unit` attribute is not valid.

### Event examples

#### State change event

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
