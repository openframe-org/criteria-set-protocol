import { z } from 'zod';
import { documentationItemSchema, taskItemSchema } from './task-item';

export const taskSchema = z.object({
  type: z.literal('task'),
  title: z.string(),
  code: z.string(),
  tags: z.array(z.string()).optional(),
  documentation: z.array(documentationItemSchema).optional(),
  data: z.record(z.string(), z.any()).optional(),
  sortOrder: z.number().optional(),
  description: z.string().optional(),
  items: z.array(taskItemSchema)
});
