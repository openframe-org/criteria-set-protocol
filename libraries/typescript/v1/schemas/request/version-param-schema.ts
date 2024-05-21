import { z } from 'zod';

/**
 * Validates the version parameter for endpoints which use it
 */
export const versionParamSchema = z.object({
  version: z.string()
    .regex(
      /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/,
      'Service version must be a SemVer-formatted string which includes exclusively a major, minor and patch version'
    )
});
