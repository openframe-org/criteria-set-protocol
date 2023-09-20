import * as yup from 'yup';

export const downloadMatrixBodySchema = yup.object({
  body: yup.object({
    parameters: yup.object().required(),
    values: yup.object()
  })
});
