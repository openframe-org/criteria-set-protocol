import { z } from 'zod';
import { dataMapSchema } from './data-map';
import { qualitySchema } from './quality';
import { certificationDefinitionSchema } from './certification';

export const criteriaTreeSchema = dataMapSchema.pick({
  version: true,
  result: true,
  certifications: true
}).extend({
  qualities: z.array(qualitySchema),
  certificationDefinitions: z.array(certificationDefinitionSchema).optional()
});
