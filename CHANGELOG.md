# Core API Changelog

## 0.6.0-alpha

**2022-05-01** First public release.

### AsyncAPI

- Rename `friendly_name` properties to `name`.
- Refactor entity command message: simple object, instead array of objects.
- Clean up, updated message state emojis to reflect current remote-core status.

## 0.5.0-alpha

**2022-03-23**

### AsyncAPI

- Add authentication messages: `auth_required`, `auth`, `authentication`.
- Refactor `driver_version`.
- Add `device_id` property in `device_state` event.

### Documentation

- Refactor documentation structure.
- Add WebSockets specific information.

## 0.4.0-alpha

**2022-02-27**

### AsyncAPI

- Add `entity_type` property to messages: `entity_command`, `entity_change`, `entity_state`, `entity_removed`.
- Rename `entity_change` property `driver_id` to `device_id`.
- Change `device_state` response message to an event message.
- Change `entity` message:
  - Property `features` is now optional.
  - Cover entity: split `open_close` feature into `open` and `close` features for covers which can only be opened
    programmatically but must be closed manually. 
- Change `discovered_device` message property `friendly_name` to multi-language text object.
- Fix request message example in description.

### Documentation

- Reflect changes in AsyncAPI.
- Improve entity change message descriptions.

## 0.0.1 - 0.3.0-alpha

**2021 - 2022-02-18**

Internal releases.
