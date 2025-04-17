# WebSocket Integration API

- [AsyncAPI YAML definition](UCR-integration-asyncapi.yaml).

- See [/doc folder](../doc/README.md) for the API documentation and further information.

## API HTML documentation

- View with [AsyncAPI Studio online tool](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/unfoldedcircle/core-api/main/integration-api/UCR-integration-asyncapi.yaml).  
  The link will directly load the yaml definition file from GitHub and display it together with the HTML documentation in
the browser.

The [AsyncAPI generator tool](https://github.com/asyncapi/generator) transforms the API definition into other formats.

The easiest way to generate the HTML documentation from the AsyncAPI definition is to use the official
[asyncapi/generator Docker image](https://hub.docker.com/r/asyncapi/generator). You can also try to use the command line
tool with the instructions provided from the generator tool.
The provided Bash wrapper script [`create-html-docker.sh`](create-html-docker.sh) creates the html documentation in the
`./html` sub folder.

ℹ️ We will look into using GitHub Pages for publishing the html documentation.

## API Versions

| Integration API | UCR2 Firmware | Core Simulator |
|-----------------|---------------|----------------|
| 0.12.1          |               | 0.58.3         |
| 0.12.0          | 1.9.3-beta    | 0.48.0         |
| 0.11.0          | 1.9.2-beta    | 0.47.0         |
| 0.10.0          | 1.7.12        | 0.43.0         |
| 0.9.0           | 1.7.2         | 0.41.0         |
| 0.8.0           | 1.5.2         | 0.39.7         |
