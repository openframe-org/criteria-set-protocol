import { z } from 'zod';
import { taskItemValueMapSchema } from '../task-item';

/**
 * Validates the request body for the matrix endpoints
 */
export const matrixBodySchema = z.object({
  locale: z.string().optional(),
  parameters: z.record(z.string()).optional(),
  values: taskItemValueMapSchema.optional(),
  additional: z.any().optional()
}).optional();
