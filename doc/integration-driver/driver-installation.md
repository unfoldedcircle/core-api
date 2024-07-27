# Driver installation on the Remote

Starting with firmware v1.9.0, custom installation drivers can be installed on the Remote.

‼️ Custom integration drivers is a developer preview and not all features are implemented yet. See [missing features](#missing-features).

## Installation archive format

Integration driver archive requirements:
- TAR GZip archive (either .tgz or .tar.gz file suffix) with a maximum size of 100 MB.
- In the root of the archive, there must be a `driver.json` metadata file describing the custom integration driver.  
- The driver binary must be in the `./bin` subdirectory.
  - Either a statically linked aarch64 executable named `driver`.
  - Or a Node.js file named `driver.js`.
- All application files must be in one of the following subdirectories, other locations are not accessible at runtime:
  - `./bin`: application binary folder.
  - `./config`: optional configuration data. Path is accessible with `UC_CONFIG_HOME` environment variable.
  - `./data`: optional application data. Path is accessible with `UC_DATA_HOME` environment variable.

### Metadata file

The `driver.json` metadata file in the root of the archive describes the integration driver. 

‼️ The data schema is not yet included in the Core-API, the full object is shown below.
It is a reduced version of the `IntegrationDriver` object, without driver connection fields like driver_url, token etc. 

```json
{
  "driver_id": "foobar",
  "version": "1.0.0",
  "min_core_api": "0.20.0",
  "name": {
    "en": "Foobar special"
  },
  "icon": "custom:foobar.png",
  "description": {
    "en": "Control Foobar products",
    "de": "Steuere Foobar Produkte"
  },
  "features": [
    {
      "name": "auth.external_tokens",
      "required": true
    }
  ],
  "developer": {
    "name": "Unfolded Circle ApS",
    "email": "hello@unfoldedcircle.com",
    "url": "https://www.unfoldedcircle.com"
  },
  "home_page": "https://www.unfoldedcircle.com",
  "setup_data_schema": {
    "title": {
      "en": "Integration setup",
      "de": "Integrationssetup"
    },
    "settings": [
      {
        "id": "info",
        "label": {
          "en": "Setup process",
          "de": "Setup Fortschritt"
        },
        "field": {
          "label": {
            "value": {
              "en": "The integration will discover your Foobar products on your network. This process is automatic and can take a few minutes.",
              "de": "Diese Integration wird Foobar Produkte im Netzwerk finden. Dies ist ein Automatischer Prozess der ein paar Minuten dauern kann."
            }
          }
        }
      }
    ]
  },
  "release_date": "2024-07-21"
}
```

- `driver_id` must be at least 5 characters long and start with a lower-case letter.
  - Only lower-case letters, digits and `-`, `_` are allowed.
  - Common system identifiers are not allowed and will be rejected (e.g. `daemon`, `backup`, etc.).
  - The `uc_` prefix should not be used. This is reserved for pre-installed integrations. Any custom integrations using
    this prefix might get removed during a future firmware update.
- Multiple language fields are not required, but recommended.
  - If only a single language is provided, it should use the `en` key.
- `setup_data_schema` is optional if the driver provides a setup flow.
  - This is the first screen of the setup, all further screens are dynamically provided by the driver. 
- ⚠️ `min_core_api` is not yet used.

### Driver icon

A driver icon can either use a predefined icon or a custom icon. Predefined icons are prefixed with `uc:`, followed by
the icon identifier in lowercase.

A custom driver icon can be installed automatically as custom icon resource.

1. In `driver.json` set the icon field to `custom:$ICON_FILENAME`
2. Include `$ICON_FILENAME` in the root of the archive.

Example `driver.json` (other fields omitted for simplicity):
```json
{
  "icon": "custom:foobar.png"
}
```

The icon file called `foobar.png` must be added to the root of the archive.
Icons must be of size 90x90 pixels and either in PNG or JPG format. Maximum size is 32 KB.

### Installation archive example

Example of a Node.js based integration driver archive (contents of bin/node_modules are not shown for a clearer overview):
```
.
├── bin
│   ├── driver.js
│   ├── node_modules
│   │   ├── ...
│   │   ├── foobar
│   │   ├── uc-integration-api
│   │   ├── ws
│   │   └── ...
│   └── foobar.js
├── config
├── data
├── driver.json
└── foobar.png
```

- If the driver doesn't require any data or configuration files, the `./data` and `./config` directories can be omitted
  from the archive.
  - During the installation, the data and config directories are automatically created and can be accessed by the driver
    at runtime, no matter if they were provided in the installation archive or not.
- The `driver.json` file in the root folder is automatically copied to the `./bin` folder during installation if it is 
  missing.
  - If the driver requires a different `driver.json` file, simply include a file in the `./bin` folder.  
    The one in the root folder won't be copied anymore.


## Restrictions

- Maximum 10 custom integrations can be installed.
- Only Node.js is supported besides a statically linked binary. Other runtimes are not supported at the moment.
- The integration driver runs in a sandbox. Access to devices and the filesystem is restricted.
- No symlinks are allowed. They are automatically removed during the installation.
- Executable files are only allowed in the `./bin` directory.
  - No other tools are provided in the runtime environment. E.g. there is no shell available and no other tools
    like `cp` or `mv`.

### Missing features

- [ ] Resource restrictions for integration drivers: limit maximum amount of memory and CPU usage.
- [ ] Update an installed integrations.
  - Workaround: remove and re-install.
- [ ] Resource usage: provide memory and CPU usage per integration.
  - Only the overall resource usage can be monitored with `GET /api/pub/status`.
- [ ] Web-Configurator support: install custom integration drivers.
  - Custom integration drivers can already be deleted in the web-configurator.

### Runtime environment

The driver runs in a sandbox with limited access to the host system.

- Environment variables for the Websocket integration-API server:
  - `UC_INTEGRATION_INTERFACE`: network interface to bind to.
  - `UC_INTEGRATION_HTTP_PORT`: port number.
- The working directory is set to the binary directory.
- The binary directory is read-only.
- Node.js version: v16.18. A future firmware update will provide a newer Node.js LTS version. 
- File access with relative paths between `bin`, `config`, and `data` is not possible.
  - Environment variables must be used to retrieve the full path of these directories.
    - `UC_CONFIG_HOME` and `HOME`: configuration directory.
    - `UC_DATA_HOME`: data directory.
  - The returned path may not be stored, it may change with future software updates.
- Only the `$UC_CONFIG_HOME` and `$UC_DATA_HOME` directories are writeable and persisted between restarts.
  - The `/tmp` directory can be used for small temporary files. Files are not persisted between restarts.
- A dynamic user and group is allocated when the driver is started.
  - The user and group IDs may change between driver restarts.
  - Write access to the `$UC_CONFIG_HOME`, `$UC_DATA_HOME` and `/tmp` directories is ensured.

⚠️ CPU and memory restrictions are not yet in place but will be enforced in a future firmware update!
- A single integration driver should not use more than 100 MB of memory.

_TODO more details about sandbox environment_

#### Network

The integration runs on the same network environment as the Remote. There is no network bridge or firewall. 

- Binding ports below 1024 is not possible.

⚠️ A port-binding filter might be added in the future to prevent integrations to steal away ports of other integrations.
The port range 8000-9200 and port 13333 must be avoided!

#### Native integration drivers

_TODO sysroot, available dynamic libraries_

The [Remote Two Cross Compile Toolchain](https://github.com/unfoldedcircle/ucr2-toolchain) can be used to cross-compile
a native binary for the Remote.

- The driver must be compiled as a static binary for libc.
- Most dynamic libraries in the cross-compile sysroot are NOT available in the custom integration runtime environment!

## Install driver

```shell
curl --location 'http://$IP/api/intg/install' \
--user 'web-configurator:$PIN' \
--form 'file=@"custom-intg.tar.gz"'
```

See [REST Core API](../../core-api/rest/README.md) for more details.

## Delete driver

To delete a custom integration, use the regular endpoints to delete an integration instance and driver. 
These are the same endpoints as for an external network integration driver:

- Delete integration instance `DELETE /api/intg/instances/:intgId`.
- Delete driver and installation files: `DELETE /api/intg/drivers/:driverId`.

See [REST Core API](../../core-api/rest/README.md) for more details.

The instance and driver can also be deleted in the web-configurator.

## Log access

Output to stdout and stderr are automatically stored with a timestamp and accessible as the other system logs:

- Get log services: `GET /api/system/logs/services`.
- Query logs: `GET /api/system/logs?...`.

See [REST Core API](../../core-api/rest/README.md) for more details.

Log files can also be downloaded in the web-configurator: _Settings, Development: Logs_

## Recommendations

- Node.js should be preferred for writing integration drivers.
- If using Python:
  - Use [PyInstaller](https://pyinstaller.org/) to create a binary distribution.
  - Use the default one-folder bundle containing an executable (`--onedir`). Avoid the one-file bundled executable, since
    it will easily use an additional 100 MB of memory!
  - See [Android TV integration](https://github.com/unfoldedcircle/integration-androidtv) or [Apple TV integration](https://github.com/unfoldedcircle/integration-appletv)
    as an example.
- An integration driver should be limited to one process and not launch other processes.
- Use ports above 10000 if the integration needs to create an IPv4 or IPv6 server socket (besides the required WebSocket
  server for the integration-API).
- Preserve resources, use as little memory and CPU as possible.
- Use stdout & stderr for logging.

## Example integrations

The following Python based integration drivers create a custom integration installation archive during build with a
GitHub action:

- [Android TV](https://github.com/unfoldedcircle/integration-androidtv)
- [Apple TV](https://github.com/unfoldedcircle/integration-appletv)
- [Denon AVR](https://github.com/unfoldedcircle/integration-denonavr)

