# Unfolded Circle Remote REST Core-API

The UCR REST Core-API is defined with [OpenAPI](https://www.openapis.org/).

You can use the online [Swagger Editor](https://editor.swagger.io/) to load and browse the specification or use your
favorite IDE with OpenAPI support (e.g. IntelliJ or Visual Studio Code).

- [OpenAPI YAML definition](UCR2-openapi.yaml).
  - ℹ️ This is a bundled YAML file generated from individual definitions.
  - Most OpenAPI tools only work with a single file.
  - We might publish the original definitions at a later time.
- See [/doc folder](../../doc/README.md) for further API documentation and information.

## Postman Collection

For explorative API testing the `remote-core_rest-api.postman_collection.json` collection can be imported into
[Postman](https://www.postman.com/). It contains pre-defined requests and some helper scripts to propagate generated
identifier keys to simplify common tasks.

Postman also supports [importing OpenAPI definitions](https://learning.postman.com/docs/integrations/available-integrations/working-with-openAPI/).  

### Configuration

The admin user account password needs to be configured in the Postman collection:

1. Open the `Remote Two Core-API` collection
2. Select the `Variables` tab.
3. Set the `apiPassword` and `apiKeyId` in the **CURRENT VALUE** column.  
   This will keep the passwords local and won't save them in the collection or Postman cloud.
