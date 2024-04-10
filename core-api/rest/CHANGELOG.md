# REST Core-API Changelog
All notable changes to the REST Core-API will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

This section contains unreleased changed which will be part of an upcoming release. 

---

## 0.32.0
### Added
- Add hostname and MAC address to version information returned in `/pub/version` endpoint ([#33](https://github.com/unfoldedcircle/core-api/issues/33)).
- Add individual button press endpoints to delete short- and long-press mappings in remotes and activities.
- Add `restart_required` field in the CfgSoftwareUpdate response for the web-configurator to show a restart required notice in the OTA settings screen.
- Add `DELETE /api/cfg/software_update` endpoint to reset software OTA settings.
- Add standby inhibitor management endpoints.
### Changed
- Software update channel names are uppercase.

