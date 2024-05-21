import { z } from 'zod';
import { documentationItemSchema } from './task-item';
import { taskGroupSchema } from './task-group';

export const criterionSchema = z.object({
  type: z.literal('criterion'),
  title: z.string(),
  code: z.string(),
  tags: z.array(z.string()).optional(),
  documentation: z.array(documentationItemSchema).optional(),
  data: z.record(z.any()).optional(),
  sortOrder: z.number().optional(),
  items: z.array(taskGroupSchema)
});
