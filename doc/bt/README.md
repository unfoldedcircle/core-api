# Bluetooth HID peripheral

‼️ This is currently a beta feature released in the v1.8.0 beta firmware.

- [Restrictions and missing features](TODO.md)
- [Known issues](known_issues.md)
- [BT suspend / wakeup patterns](suspend_behaviour.md)

Support articles:
- [How to pair with a Bluetooth LE device](https://support.unfoldedcircle.com/hc/en-us/articles/14695799302940-How-to-pair-with-a-Bluetooth-LE-device)

## Virtual Keyboard

The virtual keyboard defines the following HID report descriptors: 

- [Regular keycodes (Keyboard Keypad Page (0x07))](hid_keycodes.md)
- [Consumer codes (Consumer Page (0x0C))](hid_consumer.md)
- [System Controls (Generic Desktop Page (0x01))](hid_system_controls.md)

The upper-case `Key name` in the above usage tables is used for the remote-entity commands.

HID key codes reference: <https://usb.org/sites/default/files/hut1_2.pdf>

## Devices

Consumer devices usually only support a small subset of the HID usage definitions. Furthermore, the HID usage tables
leave room for interpretation and contain multiple functions with different commands (for example media and volume control).

The device test reports are located in the [./devices](devices) folder. They are used to create the device profiles. 

The [template document](devices/_template.md) can be used to submit pull requests for additional devices.

## Device Profiles

Device profiles are tailored device configurations with ready-to-use key-mappings and prepared default UI screens.
The known working key codes are defined as simple commands and directly usable in the web-configurator.

All other commands can still be used manually with the `send_cmd` command. Only the filtered simple commands in the
profile are visible.

The remote firmware includes a set of device profiles. New profiles will be included with firmware updates. It's also
possible to load custom profiles without waiting for firmware updates. Custom profiles can be uploaded with the resource
endpoint in the REST Core-API. Support in the web-configurator will be added in the future.

The existing device profiles are located in the [./profiles](profiles) folder.

Support articles:
- [Device profiles](https://support.unfoldedcircle.com/hc/en-us/articles/14696263809436-Device-profiles)
- [How to change a device profile for a Bluetooth remote](https://support.unfoldedcircle.com/hc/en-us/articles/14696318441628-How-to-change-device-profiles-for-a-Bluetooth-remote)

### Upload custom device profiles

Custom profiles can be uploaded and managed with the existing `/resources` REST Core-API endpoints.

- New resource type: `BtDeviceProfile`
- Upload: `POST /api/resources/BtDeviceProfile`
  - The filename should be the value of the `id` field and will automatically be renamed.
  - Included profiles can be overwritten when using the same `id`.
- Retrieve custom profiles: `GET /api/resources/BtDeviceProfile?page=1&limit=100`
- Delete: `DELETE /api/resources/BtDeviceProfile/:resourceId`

See [REST Core-API](https://github.com/unfoldedcircle/core-api/tree/main/core-api/rest) for more information.

## Send commands with Core-API

### send_cmd

The BT-remote entity supports the same `remote.send_cmd` command as an external remote-entity.

The `command` parameter supports:

- UPPER_CASE HID usage key names: [regular key codes](hid_keycodes.md), [consumer key codes](hid_consumer.md),
  [system key codes](hid_system_controls.md) depending on prefix.
    - Regular key codes support up to 6 simultaneous keys.  
      Separate key names or codes with `+`, e.g. `KEY_A+KEY_B+KEY_C`
    - Regular key codes support the following modifiers:  
      `LSHIFT`, `LALT`, `LCTRL`, `LGUI`, `RSHIFT`, `RALT`, `RCTRL`, `RGUI`.  
      For example: `LCTRL+KEY_C` or `LCTRL+LALT+KEY_DELETE`
- Mouse commands if starting with `MOUSE_`:
  - Buttons: `MOUSE_BTN_1`, `MOUSE_BTN_2`, `MOUSE_BTN_3`
  - X-movement: `MOUSE_X_#` where # is the amount of movement within: `MOUSE_X_-128` .. `MOUSE_X_127`
  - Y-movement: `MOUSE_Y_#` where # is the amount of movement within: `MOUSE_Y_-128` .. `MOUSE_Y_127`
  - Scroll-wheel: `MOUSE_WHEEL_#` where # is the amount of movement within: `MOUSE_WHEEL_-128` .. `MOUSE_WHEEL_127`
- Hex-codes allow to send an arbitrary usage code, even for keys which are not defined.  
  This is intended to simplify testing and for proprietary manufacturer commands.
  - 2-digit hex-code starting with `0x`: regular key code, for example `0x66` for `KEY_POWER`.
  - 4-digit hex-code starting with `0x`: consumer key code, for example `0x0030` for `CONSUMER_POWER`.
- Text: single character or ASCII 7-Bit text (limited to ~ 20 characters).
  - Attention: only US layout is supported (as defined in the USB HID specification), there is no support yet for
    different character maps. 
- ‼️The `repeat`, `delay`, and `hold` parameters are not supported and are ignored. 

Curl example:
```
curl --location --request PUT 'http://$IP/api/entities/$ENTITY_ID/command' \
--header 'Content-Type: application/json' \
--user 'web-configurator:$PIN' \
--data '{
  "cmd_id": "remote.send_cmd",
  "params": {
    "command": "LSHIFT+KEY_A"
  }
}'
```

### send_key

The BT-remote entity supports an additional command `remote.send_key` for sending a single, predefined key code oder 
ASCII character. Optionally, the GUI / meta key modifier can be enabled.

The `key` parameter supports:

- A predefined [regular key code](hid_keycodes.md), [consumer key code](hid_consumer.md),
  or [system key code](hid_system_controls.md) depending on prefix (`KEY_`, `KEYPAD_`, `CONSUMER_`, `SYSTEM_`).
- Mouse commands if starting with `MOUSE_`: see `send_cmd`.
- Single character (US layout).

For a regular key code, the GUI / meta key modifier can be set in the `gui` parameter.

Curl example:
```
curl --location --request PUT 'http://$IP/api/entities/$ENTITY_ID/command' \
--header 'Content-Type: application/json' \
--user 'web-configurator:$PIN' \
--data '{
  "cmd_id": "remote.send_key",
  "params": {
    "key": "KEY_E",
    "gui": true
  }
}'
```
