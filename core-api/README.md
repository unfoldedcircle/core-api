# Unfolded Circle Remote Core-APIs

The Unfolded Circle Remote WebSocket & REST Core-APIs allow you to interact with the Unfolded Circle remote-core service
and take full control of its features. The APIs are specialized for certain tasks, but otherwise contain the same
functionality and data models.

- The UCR REST Core-API adds:
    - Custom resource handling for uploading icons, images etc.
    - Installing custom remote-ui and web-configurator components.
    - Installing custom integration drivers.
    - User management and authentication handling.
- The UCR WS Core-API adds:
    - Event subscription with asynchronous notifications.

The API specifications are defined with [OpenAPI](https://swagger.io/specification/) & [AsyncAPI](https://www.asyncapi.com/)
in YAML format.

- [REST Core-API](rest)
- [WebSocket Core-API](websocket)

## API Versions

| UCR2 Firmware | Core Simulator | REST API | WS API |
|---------------|----------------|----------|--------|
| 1.9.2-beta    |                | 0.34.1   | 0.26.0 |
| 1.9.0-beta    |                | 0.34.0   | 0.26.0 |
| 1.8.0-beta    |                | 0.33.0   | 0.26.0 |
| 1.7.8         | 0.42.0         | 0.32.0   | 0.25.0 |
| 1.7.7         | 0.41.4         | 0.31.3   | 0.24.6 |
| 1.7.4         | 0.41.2         | 0.31.0   | 0.24.3 |
| 1.6.9         | 0.39.16        | 0.30.3   | 0.24.2 |
