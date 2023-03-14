# Integration Driver mDNS advertisement

The Remote Two uses mDNS discovery to look for local integration drivers on the same network.

If an integration driver shall be discoverable, it needs to advertise the driver service using multicast DNS: 

- Service type: `_uc-integration._tcp`
- Instance name: unique identifier of the integration driver (`driver_id` in the API model). 

## TXT Record

Additional information is published in the TXT record.

| Key       | Required | Format   | Description                                                                                  |
|-----------|----------|----------|----------------------------------------------------------------------------------------------|
| name      | x        | _text_   | Integration name                                                                             |
| developer | x        | _text_   | Developer or company of the integration                                                      |
| ver       | x        | _text_   | Integration version number                                                                   |
| ver_api   |          | _text_   | Implemented integration API version                                                          |
| ws_url    |          | _text_   | Override the WebSocket url. ws_path, wss, wss_port will be ignored                           |
| ws_path   |          | _text_   | WebSocket endpoint path. Default: `/`                                                        |
| wss       |          | _bool_   | Use secure WebSocket connection                                                              |
| wss_port  |          | _number_ | WebSocket SSL port if different from published port, or driver supports ws & wss connections |
| pwd       |          | _bool_   | Access token required                                                                        |

## Examples

### Node.js

Using [bonjour-service](https://www.npmjs.com/package/bonjour-service):

```js
const { Bonjour } = require('bonjour-service');
const bonjour = new Bonjour();

bonjour.publish({
    name: 'my-driver',
    type: 'uc-integration',
    port: 1234,
    txt: {
        name: 'My Driver',
        ver: '1.0.0',
        developer: 'Foobar Inc',
        ws_path: '/ws',
        pwd: 'true'
    }
});
```