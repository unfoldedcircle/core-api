# WebSocket Integration API

- [AsyncAPI definition](asyncapi.yaml)
- [Remote Two entities](entities/README.md)
- [How to write an integration driver](write-integration-driver.md)
- [WebSockets handling](websocket.md)
- [Driver registration](driver-registration.md)

## Message Flow
The basic message flow between an integration and the remote is as follows:

- The integration driver acts as server and the remote initiates the connection.
- After the WebSocket connection is established to the integration driver, the remote subscribes to events of all
  configured entities.

### Integration Setup

- During setup of the UI and configuring a user profile the remote asks the integration about the available entities.
  - The user chosen entities are configured and stored in the remote.

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

    R-)+I:  [connect] 
    I->>I:  authentication & version check etc
    opt
        I-->>-D:  connect / initialize
    end

    opt
        I-)+R:  get_version
        R--)-I: version

        I-)+R:  get_localization_cfg
        R--)-I: localization_cfg
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

### Multi Driver Instance Handling

**TODO review, not yet ready for implementation!**

```mermaid
sequenceDiagram
    participant D as Device(s)
    participant I as Integration
    participant R as Remote
    participant U as UI
    participant C as configurator
    actor User

    R-)+I:  [connect] 
    I->>I:  authentication & version check etc
    opt
        I-->>-D:  connect / initialize
    end

    User->>+C: Setup new device
    C->>R:     check connection state
    C->>-C:    setup flow
    C-)+R:     start_discovery
    R-)-I:     start_discovery
    I--)+R:    discovered_device(X) 
    R--)-C:    discovered_device(X) 
    I--)+R:    discovered_device(Y) 
    R--)-C:    discovered_device(Y) 
    I--)+R:    finished_discovery 
    R--)-C:    finished_discovery 
    
    opt Manual   re-discovery
      User->>+C: Re-discover
      C-)+R:     start_discovery
      R-)-I:     start_discovery
      I--)+R:    discovered_device(X) 
      R--)-C:    discovered_device(X) 
      User->>C:  Stop discovery
      C-)+R:     stop_discovery
      R-)-I:     stop_discovery
    end
    
    User->>+C: Choose device X

    C-)+R:   setup_device(X)
    R-)-I:   setup_device(X)
    loop
      alt setup progress
        I-)R:     device_setup_progress
        R-)C:     progress
      else user interaction
        I-)R:     device_setup_interaction
        R-)+C:    interaction
        User->>C: Provide input  
        C--)-R:   user action
        R--)I:    setup_user_action
      end
    end
    I-)R:  device_setup_complete
    R-)C:  device_setup_complete
```
