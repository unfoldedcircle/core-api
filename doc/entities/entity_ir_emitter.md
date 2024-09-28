# IR-emitter Entity

An IR-emitter entity allows to send IR commands in PRONTO hex format.

This entity allows to integrate external IR blasters and emitters. Once added to a Remote, a new IR-emitter output is
registered which can be used for IR-remote entities. Similar as adding a new dock.

An IR-emitter device must support the PRONTO hex format. Other IR formats are optional. Currently only the IR protocols
and data values of the [IRremoteESP8266](https://github.com/crankyoldgit/IRremoteESP8266) library are supported as
additional format (see [options](#options) below for more information).

ℹ️ Supported in UC Remote firmware from version 1.9.3, Core Simulator from version 0.48.0.

## Features

| Name        | R  | W  | Description                                                                     |
|-------------|----|----|---------------------------------------------------------------------------------|
| send_ir     | ❌  | ✅  | Default feature of an IR-emitter entity. Always present, even if not specified. |
| 🚧 learn_ir | ✅  | ✅  | Planned feature: IR-emitter is also capable of learning IR codes.               |

- R: readable
    - ✅ Feature has a readable attribute to retrieve the current or available values.
    - ❌ Feature value(s) cannot be read.
- W: writeable
    - ✅ Feature has one or multiple commands to trigger an action or set a value.
    - ❌ No corresponding command(s), only the current value(s) of the feature can be read.

### Attributes

Entity attributes are controlled by features. Multiple features can act on the same attribute.

| Attribute       | Features | Type | Values            | Description             |
|-----------------|----------|------|-------------------|-------------------------|
| state           |          | enum | [States](#states) | State of the IR-emitter |

### States

The IR-emitter entity only supports the `ON` state and the [common entity states](README.md#states).

| Value | Description                                 |
|-------|---------------------------------------------|
| ON    | The emitter is available and ready to send. |

### Device Classes

None.

### Options

Optional features of the IR-emitter entity.

| Name       | Type  | Values      | Default | Description                                                                     |
|------------|-------|-------------|---------|---------------------------------------------------------------------------------|
| ports      | array | EmitterPort | []      | List of individual emitter ports which can be selected for sending IR commands. |
| ir_formats | array | `HEX`       | []      | Supported IR formats / protocols besides `PRONTO`.                              |

- The `ports` option can be omitted, if the emitter only supports a single output port.  
  `EmitterPort` format:

  ```json
  {
    "id": "unique-id",
    "name": "Friendly port name"
  }
  ```

- The `PRONTO` hex format is the default and must be supported by the IR-emitter driver.
- The `HEX` IR format refers to the learned IR codes with the Unfolded Circle Dock.
  - Format: `<protocol>;<hex-ir-code>;<bits>;<repeat-count>` from the [IRremoteESP8266](https://github.com/crankyoldgit/IRremoteESP8266)
    library.
  - `protocol`: numeric value from supported and enabled protocols. See: [decode_type_t](https://github.com/unfoldedcircle/IRremoteESP8266/blob/v2.8.5-ucd2.2/src/IRremoteESP8266.h#L1011)
  - `hex-ir-code`: HEX value prefixed with `0x`.
  - `bits`: number of bits in hex value.
  - `repeat-count`: number of repeats.
- Specifying additional formats like `HEX` allows the Remote to send these formats when available, e.g. learned codes
  from the dock. It does **not** mean, that all codes are transformed into this format!
- If the emitter device doesn't support the `HEX` format, the learned codes from the dock are automatically converted
  and sent as `PRONTO` codes.
  - ⚠️ The PRONTO-conversion is a best effort process only and certain IR protocols might lose the native auto-repeat
       functionality!
- ℹ️ Raw and Global Caché sendir formats are planned in the future.

## Integration API

### Commands

The integration driver has to implement a handler for the `entity_command` message to process the following command
requests in `msg_data.cmd_id`.

| cmd_id         | Parameters | Type   | Description                                                                                                               |
|----------------|------------|--------|---------------------------------------------------------------------------------------------------------------------------|
| send_ir        |            |        | Send an IR code on the specified output port and number of repeats.                                                       |
|                | code       | String | IR code to send.                                                                                                          |
|                | format     | String | Optional IR format of `code` if the emitter supports multiple IR formats. Defaults to `PRONTO` if not specified.          |
|                | port       | String | Optional: output port identifier. Only required if the emitter supports multiple outputs.                                 |
|                | repeat     | Number | Optional: how many times the command shall be repeated. Defaults to `1` if not specified (single command without repeat). |
| stop_ir        |            |        | Stop sending any active IR transmission on the specified port.                                                            |
|                | port       | String | Optional: output port identifier. Only required if the emitter supports multiple outputs.                                 |
| 🚧 start_learn |            |        |                                                                                                                           |
| 🚧 stop_learn  |            |        |                                                                                                                           |

#### send_ir

The `send_ir` command is used to send an IR code on the specified output port.

Long button presses on the Remote will trigger continuous `send_ir` requests with a `repeat` count set to 3 or higher.
Once the button is released, a `stop_ir` request is sent. This allows to implement a continuous IR repeat feature:

- If no transmission is active: start sending the IR command.
- If transmission is active:
  1. check if the same IR code is being transmitted. If other code: abort and respond with error code `409`.
  2. reset repeat count of the active transmission to prolong the command.

Queuing IR send requests should be avoided to prevent "ghost actions" when the user doesn't expect it. New IR commands
should be executed within 1 second.

ℹ️ The `HEX` format already contains a repeat field. This value is relevant, if the `send_ir.repeat` parameter is not
set. For continuous IR repeat, the `send_ir.repeat` parameter is set and overrides the embedded repeat field in the 
IR code.

#### stop_ir

The `stop_ir` command signals to stop an active IR transmission on the specified output port.

The IR transmission should be stopped no later than at the start of the next repeat sequence.
(This also depends on the IR protocol, some have a specific repeat sequence, others need to be fully retransmitted).

### Events

The `entity_change` event must be emitted by the integration driver if the state or an attribute of the IR-emitter changes.

The following attributes must be included:

| Attribute | Description                  |
|-----------|------------------------------|
| state     | New entity [state](#states). |

### Command examples

IR-emitter entity examples of received `entity_command` WebSocket messages in an integration driver.

#### send_ir with PRONTO code on default output

Sending a single PRONTO code (without repeat) on an IR-emitter with only one output port (`options.ports` not specified
or empty):

```json
{
  "kind": "req",
  "id": 122,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "ir_emitter",
    "entity_id": "emitter-1",
    "cmd_id": "send_ir",
    "params": {
      "code": "0000 006D 0004 0002 0155 00AB 0015 0015 0015 0015 0015 0015 0155 0055 0015 0E4C"
    }
  }
}
```

#### send_ir with PRONTO code on specific output and repeat

Sending a PRONTO code three times on a specific output port:

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "ir_emitter",
    "entity_id": "emitter-2",
    "cmd_id": "send_ir",
    "params": {
      "code": "0000 006D 0004 0002 0155 00AB 0015 0015 0015 0015 0015 0015 0155 0055 0015 0E4C",
      "port": "port1",
      "repeat": 3
    }
  }
}
```

#### stop_ir

Stop an active IR transmission on a specific output port:

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "ir_emitter",
    "entity_id": "emitter-2",
    "cmd_id": "stop_ir",
    "params": {
      "port": "port1"
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
    "entity_type": "ir_emitter",
    "entity_id": "emitter-1",
    "attributes": {
      "state": "on"
    }
  }
}
```
