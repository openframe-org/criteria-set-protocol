import { z } from 'zod';
import {
  BooleanType,
  DocumentationItem,
  InlineDocumentationItem,
  LinkDocumentationItem,
  NumberType,
  PdfDocumentationItem,
  PointOption,
  SelectMultipleType,
  SelectSingleType,
  TaskItem,
  TaskItemDefinition,
  TaskItemValueMap
} from '../types';

export const pdfDocumentationItem: z.Schema<PdfDocumentationItem> = z.object({
  type: z.literal('pdf'),
  label: z.string(),
  url: z.string(),
  text: z.string()
});

export const inlineDocumentationItem: z.Schema<InlineDocumentationItem> = z.object({
  type: z.literal('text'),
  label: z.string(),
  text: z.string()
});

export const linkDocumentationItem: z.Schema<LinkDocumentationItem> = z.object({
  type: z.literal('link'),
  label: z.string(),
  url: z.string(),
  text: z.string()
});

export const documentationItemSchema: z.Schema<DocumentationItem> = z.union([
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

export const taskItemValueMapSchema: z.Schema<TaskItemValueMap> = z.record(z.string(), taskItemValueSchema);

export const pointOptionSchema: z.Schema<PointOption> = z.object({
  id: z.string().optional(),
  text: z.string(),
  intro: z.string().optional(),
  outro: z.string().optional(),
  value: taskItemScalarValueSchema
});

export const selectSingleTypeSchema: z.Schema<SelectSingleType> = z.object({
  type: z.literal('select-single'),
  options: z.array(pointOptionSchema)
});

export const selectMultipleTypeSchema: z.Schema<SelectMultipleType> = z.object({
  type: z.literal('select-multiple'),
  options: z.array(pointOptionSchema)
});

export const numberTypeSchema: z.Schema<NumberType> = z.object({
  type: z.literal('number'),
  minimum: z.number().optional(),
  maximum: z.number().optional(),
  step: z.number().optional()
});

export const booleanTypeSchema: z.Schema<BooleanType> = z.object({
  type: z.literal('boolean'),
  labels: z.object({
    true: z.string().optional(),
    false: z.string().optional()
  }).optional()
});

export const taskItemDefinitionSchema: z.Schema<TaskItemDefinition> = z.union([
  selectSingleTypeSchema,
  selectMultipleTypeSchema
]);

export const taskItemSchema: z.Schema<TaskItem> = z.object({
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
