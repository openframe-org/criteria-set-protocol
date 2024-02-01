import { Stream } from 'stream';
import { CriteriaTree, DataMap, Metadata, TaskItemValue } from './criteria';

// Express schemas
export type MetadataResponse = Metadata;

export type CriteriaTreeResponse = CriteriaTree;

export type DataMapResponse = DataMap;

export type StringParam<ParamName extends string> = Record<ParamName, string>;

export type TaskItemValueMap = Record<string, TaskItemValue>;

export type TreeAndMatrixRequestBody = {
  locale?: string;
  parameters?: ParameterCombination;
  values?: TaskItemValueMap;
  additional?: any;
};

export type StreamMatrixResponse = {
  filename: string;
  contentType: string;
  stream: Stream;
};

export type ParameterCombination = Record<string, any>;
