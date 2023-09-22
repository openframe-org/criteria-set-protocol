import * as yup from 'yup';

/**
 * Validates the request body for the tree and matrix endpoints
 */
export const treeAndMatrixBodySchema = yup.object({
  body: yup.object({
    locale: yup.string(),
    parameters: yup.object().required(),
    values: yup.object()
  })
});
