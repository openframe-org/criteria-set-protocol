import { z } from 'zod';

export const pdfDocumentationItem = z.object({
  type: z.literal('pdf'),
  label: z.string(),
  url: z.string(),
  text: z.string()
});

export const inlineDocumentationItem = z.object({
  type: z.literal('text'),
  label: z.string(),
  text: z.string()
});

export const linkDocumentationItem = z.object({
  type: z.literal('link'),
  label: z.string(),
  url: z.string(),
  text: z.string()
});

export const documentationItemSchema = z.union([
  pdfDocumentationItem,
  inlineDocumentationItem,
  linkDocumentationItem
]);

export const taskItemScalarValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null()
]);

export const taskItemValueSchema = z.union([taskItemScalarValueSchema, z.array(taskItemScalarValueSchema)]);

export const taskItemValueMapSchema = z.record(z.string(), taskItemValueSchema);

export const pointOptionSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
  intro: z.string().optional(),
  outro: z.string().optional(),
  value: taskItemScalarValueSchema
});

export const selectSingleTypeSchema = z.object({
  type: z.literal('select-single'),
  options: z.array(pointOptionSchema)
});

export const selectMultipleTypeSchema = z.object({
  type: z.literal('select-multiple'),
  options: z.array(pointOptionSchema)
});

export const numberTypeSchema = z.object({
  type: z.literal('number'),
  minimum: z.number().optional(),
  maximum: z.number().optional(),
  step: z.number().optional()
});

export const booleanTypeSchema = z.object({
  type: z.literal('boolean'),
  labels: z.object({
    true: z.string().optional(),
    false: z.string().optional()
  }).optional()
});

export const taskItemDefinitionSchema = z.discriminatedUnion('type', [
  selectSingleTypeSchema,
  selectMultipleTypeSchema,
  numberTypeSchema,
  booleanTypeSchema
]);

export const taskItemSchema = z.object({
  type: z.literal('task-item'),
  code: z.string(),
  tags: z.array(z.string()).optional(),
  documentation: z.array(documentationItemSchema).optional(),
  data: z.record(z.string()).optional(),
  sortOrder: z.number().optional(),
  definition: taskItemDefinitionSchema,
  description: z.string().optional(),
  providedData: taskItemValueMapSchema.optional()
});
