import * as yup from 'yup';

export const versionParamSchema = yup.object({
  params: yup.object({
    version: yup.string()
      .matches(
        /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/,
        'Service version must be a SemVer-formatted string which includes exclusively a major, minor and patch version'
      )
      .required()
  })
});
