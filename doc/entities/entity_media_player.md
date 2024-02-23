# Media Player Entity

<!-- TOC -->
* [Features](#features)
  * [Attributes](#attributes)
  * [States](#states)
  * [Device Classes](#device-classes)
  * [Options](#options)
* [Integration API](#integration-api)
  * [Commands](#commands)
  * [Simple Commands](#simple-commands)
    * [Command Name Patterns](#command-name-patterns)
  * [Events](#events)
    * [Media types](#media-types)
    * [Media images](#media-images)
  * [Command examples](#command-examples)
    * [on](#on)
    * [play_pause](#play_pause)
    * [volume](#volume)
    * [seek](#seek)
    * [repeat](#repeat)
    * [shuffle](#shuffle)
    * [select_sound_mode](#select_sound_mode)
    * [Custom simple command](#custom-simple-command)
  * [Event examples](#event-examples)
    * [State change event](#state-change-event)
* [Open issues and missing features](#open-issues-and-missing-features)
<!-- TOC -->

---

A media player entity controls playback of media on a device. This could be an online music streaming service, a TV,
a stereo or a video player. 

## Features

Media-player features define the capabilities of the controlled device. For example the `dpad` feature will enable the
four directional commands and the enter command. Furthermore, certain features control the appearance and functionality
of the media-player UI on the Remote Two.

| Name              | R | W | Description                                                                     |
|-------------------|---|---|---------------------------------------------------------------------------------|
| on_off            | ✅ | ✅ | The media player can be switched on and off.                                    |
| toggle            | ❌ | ✅ | The media player's power state can be toggled.                                  |
| volume            | ✅ | ✅ | The volume level can be set to a specific level.                                |
| volume_up_down    | ❌ | ✅ | The volume can be adjusted up (louder) and down.                                |
| mute_toggle       | ❌ | ✅ | The mute state can be toggled.                                                  |
| mute              | ✅ | ✅ | The volume can be muted.                                                        |
| unmute            | ✅ | ✅ | The volume can be un-muted.                                                     |
| play_pause        | ❌ | ✅ | The player supports starting and pausing media playback.                        |
| stop              | ❌ | ✅ | The player supports stopping media playback.                                    |
| next              | ❌ | ✅ | The player supports skipping to the next track.                                 |
| previous          | ❌ | ✅ | The player supports returning to the previous track.                            |
| fast_forward      | ❌ | ✅ | The player supports fast-forwarding the current track.                          |
| rewind            | ❌ | ✅ | The player supports rewinding the current track.                                |
| repeat            | ✅ | ✅ | The current track or playlist can be repeated.                                  |
| shuffle           | ✅ | ✅ | The player supports random playback / shuffling the current playlist.           |
| seek              | ❌ | ✅ | The player supports seeking the playback position.                              |
| media_duration    | ✅ | ❌ | The player announces the duration of the current media being played.            |
| media_position    | ✅ | ❌ | The player announces the current position of the media being played.            |
| media_title       | ✅ | ❌ | The player announces the media title.                                           |
| media_artist      | ✅ | ❌ | The player announces the media artist.                                          |
| media_album       | ✅ | ❌ | The player announces the media album if music is being played.                  |
| media_image_url   | ✅ | ❌ | The player provides an image url of the media being played.                     |
| media_type        | ✅ | ❌ | The player announces the type of media being played.                            |
| dpad              | ❌ | ✅ | Directional pad navigation, provides up / down / left / right / enter commands. |
| numpad            | ❌ | ✅ | Number pad, provides digit_0, .. , digit_9 commands.                            |
| home              | ❌ | ✅ | Home navigation support with home & back commands.                              |
| menu              | ❌ | ✅ | Menu navigation support with menu & back commands.                              |
| guide             | ❌ | ✅ | Program guide support with guide & back commands.                               |
| info              | ❌ | ✅ | Information popup / menu support with info & back commands.                     |
| color_buttons     | ❌ | ✅ | Color button support for red / green / yellow / blue function commands.         |
| channel_switcher  | ❌ | ✅ | Channel zapping support with channel up and down commands.                      |
| select_source     | ✅ | ✅ | Media playback sources or inputs can be selected.                               |
| select_sound_mode | ✅ | ✅ | Sound modes can be selected, e.g. stereo or surround.                           |
| eject             | ❌ | ✅ | The media can be ejected, e.g. a slot-in CD or USB stick.                       |
| open_close        | ❌ | ✅ | The player supports opening and closing, e.g. a disc tray.                      |
| audio_track       | ❌ | ✅ | The player supports selecting or switching the audio track.                     |
| subtitle          | ❌ | ✅ | The player supports selecting or switching subtitles.                           |
| record            | ❌ | ✅ | The player has recording capabilities with record, my_recordings, live commands |

- R: readable 
  - ✅ Feature has a readable attribute to retrieve the current or available values.
  - ❌ Feature value(s) cannot be read.
- W: writeable
  - ✅ Feature has one or multiple commands to trigger an action or set a value. 
  - ❌ No corresponding command(s), only the current value(s) of the feature can be read. 

🚧 Planned features are playlist handling, media browsing and searching.

🧑‍💻 Integration driver developers:
- If certain features or commands are missing for your device, they can be defined with ["simple commands"](#simple-commands).
- If a feature doesn't fully match your device, for example it only has a `record` function but no `my_recordings` or
  `live` functions, then the desired command(s) should also be defined as a ["simple command"](#simple-commands).
  - For the command name use the corresponding `cmd_id` in uppercase to keep any command related automations.  
    (This would be `RECORD` for the record-only feature example).

### Attributes

Entity attributes are enabled by features and hold the current value of a feature or provide available options.
Multiple features can act on the same attribute.

| Attribute       | Features                   | Type    | Values              | Description                                                                 |
|-----------------|----------------------------|---------|---------------------|-----------------------------------------------------------------------------|
| state           | on_off                     | enum    | [States](#states)   | State of the media player, influenced by the play and power commands.       |
|                 | toggle                     |         |                     |                                                                             |
|                 | play_pause, stop           |         |                     |                                                                             |
| volume          | volume                     | number  | 0..100              | Current volume level.                                                       |
|                 | volume_up_down             |         |                     |                                                                             |
| muted           | mute_toggle                | boolean |                     | Flag if the volume is muted.                                                |
|                 | mute, unmute               |         |                     |                                                                             |
| media_duration  | media_duration             | number  |                     | Media duration in seconds.                                                  |
| media_position  | media_position             | number  |                     | Current media position in seconds.                                          |
|                 | play_pause, stop           |         |                     |                                                                             |
|                 | fast_forward, rewind, seek |         |                     |                                                                             |
| media_type      | media_type                 | enum    | _platform specific_ | The type of media being played.                                             |
| media_image_url | media_image_url            | string  |                     | URL to retrieve the album art or an image representing what's being played. |
|                 | play_pause                 |         |                     |                                                                             |
|                 | next, previous             |         |                     |                                                                             |
| media_title     | media_title                | string  |                     | Currently playing media information.                                        |
|                 | play_pause                 |         |                     |                                                                             |
|                 | next, previous             |         |                     |                                                                             |
| media_artist    | media_artist               | string  |                     | Currently playing media information.                                        |
|                 | play_pause                 |         |                     |                                                                             |
|                 | next, previous             |         |                     |                                                                             |
| media_album     | media_album                | string  |                     | Currently playing media information.                                        |
|                 | play_pause                 |         |                     |                                                                             |
|                 | next, previous             |         |                     |                                                                             |
| repeat          | repeat                     | enum    | `OFF`, `ALL`, `ONE` | Current repeat mode.                                                        |
| shuffle         | shuffle                    | boolean |                     | Shuffle mode on or off.                                                     |
| source          | select_source              | string  |                     | Currently selected media or input source.                                   |
| source_list     | select_source              | list    | _text items_        | Available media or input sources.                                           |
| sound_mode      | select_sound_mode          | string  |                     | Currently selected sound mode.                                              |
| sound_mode_list | select_sound_mode          | list    | _text items_        | Available sound modes.                                                      |

### States

The entity `state` attribute holds the following values:

| Value     | Description                                             |
|-----------|---------------------------------------------------------|
| ON        | The media player is switched on                         |
| OFF       | The media player is switched off                        |
| PLAYING   | The media player is playing something                   |
| PAUSED    | The media player is paused                              |
| STANDBY   | The device is in low power state and accepting commands |
| BUFFERING | The media player is buffering to start playback         |

See also [common entity states](README.md#states).

### Device Classes

Optional: the media player can be classified what kind of device it represents. This can be used by the UI to represent
the media player with a different icon, behaviour etc.

| Name          | Description                                           |
|---------------|-------------------------------------------------------|
| receiver      | Audio-video receiver.                                 |
| set_top_box   | Set-top box for multichannel video and media playback |
| speaker       | Smart speakers or stereo device.                      |
| streaming_box | Device for media streaming services.                  |
| tv            | Television device.                                    |

### Options

Optional features of the media-player entity.

| Name            | Type   | Values | Default | Description                                                                                                                                                                                                                                                                                                           |
|-----------------|--------|--------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| simple_commands | array  | string | []      | Additional commands the media-player supports, which are not covered in the feature list. See [simple commands](#simple-commands).<br/>Example: `["EXIT", "THUMBS_UP", "THUMBS_DOWN"]`                                                                                                                                |
| volume_steps    | number | 2..100 | 100     | Number of available volume steps for the set volume command and UI controls.<br/>Examples: 100 = any value between 0..100, 50 = only odd numbers, 3 = \[33, 67, 100] etc. Value 0 = mute.<br/>Note: if the integration receives an "unexpected" number it is required to round up or down to the next matching value. |

## Integration API

### Commands

The integration driver has to implement a handler for the `entity_command` message to process the following command
requests in `msg_data.cmd_id`.

| cmd_id            | Parameters     | Description                                                              |
|-------------------|----------------|--------------------------------------------------------------------------|
| on                | -              | Switch on media player.                                                  |
| off               | -              | Switch off media player.                                                 |
| toggle            | -              | Toggle the current power state, either from on -> off or from off -> on. |
| play_pause        | -              | Toggle play / pause.                                                     |
| stop              | -              | Stop playback.                                                           |
| previous          | -              | Go back to previous track.                                               |
| next              | -              | Skip to next track.                                                      |
| fast_forward      | -              | Fast forward current track.                                              |
| rewind            | -              | Rewind current track.                                                    |
| seek              | media_position | Seek to given position in current track. Position is given in seconds.   |
| volume            | volume         | Set volume to given level.                                               |
| volume_up         | -              | Increase volume.                                                         |
| volume_down       | -              | Decrease volume.                                                         |
| mute_toggle       | -              | Toggle mute state.                                                       |
| mute              | -              | Mute volume.                                                             |
| unmute            | -              | Unmute volume.                                                           |
| repeat            | repeat         | Repeat track or playlist.                                                |
| shuffle           | shuffle        | Shuffle playlist or start random playback.                               |
| channel_up        | -              | Channel up.                                                              |
| channel_down      | -              | Channel down.                                                            |
| cursor_up         | -              | Directional pad up.                                                      |
| cursor_down       | -              | Directional pad down.                                                    |
| cursor_left       | -              | Directional pad left.                                                    |
| cursor_right      | -              | Directional pad right.                                                   |
| cursor_enter      | -              | Directional pad enter.                                                   |
| digit_0 - digit_9 | -              | Number pad digits 0..9.                                                  |
| function_red      | -              | Function red.                                                            |
| function_green    | -              | Function green.                                                          |
| function_yellow   | -              | Function yellow.                                                         |
| function_blue     | -              | Function blue.                                                           |
| home              | -              | Home menu                                                                |
| menu              | -              | Menu                                                                     |
| guide             | -              | Program guide menu.                                                      |
| info              | -              | Information menu / what's playing.                                       |
| back              | -              | Back / exit function for menu navigation (to exit menu, guide, info).    |
| select_source     | source         | Select an input source from the available sources.                       |
| select_sound_mode | mode           | Select a sound mode from the available modes.                            |
| record            | -              | Start, stop or open recording menu (device dependant).                   |
| my_recordings     | -              | Open recordings.                                                         |
| live              | -              | Switch to live view.                                                     |
| eject             | -              | Eject media.                                                             |
| open_close        | -              | Open or close.                                                           |
| audio_track       | -              | Switch or select audio track.                                            |
| subtitle          | -              | Switch or select subtitle.                                               |
| 🚧 search         |                |                                                                          |

### Simple Commands

Additional commands can be enabled with the `simple_commands` options. A device exposing a media-player entity can
support all additional device commands, not covered with the standard features, as so-called "simple commands".
These commands are comparable with the infrared remote-entity commands, where keys trigger an action on the device:

- The command is fully defined by its name and doesn't have any further arguments or related attributes.
- Command names must be upper case and may not contain spaces.
  - The upper case restriction makes them distinguishable from the pre-defined feature commands. 
  - Only a subset of the 7-bit ASCII printable characters are allowed: `-/_.:+#*°@%()?`
  - Maximum length is 20 characters.
  - Command name regex: `^[A-Z0-9\/_.:+#*°@%()?-]{1,20}$`
- 🚧 Simple commands cannot be translated yet. In the web-configurator they show up as defined.

#### Command Name Patterns

Even though command names can be freely defined with the allowed characters, the following prefixes should be used.
This allows better integration into Remote Two, like default UI mappings and grouping of similar commands.

- `INPUT_`: source inputs, e.g. `INPUT_AUX1`, `INPUT_TV`, `INPUT_RADIO`
- `APP_`: applications, e.g. `APP_MY_TV_STREAMING`, `APP_INTERNET`
- `MODE_`: mode changing functions, e.g. `MODE_16/9`, `MODE_SURROUND`, `MODE_FOOTBALL`
- `MENU_`: additional menus, e.g. `MENU_SMART_HOME`, `MENU_QUICK`
- `DIGIT_`: additional input digits besides the pre-defined numpad digits, e.g. `DIGIT_10`, `DIGIT_10+`
- `ZONE_`: multi-room functions, e.g. `ZONE_A`, `ZONE_MULTIROOM`

### Events

The `entity_change` event must be emitted by the integration driver if the state or an attribute of the media player
changes.

The following attributes are supported:

| Attribute              | Description                                                                                                                                                                                          |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| state                  | New entity [state](#states).                                                                                                                                                                         |
| volume                 | Current volume.                                                                                                                                                                                      |
| muted                  | Mute state.                                                                                                                                                                                          |
| media_position         | Current playback position.                                                                                                                                                                           |
| media_duration         | Duration of current media.                                                                                                                                                                           |
| media_title            | Current media title.                                                                                                                                                                                 |
| media_artist           | Current media artist.                                                                                                                                                                                |
| media_album            | Current media artist.                                                                                                                                                                                |
| media_image_url        | Current media image url, which will be resized for small and medium representations.<br/>If the player already has multiple sizes it's recommended to use the `_small`, `_med`, `_large` attributes. |
| media_image_url_small  | Current media image url for the small image.                                                                                                                                                         |
| media_image_url_medium | Current media image url for the medium size image.                                                                                                                                                   |
| media_image_url_large  | Current media image url for the large image.                                                                                                                                                         |
| media_type             | Current media type.                                                                                                                                                                                  |
| repeat                 | Current repeat mode.                                                                                                                                                                                 |
| shuffle                | Current shuffle mode.                                                                                                                                                                                |
| source                 | Selected source.                                                                                                                                                                                     |
| source_list            | List of available media sources or inputs.                                                                                                                                                           |
| sound_mode             | Selected sound mode.                                                                                                                                                                                 |
| sound_mode_list        | Available sound modes.                                                                                                                                                                               |

At least one attribute must be specified in the `entity_change` message. If the entity `state` and another attribute
changed at the same time, for example if a new track starts playing, they may both be included in the same message.
It's also valid to always send every attribute.

#### Media types

The `media_type` attribute specifies the media being played:

- `MUSIC`
- `RADIO`
- `TVSHOW`
- `MOVIE`
- `VIDEO`

The integration may return other values, but the UI will most likely handle them as an "unknown media". 

#### Media images

- Supported image formats: jpg and png.
- The album art image can either be provided as a single image or as three matching image sizes.
  - Images will automatically be resized to the required sizes.  
    Either from the single image in `media_image_url` or from the individual sizes.
  - Images too large in pixel or file size will be rejected due to resource constraints on the remote.
- Preferred image sizes in pixel:
  - Large, for full screen album art: 420 x 420
  - Medium: 100 x 100
  - Small, for thumbnails: 60 x 60

### Command examples

#### on

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "media_player",
    "entity_id": "media-1",
    "cmd_id": "on"
  }
}
```

#### play_pause

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "media_player",
    "entity_id": "media-1",
    "cmd_id": "play_pause"
  }
}
```

#### volume

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "media_player",
    "entity_id": "media-1",
    "cmd_id": "volume",
    "params": {
      "volume": 40
    }
  }
}
```

#### seek

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "media_player",
    "entity_id": "media-1",
    "cmd_id": "seek",
    "params": {
      "media_position": 180
    }
  }
}
```

#### repeat

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "media_player",
    "entity_id": "media-1",
    "cmd_id": "repeat",
    "params": {
      "repeat": "ALL"
    }
  }
}
```

#### shuffle

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "media_player",
    "entity_id": "media-1",
    "cmd_id": "shuffle",
    "params": {
      "shuffle": true
    }
  }
}
```

#### select_sound_mode

Specify a sound mode value contained in the `sound_mode_list` attribute array.

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "media_player",
    "entity_id": "media-1",
    "cmd_id": "select_sound_mode",
    "params": {
      "mode": "MOVIE"
    }
  }
}
```

#### Custom simple command

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "media_player",
    "entity_id": "media-1",
    "cmd_id": "THUMBS_UP"
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
    "entity_type": "media_player",
    "entity_id": "media-1",
    "attributes": {
      "state": "PLAYING",
      "media_position": 1,
      "media_duration": 245,
      "media_title": "Some title",
      "media_artist": "My artist",
      "media_album": "Best of",
      "media_image_url_large": "http://192.168.1.100/player/current/album_l.png",
      "media_image_url_medium": "http://192.168.1.100/player/current/album_m.png",
      "media_image_url_small": "http://192.168.1.100/player/current/album_s.png"
    }
  }
}
```

## Open issues and missing features

- Define album art image limits
- Define media types
- Playlist handling
- Media browsing
- Searching
