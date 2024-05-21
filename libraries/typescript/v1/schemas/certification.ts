import { z } from 'zod';

export const certificationDefinitionTypeSchema = z.union([z.literal('number'), z.literal('percentage')]);

export const numberBasedCertificationDefinitionRulesSchema = z.object({
  minimum: z.number().optional(),
  exclusiveMinimum: z.number().optional(),
  maximum: z.number().optional(),
  exclusiveMaximum: z.number().optional()
});

export const percentageBasedCertificationDefinitionRulesSchema = numberBasedCertificationDefinitionRulesSchema;
export const numberBasedCertificationDefinitionSchema = z.object({
  code: z.string(),
  type: z.literal('number'),
  icon: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  rules: numberBasedCertificationDefinitionRulesSchema,
  rulesText: z.string()
});

export const percentageBasedCertificationDefinitionSchema = z.object({
  code: z.string(),
  type: z.literal('percentage'),
  icon: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  rules: percentageBasedCertificationDefinitionRulesSchema,
  rulesText: z.string()
});

export const certificationDefinitionSchema = z.union([
  numberBasedCertificationDefinitionSchema,
  percentageBasedCertificationDefinitionSchema
]);
