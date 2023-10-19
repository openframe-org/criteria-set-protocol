<img alt="Frame ApS" src="https://openframe-public.s3.eu-west-1.amazonaws.com/assets/logo-text-google-admin.png" width="200" />

# Criteria Set Protocol

## TypeScript library
This is a TypeScript library with types and implementations of the Criteria Set Protocol. It is published
publicly on [npmjs](https://www.npmjs.com/package/@openframe-org/criteria-set-protocol) as `@openframe-org/criteria-set-protocol`.

### Installation
```bash
npm install --save @openframe-org/criteria-set-protocol
```

### Contents
The library contains a service to work with protocol versions, and an interface to interact with this service.

#### Protocol v1
The library contains the types defined in the protocol v1 specification, and a service that implements this specification.

##### Types
| Type                          | Remarks                                             |
|-------------------------------|-----------------------------------------------------|
| **Metadata types**            |                                                     |
| `Metadata`                    |                                                     |
| **Task tree types**           |                                                     |
| `CriteriaTree`                |                                                     |
| `Criterion`                   |                                                     |
| `TaskGroup`                   |                                                     |
| `Task`                        |                                                     |
| `TaskItem`                    |                                                     |
| **TaskItem value types**      |                                                     |
| `SelectSingleType`            |                                                     |
| `SelectMultipleType`          |                                                     |
| `NumberType`                  |                                                     |
| `BooleanType`                 |                                                     |
| `PointOption`                 | Used by `SelectSingleType` and `SelectMultipleType` |
| `TaskItemValue`               | The raw value of a TaskItem, which can be an array  |
| `TaskItemScalarValue`         | The raw value of a TaskItem                         |
| **Express types**             |                                                     |
| `MetadataResponse`            | Metadata endpoint response body                     |
| `StreamCriteriaSetMatrixBody` | Request body for the matrix streaming endpoints     |
| `StreamMatrixResponse`        | Matrix streaming endpoints response body            |

##### Schemas
Validation schemas are provided for validating the endpoints of the protocol v1 specification.

| Schema                     | Remarks                                                          |
|----------------------------|------------------------------------------------------------------|
| `criteriaSetIdParamSchema` | Validates the criteriaSetId parameter for endpoints which use it |
| `versionParamSchema`       | Validates the version parameter for endpoints which use it       |
| `downloadMatrixBody`       | Validates the request body for the download matrix endpoints     |

##### Services
The `IProtocolV1Service` interface defines a service which implements the v1 protocol. 


## License
<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Frame-ApS/criteria-set-protocol">Openframe Criteria Set Protocol</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/andresangulo">Openframe ApS</a> is licensed under <a href="http://creativecommons.org/licenses/by-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-ND 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1"></a></p>
