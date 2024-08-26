# Entities

Entities represent devices by describing features and exposing controls. An integration can offer available entities for
control. The user might select and configure entities, that will be available for the user interface.

Based on the entity type, device class and features, a specific user interface is shown. These features and other entity
characteristics are set by the integration.

An integration driver provides entity definitions to the remote which then can be used in profiles and pages for the
user to interact with the device.

Whenever the user interacts with an entity from an integration driver, the remote sends command requests to the
integration driver. Once the entity or physical device has been updated the integration driver sends a change event
message back to the remote to notify it about the updated state or attribute(s).

Supported entities:

- [Button](entity_button.md)
- [Switch](entity_switch.md)
- [Climate](entity_climate.md)
- [Cover](entity_cover.md)
- [Light](entity_light.md)
- [Media Player](entity_media_player.md)
- [Remote](entity_remote.md)
- [Sensor](entity_sensor.md)
- [IR-Emitter](entity_ir_emitter.md)

The 🚧 icon within the entity descriptions indicates a planned feature.

## Integration API

To make entities available to the remote, an integration driver needs to provide `entity` definition for each entity
instance, filled with entity type specific data.

The remote retrieves the available entities from the integration driver with the `get_available_entities` request
message:

```json
{
  "kind": "req",
  "id": 11,
  "msg": "get_available_entities"
}
```

The integration driver then responds with the `available_entities` message containing all entity definitions:

```json
{
  "kind": "resp",
  "req_id": 11,
  "msg": "available_entities",
  "code": 200,
  "msg_data": {
    "available_entities": [
      {
        "entity_id": "button-1",
        "entity_type": "button",
        "name": {
          "en": "Ring dinner bell"
        }
      },
      {
        "entity_id": "blind-1",
        "entity_type": "cover",
        "device_class": "blind",
        "features": [
          "open",
          "close",
          "stop",
          "position"
        ],
        "name": {
          "en": "Living room blinds",
          "de": "Wohnzimmer Jalousien"
        }
      },
      {
        "entity_id": "light-1",
        "entity_type": "light",
        "features": [
          "on_off",
          "dim",
          "colour"
        ],
        "name": {
          "en": "Living room"
        }
      }
    ]
  }
}
```

All entities share a set of common attributes like `name` and the `UNAVAILABLE`, `UNKNOWN` states.
An entity implementation defines additional features, attributes, states and options which need to be handled in the
driver implementation.

Please see [Integration AsyncAPI definition](../../integration-api/UCR-integration-asyncapi.yaml) for more information and additional options.

### Common entity definition

All entities share the following properties in the `entity` structure:

| Entity property | Description                                                                                                                                                                                   |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| entity_id       | Unique identifier of the entity for command and event messages.                                                                                                                               |
| entity_type     | Entity device type name: one of the supported entities.                                                                                                                                       |
| device_id       | Optional associated device, if the integration driver supports multiple devices.                                                                                                              |
| features        | Supported features of the entity. See concrete entity definition for available features.                                                                                                      |
| name            | Human readable name of the entity or device. Default value of the entity name for the entity configuration in the remote. Changeable by the user.                                             |
| area            | Optional area name, e.g. `Living room`. This information might be used by the UI in the setup process to automatically create profile pages for all areas returned in the available entities. |

### Features

The entity features define the controllable properties of an entity. They also influence how an entity is shown in the
UI, e.g. if there are dimmer and colour selection controls for a lamp, or blind position controls.

### Attributes

Entity attributes are controlled or influenced by features. A features can act on multiple attributes,
e.g. the open command for a cover entity will set the state and if supported, also the current position of the cover.

An attribute value should represent the correct state of the physical device being controlled whenever possible. An
integration driver might simulate intermediate states and position values, if the current state is either not readable
from the device or involves expensive operations. E.g. if it's known that opening a window blind takes 30 seconds, the
integration driver can start a timer and send approximated status updates during the opening time frame.  
This will show a nice animation in the remote UI instead of immediately jumping from closed to open while the physical
blind is still opening.

### States

The entity `state` attribute holds the following common values which an integration driver can choose to support:

| Value       | Description                                                                                                             |
|-------------|-------------------------------------------------------------------------------------------------------------------------|
| UNAVAILABLE | The entity is currently not available. The UI will render the entity as inactive until the entity becomes active again. |
| UNKNOWN     | The entity is available but the current state is unknown.                                                               |

### Device classes

An entity type can be further classified by an optional device class. This has mainly an influence on the UI
representation how an entity is presented to a user. E.g. a `cover` entity has multiple device classes like `blind` or
`garage`.

### Options

Options are feature modifiers to customize certain behaviour, e.g. the default `on_off` feature for a switch expects the
current state to be retrievable. If a switch can't provide its current state, it becomes a toggle switch with setting
the `readable` option to `false`. 

### Commands

For all user or scene interactions with an entity, like switching it on or changing an attribute, the remote sends an
`entity_command` message to the integration driver. This message contains the entity command with optional parameters
to execute by the driver:

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "$TYPE",
    "entity_id": "$ID",
    "cmd_id": "$COMMAND",
    "params": {
      "$ParameterName1": "$ParameterValue1",
      "$ParameterName2": "$ParameterValue2",
      "$ParameterNameN": "$ParameterValueN"
    }
  }
}
```

- The command is specified in `msg_data.cmd_id`.
  - Optional command parameters are passed as key / value pairs under `msg_data.params`.
  - The available commands and parameters are specified in the corresponding entity documentation.
- The command request must be acknowledged with a `result` response message.
  - If at the time of receiving the command the driver already knows that it can't execute the command, it can send
    back an error to notify that the command execution is not possible.  
    Otherwise, the remote assumes that the command is executed.
- Once the value has been set or confirmed by the physical device, an `entity_change` event message must be sent by the
  integration driver with the new value(s). Of course, this only applies to stateful attributes and not to buttons or 
  "fire and forget" commands.

### Events

The `entity_change` event must be emitted by the integration driver if the state of the entity changes. Either after an
`entity_command` or if the entity has been updated otherwise, e.g. externally through a user or another system.  
This keeps the remote in sync with the real state of the entity without the need of constant polling.

Event message structure:

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "$TYPE",
    "entity_id": "$ID",
    "attributes": {
      "$Attribute1": "$Value1",
      "$Attribute2": "$Value2",
      "$AttributeN": "$ValueN"
    }
  }
}
```

The available `$Attribute(s)` and their `$Value(s)` are specified in the entity documentation.

Common event attributes available for all entities:

| Attribute     | Description       |
|---------------|-------------------|
| state         | New entity state. |

At least one attribute must be specified in the `entity_change` message. If the common entity `state` and an addition
attribute changed at the same time, they may both be included in the same message. It's also valid to always send every
entity attribute. The remote will filter out non-changed attributes and only update changes in the UI.
