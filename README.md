[![AsyncAPI Validation](https://github.com/unfoldedcircle/core-api/actions/workflows/asyncapi.yml/badge.svg)](https://github.com/unfoldedcircle/core-api/actions/workflows/asyncapi.yml) 
[![OpenAPI Validation](https://github.com/unfoldedcircle/core-api/actions/workflows/openapi.yml/badge.svg)](https://github.com/unfoldedcircle/core-api/actions/workflows/asyncapi.yml)

# Unfolded Circle Core APIs

This repository contains API specifications of [Unfolded Circle Remote](https://www.unfoldedcircle.com/) products.

## Overview

- [Remote Two user interface](./doc/remote-ui.md)
- [Bluetooth HID peripheral support](doc/bt/README.md)

API definitions:

- [WebSocket Integration-API](./integration-api/README.md) defined with [AsyncAPI](https://www.asyncapi.com/).
- [WebSocket Core-API](./core-api/websocket/README.md) defined with [AsyncAPI](https://www.asyncapi.com/)
- [REST Core-API](./core-api/rest/README.md) defined with [OpenAPI](https://www.openapis.org/)
- [WebSocket Dock-API](./dock-api/README.md) defined with [AsyncAPI](https://www.asyncapi.com/)

Integration driver documentation:

- [Remote Two entities](doc/entities/README.md).
- [How to write an integration driver](doc/integration-driver/write-integration-driver.md).
- [WebSocket handling](doc/integration-driver/websocket.md): authentication, keep alive, error handling.

## Integration API

The Remote WebSockets integration-API allows writing device integrations for the Unfolded Circle Remote devices.  
At the moment only user integrations running on an external host are supported.

ℹ️ Beta release 1.9.0 allows to install custom integration drivers on the Remote. This is a developer preview feature
to test their integrations.

The integration driver acts as server and the Remote device as client. The remote connects to the integration when an
integration instance is configured. Whenever the remote enters standby it may choose to disconnect and automatically
reconnect again after wakeup.

The goal of the integration-API is to cover not only simple static drivers, like controlling GPIOs on a Raspberry Pi,
but also support to integrate existing home automation hubs like Home Assistant, Homey, openHAB etc.  
The focus of the integration API is on entity integration, not on controlling or configuring the Remote device. Please
refer to the Core-API for further functionality.

An integration driver usually doesn't need to use the Core-API as well, unless it also wants to customize certain device
behaviour or automatically add or configure its entities to the users profile.

### Develop integration drivers

Since we are providing an API and not an SDK for a specific programming language, one can develop external integrations
in any language which is capable running a WebSockets server and handling JSON data.

The downside of an API is that more low-level coding is required. In our case this involves running a WebSocket server,
handling the connections from the Remote device, and parsing the JSON payload in the WebSocket text messages.
However, once this is done, the required API message interactions are rather simple to handle. 

See [how to write an integration driver](doc/integration-driver/write-integration-driver.md) for more information about
how to develop an integration driver for the Remote devices.

#### Examples

- [API models in Rust](https://github.com/unfoldedcircle/api-model-rs)
- [Node.js API wrapper for the UC Integration-API](https://github.com/unfoldedcircle/integration-node-library)
- [Python API wrapper library for the UC Integration-API](https://github.com/unfoldedcircle/integration-python-library)  
  Integrations using the Python API wrapper:
  - [Android TV integration](https://github.com/unfoldedcircle/integration-androidtv)
  - [Apple TV integration](https://github.com/unfoldedcircle/integration-appletv)
  - [Denon AVR integration](https://github.com/unfoldedcircle/integration-denonavr)
- [Home Assistant integration](https://github.com/unfoldedcircle/integration-home-assistant) written in Rust

We plan to release more examples in the future.

## Core APIs

The UC Remote WebSockets & REST Core-APIs allow you to interact with the Unfolded Circle remote-core service and
take full control of its features.

See [core-api](./core-api) directory for more information.

## Other resources

- [remote-core simulator](https://github.com/unfoldedcircle/core-simulator) to start developing integrations without a UC Remote device
- Open Source [remote-ui application](https://github.com/unfoldedcircle/remote-ui)

## API versioning

The API is versioned according to [SemVer](https://semver.org/).  
The initial public release will be `1.0.0` once it is considered stable enough with some initial integration
implementations and developer examples.

**Any major version zero (`0.y.z`) is for initial development and may change at any time!**  
I.e. backward compatibility for minor releases is not yet established, anything MAY change at any time!

## Recent changes

The major changes found in each new release of our API specifications are listed in the [changelog](./CHANGELOG.md) and
under the GitHub [releases](https://github.com/unfoldedcircle/core-api/releases).

The Dock-API follows an independent release process. The Dock-API changes are listed in the
[Dock-API changelog](./dock-api/CHANGELOG.md).

## Contributions

Please read our [contribution guidelines](./CONTRIBUTING.md) before opening a pull request.

## License

We have published the API specifications and documentations under the [CC-BY-AS-4.0](https://creativecommons.org/licenses/by-sa/4.0/)
(Creative Commons Attribution-ShareAlike 4.0 International) license. Please see [LICENSE file](./LICENSE).  
All code examples in this repository are licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).  
All graphics copyright © Unfolded Circle ApS 2022.
