# Bluetooth HID peripheral

The virtual keyboard defines the following HID report descriptors: 

- [Regular keycodes (Keyboard Keypad Page (0x07))](keycodes.md)
- [Consumer codes (Consumer Page (0x0C))](consumer.md)
- [System Controls (Generic Desktop Page (0x01))](system_controls.md)

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
possible to load custom profiles without waiting for firmware updates. Custom profiles can be uploaded with resource
endpoint in the REST Core-API. Support in the web-configurator will be added in the future.

The existing device profiles are located in the [./profiles](profiles) folder.

### Upload custom device profiles

Custom profiles can be uploaded and managed with the existing `/resources` REST Core-API endpoints.

- New resource type: `BtDeviceProfile`
- Upload: `POST /api/resources/BtDeviceProfile`
- Retrieve custom profiles: `GET /api/resources/BtDeviceProfile?page=1&limit=100`
- Delete: `DELETE /api/resources/BtDeviceProfile/:resourceId`

See [REST Core-API](https://github.com/unfoldedcircle/core-api/tree/main/core-api/rest) for more information.

## Send commands with Core-API

The BT-remote entity uses the same `remote.send_cmd` command as an external remote-entity.

The `command` parameter supports:

- UPPER_CASE key names: regular key codes, consumer key codes, system key codes depending on prefix.
    - Regular key codes support up to 6 simultaneous keys.  
      Separate key names or codes with `+`, e.g. `KEY_A+KEY_B+KEY_C`
    - Regular key codes support the following modifiers:  
      `LSHIFT`, `LALT`, `LCTRL`, `LGUI`, `RSHIFT`, `RALT`, `RCTRL`, `RGUI`.  
      For example: `LCTRL+KEY_C` or `LCTRL+LALT+KEY_DELETE`
- Hex-codes allow to send an arbitrary usage code, even for keys which are not defined.  
  This is intended to simplify testing and for proprietary manufacturer commands.
  - 2-digit hex-code starting with `0x`: regular key code, for example `0x66` for `KEY_POWER`.
  - 4-digit hex-code starting with `0x`: consumer key code, for example `0x0030` for `CONSUMER_POWER`.
- Text: single character or ASCII 7-Bit text (limited to ~ 20 characters).
  - Attention: only US layout is supported (as defined in the USB HID specification), there is no support yet for
    different character maps. 

Curl example:
```
curl --location --request PUT 'http://$IP/api/entities/$ENTITY_ID/command' \
--header 'Content-Type: application/json' \
-u 'web-configurator:$PIN' \
--data '{
  "cmd_id": "remote.send_cmd",
  "params": {
    "command": "LSHIFT+KEY_A"
  }
}'
```
