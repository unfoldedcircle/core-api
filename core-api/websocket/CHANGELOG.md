# WebSocket Core-API Changelog
All notable changes to the WebSocket Core-API will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

This section contains unreleased changes which will be part of an upcoming release. 

---

## 0.50.4
### Changed
- Clarified that updating a profile (`update_profile`) with an empty `pages` array removes all pages in the profile while keeping its groups.
- Documented event behavior when updating profile pages: emits a profile `profile_change` event of type `CHANGE` (without pages) followed by a page `profile_change` event of type `DELETE` for each removed page.
- Clarified page creation (`add_page`) positioning behavior: `pos` specifies the 1-based position in the page list (existing pages at or after it move back by one), a position past the end appends the page, and the response carries the created page with its position.
- Clarified that deleting a group (`delete_group`) or all groups (`delete_groups_in_profile`) also removes the group(s) from pages that show them, emitting a `profile_change` event of type `CHANGE` for each affected page.

## 0.50.3
### Added
- Sorting and order parameters (`sort`, `order`) for `get_docks`.
- Sorting, order, and language parameters (`sort`, `order`, `lang`) for `get_integrations`.

## 0.50.2
### Added
- Documented error handling (code 400) when creating or updating a group (`add_group`, `update_group`) with unknown entity identifiers.
- Documented substring search behavior and sanitization rules for `text_search` in `EntityFilter` and `AvailableEntityFilter`.

### Changed
- Updated `Paging` schema `limit` range to 1..100 with error code 400 `VALIDATION_ERROR` for out-of-range values.

### Fixed
- Fixed `paging` schema reference in `get_docks` response (`DocksMsg`) to use `Pagination` instead of `Paging`.

## 0.50.1
### Changed
- Adding a WiFi network (`add_wifi_network`) immediately enables, saves, and starts connecting to it while keeping existing networks enabled as fallback.
- Clarified `wifi_change` event behavior, distinguishing `NETWORK_NOT_FOUND` with an `id` (failed connection attempt) from `NETWORK_NOT_FOUND` without an `id` (driver scan notice).

### Fixed
- Response schema for `add_wifi_network` returns `WifiNetworkCreatedMsg` (`wifi_network_created`) containing only the network `id` instead of `WifiNetworkMsg`.
- Added missing `string` type to `ssid_hex` in `SavedNetwork` schema.

## 0.50.0
### Added
- New `backup_job_change` event emitted on backup job state, phase, and progress changes.
- New `backup_jobs` event channel for subscribing to backup job notifications.
- Schema definitions for backup job events (`BackupJobChangeEventMsg`, `BackupJobEvent`, `BackupJobType`, `BackupJobState`, `BackupJobProgress`, `BackupJobError`, `BackupJobArchive`).

## 0.48.1
### Added
- Optional identifier (`page_id`) and position (`pos`) in `add_page`.
- Optional identifier (`group_id`) in `add_group`.
- Support for removing an image, icon or description by passing an empty string in page and group updates.

### Changed
- `add_page` and `add_group` response returns the created UI page (`PageMsg`) or group (`GroupMsg`) instead of a generic result.
- Clarified partial update behavior for `update_page` and `update_group`.
- Clarified that warning events are only delivered to subscribers of the `all` event channel.
- Clarified `api` version in version information response.

### Fixed
- Message identifier for deleting all groups in a profile changed to `delete_groups_in_profile`.
- Schema definitions for creating and updating UI pages (`PageCreateData`, `PageUpdateData`) and groups (`GroupCreateData`, `GroupUpdateData`).
- Refactored `WarningEvent` schema with nullable properties.
- Removed obsolete D-pad reference from number widget step description.

## 0.48.0-beta
### Added
- Slider and number user interface widgets.
- User entity option overrides with `update_entity`.
- Dynamic limits and selection lists in entity command parameter metadata.
- Protected Management Frames (PMF) configuration in WiFi network settings.

