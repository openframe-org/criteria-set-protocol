import { z } from 'zod';
import { taskItemValueMapSchema } from '../task-item';

/**
 * Validates the request body for the tree and data endpoints
 */
export const treeAndDataBodySchema = z.object({
  locale: z.string().optional(),
  parameters: z.record(z.string(), z.any()).optional(),
  values: taskItemValueMapSchema.optional()
}).optional();
