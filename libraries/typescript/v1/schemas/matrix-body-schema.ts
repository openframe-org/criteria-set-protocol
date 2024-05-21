import { z } from 'zod';
import { MatrixRequestBody } from '../types';
import { taskItemValueMapSchema } from './task-item';

/**
 * Validates the request body for the matrix endpoints
 */
export const matrixBodySchema: z.Schema<MatrixRequestBody | undefined> = z.object({
  locale: z.string().optional(),
  parameters: z.record(z.string()).optional(),
  values: taskItemValueMapSchema.optional(),
  additional: z.any().optional()
}).optional();
