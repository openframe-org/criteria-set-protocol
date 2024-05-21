import { z } from 'zod';
import { Color, Quality, QualityStyle } from '../types';
import { documentationItemSchema } from './task-item';
import { criterionSchema } from './criterion';

export const colorSchema: z.Schema<Color> = z.union([
  z.string(),
  z.object({
    red: z.number(),
    green: z.number(),
    blue: z.number()
  })
]);

export const qualityStyleSchema: z.Schema<QualityStyle> = z.object({
  primaryColor: colorSchema,
  secondaryColor: colorSchema
});

export const qualitySchema: z.Schema<Quality> = z.object({
  type: z.literal('quality'),
  title: z.string(),
  code: z.string(),
  tags: z.array(z.string()).optional(),
  documentation: z.array(documentationItemSchema).optional(),
  data: z.record(z.any()).optional(),
  sortOrder: z.number().optional(),
  style: qualityStyleSchema.optional(),
  items: z.array(criterionSchema)
});
