# Media Player Entity

---
**TODO**
- Define album art image limits
- Define media types
- Playlist handling
- Media browsing
- Searching
---

A media player entity controls playback of media on a device. This could be an online music streaming service, a TV,
a stereo or a video player. 

## Features

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
| home              | ❌ | ✅ | Home navigation support with home & back commands.                              |
| menu              | ❌ | ✅ | Menu navigation support with menu & back commands.                              |
| color_buttons     | ❌ | ✅ | Color button support for red / green / yellow / blue function commands.         |
| channel_switcher  | ❌ | ✅ | Channel zapping support with channel up and down commands.                      |
| select_source     | ✅ | ✅ | Media playback sources or inputs can be selected.                               |
| select_sound_mode | ✅ | ✅ | Sound modes can be selected, e.g. stereo or surround.                           |

🚧 Planned features are playlist handling, media browsing and searching.

### Attributes

Entity attributes are controlled by features. Multiple features can act on the same attribute.

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

| Name         | Type   | Values | Default | Description                                                                                                                                                                                                                                                                                                           |
|--------------|--------|--------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| volume_steps | number | 2..100 | 100     | Number of available volume steps for the set volume command and UI controls.<br/>Examples: 100 = any value between 0..100, 50 = only odd numbers, 3 = \[33, 67, 100] etc. Value 0 = mute.<br/>Note: if the integration receives an "unexpected" number it is required to round up or down to the next matching value. |

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
| function_red      | -              | Function red.                                                            |
| function_green    | -              | Function green.                                                          |
| function_yellow   | -              | Function yellow.                                                         |
| function_blue     | -              | Function blue.                                                           |
| home              | -              | Home menu                                                                |
| menu              | -              | Menu                                                                     |
| back              | -              | Back / exit function for menu navigation.                                |
| select_source     | source         | Select an input source from the available sources.                       |
| select_sound_mode | sound_mode     | Select a sound mode from the available modes.                            |
| 🚧 search         |                |                                                                          |

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
