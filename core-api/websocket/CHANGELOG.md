# WebSocket Core-API Changelog
All notable changes to the WebSocket Core-API will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

This section contains unreleased changes which will be part of an upcoming release. 

---

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
