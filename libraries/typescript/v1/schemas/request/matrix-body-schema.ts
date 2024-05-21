import { z } from 'zod';
import { taskItemValueMapSchema } from '../task-item';

/**
 * Validates the request body for the matrix endpoints
 */
export const matrixBodySchema = z.object({
  locale: z.string().optional(),
  parameters: z.record(z.string(), z.any()).optional(),
  values: taskItemValueMapSchema.optional(),
  additional: z.any().optional()
}).optional();
