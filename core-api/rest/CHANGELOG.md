# REST Core-API Changelog
All notable changes to the REST Core-API will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

This section contains unreleased changes which will be part of an upcoming release.

---

## 0.57.1
### Changed
- Extended SVG icon validation rules to support `style`, `switch`, `a`, `metadata`, `filter` with primitives (`fe*`), `clipPath` and `marker` in `defs`, editor metadata in custom namespaces, and defined style syntax constraints.
- Creating a WiFi network (`POST /system/wifi/networks`) immediately enables, saves, and starts connecting to it while keeping existing networks enabled as fallback, returning only the network `id`.

### Fixed
- Added missing `string` type to `ssid_hex` in `SavedNetwork` schema.
- Specified required `id` property in `POST /system/wifi/networks` response schema.

## 0.57.0
### Added
- Asynchronous backup export and restore jobs:
  - Start backup export job (`POST /system/backup/export`) with optional custom integration archiving.
  - Start backup restore job (`POST /system/backup/restore`) with optional custom integration restoration.
  - Retrieve active and finished backup jobs (`GET /system/backup/jobs`, `GET /system/backup/jobs/{job_id}`).
  - Cancel a running backup job (`DELETE /system/backup/jobs/{job_id}`).
  - Download backup export archive with an archive lease (`GET /system/backup/jobs/{job_id}/archive`).
- Custom integrations support in backup export and restore operations.
- Properties `full_backup`, `custom_integrations`, and `report` in `BackupSnapshot`.

### Changed
- Relaxed SVG icon validation rules for viewBox aspect ratio (between 1:4 and 4:1) and allowed relative and absolute dimension units up to 1024 px at 96 dpi.
- Synchronous backup and snapshot operations return 409 Conflict when a backup job is active, and 503 Service Unavailable when the device is suspending or disk space is insufficient.

## 0.55.1
### Added
- Optional identifier (`page_id`) and position (`pos`) when creating a UI page.
- Optional identifier (`group_id`) when creating a UI group.
- Support for removing an image, icon or description by passing an empty string in page and group updates.

### Changed
- Creating a UI page or group returns the created page or group entity instead of only the identifier.
- Clarified partial update behavior for UI pages and groups.
- Clarified `api` version in version information response.

### Fixed
- Schema definition for fetching UI pages (`GET /profiles/{profileId}/pages`).
- Schema definitions for creating and updating UI pages (`PageCreate`, `PageUpdate`) and groups (`GroupCreate`, `GroupUpdate`).
- Duplicate identifier validation on UI page and group creation returning 422 Unprocessable Entity.
- Removed obsolete D-pad reference from number widget step description.

## 0.55.0
### Added
- SVG and JPEG support for icon and TV channel icon uploads, with validation rules for static SVG icons.
- Slider and number user interface widgets.
- User entity option overrides with `PATCH /entities/{entityId}/options`.
- Dynamic limits and selection lists in entity command parameter metadata.
- Protected Management Frames (PMF) configuration in WiFi network settings.

### Changed
- Refactored entity feature targeting for slider and touch slider widgets.
- Extended WiFi network modification to update password and PMF mode.
- Renamed WiFi network state `AUTHENTICATED` to `AUTHENTICATING`.
- Clarified WiFi connection, PMF selection and reconnection behavior.

### Fixed
- Command identifier in entity command metadata example (`button.push`).

## 0.52.0
### Fixed
- OAuth2 authorization callback endpoint.

### Added
- Integration setup keep-alive handling with battery-aware setup limits.
- Bluetooth remote pairing reset.
- WiFi security selection, WPA3 support and hidden network configuration.
- More detailed activity / macro readiness and sequence progress reporting.

### Changed
- Extended integration setup status with localized errors, setup limits and language handling.
- Clarified activity / macro sequence error handling and stop behavior.
- Improved WiFi network connection behavior and persistence rules.
- Expanded system update download / progress handling.
- Clarified media browse / search, IR repeat and dock configuration behavior.

## 0.49.0
### Added
- Activity and Macro readiness checks.

## 0.48.3
### Fixed
- Schema validation errors found with the new redocly-cli linter.

### Added
- Sorting and order parameters for fetching integrations, docks, entities, activities, macros, remotes, voice assistants.
- Setting the power state of an entity with `PUT /entities/{entityId}/state`.
- Full-text search options for fetching remotes with `GET /remotes`.
- WiFi `JOIN` option: Connect to the given network and keep every other saved network enabled as fallback.
- Activity sequence start error policy.
- Stopping an activity or macro sequence.

### Changed
- Migrate OAS specification from 3.0.3 to 3.1.1.
- Changed Wifi password requirement to have at least 8 characters.

