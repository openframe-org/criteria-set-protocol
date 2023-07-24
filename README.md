<img alt="Frame ApS" src="https://openframe-public.s3.eu-west-1.amazonaws.com/assets/logo-text-google-admin.png" width="200" />

# Frame Protocol
The Frame Protocol specifies the Criteria Template Format and the Criteria Template API for retrieving, formatting and working with Criteria Templates.

## Definitions
### Criteria Template Format
The Criteria Template Format has been designed to extensively use the latest draft of the [JSON Schema](https://json-schema.org/)
specification wherever possible (draft 2020-12 by the time of this writing). This allows for a very flexible and powerful way of
defining Criteria Templates which includes:
- A widely adopted, evolving standard
- Inheritance/abstraction
- Simple conditionals

### Criteria Template API
The Criteria Template API is a simple REST API for retrieving Criteria Templates. It is designed to be as simple as possible.

## Structure
The format of a Criteria Template is specified in the [template.json](template.json) file. The format is specified using
the [JSON Schema](https://json-schema.org/). A Criteria Template at its core is an object with the following properties:

```json5
// Criteria Template Format
{
  "protocol": "1.0.0", // protocol version
  "template": {
    // template metadata
  },
  "parameters": {
    // optional parameters
  },
  "tasks": [
    // the task tree
  ],
  "definitions": {
    // optional additional definitions
  }
}
```

### protocol
The [SemVer](https://semver.org/)-formatted version of the protocol this Template was designed for.

### template
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

#### documentation (optional)
A link to the documentation for this Template.

### parameters (optional)
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
    "exclusiveMinimum": 1800,
    "exclusiveMaximum": 2023
  }
}
```

### tasks
The actual tasks which comprise the Template. The tasks list is a tree structure where each item can be either a task or a task group.

#### task
A task group can hold tasks and more task groups within it.

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

#### task
A task represents a single task in the Template. A task is an object with the following properties:

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

### definitions (optional)
A space to add additional JSON Schema definitions ([$defs](https://json-schema.org/understanding-json-schema/structuring.html#defs)) to be used
in the parameters/tasks in order to reduce duplication and complexity. For the example above, here is a definitions object:

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
