# WebSocket Core-API Changelog
All notable changes to the WebSocket Core-API will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

This section contains unreleased changed which will be part of an upcoming release. 

### Added
- Add hostname and MAC address to version information returned in `version_info response message ([#33](https://github.com/unfoldedcircle/core-api/issues/33)).
- Add `restart_required` field in the CfgSoftwareUpdate response for the UI to show a restart required notice in the OTA settings screen.
- Add `reset_software_update_cfg` message to reset software OTA settings.
- Add standby inhibitor management messages.
### Changed
- Software update channel names are uppercase.

---
