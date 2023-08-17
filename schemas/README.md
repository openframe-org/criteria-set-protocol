<img alt="Frame ApS" src="https://openframe-public.s3.eu-west-1.amazonaws.com/assets/logo-text-google-admin.png" width="200" />

# Criteria Set Protocol

## Criteria Set Format
The Criteria Set Format has been designed to be able to support the widest variety of criteria sets. The schema structure is
meant to be as simple as possible by design - this is because the criteria service is must be the only source of truth, as
criteria sets in general are often not very transparent and validation happens behind the scenes.

The Criteria Set Format comprises a set of different schemas: The [metadata schema](#metadata-schema)
and the [criteria tree schema](#criteria-tree-schema). These schemas are described using
[JSON Schema draft 2020-12](https://json-schema.org/).

## Table of Contents
- Definitions
  - [Metadata schema](#metadata-schema)
    - [protocol](#protocol)
    - [metadata](#metadata)
    - [locales (optional)](#locales-optional)
    - [parameters (optional)](#parameters-optional)
    - [result (optional)](#result-optional)
    - [definitions (optional)](#definitions-optional)
  - [Criteria tree schema](#criteria-tree-schema)
    - [criteria](#criteria)
    - [errors](#errors)
    - [result](#result)
  - [Validation](#validation)
    - [parameter validation](#parameter-validation)
    - [tree validation](#tree-validation)
- [Examples](examples/README.md)
  - [EU Taxonomy regulation 2020/852: Guide 7.1, v2](examples/taxonomy/README.md)
  - [DGNB 2023](examples/dgnb2023/README.md)

## Metadata schema
The metadata schema is specified in the [metadata.json](definitions/metadata.json) file.
It is an object with the following properties:

```json5
// Metadata schema
{
  "protocol": 1, // protocol version
  "metadata": {
    // tree metadata
  },
  "locales": [
    // available locales
  ],
  "defaultLocale": "en", // default locale must be in locales list
  "parameters": {
    // optional parameters
  },
  "result": {
    // optional result schema
  },
  "definitions": {
    // optional additional definitions
  }
}
```

### protocol
An integer representation of the version of the protocol this template was designed for.

### metadata
The tree metadata:

```json5
// Example tree metadata
{
  "id": "61a01c88-0102-4332-96c6-6f60ba7a8763", // The UUID of this Template
  "version": "1.0.0", // The current SemVer-formatted version of this Template
  "date": "2023-07-19T14:49:01.737Z", // The date this version was published
  "name": "Taksonomiforordning 2020/852", // The name of the Template
  "description": "7.1 Opførelse af nye bygninger", // The description of this Template
  "documentation": "https://taksonomiportalen.dk/vejledning/opf%C3%B8relse-af-nye-bygninger-2020" // An optional URL with documentation
}
```

- **metadata.id**: The ID of the tree is a string which uniquely identifies the tree independently of the tree or protocol version.

- **metadata.version**: The individual version elements are meant to have a bearing on the tree definition:
  * **Patch version**: Intended to track strictly cosmetic changes to the tree, such as tweaks to label strings, names or descriptions (not
  data values, as this is not strictly cosmetic).
  * **Minor version**: Intended to track changes to the tree which are backwards-compatible. Changes to the tree structure which for
  which older task data is still considered valid based on the new structure are considered changes to the minor version.
  * **Major version**: Intended to track changes to the tree which are not backwards-compatible. Changes to the major version imply that
  older data will no longer validate against the new tree structure.

- **metadata.date**: The date this template was published at, formatted as a [simplified ISO-8601 date string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).

- **metadata.name, metadata.description**: The name and description of the tree, respectively.

- **metadata.documentation** (optional): A link to the documentation for this tree.

### locales (optional)
An array of strings, where each string represents an available locale to receive the data in. If the locales property is present,
a `defaultLocale` **must** be provided.

### parameters (optional)
An object where each property is an individual JSON Schema definition for a specific available parameter.

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

### result (optional)
The result definition is an optional JSON Schema definition for any result that may be returned by the tree when validated data is provided.
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

### definitions (optional)
A space to add additional JSON Schema definitions ([$defs](https://json-schema.org/understanding-json-schema/structuring.html#defs)) to be used
in the parameters and result in order to reduce duplication and complexity.

## Criteria tree schema
The criteria tree schema is specified in the [criteria-tree.json](definitions/criteria-tree.json) file. The service that requests the
criteria tree must have prior information about the parameters available and required - if parameters are required, the tree is assembled based
on the value of these parameters.

Values for the task items may also be passed alongside the parameters, these values can be used to fill in calculated data in tasks and groups,
and may also affect the final structure of the tree.

```json5
// Criteria tree schema
{
  "criteria": {
    // criteria tree
  },
  "errors": [
    // optional errors
  ],
  "result": {
    // optional result formatted according to the metadata result definition
  }
}
```
### criteria
The actual criteria which comprise the tree. The criteria list is a tree structured as follows:

- **criteria**: Criteria are the top-level items in the tree. A criterion can hold task groups and tasks and be grouped in a quality. It can have read-only data.
- **task group**: A task group can hold tasks and more task groups within it. It can have read-only data.
- **task**: A task group can hold task items within it. It can have read-only data.
- **task item**: A task item is the leaf, it has no children. It can have editable data as well as read-only data.

```
Criteria
    +-- Task group
             +-- Task
                  +-- Task item
                  +-- Task item
                  +-- ...
             +-- Task
                  +-- ...
             +-- ...
    +-- Task group
             +-- ...
    +-- Task
         +-- ...
Criteria
    +-- ...
...
```

- **criteria.id**, **taskGroup.id**, **task.id**, **taskItem.id**: The ID properties are UUID strings which uniquely identify
the different elements. These are used to track elements across versions.

### errors
See [validation](#validation) below.

### result
If there is no result schema in the metadata, the `result` property **must not** be present.

The result property is a property which is formatted according to the metadata schema definition.

## Validation
There are two types of validation that can be performed on a task tree: **parameter validation** and **task validation**.
Either of these result in the **errors** property being present in the response. The following is an example of an error:

```json5
{
  "id": "f8ad4dfe-4319-4823-862e-67ed58df3689", // The id of the element that has the error
  "code": "value-is-too-high", // A string error code which can be used to localize the error message
  "arguments": { // An optional object with arguments to be used when localizing the error message
    "value": 100,
    "max": 50
  }
}
```

It is up to the service which implements the Criteria Set API to provide its own error codes and documentation
for these error codes.

The **errors** property must never be empty, that is to say, either it has one or more items, or it should be excluded from the
response entirely.

### Parameter validation
If there is an error in the parameters, the `errors` property **must** be present and **must** be the
only property returned.

### Tree validation
If there is an error in the task values, the `errors` property **must** be present, though the rest of the
task tree must be returned as well.
