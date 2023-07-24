<img alt="Frame ApS" src="https://openframe-public.s3.eu-west-1.amazonaws.com/assets/logo-text-google-admin.png" width="200" />

# Frame Protocol

## Example schemas
### Taxonomies
EU Taxonomy regulation 2020/852: Guide 7.1, v2:
- [Sample Criteria Template Metadata schema](taxonomy/metadata.json)
- [Sample Criteria Template Task Tree schema](taxonomy/task-tree.json): With the following request body:
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

