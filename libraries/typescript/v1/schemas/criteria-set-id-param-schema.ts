import { z } from 'zod';

/**
 * Validates the criteriaSetId parameter for endpoints which use it
 */
export const criteriaSetIdParamSchema = z.object({
  criteriaSetId: z.string()
    .regex(/^[a-zA-Z0-9.\-_]+$/, 'Criteria set ID must contain only full stops, alphanumeric characters, dashes and underscores')
});
