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
  },
  "additional": {
    // optional additional information
  }
}
```

- The `locale` property is a string with the specific localization required of the criteria set. It is only valid if the criteria set has a `locales` property.
- The `parameters` property is a map of the parameter names to the parameter values. It is required if the criteria set has a `parameters` property.
- The `values` property is a map of task item IDs to their values.
- The `additional` property is any additional information which is passed to the criteria set. This can be anything that does not affect the overall scores.

Each of these properties may be excluded if they are empty or not needed. If no properties are present, the request body may be excluded altogether.

Here is a list of the available endpoints:

| Method | Endpoint                                       | Description                                                                                                             |
|--------|------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `GET`  | `/{protocol}/versions`                         | Returns a map of available criteria set IDs where the values are arrays of metadata representing the available versions |
| `GET`  | `/{protocol}/{criteriaSetId}/versions`         | Returns a list of metadata representing the available versions for the criteria set with the given ID                   |
| `GET`  | `/{protocol}/{criteriaSetId}`                  | Returns the latest version of the metadata for the criteria set with the given ID                                       |
| `GET`  | `/{protocol}/{criteriaSetId}/{version}`        | Returns a specific version of the metadata for the criteria set with the given ID                                       |
| `POST` | `/{protocol}/{criteriaSetId}/tree`             | Returns the latest version of the criteria tree for the criteria set with the given ID                                  |
| `POST` | `/{protocol}/{criteriaSetId}/tree/{version}`   | Returns the specific version of the criteria tree for the criteria set with the given ID                                |
| `POST` | `/{protocol}/{criteriaSetId}/data`             | Returns per-element data for the criteria set with the given ID                                                         |
| `POST` | `/{protocol}/{criteriaSetId}/data/{version}`   | Returns per-element data for the specific version of the criteria tree with the given ID                                |
| `POST` | `/{protocol}/{criteriaSetId}/matrix`           | Streams the latest version of the criteria tree matrix for the criteria set with the given ID                           |
| `POST` | `/{protocol}/{criteriaSetId}/matrix/{version}` | Streams the specific version of the criteria tree matrix for the criteria set with the given ID                         |

The `{protocol}` parameter is the version of the protocol to use. The `{criteriaSetId}` parameter is the ID of the criteria set to retrieve.
