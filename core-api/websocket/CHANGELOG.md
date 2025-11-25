# WebSocket Core-API Changelog
All notable changes to the WebSocket Core-API will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

This section contains unreleased changes which will be part of an upcoming release. 

### Changed
- Initial voice assistant configuration refactoring.

---

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
