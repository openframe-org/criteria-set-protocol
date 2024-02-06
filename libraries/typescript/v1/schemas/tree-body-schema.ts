import * as yup from 'yup';

/**
 * Validates the request body for the tree and data endpoints
 */
export const treeBodySchema = yup.object({
  body: yup.object({
    locale: yup.string().optional(),
    parameters: yup.object().optional(),
    values: yup.object().optional()
  }).optional()
});
