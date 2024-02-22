# Remote Two Core-APIs

The Remote Two WebSockets & REST Core-APIs allow you to interact with the Unfolded Circle remote-core application and
take full control of its features. The APIs are specialized for certain tasks, but otherwise contain the same
functionality.

- The REST API adds:
    - Custom resource handling for uploading icons, images etc.
    - User management and authentication handling.
- The WebSockets API adds:
    - Event subscription with asynchronous notifications.

The API specifications are defined with [OpenAPI](https://swagger.io/specification/) & [AsyncAPI](https://www.asyncapi.com/)
in YAML format.

- [REST Core-API](rest)
- [WebSocket Core-API](websocket)
