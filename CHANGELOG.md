# Core-API Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

_Changes in the next release_

---

## 0.7.0-alpha - 2023-03-14
### Added
- Initial Dock-API release.
- Driver metadata retrieval with `get_driver_metadata`.
- Integration driver mDNS advertisement documentation.
- Integration driver setup flow API messages and documentation.

### Changed
- Replace `localization.unit_system_metric` & `.temperature_celsius` with `measurement_unit` enum (METRIC, US, UK). 
- Change `localization.languageCode` separator from dash to underscore. New: `en_UK`, `en_US` etc.
- Removed multi-device setup messages in API and replaced it with the driver setup messages.  
  They might be added later or be integrated into the driver setup.

### Fixed
- `inputTypeLabel` definition.
- The API token header field is called `AUTH-TOKEN`.

## 0.6.1-alpha - 2022-06-12
### Added
- Media player entity has a new state `PAUSED`, new attributes `repeat` & `shuffle` and initial `media_type` definitions.
- Link published [API models in Rust](https://github.com/unfoldedcircle/api-model-rs).
- Clarify sensor state, unit and label.

### Changed
- Switching to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format for this changelog.

### Fixed
- Integration API: entity discriminator property is `entity_type`
- Fix entity command examples for climate and cover.

## 0.6.0-alpha - 2022-05-01

First public release.

### Added
- Refactor and enhance documentation.
- Prepare AsyncAPI html generation with GitHub action.

### Changed
- Rename `friendly_name` properties to `name`.
- Refactor entity command message: simple object, instead array of objects.
- Clean up, updated message state emojis to reflect current remote-core status.

## 0.5.0-alpha - 2022-03-23
### Added
- Add authentication messages: `auth_required`, `auth`, `authentication`.
- Add `device_id` property in `device_state` event.
- Add WebSockets specific information.

### Changed
- Refactor `driver_version`.
- Refactor documentation structure.

## 0.4.0-alpha - 2022-02-27
### Added
- Add `entity_type` property to messages: `entity_command`, `entity_change`, `entity_state`, `entity_removed`.

### Changed
- Rename `entity_change` property `driver_id` to `device_id`.
- Change `device_state` response message to an event message.
- Change `entity` message:
  - Property `features` is now optional.
  - Cover entity: split `open_close` feature into `open` and `close` features for covers which can only be opened
    programmatically but must be closed manually.
- Change `discovered_device` message property `friendly_name` to multi-language text object.
- Improve entity change message descriptions and reflect changes in AsyncAPI

### Fixed
- Fix request message example in description.

## 0.0.1 - 0.3.0-alpha - 2022-02-18

Internal releases.
