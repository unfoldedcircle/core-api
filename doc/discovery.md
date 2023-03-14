## Remote Two DNS-SD lookup

The Remote Two will announce itself as service type `_uc-remote._tcp`.

The service lookup will return IP address and port number and other information in the TXT record data like model number
and API version of the remote.

| Key        | Description                                           |
|------------|-------------------------------------------------------|
| ver        | Version number                                        |
| ver_api    | API version number                                    |
| model      | Model number                                          |
| https_port | HTTPS port if enabled                                 |

### Model numbers

The `model` key specifies the physical device or the [core-simulator](https://github.com/unfoldedcircle/core-simulator):

| Model          | Description           |
|----------------|-----------------------|
| UCR2           | Remote Two            |
| UCR2-simulator | Remote Core simulator |
| YIO1           | YIO Remote            |

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
