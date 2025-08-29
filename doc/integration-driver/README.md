# Integration Drivers

Since we are providing an API and not an SDK for a specific programming language, one can develop external integrations
in any language which is capable running a WebSockets server and handling JSON data.

The downside of an API is that more low-level coding is required. In our case this involves running a WebSocket server,
handling the connections from the Remote device, and parsing the JSON payload in the WebSocket text messages.
However, once this is done, the required API message interactions are rather simple to handle.

See examples below for integration libraries and existing open source integrations.

- [How to write an integration driver](write-integration-driver.md)
- [WebSockets handling](websocket.md)
- [Driver mDNS advertisement](driver-advertisement.md)
- [Driver registration](driver-registration.md)
- [Driver setup](driver-setup.md)
- [Install integration driver on the device](driver-installation.md)

## WebSocket Integration API

The Unfolded Circle WebSocket Integration-API allows writing device integration drivers for the Unfolded Circle Remotes.

The API specification is defined with [AsyncAPI](https://www.asyncapi.com/) in YAML format.
The WebSocket communication is using text messages with JSON payload.

- [Integration AsyncAPI viewer](https://unfoldedcircle.github.io/core-api/integration/)
    - [Integration AsyncAPI YAML definition](https://unfoldedcircle.github.io/core-api/integration/)
    - View with [AsyncAPI Studio online tool](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/unfoldedcircle/core-api/main/integration-api/UCR-integration-asyncapi.yaml).  
      The link will directly load the yaml definition file from GitHub and display it together with the HTML documentation
      in the browser.

## Examples

### Node.js

- [Node.js API wrapper for the UC Integration API](https://github.com/unfoldedcircle/integration-node-library)  

Integrations using the Node.js API wrapper:
- [Global Caché IR integration](https://github.com/unfoldedcircle/integration-globalcache)
- [Roon integration](https://github.com/unfoldedcircle/integration-roon)

### Python

- [Python API wrapper library for the UC Integration API](https://github.com/unfoldedcircle/integration-python-library)  

Integrations using the Python API wrapper:
- [Android TV integration](https://github.com/unfoldedcircle/integration-androidtv)
- [Apple TV integration](https://github.com/unfoldedcircle/integration-appletv)
- [Denon AVR integration](https://github.com/unfoldedcircle/integration-denonavr)

### Rust

- [API models in Rust](https://github.com/unfoldedcircle/api-model-rs)
- [Home Assistant integration](https://github.com/unfoldedcircle/integration-home-assistant) written in Rust
