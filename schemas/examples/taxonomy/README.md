<img alt="Frame ApS" src="https://openframe-public.s3.eu-west-1.amazonaws.com/assets/logo-text-google-admin.png" width="200" />

# Criteria Set Protocol

## Examples
### Taxonomies
The following example is for EU Taxonomy regulation 2020/852: Guide 7.7, v2. It shows how ternary values can be represented
in our schema, and how the task tree is retrieved for a template which has parameters.

A request is made to retrieve the metadata:
```
GET /1/7.7/2.0.0
```

Which results in [this metadata schema](metadata.json).

The user then makes a request to retrieve the task tree providing the following parameters:

```
POST /1/7.7/tree/2.0.0
```
```json5
{
  "parameters": {
    "grossArea": "< 5000 m2",
    "buildingUse": "Bolig",
    "buildingPermitYear": "Før 2021",
    "nominalUtilityEffect": "< 290 kW",
    "significantContribution": "Miljømål 1"
  },
  "values": {
    "830076b3-91ad-6a03-546f-fee0ab49188f": true
  }
}
```

The resulting response is [this criteria tree schema](criteria-tree.json).
