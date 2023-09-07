<img alt="Frame ApS" src="https://openframe-public.s3.eu-west-1.amazonaws.com/assets/logo-text-google-admin.png" width="200" />

# Criteria Set Protocol

## Criteria Set API
The Criteria Set API is a simple JSON-formatted REST API for retrieving criteria set metadata, trees and documents.

The Swagger/OpenAPI specification for the API can be found in the [api.swagger.yml](api.swagger.yml) file.

`GET` endpoints are used to retrieve the [metadata](../schemas/README.md#metadata-schema) of criteria sets.

`POST` endpoints are used to retrieve the [criteria tree](../schemas/README.md#criteria-tree-schema) of a given criteria set, as well
as to retrieve filled-out criteria set documents. For both of these operations, the request body looks like this:
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

| Method | Endpoint                                           | Description                                                                                                             |
|--------|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `GET`  | `/{protocol}/versions`                             | Returns a map of available criteria set IDs where the values are arrays of metadata representing the available versions |
| `GET`  | `/{protocol}/{criteriaSetUuid}/versions`           | Returns a list of metadata representing the available versions for the criteria set with the given UUID                 |
| `GET`  | `/{protocol}/{criteriaSetUuid}`                    | Returns the latest version of the metadata for the criteria set with the given UUID                                     |
| `GET`  | `/{protocol}/{criteriaSetUuid}/{version}`          | Returns a specific version of the metadata for the criteria set with the given UUID                                     |
| `POST` | `/{protocol}/{criteriaSetUuid}/tree`               | Returns the latest version of the criteria tree for the criteria set with the given UUID                                |
| `POST` | `/{protocol}/{criteriaSetUuid}/tree/{version}`     | Returns the specific version of the criteria tree for the criteria set with the given UUID                              |
| `POST` | `/{protocol}/{criteriaSetUuid}/download`           | Downloads the latest version of the criteria tree document for the criteria set with the given UUID                     |
| `POST` | `/{protocol}/{criteriaSetUuid}/download/{version}` | Downloads the specific version of the criteria tree document for the criteria set with the given UUID                   |

The `{protocol}` parameter is the version of the protocol to use. The `{criteriaSetUuid}` parameter is the ID of the criteria set to retrieve.
