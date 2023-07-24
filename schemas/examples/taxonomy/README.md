<img alt="Frame ApS" src="https://openframe-public.s3.eu-west-1.amazonaws.com/assets/logo-text-google-admin.png" width="200" />

# Frame Protocol

## Examples
### Taxonomies
The following example is for EU Taxonomy regulation 2020/852: Guide 7.1, v2. It shows how ternary values can be represented
in our schema, and how the task tree is retrieved for a template which has parameters.

A request is made to retrieve the metadata:
```
GET /1/templates/61a01c88-0102-4332-96c6-6f60ba7a8763
```

Which results in [this Criteria Template Metadata schema](metadata.json).

The user then makes a request to retrieve the task tree providing the following parameters:

```
POST /1/templates/61a01c88-0102-4332-96c6-6f60ba7a8763
```
```json5
{
  "parameters": {
    "buildingUse": "Kontor",
    "significantContribution": "Miljømål 1",
    "grossArea": 5500,
    "yearOfConstruction": 2019
  }
}
```

The resulting response is [this Criteria Template Task Tree schema](task-tree.json).
