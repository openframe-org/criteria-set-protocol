import { Stream } from 'stream';
import { CriteriaTree, Metadata, TaskItemValue } from './criteria';

// Express schemas
export type MetadataResponse<Parameters extends ParameterCombination = ParameterCombination> = {
  protocol: 1;
  metadata: Metadata;
  parameters: Parameters;
};

export type CriteriaTreeResponse = CriteriaTree;

export type StringParam<ParamName extends string> = Record<ParamName, string>;

export type TaskItemValueMap = Record<string, TaskItemValue>;

export type TreeAndMatrixRequestBody = {
  locale?: string;
  parameters: ParameterCombination;
  values?: TaskItemValueMap;
};

export type StreamMatrixResponse = {
  filename: string;
  contentType: string;
  stream: Stream;
};

export type CriteriaSetsAndVersionsMap = Record<string, Metadata[]>;

export type ParameterCombination = Record<string, any>;
