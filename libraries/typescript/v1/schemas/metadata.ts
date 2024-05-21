import { z } from 'zod';

export const schemaDefinition = z.record(z.string(), z.any());

export const schemaDefinitions = z.object({
  parameters: schemaDefinition.optional(),
  result: schemaDefinition.optional()
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
  schemas: schemaDefinitions.optional()
});
