# Core REST API

The Core-API is defined with [OpenAPI](https://www.openapis.org/).

You can use the online [Swagger Editor](https://editor.swagger.io/) to load and browse the specification or use your
favorite IDE with OpenAPI support (e.g. IntelliJ).

## Postman Collection

For explorative API testing the `remote-core_rest-api.postman_collection.json` collection can be imported into
[Postman](https://www.postman.com/).

### Configuration

The admin user account password needs to be configured in the Postman collection:

1. Open the `Remote Two Core-API` collection
2. Select the `Variables` tab.
3. Set the `apiPassword` and `apiKeyId` in the **CURRENT VALUE** column.  
   This will keep the passwords local and won't save them in the collection or Postman cloud.
