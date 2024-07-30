# Unfolded Circle Remote WebSocket Core-API

The Remote device acts as server. Whenever the device enters standby, it may choose to disconnect open WebSocket sessions.
It is up to the client to reconnect again.

The UCR WS Core-API is defined with [AsyncAPI](https://www.asyncapi.com/).

- [AsyncAPI YAML definition](UCR2-asyncapi.yaml).
- See [/doc folder](../../doc/README.md) for further API documentation and information.

## API HTML documentation

- View with [AsyncAPI Studio online tool](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/unfoldedcircle/core-api/main/core-api/websocket/UCR2-asyncapi.yaml).  
  The link will directly load the yaml definition file from GitHub and display it together with the HTML documentation
  in the browser.

The [AsyncAPI generator tool](https://github.com/asyncapi/generator) transforms the API definition into other formats.

The easiest way to generate the HTML documentation from the AsyncAPI definition is to use the official
[asyncapi/generator Docker image](https://hub.docker.com/r/asyncapi/generator). You can also try to use the command line
tool with the instructions provided from the generator tool.
The provided Bash wrapper script [`create-html-docker.sh`](create-html-docker.sh) creates the html documentation in the
`./html` sub folder.

