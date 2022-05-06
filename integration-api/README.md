# WebSocket Integration API

- [AsyncAPI YAML definition](asyncapi.yaml)

See [/doc folder](../doc/README.md) for the API documentation and further information.

## API HTML documentation

The quickest way to browse and preview the API documentation is with the official
[AsyncAPI Studio](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/unfoldedcircle/core-api/main/integration-api/asyncapi.yaml)
online tool.  
The link will directly load the yaml definition file from GitHub and display it together with the HTML documentation in
the browser.

The [AsyncAPI generator tool](https://github.com/asyncapi/generator) transforms the API definition into other formats.

The easiest way to generate the HTML documentation from the AsyncAPI definition is to use the official
[asyncapi/generator Docker image](https://hub.docker.com/r/asyncapi/generator). You may also try to use the command line
tool with the instructions provided from the generator tool.
The provided Bash wrapper script [`create-html-docker.sh`](create-html-docker.sh) creates the html documentation in the
`./html` sub folder.

ℹ️ We will look into using GitHub Pages for publishing the html documentation.

