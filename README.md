<img alt="Frame ApS" src="https://openframe-public.s3.eu-west-1.amazonaws.com/assets/logo-text-google-admin.png" width="200" />

# Frame Protocol

## Introduction
The Frame Protocol specifies the [Criteria Template Format](#criteria-template-format) and the [Criteria Template API](#criteria-template-api) 
for retrieving, formatting and working with Criteria Templates.

## Table of Contents
- [Criteria Template Format](#criteria-template-format)
  - [Criteria Template Metadata schema](#criteria-template-metadata-schema)
    - [protocol](#protocol)
    - [template](#template)
    - [parameters (optional)](#parameters-optional)
    - [result (optional)](#result-optional)
    - [definitions (optional)](#definitions-optional)
  - [Criteria Template Task Tree schema](#criteria-template-task-tree-schema)
    - [tasks](#tasks)
    - [errors](#errors)
    - [result](#result)
    - [definitions (optional)](#definitions-optional-1)
  - [Validation](#validation)
    - [parameter validation](#parameter-validation)
    - [task validation](#task-validation)
- [Criteria Template API](#criteria-template-api)

## Criteria Template Format
The Criteria Template Format has been designed to extensively use the latest draft of the [JSON Schema](https://json-schema.org/)
specification wherever possible (draft 2020-12 by the time of this writing). This allows for a very flexible and powerful way of
defining Criteria Templates which includes:
- A widely adopted, evolving standard
- Inheritance/abstraction
- Simple conditionals

The Criteria Template Format comprises two different schemas: The [Criteria Template Metadata schema](#criteria-template-metadata-schema)
and the [Criteria Template Task Tree schema](#criteria-template-task-tree-schema). The formats are specified using the
[JSON Schema](https://json-schema.org/).

### Criteria Template Metadata schema
The Criteria Template Metadata schema is specified in the [criteria-metadata.json](definitions/criteria-metadata.json) file.
At its core, this schema is an object with the following properties:

```json5
// Criteria Template Metadata schema
{
  "protocol": 1, // protocol version
  "template": {
    // template metadata
  },
  "parameters": {
    // optional parameters
  },
  "result": {
    // optional result definition
  },
  "definitions": {
    // optional additional definitions
  }
}
```

#### protocol
An integer representation of the version of the protocol this Template was designed for.

#### template
The template metadata:

```json5
// Example Template metadata
{
  "id": "61a01c88-0102-4332-96c6-6f60ba7a8763", // The UUID of this Template
  "version": "1.0.0", // The current SemVer-formatted version of this Template
  "date": "2023-07-19T14:49:01.737Z", // The date this version was published
  "name": "Taksonomiforordning 2020/852", // The name of the Template
  "description": "7.1 Opførelse af nye bygninger", // The description of this Template
  "documentation": "https://taksonomiportalen.dk/vejledning/opf%C3%B8relse-af-nye-bygninger-2020" // An optional URL with documentation
}
```

- **template.id**: The ID of the Template is a string which uniquely identifies the Template independently of the Template or Protocol version.

- **template.version**: The individual version elements are meant to have a bearing on the Template definition:
  * **Patch version**: Intended to track strictly cosmetic changes to the Template, such as tweaks to label strings, names or descriptions (not
  data values, as this is not strictly cosmetic).
  * **Minor version**: Intended to track changes to the Template which are backwards-compatible. Changes to the Template structure which for
  which older task data is still considered valid based on the new structure are considered changes to the minor version.
  * **Major version**: Intended to track changes to the Template which are not backwards-compatible. Changes to the major version imply that
  older data will no longer validate against the new Template structure.

- **template.date**: The date this Template was published at, formatted as a simplified ISO-8601 date string ([the same one used by Javascript's Date.toISOString()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)).

- **template.name, template.description**: The name and description of the Template, respectively.

- **template.documentation** (optional): A link to the documentation for this Template.

#### parameters (optional)
Individual JSON Schema definitions of the different parameters available.

```json5
// Example parameters
{
  "buildingUse": {
    "type": "string",
    "enum": [
      "Beboelse",
      "Kontor",
      "Andet"
    ]
  },
  "significantContribution": {
    "type": "string",
    "enum": [
      "Miljømål 1",
      "Miljømål 2"
    ]
  },
  "grossArea": {
    "type": "integer",
    "exclusiveMinimum": 0
  },
  "yearOfConstruction": {
    "type": "integer",
    "minimum": 1800,
    "maximum": 2023
  }
}
```

#### result (optional)
The result definition is an optional JSON Schema definition for any result that may be returned by the Template when validated data is passed to the task tree.
An example of this is the DGNB 2023 template - a final score is calculated based on the value of all the task items. In this case, the result definition
would be:

```json5
// Example result definition for DGNB 2023, which calculates an overall score
{
  "type": "integer",
  "minimum": 0,
  "maximum": 100
}
```

#### definitions (optional)
A space to add additional JSON Schema definitions ([$defs](https://json-schema.org/understanding-json-schema/structuring.html#defs)) to be used
in the parameters and result in order to reduce duplication and complexity.

For an example, see the definitions property in the [Criteria Template Task Tree schema](#criteria-template-task-tree-schema) below.

### Criteria Template Task Tree schema
The Criteria Template Task Tree schema is specified in the [task-tree.json](definitions/task-tree.json) file. The service that requests the
task tree must have prior information about the parameters available and required - if parameters are required, the tree is assembled based
on the value of these parameters.

Values for the task items may also be passed alongside the parameters, these values can be used to fill in calculated data in tasks and groups,
though these values must have no bearing in the final structure of the tree.

```json5
// Criteria Template Task Tree schema
{
  "tasks": {
    // task tree
  },
  "errors": [
    // optional errors
  ],
  "result": {
    // optional result formatted according to the Metadata result definition
  },
  "definitions": {
    // optional additional definitions
  }
}
```
#### tasks
The actual tasks which comprise the Template. The tasks list is a tree structure where each item can be either a task or a task group.

- **task group**: A task group can hold tasks and more task groups within it.

```json5
// Example task group
{
  "id": "SOC",
  "text": "Sociale minimumsgarantier",
  "children": [
    // tasks and task groups
  ]
}
```

- **task**: A task represents a single task in the Template. A task is an object with the following properties:

```json5
// Example task
{
  "id": "1",
  "text": "Due Diligence proces",
  "description": "OECD´s retningslinjer for multinationale virksomheder ...",
  "definition": {
    "$ref": "#/$defs/yesNoNotRelevantQuestion"
  }
}
```

In this example task, the definition is a reference to a definition called *yesNoNotRelevantQuestion* in the `definitions` object.
This is a very powerful feature of JSON Schema, which allows for reusing definitions across multiple tasks.

- **task.id, taskGroup.id**: The task and task group IDs are strings which uniquely identify the task or task group **among their siblings**.
  A task and task group can, for example, both have an ID of `1`, as their unique ID is the combination of their ID and the ID of their parents,
  that is to say, **the unique ID of a task or task group is its path within the tree structure**.

#### errors
See [validation](#validation) below.


#### result
If there is no result definition in the Metadata, the `result` property **must not** be present.
If there is a result definition in the Metadata, either the `result` property **must** be present,
or the `errors` property **must** have at least a single error.

The result property is a property which is formatted according to the Metadata result definition.

#### definitions (optional)
A space to add additional JSON Schema definitions ([$defs](https://json-schema.org/understanding-json-schema/structuring.html#defs)) to be used
in the parameters and result in order to reduce duplication and complexity.

```json5
// Example definitions object
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$defs": {
    "yesNoNotRelevantQuestion": {
      "$id": "/yesNoNotRelevantQuestion",
      "oneOf": [
        {
          "$ref": "/data/point-option",
          "label": {
            "const": "Ja"
          },
          "value": {
            "const": 1
          }
        },
        {
          "$ref": "/data/point-option",
          "label": {
            "const": "Nej"
          },
          "value": {
            "const": 0
          }
        },
        {
          "$ref": "/data/point-option",
          "label": {
            "const": "Ikke relevant"
          },
          "value": {
            "const": null
          }
        }
      ]
    }
  }
}
```

The above uses a standard `point-option` data type defined in the [Frame Data Types](definitions/data.json) specification.

### Validation
There are two types of validation that can be performed on a task tree: **parameter validation** and **task validation**.
Either of these result in the **errors** property being present in the response. The following is an example of an error:

```json5
{
  "path": "SOC2.1.2.1", // The path to the task or task group which has the error
  "code": "value-is-too-high", // A string error code which can be used to localize the error message
  "arguments": { // An optional object with arguments to be used when localizing the error message
    "value": 100,
    "max": 50
  }
}
```

It is up to the service which implements the Criteria Template API to provide its own error codes and documentation
for these error codes.

The **errors** property must never be empty, that is to say, either it has one or more items, or it should be excluded from the
response entirely.

#### Parameter validation
If there is an error in the parameters, the `errors` property **must** be present and **must** be the
only property returned.

#### Task validation
If there is an error in the task values, the `errors` property **must** be present, though the rest of the
task tree must be returned as well.

---

### Criteria Template API
The Criteria Template API is a simple JSON-formatted REST API for retrieving Criteria Template Metadata
and Task Trees.

The Swagger/OpenAPI specification for the API can be found in the [api.swagger.yml](api.swagger.yml) file.

`GET` endpoints are used to retrieve the [Metadata](#criteria-template-metadata-schema) of a given Criteria Template.
They require the following headers:

```
Accept: application/json
```

`POST` endpoints are used to retrieve the [Task Tree](#criteria-template-task-tree-schema) of a given Criteria Template.
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
