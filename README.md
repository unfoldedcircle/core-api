# Unfolded Circle Core APIs

This repository contains API specifications of [Unfolded Circle Remote Two](https://www.unfoldedcircle.com/) products.

## Overview

_TODO_

- [WebSocket Integration API](./integration-api/README.md) defined with [AsyncAPI](https://www.asyncapi.com/).
- WebSocket Core API defined with [AsyncAPI](https://www.asyncapi.com/) - _not yet published_
- REST Core API defined with [OpenAPI](https://www.openapis.org/) - _not yet published_

## Integration API

The Remote Two WebSockets integrations API allows writing device integrations for the Unfolded Circle Remote Two and
former YIO remote.  
At the moment only user integrations running on an external host are supported.

The integration driver acts as server and the remote as client. The remote connects to the integration when an
integration instance is configured. Whenever the remote enters standby it may choose to disconnect and automatically
reconnect again after wakeup.

The goal of the integration API is to cover not only simple static drivers, like controlling GPIOs on a Raspberry Pi,
but also support to integrate existing home automation hubs like Home Assistant, Homey, openHAB etc.  
The focus of the integration API is on entity integration, not on controlling or configuring the remote. Please
refer to the core-API for further functionality.

An integration driver usually doesn't need to use the core-API as well, unless it also wants to customize certain device
behaviour or automatically add or configure its entities to the users profile.

### How to write an integration

_TODO_

#### Examples

_TODO_

- API models in Rust
- Open Source integration for Home Assistant written in Rust

## Core APIs

The Remote Two WebSockets & REST core APIs allow you to interact with the Unfolded Circle remote-core application and
take full control of its features. The APIs are specialized for certain features, but otherwise contain the same
functionality.

- The REST API adds:
  - custom resource handling for uploading icons, images etc.
  - user management and authentication handling.
- The WebSockets API adds event subscription with asynchronous notifications. 

The remote acts as server. Whenever the remote enters standby it may choose to disconnect open WebSocket sessions.
It is up to the client to reconnect again.

## Roadmap

In the short term we will publish the following APIs and additional repositories: 

- [ ] Integration API
- [ ] REST Core API, WebSocket Core API
- [ ] API models in Rust
- [ ] Open Source integration for Home Assistant written in Rust
- [ ] remote-core simulator for Linux & macOS to start developing integrations without a Remote Two device
- [ ] Open Source remote-ui application
- [ ] Dock API for sending & learning IR codes

More detailed information about open issues can be found and tracked in the GitHub
[Issues](https://github.com/unfoldedcircle/core-api/issues) tab.

## API Versioning

The API is versioned according to [SemVer](https://semver.org/).  
The initial public release will be `1.0.0` once it is considered stable enough with some initial integration
implementations and developer examples.

**Any major version zero (`0.y.z`) is for initial development and may change at any time!**  
I.e. SemVer rules don't apply yet, backward compatibility for minor releases is not yet established, anything MAY change
at any time!

## Recent changes

The major changes found in each new release of our API specifications are listed in the [changelog](./CHANGELOG.md) and
under the GitHub [releases](https://github.com/unfoldedcircle/core-api/releases). 

## Contributions

Please read our [contribution guidelines](./CONTRIBUTING.md) before opening a pull request.

## License

We have published the API specifications and documentations under the [CC-BY-AS-4.0](https://creativecommons.org/licenses/by-sa/4.0/)
(Creative Commons Attribution-ShareAlike 4.0 International) license. Please see [LICENSE file](./LICENSE).  
All code examples in this repository are licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). 
