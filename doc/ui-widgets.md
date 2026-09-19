# User Interface Widgets

Activity and remote-entity user interfaces consist of pages with a button grid. The user places _user interface items_
in the grid, defines their size and, depending on the item type, links them to an entity command or to an entity.

This page describes the user interface items which are bound to an entity, so called _widgets_, and the shared
_entity feature target_ used by the slider widget and the Remote 3 touch slider.

The data model is defined in the [REST Core-API](https://unfoldedcircle.github.io/core-api/rest/) in the
`UserInterfaceItem` object. Integration drivers only define entities; the widgets are configured by the user in the
web-configurator, or provided as default user interface by a [remote entity](entities/entity_remote.md#user-interface).

## Item types

| Type         | Bound to                                      | Description                                                                          |
|--------------|-----------------------------------------------|--------------------------------------------------------------------------------------|
| icon         | optional entity command                       | Icon button, either a UC icon or a custom icon.                                      |
| text         | optional entity command                       | Text button.                                                                         |
| numpad       | -                                             | Number pad for digit commands.                                                       |
| media_player | media-player entity                           | Media information and controls of a media-player entity.                             |
| sensor       | sensor entity                                 | Value and unit of a [sensor entity](entities/entity_sensor.md).                      |
| select       | select entity                                 | Option selection of a [select entity](entities/entity_select.md).                    |
| slider       | [entity feature](#entity-feature-target)      | Slider to read and set a numeric entity feature. See [slider widget](#slider).       |

## Entity feature target

An entity feature target references a numeric feature of an entity which can be read and set. It is used by:

- the [slider widget](#slider) in a user interface page,
- the [Remote 3 touch slider](#remote-3-touch-slider) configuration of an activity.

```json
{
  "entity_id": "hass.main.light.living_room",
  "feature": "dim"
}
```

| Property  | Required | Description                                                                                                                     |
|-----------|----------|---------------------------------------------------------------------------------------------------------------------------------|
| entity_id | yes      | The entity to control. It must be part of the included entities of the activity.                                                |
| feature   | no       | One of the [slider-capable features](#slider-capable-features) of the entity. Defaults to the default slider feature of the entity type. |

### Slider-capable features

A slider-capable feature pairs one numeric entity attribute (read) with one entity command (write). The remote knows
the value range, step and formatting of each feature. The following features can be used as entity feature target:

| Entity type  | Feature            | Default | Attribute           | Command                              | Range and step                                                                  | Displayed as                  |
|--------------|--------------------|---------|---------------------|--------------------------------------|---------------------------------------------------------------------------------|-------------------------------|
| number       | value              | ✅       | value               | `set_value { value }`                | Options `min`, `max`, `step`                                                    | value with `decimals`, `unit` |
| light        | dim                | ✅       | brightness          | `on { brightness }`                  | 0..255                                                                          | 0..100 %                      |
| light        | color_temperature  |         | color_temperature   | `on { color_temperature }`           | 0..100, option `color_temperature_steps`                                        | 0..100 %                      |
| media_player | volume             | ✅       | volume              | `volume { volume }`                  | 0..100                                                                          | 0..100                        |
| media_player | seek               |         | media_position      | `seek { media_position }`            | 0..`media_duration` attribute                                                   | mm:ss                         |
| cover        | position           | ✅       | position            | `position { position }`              | 0..100                                                                          | 0..100 %                      |
| cover        | 🚧 tilt_position   |         | tilt_position       | `tilt { tilt_position }`             | 0..100                                                                          | 0..100 %                      |
| climate      | target_temperature | ✅       | target_temperature  | `target_temperature { temperature }` | Options `min_temperature`, `max_temperature`, `target_temperature_step`         | °C / °F                       |

- Default: the feature used if the `feature` property of the entity feature target is not specified.
- The feature must be included in the `features` list of the entity, except for the `number.value` feature which is
  always present.
- 🚧 Planned feature.

## Slider

The slider widget renders a horizontal or vertical slider for an [entity feature target](#entity-feature-target). The
current value is read from the entity attribute and updated with every `entity_change` event. Moving the slider sends
the entity command with the new value.

### Configuration

The slider configuration is set in the `slider` property of the user interface item:

```json
{
  "type": "slider",
  "text": "Volume",
  "slider": {
    "entity_id": "denon.avr.zone_2",
    "feature": "volume",
    "show_value": true,
    "icon_min": "uc:volume-low",
    "icon_max": "uc:volume-high",
    "max": 60,
    "update_mode": "live"
  },
  "location": { "x": 0, "y": 5 },
  "size": { "width": 4, "height": 1 }
}
```

| Property    | Type    | Default    | Description                                                                                                                               |
|-------------|---------|------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| entity_id   | string  | required   | Entity to control. See [entity feature target](#entity-feature-target).                                                                   |
| feature     | string  | type default | Slider-capable feature of the entity. See [entity feature target](#entity-feature-target).                                              |
| show_name   | boolean | false      | Show the entity name as widget label instead of the item's `text` field.                                                                  |
| show_value  | boolean | true       | Show the current value and unit.                                                                                                          |
| icon_min    | string  |            | Optional icon identifier shown at the minimum end of the slider.                                                                          |
| icon_max    | string  |            | Optional icon identifier shown at the maximum end of the slider.                                                                          |
| min         | number  | feature min | Optional lower limit of the slider. Clamped to the value range of the feature.                                                            |
| max         | number  | feature max | Optional upper limit of the slider. Clamped to the value range of the feature.                                                            |
| update_mode | enum    | on_release | `on_release`: the value is sent once when the slider is released. `live`: values are sent while moving the slider, at most every 200 ms, and the final value on release. |

Label rules are the same as for the sensor and select widgets: if the item's `text` field is set, it is used as widget
label, except if `show_name` is `true`. If no label should be shown, omit `text` and leave `show_name` at `false`.

### Orientation and size

The orientation is derived from the item size: if the height is larger than the width, the slider is vertical,
otherwise horizontal. Minimum sizes are 2x1 for a horizontal slider and 1x2 for a vertical slider.

| Size  | Orientation |
|-------|-------------|
| 4 x 1 | horizontal  |
| 2 x 1 | horizontal  |
| 1 x 3 | vertical    |
| 2 x 2 | horizontal  |

### Limiting the range

The optional `min` and `max` properties limit the slider to a sub-range of the feature. This allows for example a
"safe volume" slider which never exceeds 60, or a brightness slider which cannot switch the light off. The limits are
clamped to the value range of the feature. If the current entity value is outside the slider range, the slider knob is
shown at the nearest end.

### Value updates and feedback

- While the user moves the slider, the widget shows the selected value immediately.
- After the command has been sent, the widget follows the entity attribute from the `entity_change` events.
- If the integration driver doesn't confirm the new value within a few seconds, the widget falls back to the last known
  attribute value. Exception: [number entities](entities/entity_number.md) with option `readable: false` keep the last
  sent value.
- `update_mode: live` is recommended for lights and volume, `on_release` for setpoints and covers. The remote never
  sends more than one command per 200 ms in live mode.

### Physical buttons

When a slider widget has the focus during D-pad navigation, the left and right buttons (up and down for a vertical
slider) decrease and increase the value by one step:

- `number` entity: `decrement` / `increment` commands.
- Other entity types: the feature command with the current value plus or minus the step size.

## Remote 3 touch slider

The Remote 3 touch slider is configured per activity in the `touch_slider` option with an
[entity feature target](#entity-feature-target). If no target is specified, the default touch slider feature is
active. The same [slider-capable features](#slider-capable-features) are supported as targets.

```json
{
  "touch_slider": {
    "enabled": true,
    "target": {
      "entity_id": "amp-1_bass",
      "feature": "value"
    }
  }
}
```