## 0.46.1
### Added
- Add `change_dock_token` to `DockUpdateRequest`.

## 0.46.0
- Update option when installing a custom integration.

## 0.45.3
### Added
- Add an optional description field to AvailableEntity.

## 0.45.2
### Changed
- Minimal string length requirements for BrowseMediaItem string fields.

## 0.45.1
### Added
- Media browsing and searching ([feature-and-bug-tracker#70](https://github.com/unfoldedcircle/feature-and-bug-tracker/issues/70)).
### Fixed
- Fixed invalid schema references.

## 0.44.4
### Fixed
- Creating a UI page returns 201 instead of 200.

## 0.44.3
### Added
- Activity ready check option.

## 0.44.2
### Fixed
- The `/public/status` endpoint returns bytes not KBytes.

## 0.44.1
### Added
- New user interface widget `select`.

## 0.44.0
### Added
- New entity type `select`.

## 0.43.1
### Added
- Touch slider configuration in an activity.
- Voice assistant configuration in an activity.
- New entity type `voice_assistant`.

### Changed
- Refactored `CfgVoiceControl` data model for `/cfg/voice_control` and `/cfg/voice_control/voice_assistants` endpoints.
- Refactored `CfgAll` model: `voice_control` -> `voice`
- Available entity from integration can now include an icon

## 0.41.1
### Added
- New multi-button merge and replace endpoints for activities and remote-entities:
  - Merge multiple button mappings: `PATCH /activities/{entityId}/buttons`, `PATCH /remotes/{entityId}/buttons`
  - Replace button mappings: `POST /activities/{entityId}/buttons`, `POST /remotes/{entityId}/buttons`
- New sensor widget in the activity user interface.

## 0.40.0
### Added
- New `DELETE /cfg/network` endpoint to reset all network settings.
- Enhanced `/system/power` response with standby counter and power supply flag.
- WiFi band configuration for Remote 3.
- Periodic WiFi scan interval option.

### Changed
- `/system/power/standby_inhibitors` no longer returns expired inhibitors.
- `PUT /system/wifi/scan` returns 409 if a scan is already active.
- Refactored advanced WiFi network settings into dedicated `wifi` object in `CfgNetwork`.
  - `wake_on_wlan` is deprecated, please use `wifi.wake_on_wlan`. 

## 0.39.4
### Added
- Query parameter for macro-entity search ([feature-and-bug-tracker#463](https://github.com/unfoldedcircle/feature-and-bug-tracker/issues/463)).
- Enhanced filter option in entity retrieval to prepare for proper paging in web-configurator.
### Fixed
- Body payload definition in `POST /profiles/{profileId}/groups`

## 0.39.2
- External dock port management endpoints.
- New `SET_VOLUME` dock command for supported docks.
- Enhance IrEmitterPort with `mode` and `state` fields to show port configuration in user interface.

## 0.38.4
### Added
- Add query parameter to resource type endpoint to filter items.

## 0.38.3
### Changed
- Icon and image identifier validations
- Increase version length to 40.

## 0.38.2
### Changed
- Refactor inline enum definitions in Activity, ActivityGroupOptions, Macro, Remote to simplify data model code generation.

## 0.38.0
### Added
- Control the [Logdy](https://logdy.dev/) web-app through `/system/logs/web`.

## 0.37.0
### Added
- Add Wake on WLAN setting to the network configuration.

## 0.36.0
### Changed
- Changed naming for Remote Two and Remote 3 (same API).
- Add UCR3 specific enhancements and feature flags for charger and button backlight.
- Add IR-emitter entity type

## 0.34.1
### Changed
- Cleanup external token access endpoints for first implementation with Home Assistant.

## 0.34.0
### Added
- Custom integration driver installation.

## 0.33.0
### Added
- BT HID peripheral support with new BT-remote entity ([feature-and-bug-tracker#65](https://github.com/unfoldedcircle/feature-and-bug-tracker/issues/65)).
  - New resource type `BtDeviceProfile` for Bluetooth device profiles.
  - New endpoints for Bluetooth configuration, HCI logs and BT system control.

## 0.32.0
### Added
- Add hostname and MAC address to version information returned in `/pub/version` endpoint ([#33](https://github.com/unfoldedcircle/core-api/issues/33)).
- Add individual button press endpoints to delete short- and long-press mappings in remotes and activities.
- Add `restart_required` field in the CfgSoftwareUpdate response for the web-configurator to show a restart required notice in the OTA settings screen.
- Add `DELETE /api/cfg/software_update` endpoint to reset software OTA settings.
- Add standby inhibitor management endpoints.
### Changed
- Software update channel names are uppercase.

