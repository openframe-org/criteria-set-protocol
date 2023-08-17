<img alt="Frame ApS" src="https://openframe-public.s3.eu-west-1.amazonaws.com/assets/logo-text-google-admin.png" width="200" />

# Criteria Tree Protocol

## Criteria Tree API
The Criteria Tree API is a simple JSON-formatted REST API for retrieving criteria set metadata and trees.

The Swagger/OpenAPI specification for the API can be found in the [api.swagger.yml](api.swagger.yml) file.

`GET` endpoints are used to retrieve the [metadata](../schemas/README.md#metadata-schema) of a given criteria set.
They require the following headers:

```
Accept: application/json
```

`POST` endpoints are used to retrieve the [criteria tree](../schemas/README.md#criteria-tree-schema) of a given criteria set.
They require the following headers and request body:

```
Accept: application/json
Content-Type: application/json
```
```json5
{
  "locale": "<locale>", // optional locale if the metadata had a locales property 
  "parameters": {
    // optional parameter values if the metadata had a parameters property
  },
  "values": {
    // optional task item value map
  }
}
```

- The `locale` property is a string with the specific localization required of the criteria set. It is only valid if the criteria set has a `locales` property.
- The `parameters` property is a map of the parameter names to the parameter values. It is required if the criteria set has a `parameters` property.
- The `values` property is a map of task item IDs to their values.

Each of these properties may be excluded if they are empty or not needed. If no properties are present, the request body may be excluded altogether.

Here is a list of the available endpoints:

| Method | Endpoint                                  | Description                                                                              |
|--------|-------------------------------------------|------------------------------------------------------------------------------------------|
| `GET`  | `/{protocol}/{criteriaSetUuid}/versions`  | Returns a list of available versions for the criteria set with the given ID              |
| `GET`  | `/{protocol}/{criteriaSetUuid}`           | Returns the latest version of the metadata for the criteria set with the given ID        |
| `GET`  | `/{protocol}/{criteriaSetUuid}/{version}` | Returns a specific version of the metadata for the criteria set with the given ID        |
| `POST` | `/{protocol}/{criteriaSetUuid}`           | Returns the latest version of the criteria tree for the criteria set with the given ID   |
| `POST` | `/{protocol}/{criteriaSetUuid}/{version}` | Returns the specific version of the criteria tree for the criteria set with the given ID |

The `{protocol}` parameter is the version of the protocol to use. The `{criteriaSetUuid}` parameter is the ID of the criteria set to retrieve.
