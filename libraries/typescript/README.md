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
| `TaskItemValue`               | The raw value of a TaskItem                         |
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
