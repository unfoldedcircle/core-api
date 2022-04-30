### Multi Device Instance Driver

**TODO review, not yet finalized!**

_TODO add introduction_

The multi device instance driver adds discovery and user interaction to the setup process.

- The `device_id` property must be used in all messages to identify the specific device.

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
