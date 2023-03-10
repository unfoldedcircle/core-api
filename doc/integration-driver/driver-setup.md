## Driver Setup

⚠️ **work in progress!**

An integration driver can support a settings page and an interactive setup flow with the Remote Two app or
web-configurator to configure the driver. 

The integration driver can specify a `setup_data_schema` for the initial setup screen for the user to fill out.
This can be as simple as an information text or a confirmation button without any further interactions. It also allows
to define more sophisticated user interactions where the integration driver sends dynamic setup screens to the user,
e.g. offer choices or asking for more input data.

### Driver Registration

The following sequence diagram shows the happy message flow of a driver registration.
Note that driver registration can be aborted at every stage with an error response or timeout.

```mermaid
sequenceDiagram
    participant I as Integration X
    participant M as mDNS
    participant R as Remote
    participant C as UI configurator
    actor User

    I--)M:     advertise service X

    User->>C:  Start integration discovery
    C-)+R:     start_discovery
    R--)C:     event: integration_discovery (START)
    R-)M:      lookup service
    loop
        M--)R: service(n) 
        opt Not yet registered
            R--)C: event: integration_discovery (DISCOVER) [n] 
        end
    end 
    R--)-C:    event: integration_discovery (STOP) 
    
    User->>C:  Choose integration X
    
    loop
      opt
        User->>+C: Enter access token    
      end
      opt
        User->>+C: Change driver URL   
      end
   

      opt
        User->>C: Connection test
        C-)+R:    get_discovered_intg_driver_metadata
        rect rgb(51, 82, 102)
            R-)+I:           [temporary connection]
            Note right of I: See Establish Connection
        end
        R-)I:    get_driver_metadata 
        I--)-R:  driver_metadata
        R-->I:   disconnect 
        R--)-C:  integration_driver
      end
    end
    
    User->>+C: Confirm
    C-)+R:   configure_discovered_integration_driver
    rect rgb(51, 82, 102)
        R-)+I:           [temporary connection]
        Note right of I: See Establish Connection
    end
    R-)I:    get_driver_metadata 
    I--)-R:  driver_metadata
    R-->I:   disconnect 
    R->>R:   create driver
    R--)C:   integration_driver
    R--)C:  event: integration_driver_change (NEW)

    rect rgb(51, 82, 102)
        R-)+I:           [start communication]
        Note right of I: See Establish Connection
    end

    R--)C:   event: integration_state (CONNECTING)
    R--)-C:   event: integration_state (ACTIVE)
    Note over I,R: Configured driver
```

### Driver Setup Flow

The following sequence diagram shows the message flow after the driver registration above.
Again, the happy flow is shown. An error response or timeout can occur at any step in the process.

```mermaid
sequenceDiagram
    participant I as Integration
    participant R as Remote
    participant C as UI configurator
    actor User

    Note over I,R: Configured driver
    R-->+I:           connection

    User->>C: Configure new integration

    User->>C: Provide settings value

    C-)+R:   setup_integration
    R->>R:   verify setup session not running
    R->>R:   create new setup session
    R--)C:   integration_setup_info (SETUP)
    R--)C:   event: integration_setup_change<br>START (SETUP)
    R--)C:   event: integration_setup_change<br>SETUP (SETUP)

    R-)+I:    setup_driver
    I--)R:    result (OK)
    Note right of I: setup started, updates with `driver_setup_change`
    loop
      alt setup progress
        I--)R:    event: driver_setup_change<br>(`event_type: SETUP, state: PROGRESS?`)
        R--)C:    event: integration_setup_change<br>SETUP (PROGRESS)
      else user interaction
        I--)R:    event: driver_setup_change<br>(`event_type: SETUP, state: WAIT_USER_ACTION?`)
        R--)+C:   event: integration_setup_change<br>SETUP (WAIT_USER_ACTION)
        User->>C: Provide input  
        C-)+R:    set_integration_user_data
        R-)+I:    set_driver_user_data
        I--)-R:   result (OK)
        R--)-C:    integration_setup_info
      end
    end
    I--)-R: driver_setup_change<br>(`event_type: STOP, state: OK`
    R-)R:   create integration
    R--)C:  event: integration_change<br>(NEW)
    R--)C:  event: integration_state<br>(CONNECTED)
    R--)C:  event: integration_setup_change<br>SETUP (OK)
    R--)C: event: integration_setup_change<br>STOP (OK)
    R-)-R:   remove setup session

    Note over I,R: Configured integration
    R-)R:    wait for messages
    Note over I,R: Message exchange until disconnected
    I-->-R:     disconnect
```
