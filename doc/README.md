# Remote Two/3 API Documentation

- [Remote Two user interface](remote-ui.md)
- [Remote Two entities](entities/README.md)
- [Bluetooth HID peripheral support](bt/README.md)
- [Remote Two DNS-SD lookup](discovery.md)

## Core API

The Unfolded Circle Remote WebSocket & REST Core-APIs allow you to interact with the Unfolded Circle remote-core service
and take full control of its features.

The focus of the Core-APIs is to provide all functionality for the UI application and the web-configurator.
The APIs are specialized for certain tasks, but otherwise contain the same functionality and data models.

- The UCR REST Core-API adds:
    - Custom resource handling for uploading icons, images etc.
    - Installing custom remote-ui and web-configurator components.
    - Installing custom integration drivers.
    - User management and authentication handling.
- The UCR WS Core-API adds:
    - Event subscription with asynchronous notifications.

The Core-APIs may also be used by other external systems and integration drivers, if specific configuration or
interaction features are required, which are not present in the UCR Integration-API.

The API specifications are defined with [OpenAPI](https://swagger.io/specification/) & [AsyncAPI](https://www.asyncapi.com/)
in YAML format.

- [REST Core-API documentation viewer](https://unfoldedcircle.github.io/core-api/rest/)
  - [REST Core-API YAML definition](https://github.com/unfoldedcircle/core-api/tree/main/core-api/rest)
- [WebSocket Core-API documentation viewer](https://unfoldedcircle.github.io/core-api/ws/)
  - [WebSocket Core-API YAML definition](https://github.com/unfoldedcircle/core-api/tree/main/core-api/websocket)

## Dock API

The Remote Two/3 WebSocket Dock-API allows you to directly interact with the Unfolded Circle smart charging docks and
take full control of its features. 

The API specification is defined with [AsyncAPI](https://www.asyncapi.com/) in YAML format.
The WebSocket communication is using text messages with JSON payload.

- [Dock AsyncAPI documentation viewer](https://unfoldedcircle.github.io/core-api/dock/)
  - [Dock AsyncAPI YAML definition](https://github.com/unfoldedcircle/core-api/tree/main/dock-api)
  - View with the [AsyncAPI Studio online tool](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/unfoldedcircle/core-api/main/dock-api/UCD2-asyncapi.yaml).  
    The link will directly load the yaml definition file from GitHub and display it together with the HTML documentation
    in the browser.

## Integration API

The Unfolded Circle WebSocket Integration-API allows writing device integration drivers for the Unfolded Circle Remotes.

The API specification is defined with [AsyncAPI](https://www.asyncapi.com/) in YAML format.
The WebSocket communication is using text messages with JSON payload.

- [Integration AsyncAPI viewer](https://unfoldedcircle.github.io/core-api/integration/)
  - [Integration AsyncAPI YAML definition](https://unfoldedcircle.github.io/core-api/integration/)
  - View with [AsyncAPI Studio online tool](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/unfoldedcircle/core-api/main/integration-api/UCR-integration-asyncapi.yaml).  
    The link will directly load the yaml definition file from GitHub and display it together with the HTML documentation
    in the browser.

### Integration Driver

- [How to write an integration driver](integration-driver/write-integration-driver.md)
- [WebSockets handling](integration-driver/websocket.md)
- [Driver registration](integration-driver/driver-registration.md)
- [Driver setup](integration-driver/driver-setup.md)
- [Install integration driver on the device](integration-driver/driver-installation.md)
