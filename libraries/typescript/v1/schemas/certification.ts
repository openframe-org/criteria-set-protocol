import { z } from 'zod';

export const certificationDefinitionTypeSchema = z.union([z.literal('number'), z.literal('percentage')]);

export const numberBasedCertificationDefinitionRulesSchema = z.object({
  minimum: z.number().optional(),
  exclusiveMinimum: z.number().optional(),
  maximum: z.number().optional(),
  exclusiveMaximum: z.number().optional()
});

export const percentageBasedCertificationDefinitionRulesSchema = numberBasedCertificationDefinitionRulesSchema;

const abstractCertificationDefinitionSchema = z.object({
  code: z.string(),
  type: certificationDefinitionTypeSchema,
  icon: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  rules: z.any(),
  rulesText: z.string()
});

export const numberBasedCertificationDefinitionSchema = abstractCertificationDefinitionSchema.extend({
  type: z.literal('number'),
  rules: numberBasedCertificationDefinitionRulesSchema
});

export const percentageBasedCertificationDefinitionSchema = abstractCertificationDefinitionSchema.extend({
  type: z.literal('percentage'),
  rules: percentageBasedCertificationDefinitionRulesSchema
});

export const certificationDefinitionSchema = z.discriminatedUnion('type', [
  numberBasedCertificationDefinitionSchema,
  percentageBasedCertificationDefinitionSchema
]);
