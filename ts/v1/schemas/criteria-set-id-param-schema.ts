import * as yup from 'yup';

export const criteriaSetIdParamSchema = yup.object({
  params: yup.object({
    criteriaSetId: yup.string()
      .matches(/^[a-zA-Z0-9.-_]+$/, 'Criteria set ID must contain only full stops, alphanumeric characters, dashes and underscores')
      .required()
  })
});
