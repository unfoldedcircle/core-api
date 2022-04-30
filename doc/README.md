# API Documentation

_TODO_

- [Remote Two user interface](remote-ui.md)

## Integration API

- [Integration AsyncAPI definition](../integration-api/asyncapi.yaml)
- [Remote Two entities](../integration-api/entities/README.md)
- [How to write an integration driver](../integration-api/write-integration-driver.md)
- [WebSockets handling](../integration-api/websocket.md)
- [Driver registration](../integration-api/driver-registration.md)
- [Multi Device Instance Driver](../integration-api/multi-device-driver.md)

## Remote DNS-SD lookup

The Remote Two will announce itself as service type `_uc-remote._tcp`.

The service lookup will return IP address and port number and other information in the TXT record data like model number
and API version of the remote.

| Key        | Description                                           |
|------------|-------------------------------------------------------|
| ver        | Version number                                        |
| ver_api    | API version number                                    |
| model      | Model number                                          |
| https_port | HTTPS port if enabled                                 |
| simulator  | Set if it's a core simulator and not an actual device |

_TODO: finalize TXT record and values._

### Model numbers

The `model` key specifies the physical device:

| Model | Description |
|-------|-------------|
| UCR2  | Remote Two  |
| YIO1  | YIO Remote  |

### Examples

macOS:
```bash
dns-sd -Z _uc-remote._tcp
```

For a UI tool, see [Discovery](https://apps.apple.com/us/app/discovery-dns-sd-browser/id1381004916).

Linux:
```bash
avahi-browse -d local --resolve _uc-remote._tcp -t
```
