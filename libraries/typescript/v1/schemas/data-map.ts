import { z } from 'zod';

export const dataMapSchema = z.object({
  version: z.string(),
  elements: z.record(z.string(), z.any()),
  result: z.any(),
  certifications: z.array(z.string()).optional()
});
