import * as yup from 'yup';

/**
 * Validates the request body for the matrix endpoints
 */
export const matrixBodySchema = yup.object({
  body: yup.object({
    locale: yup.string().optional(),
    parameters: yup.object().optional(),
    values: yup.object().optional(),
    additional: yup.mixed().optional()
  }).optional()
});
