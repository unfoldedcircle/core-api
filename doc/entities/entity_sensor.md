# Sensor Entity

A sensor entity provides measured values from devices or dedicated hardware sensors.  
The device class specifies the type of sensor and links it with a default unit of measurement to display in the user
interface.

- The `custom` device class allows arbitrary text values and unit labels.
- The `temperature` device class performs automatic conversion between °C and °F.
- The `timestamp`, `date` and `duration` device classes are formatted by the UI as a date, time or time span.

## Features

The sensor entity has no features.

### Attributes

| Attribute | Type                   | Values            | Description                                                                          |
|-----------|------------------------|-------------------|--------------------------------------------------------------------------------------|
| state     | enum                   | [States](#states) | Optional state of the sensor.                                                        |
| value     | number / string / null |                   | The native measurement value of the sensor. `null`: no value, e.g. while unavailable. |
| unit      | string                 |                   | Optional unit of the `value` if no default unit is set.                              |

The `unit` attribute can be specified in the `entity_change` event and takes precedence over the associated default unit
in the `device_class` or the specified `custom_unit` in the options.

If an integration driver gets the current unit from an external system together with the current value, it's recommended
to pass it on.  
If the integration driver is in control of the unit, and it can't change at runtime, the unit can be specified in the
available entity definition as `options.custom_unit` and then omitted in `entity_change` events.

#### Value format

- A numeric measurement must be sent as a JSON number, not as a text value. Text values are shown as they are, without
  any formatting.
- Calculated values should be rounded to the resolution of the sensor, or at least to 15 significant digits, to remove
  floating point artifacts like `1.499999999999997`.
- The UI rounds a numeric value for display only:
  - With the `decimals` option, the value is shown with exactly this number of decimal places. E.g. `21` with
    `decimals: 1` is shown as `21.0`.
  - Without the `decimals` option, floating point artifacts are removed and the value is shown with at most 2 decimal
    places, without trailing zeros. E.g. `21.40` is shown as `21.4`, `1.499999999999997` as `1.5`.

#### Date, time and duration values

The `timestamp`, `date` and `duration` device classes tell the UI that the value is a point in time, a calendar date
or a time span. The integration driver sends the value in a machine-readable format and must not format it for display.
The UI formats the value with the localization settings of the Remote: time zone, 12 / 24 hour time format and language.

| Device class | Value type | Value format                                                                                          | Example                       |
|--------------|------------|-------------------------------------------------------------------------------------------------------|-------------------------------|
| timestamp    | string     | Date and time in [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) format, including the UTC offset. | `"2026-11-15T04:23:31+00:00"` |
| date         | string     | Calendar date in ISO 8601 format: `YYYY-MM-DD`.                                                       | `"2026-11-15"`                |
| duration     | number     | Time span in the unit of the sensor.                                                                  | `7.8` with unit `d`           |

- `timestamp`:
  - The UTC offset is required, either as `Z` or as `±hh:mm`. The UI converts the value to the time zone of the Remote.
  - The UI may show a point in time relative to the current time, e.g. `in 3 hours`.
- `date`: the value has no time zone and is shown as is, in the date format of the configured language.
- `duration`: supported units are `ms`, `s`, `min`, `h` and `d`. Default if not specified: `s`. See
  [duration format](#duration-format).
- The `decimals` option is not used for the `timestamp` and `date` device classes.
- A value which is not in the specified format is shown as text, without any formatting.
- A UI which doesn't support these device classes shows the value as for a `custom` sensor: unformatted with the
  optional unit.

##### Duration format

Units `d`, `h` and `min`: the value is shown as a time span, in the unit of the sensor and the next smaller unit.

1. With the `decimals` option, the value is first rounded to this number of decimal places.
2. The integer part of the value, rounded down, is shown in the unit of the sensor. This unit is always shown.
3. The fractional part is converted to the next smaller unit and rounded down: `d` → hours, `h` → minutes, `min` →
   seconds. It is only shown if it is not zero.
4. The units are shown with the short unit labels of the configured language.

| Value | Unit  | `decimals` | Shown as  |
|-------|-------|------------|-----------|
| 1.5   | `h`   |            | `1h 30m`  |
| 93    | `h`   |            | `93h`     |
| 2.75  | `h`   | 0          | `3h`      |
| 3.9   | `d`   |            | `3d 21h`  |
| 90.5  | `min` |            | `90m 30s` |
| 0.25  | `min` |            | `0m 15s`  |
| -2    | `h`   |            | `-2h`     |

- The value is not converted to a larger unit: `93` hours are shown as `93h` and not as `3d 21h`.
- A negative value with a fractional part is shown as a number with the unit, e.g. `-1.5 h`.

Units `s` and `ms`: the value is shown as a number with the unit, like any other numeric sensor value and with the
`decimals` option. E.g. `673492 s`. An integration driver should provide a long time span in a larger unit to get a
readable value.

### States

The `state` attribute is optional for a sensor.

The sensor entity only supports the `ON` state and the [common entity states](README.md#states). 

| Value | Description                                         |
|-------|-----------------------------------------------------|
| ON    | The sensor is available and providing measurements. |

### Device Classes

The device class specifies the type of sensor. Default if not specified: `custom`.

| Name          | Default unit | Description                                                                                                                                                |
|---------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| custom        |              | Generic sensor with custom unit                                                                                                                            |
| 🚧 audio_level | dB           | Audio level in decibel, e.g. the current volume of an AV receiver. Not intended for measured sound pressure levels.                                        |
| battery       | %            | Battery charge in %                                                                                                                                        |
| current       | A            | Electrical current in ampere                                                                                                                               |
| date        |              | Calendar date without a time. See [date, time and duration values](#date-time-and-duration-values).                                                        |
| duration    | s            | Time span, e.g. the remaining run time of a device. See [date, time and duration values](#date-time-and-duration-values).                                  |
| energy        | kWh          | Energy in kilowatt-hour                                                                                                                                    |
| humidity      | %            | Humidity in %                                                                                                                                              |
| 🚧 illuminance | lx           | Illuminance in lux.                                                                                                                                        |
| power         | W            | Power in watt or kilowatt                                                                                                                                  |
| temperature   | °C           | Temperature with automatic °C, °F conversion, depending on remote settings. Use `native_unit` option if the temperature is measured in °F.                 |
| timestamp   |              | Point in time, e.g. the next scheduled backup. See [date, time and duration values](#date-time-and-duration-values).                                       |
| voltage       | V            | Voltage in volt                                                                                                                                            |
| binary        |              | Binary sensor. The binary specific device class is stored in the `unit` attribute.                                                                         |

The device classes are kept in sync with the [number entity](entity_number.md#device-classes): a device class has the
same name, default unit and meaning in both entities. New device classes are added to both entities, unless a class only
makes sense for one of them, like the `custom`, `binary`, `date` and `timestamp` sensor device classes.

#### Binary Device Class

The `binary` device class allows specifying a binary sensor with two states in the `value` attribute: `on` and `off`.

These values can mean different things depending on the `unit` attribute. For example, a binary sensor with the `unit`
attribute set to `sound`: `on` means sound detected and `off` means no sound detected. For `unit` set to `window`: `on`
means the window is open and `off` means the window is closed.

If the `unit` attribute is not specified, the binary sensor is a generic on/off sensor.

🚧 Supported unit values are the Home Assistant binary sensor device classes: <https://www.home-assistant.io/integrations/binary_sensor/#device-class>

### Options

| Name        | Type    | Default | Description                                                                                                                                                                                                            |
|-------------|---------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| custom_unit | text    |         | Unit label for a custom sensor if `device_class` is not specified or to override a default unit.                                                                                                                       |
| native_unit | text    |         | The sensor's native unit of measurement to perform automatic conversion. Applicable to device classes: `temperature`.                                                                                                  |
| decimals    | integer |         | Number of decimal places to show in the UI if the sensor provides the measurement as a number: 0..6. Not applicable to text values and the `timestamp` and `date` device classes. If not set, at most 2 decimal places are shown. See [value format](#value-format). |
| 🚧 min_value | number  |         | Optional minimum value of the sensor output. This can be used in the UI for graphs or gauges.                                                                                                                          |
| 🚧 max_value | number  |         | Optional maximum value of the sensor output. This can be used in the UI for graphs or gauges.                                                                                                                          |

### User overrides

The following options can be overridden by the user in the web-configurator. See [user overrides](README.md#user-overrides).

| Name     | Description                                 |
|----------|---------------------------------------------|
| decimals | Number of decimal places to show in the UI. |

## Integration API

### Commands

The sensor entity doesn't support any commands.

### Events

The `entity_change` event must be emitted by the integration driver if the state or an attribute of a sensor changes.

The following attributes are supported:

| Attribute | Description                                                                                              |
|-----------|----------------------------------------------------------------------------------------------------------|
| state     | Optional entity [state](#states).                                                                        |
| value     | The current sensor value. `null` if there's no value, e.g. while the sensor is unavailable.              |
| unit      | Optional: the unit of measurement for the given `value`. If omitted, the configured entity unit is used. |

- At least one attribute must be specified in the `entity_change` message.
  - If the sensor `value` and `unit` attributes change at the same time, both must be included in the same message.
  - It's also valid to always send every attribute.
- Only sending the `unit` attribute is not valid.
- If the state is never sent, the sensor is considered available (`ON`).
- If the sensor becomes unavailable or the value is unknown, `value` should be set to `null`. Otherwise the Remote keeps
  the last value.

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

Sensor with a text value:

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "sensor",
    "entity_id": "sensor-2",
    "attributes": {
      "value": "Charging"
    }
  }
}
```

Sensor with a `timestamp` device class:

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "sensor",
    "entity_id": "sensor-3",
    "attributes": {
      "value": "2026-11-15T04:23:31+00:00"
    }
  }
}
```

Sensor with a `duration` device class:

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "sensor",
    "entity_id": "sensor-4",
    "attributes": {
      "value": 7.8,
      "unit": "d"
    }
  }
}
```

Sensor becoming unavailable:

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "sensor",
    "entity_id": "sensor-1",
    "attributes": {
      "state": "UNAVAILABLE",
      "value": null
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