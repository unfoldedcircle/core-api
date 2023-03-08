## Driver Registration

An integration driver can optionally register itself in a remote if the [driver advertisement](driver-advertisement.md)
for auto-discovery is not sufficient.  
This is a convenience feature if a driver would like to provide its access token without the user requiring to manually
enter it, or if the driver cannot be automatically be discovered by the remote due to network setup (non-local servers,
firewalls, VLAN etc.).

```mermaid
sequenceDiagram
    participant I as Integration
    participant mDNS
    participant R as Remote
    participant U as UI / web-configurator
    R-)mDNS: publish service
    I-)mDNS: lookup remote
    I->>+R:  register integration driver
    R-->>-I: result
    rect rgb(118, 153, 144)
    Note right of R: Integration setup
    U->>R:  get integration drivers
    U->>R:  create integration instance
    U->>R:  enable integration instance
    end
    rect rgb(51, 82, 102)
    R-)I:   start communication
    Note right of I: See integration message flow
    end
```

### Registration REST API

Driver registration is only possible through the Remote core REST API.

See: <https://github.com/unfoldedcircle/core-simulator/tree/main/core-api>
