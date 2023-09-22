import * as yup from 'yup';

/**
 * Validates the request body for the tree and matrix endpoints
 */
export const treeAndMatrixBodySchema = yup.object({
  body: yup.object({
    locale: yup.string(),
    parameters: yup.object(),
    values: yup.object()
  })
});
