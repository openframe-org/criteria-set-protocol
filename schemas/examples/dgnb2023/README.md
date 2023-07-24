<img alt="Frame ApS" src="https://openframe-public.s3.eu-west-1.amazonaws.com/assets/logo-text-google-admin.png" width="200" />

# Frame Protocol

## Examples
### Taxonomies
The following example is for the NKB/PRO1.1 criteria of DGNB 2023. It is intended to show the following represented
in our schema:
- Point data
- Spreadsheet-calculated global results
- Spreadsheet-calculated per-task group results

A request is made to retrieve the metadata:
```
GET /1/templates/b018ed4a-4fb9-4bc8-989e-5f003cbf5d45
```

Which results in [this Criteria Template Metadata schema](metadata.json).

The user then makes a request to retrieve the task tree providing the following parameters:

```
POST /1/templates/b018ed4a-4fb9-4bc8-989e-5f003cbf5d45
```
```json5
{
  "values": {
    "PRO1.1.1.1.1": 20,
    "PRO1.1.2.1.1": 15,
    "PRO1.1.4.1.1": 5
  }
}
```

The resulting response is [this Criteria Template Task Tree schema](task-tree.json). It represents
the fraction of the spreadsheet (sheet NKB) that the example pertains to:

![Fraction of the document the example pertains to](fraction-screenshot.png)

Note the `result` property which contains all the calculated values on the top part of the spreadsheet
(in orange), and the `calculatedValue` property of task group `PRO1.1` which was calculated by the sheet
and passed alongside the data.
