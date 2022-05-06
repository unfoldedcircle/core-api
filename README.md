[![AsyncAPI Validation](https://github.com/unfoldedcircle/core-api/actions/workflows/asyncapi.yml/badge.svg)](https://github.com/unfoldedcircle/core-api/actions/workflows/asyncapi.yml)

# Unfolded Circle Core APIs

This repository contains API specifications of [Unfolded Circle Remote Two](https://www.unfoldedcircle.com/) products.

## Overview

- [Remote Two user interface](./doc/remote-ui.md)

API definitions:

- [WebSocket Integration API](./integration-api/README.md) defined with [AsyncAPI](https://www.asyncapi.com/).
- WebSocket Core API defined with [AsyncAPI](https://www.asyncapi.com/) - _not yet published_
- REST Core API defined with [OpenAPI](https://www.openapis.org/) - _not yet published_
- WebSocket Dock API defined with [AsyncAPI](https://www.asyncapi.com/) - _not yet published_

Integration driver documentation:

- [Remote Two entities](doc/entities/README.md).
- [How to write an integration driver](doc/integration-driver/write-integration-driver.md).
- [WebSocket handling](doc/integration-driver/websocket.md): authentication, keep alive, error handling.

## Integration API

The Remote Two WebSockets integrations API allows writing device integrations for the Unfolded Circle Remote Two and
former YIO remote devices.  
At the moment only user integrations running on an external host are supported.

The integration driver acts as server and the Remote Two as client. The remote connects to the integration when an
integration instance is configured. Whenever the remote enters standby it may choose to disconnect and automatically
reconnect again after wakeup.

The goal of the integration API is to cover not only simple static drivers, like controlling GPIOs on a Raspberry Pi,
but also support to integrate existing home automation hubs like Home Assistant, Homey, openHAB etc.  
The focus of the integration API is on entity integration, not on controlling or configuring the Remote Two. Please
refer to the core-API for further functionality.

An integration driver usually doesn't need to use the core-API as well, unless it also wants to customize certain device
behaviour or automatically add or configure its entities to the users profile.

### Develop integration drivers

Since we are providing an API and not an SDK for a specific programming language, one can develop integrations in any
language which is capable running a WebSockets server.

The downside of an API is that more low-level coding is required. In our case this involves running a WebSocket server,
handling the connections from the Remote Two, and parsing the JSON payload in the WebSocket text messages. However, once
this is done, the required API message interactions are rather simple to handle. 

See [how to write an integration driver](doc/integration-driver/write-integration-driver.md) for more information about
how to develop an integration driver for the Remote Two.

#### Examples

- [API models in Rust](https://github.com/unfoldedcircle/api-model-rs)

ℹ️ _The following examples will be published shortly:_

- Open Source integration for Home Assistant written in Rust

We plan to release more examples in the future.

## Core APIs

The Remote Two WebSockets & REST core APIs allow you to interact with the Unfolded Circle remote-core application and
take full control of its features. The APIs are specialized for certain features, but otherwise contain the same
functionality.

- The REST API adds:
  - custom resource handling for uploading icons, images etc.
  - user management and authentication handling.
- The WebSockets API adds event subscription with asynchronous notifications. 

The Remote Two acts as server. Whenever the remote enters standby it may choose to disconnect open WebSocket sessions.
It is up to the client to reconnect again.

## Roadmap

In the short term we will publish the following APIs and additional repositories: 

- [x] WebSocket integration API
- [ ] REST Core API, WebSocket Core API
- [x] [API models in Rust](https://github.com/unfoldedcircle/api-model-rs) (Apache License 2.0)
- [ ] Open Source integration for Home Assistant written in Rust (Mozilla Public License 2.0)
- [ ] remote-core simulator for Linux & macOS to start developing integrations without a Remote Two device
- [ ] Open Source remote-ui application
- [ ] Dock API for sending & learning IR codes

More detailed information about open issues can be found and tracked in the GitHub
[Issues](https://github.com/unfoldedcircle/core-api/issues) tab.

## API versioning

The API is versioned according to [SemVer](https://semver.org/).  
The initial public release will be `1.0.0` once it is considered stable enough with some initial integration
implementations and developer examples.

**Any major version zero (`0.y.z`) is for initial development and may change at any time!**  
I.e. backward compatibility for minor releases is not yet established, anything MAY change at any time!

## Recent changes

The major changes found in each new release of our API specifications are listed in the [changelog](./CHANGELOG.md) and
under the GitHub [releases](https://github.com/unfoldedcircle/core-api/releases). 

## Contributions

Please read our [contribution guidelines](./CONTRIBUTING.md) before opening a pull request.

## License

We have published the API specifications and documentations under the [CC-BY-AS-4.0](https://creativecommons.org/licenses/by-sa/4.0/)
(Creative Commons Attribution-ShareAlike 4.0 International) license. Please see [LICENSE file](./LICENSE).  
All code examples in this repository are licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).  
All graphics copyright © Unfolded Circle ApS 2022.
