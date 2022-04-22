# Unfolded Circle Core APIs

_TODO_

- [WebSocket Integration API](./integration-api/README.md)
- WebSocket Core API - _not yet published_
- REST Core API - _not yet published_

## Integration API

The Remote Two WebSockets integrations API allows writing device integrations for the Unfolded Circle Remote Two and
former YIO remote.  
At the moment only user integrations running on an external host are supported.

The integration driver acts as server and the remote as client. The remote connects to the integration when an
integration instance is configured. Whenever the remote enters standby it may choose to disconnect and connect again
after wakeup.

The goal of the integration API is to cover simple static drivers like controlling GPIOs on a Raspberry Pi, up to
integrating existing home automation hubs like Home Assistant, Homey, openHAB etc.  
The focus of the integration API is on entity integration, not on controlling or configuring the remote. Please
refer to the core-API for other functionality.

## Core API

The Remote Two WebSockets core API allows you to interact with the Unfolded Circle remote-core application and take
full control of its features.

The remote acts as server. Whenever the remote enters standby it may choose to disconnect and connect again
after wakeup.

## Roadmap

- [ ] Publish integration API
- [ ] Publish core API
- [ ] Publish Rust API models
- [ ] Publish Open Source integration for Home Assistant written in Rust
- [ ] Publish remote-core simulator for Linux & macOS
- [ ] Publish Open Source remote-ui application

## API Versioning

The API is versioned according to [SemVer](https://semver.org/).  
The initial public release will be `1.0.0` once it is considered stable enough with some initial integration
implementations and developer examples.

**Any major version zero (`0.x.y`) is for initial development and may change at any time!**  
I.e. minor releases below version 1.0.0 may not be backwards compatible.

## Contributions

## License

