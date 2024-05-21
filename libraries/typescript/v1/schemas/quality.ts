import { z } from 'zod';
import { documentationItemSchema } from './task-item';
import { criterionSchema } from './criterion';

export const colorSchema = z.union([
  z.string(),
  z.object({
    red: z.number(),
    green: z.number(),
    blue: z.number()
  })
]);

export const qualityStyleSchema = z.object({
  primaryColor: colorSchema,
  secondaryColor: colorSchema
});

export const qualitySchema = z.object({
  type: z.literal('quality'),
  title: z.string(),
  code: z.string(),
  tags: z.array(z.string()).optional(),
  documentation: z.array(documentationItemSchema).optional(),
  data: z.record(z.string(), z.any()).optional(),
  sortOrder: z.number().optional(),
  style: qualityStyleSchema.optional(),
  items: z.array(criterionSchema)
});
