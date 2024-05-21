import { z } from 'zod';

export const schemaDefinitionSchema = z.record(z.string(), z.any());

export const schemaDefinitionsSchema = z.object({
  parameters: schemaDefinitionSchema.optional(),
  result: schemaDefinitionSchema.optional()
});

export const metadataSchema = z.object({
  id: z.string(),
  version: z.string(),
  date: z.date(),
  name: z.string(),
  description: z.string(),
  documentation: z.string().optional(),
  locales: z.array(z.string()).optional(),
  defaultLocale: z.string().optional(),
  schemas: schemaDefinitionsSchema.optional()
});
