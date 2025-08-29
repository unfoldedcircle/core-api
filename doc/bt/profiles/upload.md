# Upload Custom Device Profiles

Custom profiles can be uploaded and managed with the existing `/resources` REST Core-API endpoints.

- New resource type: `BtDeviceProfile`
- Upload: `POST /api/resources/BtDeviceProfile`
    - The filename should be the value of the `id` field and will automatically be renamed.
    - Included profiles can be overwritten when using the same `id`.
- Retrieve custom profiles: `GET /api/resources/BtDeviceProfile?page=1&limit=100`
- Delete: `DELETE /api/resources/BtDeviceProfile/:resourceId`

See [REST Core-API](https://github.com/unfoldedcircle/core-api/tree/main/core-api/rest) for more information.

