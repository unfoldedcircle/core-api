# Unfolded Circle Remote Core-APIs

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
interaction features are required, which are not present in the [UCR Integration-API](../integration-api).

The API specifications are defined with [OpenAPI](https://swagger.io/specification/) & [AsyncAPI](https://www.asyncapi.com/)
in YAML format.

- [REST Core-API](rest)
- [WebSocket Core-API](websocket)

## API Versions

| UCR2 Firmware | Core Simulator | REST API | WS API |
|---------------|----------------|----------|--------|
|               | 0.62.0         | 0.40.0   | 0.31.0 |
| 2.6.0-beta    | 0.61.5         | 0.39.4   | 0.30.2 |
| 2.5.0-beta    | 0.60.0         | 0.39.2   | 0.30.1 |
| 2.2.4-beta    | 0.58.2         | 0.38.4   | 0.29.2 |
| 2.2.2-beta    | 0.53.0         | 0.38.2   | 0.29.1 |
| 2.1.0-beta    | 0.51.0         | 0.38.0   | 0.29.0 |
| 2.0.0-beta    | 0.49.1         | 0.37.0   | 0.29.0 |
| 1.9.3-beta    | 0.48.0         | 0.36.0   | 0.28.0 |
| 1.9.2-beta    | 0.47.0         | 0.34.1   | 0.26.0 |
| 1.9.0-beta    |                | 0.34.0   | 0.26.0 |
| 1.8.0-beta    |                | 0.33.0   | 0.26.0 |
| 1.7.8         | 0.42.0         | 0.32.0   | 0.25.0 |
| 1.7.7         | 0.41.4         | 0.31.3   | 0.24.6 |
| 1.7.4         | 0.41.2         | 0.31.0   | 0.24.3 |
| 1.6.9         | 0.39.16        | 0.30.3   | 0.24.2 |


## Authentication
  
All API endpoints besides `/api/pub` are secured. Available authentication methods are:

- `Basic Auth` for every request.  
  This should only be used for simple testing. At the moment there's only a single user account available for the
  web-configurator.
  - User: `web-configurator`
  - Password: generated pin shown in the remote-UI.
- `Bearer Token` for every request.  
  This is the preferred authentication method for external systems communicating with the UCR REST Core-API.
  - See `/auth/api_keys` endpoints on how to create and manage API keys.
  - Only the `admin` role is supported at the moment. More roles will be added in the future.
  - Example for a curl request:  
    `curl 'http://$IP/api/system' --header 'Authorization: Bearer $API_KEY'`
- `Cookie` based session login with the `/api/pub/login` endpoint.  
  This is the preferred method for web frontends like the web-configurator.

### Web-configurator Pin

To access the web-configurator, a pin can be generated in the profile view of the Remote user interface. 

Once generated, the pin can no longer be retrieved from the system anymore. The pin is not stored in plain text. It is
only shown in the UI as long as the device is not restarted.

Using the web-configurator credentials for external scripting access should be avoided. Furthermore, access is denied if
the web-configurator is disabled in the UI.

Create an independent API-key instead.

### API-key

1. Create a new key with the current web-configurator pin in `$PIN`:

```shell
curl 'http://$IP/api/auth/api_keys' \
--header 'Content-Type: application/json' \
-u "web-configurator:$PIN" \
--data '{
  "name": "curl access key",
  "scopes": [
    "admin"
  ]
}'
```

2. Store the returned API key in `api_key` in a safe place.  
   It cannot be retrieved anymore and is only shown once in the response message.  
   Example response:

```json
{
    "name": "curl access key",
    "api_key": "<REDACTED>",
    "active": true,
    "scopes": [
        "admin"
    ]
}
```

3. Use the API key as bearer token in your curl commands. Example:

```shell
curl 'http://$IP/api/system' \
--header 'Authorization: Bearer <REDACTED>'
```
