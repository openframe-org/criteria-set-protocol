import * as yup from 'yup';

/**
 * Validates the request body for the download matrix endpoints
 */
export const downloadMatrixBodySchema = yup.object({
  body: yup.object({
    parameters: yup.object().required(),
    values: yup.object()
  })
});
