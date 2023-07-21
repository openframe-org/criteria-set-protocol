<img alt="Frame ApS" src="https://openframe-public.s3.eu-west-1.amazonaws.com/assets/logo-text-google-admin.png" width="200" />

# Frame Protocol
The Frame Protocol specifies the Criteria Template Format and the Criteria Template API for retrieving, formatting and working with Criteria Templates.

## Definitions
### Criteria Template Format
The Criteria Template Format has been designed to extensively use the latest draft of the [JSON Schema](https://json-schema.org/)
specification wherever possible (draft 2020-12 by the time of this writing). This allows for a very flexible and powerful way of
defining Criteria Templates which includes:
- Standard definitions
- Inheritance/abstraction
- Simple conditionals

### Criteria Template API
The Criteria Template API is a simple REST API for retrieving Criteria Templates. It is designed to be as simple as possible.

## Structure
The format of a Criteria Template is specified in the [template.json](template.json) file. The format is specified using the [JSON Schema](https://json-schema.org/).
A Criteria Template at its core is an object with the following properties:

### protocol
The [SEMVER](https://semver.org/)-formatted version of the protocol this Template was designed for.

### template
The template metadata, such as the version, name, description, etc.

#### Template versioning
The individual version elements are meant to have a bearing on the Template definition:
* **Patch version**: Intended to track strictly cosmetic changes to the Template, such as tweaks to label strings, names or descriptions (not data values, as this 
is not strictly cosmetic).
* **Minor version**: Intended to track changes to the Template which are backwards-compatible. Changes to the Template structure which for which older task
data is still considered valid based on the new structure are considered changes to the minor version.
* **Major version**:
Intended to track changes to the Template which are not backwards-compatible. Changes to the major version imply that older data will no longer
validate against the new Template structure.

### parameters (optional)
Individual JSON Schema definitions of the different parameters available

### tasks
The actual tasks which comprise the Template, containing some metadata plus the JSON Schema definition for their value/data type

### definitions (optional)
JSON Schema definitions to be used in the parameters/tasks in order to reduce duplication and complexity
