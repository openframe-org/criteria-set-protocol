import { z } from 'zod';
import { documentationItemSchema } from './task-item';
import { taskSchema } from './task';

export const taskGroupSchema = z.object({
  type: z.literal('task-group'),
  title: z.string(),
  code: z.string(),
  tags: z.array(z.string()).optional(),
  documentation: z.array(documentationItemSchema).optional(),
  data: z.record(z.any()).optional(),
  sortOrder: z.number().optional(),
  category: z.string().optional(),
  items: z.array(taskSchema)
});
