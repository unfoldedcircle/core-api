# Remote Entity

A remote entity can send commands to a controllable device.

ℹ️ Supported in remote-core / Core Simulator from version 0.43.0.

## Features

| Name     | R | W  | Description                                                                                                                                          |
|----------|---|----|------------------------------------------------------------------------------------------------------------------------------------------------------|
| send_cmd | ❌ | ✅  | Default feature of a remote entity. Always present, even if not specified.                                                                           |
| on_off   | ✅ | ✅  | Remote has on and off commands.                                                                                                                      |
| toggle   | ❌ | ✅  | Power toggle support. If there's no native support, the remote will use the current state of the remote to send the corresponding on or off command. |

- R: readable
    - ✅ Feature has a readable attribute to retrieve the current or available values.
    - ❌ Feature value(s) cannot be read.
- W: writeable
    - ✅ Feature has one or multiple commands to trigger an action or set a value.
    - ❌ No corresponding command(s), only the current value(s) of the feature can be read.

### Attributes

Entity attributes are controlled by features. Multiple features can act on the same attribute. See Events on how to
notify the remote about an updated attribute. The attributes have to be listed as properties under `attributes` with
their current value.

| Attribute | Features | Type | Values            | Description                                                                                                                                |
|-----------|----------|------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| state     | on_off   | enum | [States](#states) | State of the controlled device, it's either on or off.                                                                                     |
|           | toggle   |      |                   | Toggle inverts the current state. If the driver doesn't provide the toggle feature, the remote uses the current value and calls on or off. |

### States

The remote entity provides the following entity `state` values:

| Value       | Description                                              |
|-------------|----------------------------------------------------------|
| ON          | The controlled device is on.                             |
| OFF         | The controlled device is off.                            |
| UNAVAILABLE | The controlled device is unavailable / can't be reached. |

See [common entity states](README.md#states).

### Device classes

None.

### Options

Optional features of the remote entity.

| Name            | Type   | Values              | Default | Description                                                                                                                       |
|-----------------|--------|---------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------|
| simple_commands | array  | string(20)          | []      | Optional list of supported commands. If not provided, the integration driver has to document the available commands for the user. |
| button_mapping  | array  | DeviceButtonMapping | []      | Optional command mapping for the physical buttons.                                                                                |
| user_interface  | object | UserInterface       | {}      | Optional user interface definition for the supported commands.                                                                    |

If the available commands are known by the integration driver, they should be made available in the `simple_commands`
option. This allows the Remote Two configuration in the web-configurator to show all supported commands to the user.
Otherwise, the user has to know the command names and has to enter them manually for each command.

If `button_mapping` or `user_interface` options are not provided, an automatic mapping is attempted based on the command
names in `simple_commands`. The mapping logic is similar to the infrared codesets in the internal IR-remotes.
See [Command name patterns](#command-name-patterns) below on how commands should be named.

The automatic button and user interface creation is only done once at the initial entity configuration. From that point
on the user can independently modify the UI and button mapping. Only changes in the `simple_commands` list will be
applied to the configured entities in Remote Two, if the available entities are reloaded from the integration driver.

#### Simple commands

A simple command is fully defined by its name and doesn't have any further arguments or related attributes. It's
comparable to the simple commands in the media-player entity, with fewer naming restrictions.

Restrictions:
- A command name may not include whitespace characters.
- The maximum length of a command name is 20 characters.
- A command name may not be any of the defined `cmd_id` commands: on, off, toggle, send_cmd, send_cmd_sequence.
- Commands cannot have any further parameters. For example, it's not possible to have a `switch_channel` command with
  the channel number as parameter.

Command naming recommendations:

- Command names should be short and follow naming patterns.
- Uppercase naming is preferred.
- Dedicated power on/off or toggle commands should not be added. Use the `on_off` and `toggle` features with the defined
  `on`, `off` and `toggle` commands.

#### Command Name Patterns

Even though command names can be freely defined, it's highly recommended to follow a naming pattern and use the
recommended names for common commands. This allows better integration into Remote Two, like default UI mappings and
grouping of similar commands.

- Navigation: `CURSOR_UP`, `CURSOR_DOWN`, `CURSOR_LEFT`, `CURSOR_RIGHT`, `CURSOR_ENTER`, `BACK`, `EXIT`
- Menus: `HOME`, `MENU`, `CONTEXT_MENU`, `GUIDE`, `INFO`, `SETTINGS`
- Volume control: `VOLUME_UP`, `VOLUME_DOWN`, `MUTE_TOGGLE`, `MUTE`, `UNMUTE`
- Media playback: `PLAY_PAUSE`, `STOP`, `PREVIOUS`, `NEXT`, `FAST_FORWARD`, `REWIND`

See [media-player entity commands](entity_media_player.md#commands) for further commands.

Prefixes for other common functions:

- `INPUT_`: source inputs, e.g. `INPUT_AUX1`, `INPUT_TV`, `INPUT_RADIO`
- `APP_`: applications, e.g. `APP_MY_TV_STREAMING`, `APP_INTERNET`
- `MODE_`: mode changing functions, e.g. `MODE_16/9`, `MODE_SURROUND`, `MODE_FOOTBALL`
- `MENU_`: additional menus, e.g. `MENU_SMART_HOME`, `MENU_QUICK`
- `DIGIT_`: additional input digits besides the pre-defined numpad digits, e.g. `DIGIT_10`, `DIGIT_10+`
- `ZONE_`: multi-room functions, e.g. `ZONE_A`, `ZONE_MULTIROOM`

#### Button mapping

A default button mapping can be provided in `options.button_mapping`.

The `DeviceButtonMapping` object is defined in the [Integration-API](../../integration-api) and is based on the same
definition in the Core-API.

Example of `entity.options` object:
```json
{
  "simple_commands": [
    "VOLUME_UP",
    "VOLUME_DOWN",
    "HOME",
    "CURSOR_UP",
    "CURSOR_DOWN",
    "CURSOR_LEFT",
    "CURSOR_RIGHT",
    "CURSOR_ENTER"
  ],
  "button_mapping": [
    {
      "button": "POWER",
      "short_press": {
        "cmd_id": "remote.toggle"
      }
    },
    {
      "button": "RED",
      "short_press": {
        "cmd_id": "remote.send_cmd",
        "params": {
          "command": "VOLUME_DOWN",
          "repeat": 10
        }
      }
    },
    {
      "button": "DPAD_UP",
      "short_press": {
        "cmd_id": "CURSOR_UP"
      }
    },
    {
      "button": "DPAD_MIDDLE",
      "short_press": {
        "cmd_id": "CURSOR_ENTER"
      },
      "long_press": {
        "cmd_id": "MENU"
      }
    },
    {
      "button": "DPAD_DOWN",
      "short_press": {
        "cmd_id": "CURSOR_DOWN"
      }
    },
    {
      "button": "BLUE",
      "short_press": {
        "cmd_id": "remote.send_cmd_sequence",
        "params": {
          "sequence": "HOME,CURSOR_DOWN,CURSOR_RIGHT,CURSOR_ENTER",
          "delay": 200
        }
      }
    }
  ]
}
```

See [Commands](#commands) about entity commands and their short vs fully qualified syntax. For example `on` and `off` vs
`remote.on` and `remote.off`.

Button identifiers for Remote Two:
- `BACK`
- `HOME`
- `VOICE`
- `VOLUME_UP`, `VOLUME_DOWN`, `MUTE`
- `DPAD_UP`, `DPAD_DOWN`, `DPAD_LEFT`, `DPAD_RIGHT`, `DPAD_MIDDLE`
- `GREEN`, `YELLOW`, `RED`, `BLUE`
- `CHANNEL_UP`, `CHANNEL_DOWN`
- `PREV`, `PLAY`, `NEXT`
- `POWER`

A detailed button mapping can be retrieved with the Core-API: `GET /api/cfg/device/button_layout`.

#### User interface

A default user interface can be provided in `options.user_interface`.

The `UserInterface` object is defined in the [Integration-API](../../integration-api) and is based on the Core-API
`ActivityUserInterface` definition.

##### UI page example

![ui-page-media.png](../img/ui-page-media.png)

`entity.options` object:
```json
{
  "simple_commands": [
    "MY_RECORDINGS",
    "MY_APPS",
    "REVERSE",
    "PLAY",
    "PAUSE",
    "FORWARD",
    "RECORD"
  ],
  "user_interface": {
    "pages": [
      {
        "page_id": "media",
        "name": "Media",
        "grid": { "width": 4, "height": 6 },
        "items": [
          {
            "type": "text",
            "text": "Recordings",
            "command": {
              "cmd_id": "MY_RECORDINGS"
            },
            "location": { "x": 0, "y": 2 },
            "size": { "width": 2, "height": 1 }
          },
          {
            "type": "text",
            "text": "Apps",
            "command": {
              "cmd_id": "MY_APPS"
            },
            "location": { "x": 2, "y": 2 },
            "size": { "width": 2, "height": 1 }
          },
          {
            "type": "icon",
            "icon": "uc:bw",
            "command": {
              "cmd_id": "REVERSE"
            },
            "location": { "x": 0, "y": 5 }
          },
          {
            "type": "icon",
            "icon": "uc:play",
            "command": {
              "cmd_id": "PLAY"
            },
            "location": { "x": 1, "y": 5 }
          },
          {
            "type": "icon",
            "icon": "uc:pause",
            "command": {
              "cmd_id": "PAUSE"
            },
            "location": { "x": 2, "y": 5 }
          },
          {
            "type": "icon",
            "icon": "uc:ff",
            "command": {
              "cmd_id": "FORWARD"
            },
            "location": { "x": 3, "y": 5 }
          },
          {
            "type": "icon",
            "icon": "uc:rec",
            "command": {
              "cmd_id": "RECORD"
            },
            "location": { "x": 2, "y": 4 }
          }
        ]
      }
    ]
  }
}
```

Screen grid sizes for Remote Two:
- Minimal size: 1 x 1
- Maximum size: 8 x 12
- Default: 4 x 6

The screen layout grid definition can be retrieved with the Core-API: `GET /api/cfg/device/screen_layout`.

## Integration API

### Commands

The integration driver has to implement a handler for the `entity_command` WebSocket message to process the following
command requests in `msg_data.cmd_id`. See [Command examples](#command-examples) and [Integration-API](../../integration-api)
for the full message structure.

| cmd_id            | Parameters | Type         | Description                                                                                  |
|-------------------|------------|--------------|----------------------------------------------------------------------------------------------|
| on                | -          |              | Send the on-command to the controlled device.                                                |
| off               | -          |              | Send the off-command.                                                                        |
| toggle            | -          |              | Toggle the power state of the controlled device, either from on -> off or from off -> on.    |
| send_cmd          | command    | String(20)   | A single command.                                                                            |
|                   | repeat     | Number       | Optional: how many times the command shall be repeated. Defaults to 1 if not specified.      |
|                   | delay      | Number       | Optional: delay in milliseconds between repeated commands.                                   |
|                   | hold       | Number       | Optional: time in milliseconds before a command is released. Defaults to 0 if not specified. |
| send_cmd_sequence | sequence   | String array | Command list. Same defaults are used as for the `send_cmd` command.                          |
|                   | repeat     | Number       | Optional: how many times each command shall be repeated.                                     |
|                   | delay      | Number       | Optional: delay in milliseconds between commands.                                            |
|                   | hold       | Number       | Optional: time in milliseconds before each command is released.                              |

- The `command` and `sequence` parameters will either contain a simple command (if specified in entity options) or a
  freetext command. It is up to the integration driver to verify and validate commands.
- A command name may not include whitespace characters.
- The maximum length of a command name is 20 characters.
- A command name may not be any of the defined `cmd_id` commands: on, off, toggle, send_cmd, send_cmd_sequence
- If no `delay` parameter is included, the integration driver has to choose an appropriate delay based on the command
  and controlled device.

#### Using commands for button mappings and UI elements 

‼️ Attention: the `cmd_id` for button mapping and UI item commands is slightly different than the remote-entity 
[Commands](#commands)!
- Core-API button mapping and UI item commands:
  - The `cmd_id` value is either a simple command or an entity command with the entity type prefix. 
- Integration-API entity commands:
  - The `cmd_id` value refers to the defined [Commands](#commands) without the entity type prefix.
  - A simple command will always be wrapped into the remote-entity command `send_cmd`.

When defining commands in button mappings or UI elements, either entity commands or simple commands can be used. 
- Entity commands are all the commands an entity defines (see `cmd_id` column in [Commands](#commands) above). Example:
```json
{
  "cmd_id": "toggle"
}
```

- If the integration driver provides the `simple_commands` option, the specified commands can be directly used in
  `cmd_id`. Example:
```json
{
  "cmd_id": "PLAY"
}
```

- Specified simple commands can also be used in the `send_cmd` entity command.
- The `command` parameter of `send_cmd` allows any command name ("free-text") and it's up to the integration driver to
  validate the received commands.  
  Example of a simple command used in `send_cmd`:
```json
{
  "cmd_id": "send_cmd",
  "params": {
    "command": "PLAY"
  }
}
```

- If an entity command is used it's recommended to prefix it with the entity type to use the same naming convention as
  in the Core-API.
  - Using the fully qualified command name might make it easier in the integration driver to distinguish the commands.
  - A missing entity type prefix is automatically added when an available remote-entity is configured in Remote Two.
  - When working with the Core-API, for example reconfiguring a button mapping, the fully qualified command name is
    required.

Recommended fully-qualified entity command name:
```json
{
  "cmd_id": "remote.send_cmd",
  "params": {
    "command": "PLAY"
  }
}
```

### Events

The `entity_change` event must be emitted by the integration driver if the state or an attribute of the remote device
changes.

The following attributes must be included:

| Attribute     | Description                   |
|---------------|-------------------------------|
| state         | New entity [state](#states).  |

### Command examples

Remote-entity examples of received `entity_command` WebSocket messages in an integration driver.

#### on

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "on"
  }
}
```

#### off

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "off"
  }
}
```

#### toggle

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "toggle"
  }
}
```

#### send command

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "send_cmd",
    "params": {
      "command": "DPAD_UP"
    }
  }
}
```

#### send long-press command

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "send_cmd",
    "params": {
      "command": "CURSOR_ENTER",
      "hold": 800
    }
  }
}
```

#### send repeated command

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "send_cmd",
    "params": {
      "command": "VOLUME_DOWN",
      "repeat": 5
    }
  }
}
```

#### send sequence

```json
{
  "kind": "req",
  "id": 124,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "cmd_id": "send_cmd_sequence",
    "params": {
      "sequence": ["1", "2", "3", "ENTER"],
      "delay": 100
    }
  }
}
```

### Event examples

#### device was turned on

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "attributes": {
      "state": "on"
    }
  }
}
```

#### device was turned off

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "msg_data": {
    "entity_type": "remote",
    "entity_id": "remote-1",
    "attributes": {
      "state": "off"
    }
  }
}
```
