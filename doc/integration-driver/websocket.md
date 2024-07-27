## WebSocket

[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) is a bidirectional communication
channel to exchange messages.  
These messages are all events, which can be sent by the client or server at any time.  
There's no support for synchronous calls or transactions. Message relations must be handled in the application level
protocol and are designed with message exchange patterns.

### Authentication

⚠️ Custom integrations running on the remote do not support authentication.

An external integration driver may require a token for authentication, or no authentication at all.

- During driver registration the preferred authentication type and the token can be specified.
- Default authentication method: message based if a token has been set.

#### Header Authentication

If header based authentication has been specified for the integration driver in the remote configuration, the remote
will send the token in the `auth-token` header field while establishing the connection.

The WebSocket connection should then only be established by the driver if the token matches. Otherwise, the integration
driver (which is the WebSocket server) must respond with http status code `401 Unauthorized` and not upgrading the
connection to WebSockets.

If the integration driver upgrades the WebSocket connection, the remote assumes the connection as authenticated.

#### Message Authentication

For integration drivers not able to use header based authentication with WebSockets (due to framework or runtime
restrictions), a fallback option with text messages exists. See AsyncAPI specification for the message definitions.

1. Right after the WebSocket connection is established, the integration driver must send the `auth_required` event as
   first message:

```json
{
  "kind": "event",
  "msg": "auth_required",
  "msg_data": {
    "name": "my-integration",
    "version": {
      "api": "0.5.0",
      "driver": "1.0.0"
    }
  }
}
```

2. The remote sends an authentication message:

```json
{
  "kind": "req",
  "id": 1,
  "msg": "auth",
  "msg_data": {
    "token": "$TOKEN"
  }
}
```

3. The integration driver replies with the `authentication` event including the result code of the authentication:

    - `200`: authentication succeeded, driver can be used, all API messages are accepted.
    - `401`: invalid token and the driver must close the connection. The remote will mark the integration as
             unauthorized and stop auto-reconnect. 

```json
{
  "kind": "resp",
  "req_id": 1,
  "msg": "authentication",
  "code": 200
}
```

The remote will close the connection if the integration sends any other code than 200 or 401. 

#### No Authentication

If the driver doesn't support authentication tokens, it still needs to send the `authentication` message with code 200
right after a connection has been established by a client.

### Keep Alive

The integration should automatically close idle connections.  
In order to keep a connection open, the remote sends WebSocket [Ping Pong control frames](https://tools.ietf.org/html/rfc6455#section-5.5.2)
at least every 60 seconds. Furthermore, an integration should also send pings to the remote to detect stale
connections and handle the standby events from the remote.

### Error Handling

- All response messages include a status code property.  
  This code corresponds to the standard http status codes as main success / error indication.

**TODO** _Disconnection standard status code in WebSockets: [rfc6455](https://tools.ietf.org/html/rfc6455#section-7.4)_

