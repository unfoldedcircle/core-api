# BT Device Profiles

Bluetooth device profiles are tailored device configurations with ready-to-use key-mappings and prepared default UI screens.
The known working key codes are defined as simple commands and directly usable in the web-configurator.

All other commands can still be used manually with the `send_cmd` command. Only the filtered simple commands in the
profile are visible.

The remote firmware includes a set of device profiles. New profiles will be included with firmware updates. It's also
possible to load custom profiles without waiting for firmware updates. Custom profiles can be [uploaded](upload.md)
with the resource endpoint in the REST Core-API. Support in the web-configurator will be added in the future.

Available device profiles:
- [Default profile](default.json)
- [Apple TV HD & 4K](appletv.json)
- [Generic Android](generic_android.json)
- [Google Chromecast](google_chromecast.json)
- [LG WebOS TV](lg_webos.json)
- [onn. Streaming Device 4K pro](onn_streaming_device.json)
- [Samsung Smart Monitor M7](samsung_smartmonitor.json)

Support articles:
- [Device profiles](https://support.unfoldedcircle.com/hc/en-us/articles/14696263809436-Device-profiles)
- [How to change a device profile for a Bluetooth remote](https://support.unfoldedcircle.com/hc/en-us/articles/14696318441628-How-to-change-device-profiles-for-a-Bluetooth-remote)
