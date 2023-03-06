## How to write an integration driver

The integration API allows to develop integration drivers in any programming language capable of running a WebSockets
server.

ℹ️ At the moment only external integrations which run on a separate device on your network are supported.

We will publish the requirements and supported runtimes at a later date. The only thing we can say right now is that
aiming for a statically compiled binary will have a higher chance of being compatible for on-device publishing.
This includes for example Rust and C / C++, whereas interpreted languages like Java, Python and Node.js etc. will most
likely not be suitable. Reasons are the limited resources (memory, storage, CPU) on the embedded Remote device. A good
reference for testing is a [Raspberry Pi Zero W](https://www.raspberrypi.com/products/raspberry-pi-zero-w/), which
is also the platform of the former YIO Remote.

1. Choose your programming language.
2. Choose a WebSockets server library or framework for your language.
3. Choose a JSON framework for your language.
4. Choose which [entities and features](../entities/README.md) the driver should expose.
5. Implement the required WebSockets text messages in the [WebSocket Integration API](../../integration-api/asyncapi.yaml).

ℹ️ See [NodeJS API wrapper](https://github.com/unfoldedcircle/integration-node-library) for a quick start in JavaScript.

### Integration Driver Types

There are two different driver types one can implement: either a simple single device driver or a multi device instance
driver.

#### Single Device Instance Driver

The single device instance driver is the default and easiest driver to develop:

- There is no concept of different or individual devices, just entities that the driver provides. 
- The driver offers a list of available entities to the remote. This can be a single media player entity, or a large
  list of different entities from a home automation hub.
- The optional `device_id` property must be omitted in all messages. 
- The driver may still control multiple physical devices, but from the Remote's point of view, these are just different
  entities provided from the same integration driver.

This driver type is suitable for all device integrations which don't require much or any configuration by the user, or
if the configuration shall be kept separate from the remote on purpose.
E.g. if smart WiFi light bulbs can be discovered by the driver and then each bulb can be provided as a
[light entity](../entities/entity_light.md) to the remote.

#### Multi Device Instance Driver

⚠️ This feature is currently being finalized and not yet available!

The multi device instance driver is an advanced driver capable of discovering physical devices and delegating the
setup or configuration to the Remote / web-configurator.

- Each device is considered a driver instance.  
  There is one driver process handling multiple devices. The interaction and handling with a specific device is called
  device instance. The technical implementation is up to the developer. This could be a multi-threaded or async
  implementation. 
- Each instance offers a list of available entities to the remote.
- Each instance has its own device state (connected, disconnected, error, etc.).
- All driver communication is handled on the same WebSocket connection. I.e. the Remote only establishes one connection
  to the integration driver, no matter how many device instances there are. 
- The driver has the option to interact with the user during the setup process with progress and notification
  screens. E.g. asking the user to perform an action - _press button X on device_ - or provide additional data like
  device credentials. 

### Authentication

An integration driver can choose if the Remote Two requires authentication or not to connect to the driver.  
Supported are header based token authentication during connection setup or with an application level message after the
connection has been established.

See [WebSocket authentication](websocket.md#authentication) for more information.

### Connection Handling

- Support multiple Remote sessions
  - A driver should support multiple, independent WebSocket connections at the same time. 
- Keep alive
  - The driver must support WebSocket [Ping Pong control frames](https://tools.ietf.org/html/rfc6455#section-5.5.2).  
    Please check your WebSocket library, most libraries support this out of the box.
  - The Remote Two continuously sends ping frames and automatically closes the connection if it doesn't receive a pong
    within a certain time frame. The driver may also send ping frames to check if the connection is still alive.

### Driver Registration

An integration driver can optionally register itself at a remote and provide its authentication token.

See [driver registration](driver-registration.md) for more information.

### Discover Remote Two Devices

The Remote Two can be discovered with DNS-SD. It announces itself with service type `_uc-remote._tcp`.

See [remote DNS-SD lookup](../discovery.md) for more information.

### JSON Messages

#### Message Format

- Only WebSockets Text message are supported at the moment.  
  Binary support might be added in the future.
- All messages are serialized in JSON format.
- Text encoding is UTF-8.
- The application level protocol defines two message interactions with three different message types:
  - Request / response messages
  - Event messages

#### Request Messages

- A request message is of kind `req`.
- Every request message must include a unique `id` value, which must be increased for every new request.
- The request message type is specified in property `msg`.
- An optional `msg_data` object holds the request specific data.
- A request message is usually answered by a response message if not otherwise stated in the documentation.  
  Exceptions are event responses, e.g. if the event can be triggered independently of the request message.

Example of a request message:

```json
{
  "kind": "req",
  "id": 123,
  "msg": "entity_command",
  "msg_data": {
    "entity_type": "button",
    "entity_id": "button-1",
    "cmd_id": "push"
  }
}
```

#### Response Messages

- A response message is of kind `resp`.
- The corresponding `id` of the request message is given in property `req_id`.
- The response message type is specified in property `msg`.
- The status of the request operation is given in `code`.
- The `msg_data` object holds the response specific data.

Example of a response message:

```json
{
  "kind": "resp",
  "req_id": 11,
  "msg": "available_entities",
  "code": 200,
  "msg_data": {
    "available_entities": [
      {
        "entity_id": "button-1",
        "entity_type": "button",
        "name": {
          "en": "Ring dinner bell"
        }
      }
    ]
  }
}
```

#### Event Messages

- An event message is of kind `event`.
- The event type is specified in property `msg`.
- The optional `cat` property denotes the event category.
- The optional `ts` property holds the timestamp when the event occurred.
- The `msg_data` object holds the event specific data.

Example of an event message:

```json
{
  "kind": "event",
  "msg": "entity_change",
  "cat": "ENTITY",
  "ts": "2021-04-24T14:15:22Z",
  "msg_data": {
    "entity_type": "cover",
    "entity_id": "blind-1",
    "attributes": {
      "position": 72
    }
  }
}
```

### Required Messages

For a functioning integration driver not all defined messages and optional features in the integration API have to be
implemented. The mandatory messages are tagged with a pizza 🍕 emoji in the [WebSocket Integration AsyncAPI definition](../../integration-api/asyncapi.yaml).

Required request messages which must be processed and answered by a driver:

| Request                  | Response             | Description                                                                                                                |
|--------------------------|----------------------|----------------------------------------------------------------------------------------------------------------------------|
| `get_driver_version`     | `driver_version`     | Get version information about the integration driver.                                                                      |
| `get_device_state`       | `device_state`       | Get the current device state.<br/>This informs the Remote Two if the device is ready or not available.                     |
| `get_available_entities` | `available_entities` | Retrieve the available entities from the integration driver.                                                               |
| `subscribe_events`       | `result`             | Subscribe to entity state change events.<br/>This instructs the driver to send entity state changes for specific entities. |
| `get_entity_states`      | `entity_states`      | Get the current state of the entities.<br/>This provides the Remote Two the current entity properties.                     |
| `entity_command`         | `result`             | Instructs the driver to execute an entity command.<br/>This sets entity properties from user interactions.                 |

Required event messages which must be sent by the driver:

| Event            | Description                                     |
|------------------|-------------------------------------------------|
| `entity_change`  | Emitted when an attribute of an entity changes. |
| `device_state`   | Emitted when the device state changes.          |


### Common Message Flow

The basic message flow between an integration and the remote is as follows:

- The integration driver acts as server and the Remote Two initiates the connection.
- After the WebSocket connection is established to the integration driver, the remote subscribes to events of all
  configured entities.
- Whenever the state of the integration driver changes, the driver sends a device state event.  
  This is usually the device which the driver represents or connects / communicates with. E.g. a smart device, home
  automation hub, cloud service, etc.
- Whenever an entity attribute of a subscribed entity changes, the driver sends an entity state event.
- The remote announces when it goes into and out of standby, so the integration driver can act accordingly.   
  Note: the WebSocket connection might get disconnected during remote standby!

#### Integration Setup

##### Single Device Instance Driver Setup

The integration setup process consists of requesting all available entities from the driver and subscribing to entity
events of the chosen entities by the user.

- The `subscribe_events` message is only sent for entities which are configured in the Remote. I.e. only for entities
  which are used in a profile and placed on a page or group.
- For simplicity reasons the driver may choose to always send events for all entities. The Remote will ignore
  unnecessary events. However, it's recommended to limit the message exchange to entities which are actually used to
  save network & processing resources.
- The configured entities from the user(s) are stored in the remote-core application.  
  Whenever the Remote (re)connects to the driver, only those entity identifiers are submitted in the `subscribe_events`
  message.
- The driver can use the `get_version` message to retrieve version and model information of the Remote. 
- The driver can use the `get_localization_cfg` message to retrieve localization information from the remote if it deals
  with localized labels, values etc.

```mermaid
sequenceDiagram
    participant D as Device(s)
    participant I as Integration
    participant R as Remote
    participant U as UI
    participant C as configurator
    actor User

    User->>+C: setup new integration
    C->>-R:  enable integration instance

    critical Establish a connection. See normal operation.
        R-)I: connect
    end

    R-)+I:   get_driver_version
    I--)-R:  driver_version
    
    C-)+R:   get_available_entities(integration)
    R-)-I:   get_available_entities
    I--)+R:  available_entities 
    R->>R:   cache entities
    R--)-C:  available entities

    loop
        User->>+C: configure entity 
        C-)+R:   add entity
        R->>R:   store entity cfg
        R-)-I:   subscribe_events
    end
```

##### Multi Device Instance Driver Setup

⚠️ This feature is currently being finalized and not yet available!

See [Multi Device Instance Driver](multi-device-driver.md) for preliminary information.

#### Normal Operation

During normal operation there are only a few different message exchanged between the Remote and the integration driver:

- `authentication`: sent by the driver after WebSocket connection is established
- `subscribe_events`: sent by the Remote after the WebSocket connection is authenticated
- `entity_command`: instruct the driver to perform an action on an entity
- `entity_change`: inform the Remote that an entity changed
- `get_device_state`: request the device state from the driver
- `get_entity_states`: request the current entity attributes and states

```mermaid
sequenceDiagram
    participant D as Device(s)
    participant I as Integration
    participant R as Remote
    participant U as UI
    actor User

    R->>R:  startup: lookup enabled integration

    R-)+I:  [WS connection] 
    I->>I:  authentication & version check etc
    I--)-R:  authentication

    R-)+I:  connect
    loop until connected
      opt
          I-->>D:  connect / initialize
      end
      I--)-R:  device_state
    end

    opt
        I-)+R:  get_version
        R--)-I: version

        I-)+R:  get_localization_cfg
        R--)-I: localization_cfg
    end
    

    R-)I:   subscribe_events

    R-)I:   get_entity_states

    D-->>I:  external state change
    I--)+R:  entity_change 
    R->>R:   store event
    R-)+U:   entity change event
    opt
        U-)-R:   get entity
        R--)-U:  entity
    end

    User->>+U: interact with entity
    U-)-R:     entity action
    R-)+I:     entity_command
    opt
        I-->>D:  update
    end
    I--)-R:    result

    opt
        D-->>+I:  state change
    end
    I-)-R:   entity_change
    R->>+R:  store event
    R-)-U:   entity change event

    R-)I:    enter_standby
    R-)I:    exit_standby
    R-)+I:   get_device_state
    I--)-R:  device_state
    R-)+I:   get_entity_states
    I--)-R:  entity_states
    R-)I:    [disconnect]
```