### Changed
- Refactored entity feature targeting for slider and touch slider widgets.
- Extended WiFi network modification to update password and PMF mode.
- Renamed WiFi network state `AUTHENTICATED` to `AUTHENTICATING`.
- Clarified WiFi connection, PMF selection and reconnection behavior.

## 0.45.0-beta
- Add missing messages for achieving the same functionality as the REST Core-API; mainly remote-entity, activity, activity-group, macro features.

## 0.38.0-beta
### Added
- `get_sequence_readiness` for checking whether an activity command or a macro can run right now.
- Infrared-related messages for REST Core-API feature parity.

## 0.37.2-beta
### Added
- `get_network_state` for getting the current IP connectivity state.
- `set_entity_state` for setting the power state of an entity. This requires the `admin` or `remote-ui` scope.
- New event: `network_change`.
- WiFi `JOIN` option in `wifi_network_command`: Connect to the given network and keep every other saved network enabled as fallback.

### Breaking Changes
- Schema names are now using UpperCamelCase naming, some messages and objects are defined slightly different due to using a shared object schema for the REST and WebSocket APIs and a new AsyncAPI bundler.
  This might affect code generation clients. The wire format remains the same.

### Changed
- The number of WebSocket connections is limited. A client receiving `503` should wait for the indicated period and retry, rather than reconnecting immediately.
- The server sends a WebSocket `ping` frame to an otherwise silent client every 10 seconds, and closes a session from which it has received nothing for 30 seconds.

## 0.35.4-beta
### Added
- Add `change_dock_token` to `dockUpdateRequest`.

## 0.35.3-beta
### Added
- Add an optional description field in available_entity.

## 0.35.2-beta
### Changed
- Minimal string length requirements for BrowseMediaItem string fields.

## 0.35.1-beta
### Added
- Media browsing and searching ([feature-and-bug-tracker#70](https://github.com/unfoldedcircle/feature-and-bug-tracker/issues/70)).

## 0.34.0-beta
### Added
- New entity type `select`.

## 0.33.0-beta
### Changed
- Voice assistant configuration refactoring.
### Added
- New entity type `voice_assistant`.
- New event: `assistant_event`.

## 0.31.0-beta
### Added
- New `reset_network_cfg` message.
- Enhanced `get_power_mode` response with standby counter and power supply flag.
- WiFi band configuration for Remote 3.
- Periodic WiFi scan interval option.

### Changed
- `get_standby_inhibitors` no longer returns expired inhibitors.
- Refactored advanced WiFi network settings into dedicated `wifi` object in `network_cfg` response.

## 0.30.2-beta
### Added
- Enhanced filter option in entity retrieval to prepare for proper paging in web-configurator.

## 0.30.1-beta
### Added
- New `dock_port_mode` event message for Dock 3 port mode configuration changes.
- New `SET_VOLUME` dock command for supported docks.

## 0.29.2-beta
### Changed
- Icon and image identifier validations

## 0.29.0-beta
### Added
- Add Wake on WLAN setting to the network configuration.
- New `active_profile_change` event is emitted whenever the active profile has changed.

## 0.28.0-beta
### Changed
- Changed naming for Remote Two and Remote 3 (same API).
- Add UCR3 specific enhancements and feature flags for charger and button backlight.
- Add IR-emitter entity type

## 0.26.0-beta
### Added
- Bluetooth peripheral pairing events (`bt_pairing_started`, `bt_pairing_auth_request`, `bt_pairing_complete`) and request message (`bt_pairing_response`).

## 0.25.0-beta
### Added
- Add hostname and MAC address to version information returned in `version_info response message ([#33](https://github.com/unfoldedcircle/core-api/issues/33)).
- Add `restart_required` field in the CfgSoftwareUpdate response for the UI to show a restart required notice in the OTA settings screen.
- Add `reset_software_update_cfg` message to reset software OTA settings.
- Add standby inhibitor management messages.
### Changed
- Software update channel names are uppercase.
