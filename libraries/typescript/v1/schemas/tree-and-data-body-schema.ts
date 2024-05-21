import { z } from 'zod';
import { TreeAndDataRequestBody } from '../types';
import { taskItemValueMapSchema } from './task-item';

/**
 * Validates the request body for the tree and data endpoints
 */
export const treeAndDataBodySchema: z.Schema<TreeAndDataRequestBody | undefined> = z.object({
  locale: z.string().optional(),
  parameters: z.record(z.string()).optional(),
  values: taskItemValueMapSchema.optional()
}).optional();
