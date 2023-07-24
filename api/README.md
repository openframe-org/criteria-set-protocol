<img alt="Frame ApS" src="https://openframe-public.s3.eu-west-1.amazonaws.com/assets/logo-text-google-admin.png" width="200" />

# Frame Protocol

## Criteria Template API
The Criteria Template API is a simple JSON-formatted REST API for retrieving Criteria Template Metadata
and Task Trees.

The Swagger/OpenAPI specification for the API can be found in the [api.swagger.yml](api.swagger.yml) file.

`GET` endpoints are used to retrieve the [Metadata](../schemas/README.md#criteria-template-metadata-schema) of a given Criteria Template.
They require the following headers:

```
Accept: application/json
```

`POST` endpoints are used to retrieve the [Task Tree](../schemas/README.md#criteria-template-task-tree-schema) of a given Criteria Template.
They require the following headers and request body:

```
Accept: application/json
Content-Type: application/json
```
```json5
{
  "parameters": {
    // optional parameter values
  },
  "values": {
    // optional task values
  }
}
```

- The `parameters` property is an object with the parameter values. The keys of the object are the parameter names, and the values are the actual values.
- The `values` property is an object with the task values. The keys of the object are the full task paths, and the values are the actual values. 

Either of these properties may be excluded if they are empty or not needed. If neither of these is present, the request body may be excluded altogether.

Here is a list of the available endpoints:

| Method | Endpoint                                       | Description                                                                               |
|--------|------------------------------------------------|-------------------------------------------------------------------------------------------|
| `GET`  | `/{protocol}/templates/{templateId}`           | Returns the latest version of the Metadata for the Criteria Template with the given ID    |
| `GET`  | `/{protocol}/templates/{templateId}/{version}` | Returns a specific version of the Metadata for the Criteria Template with the given ID    |
| `POST` | `/{protocol}/templates/{templateId}`           | Returns the latest version of the Task Tree for the Criteria Template with the given ID   |
| `POST` | `/{protocol}/templates/{templateId}/{version}` | Returns the specific version of the Task Tree for the Criteria Template with the given ID |

The `{protocol}` parameter is the version of the protocol to use. The `{templateId}` parameter is the ID of the Criteria Template to retrieve.
