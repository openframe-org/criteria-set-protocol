/// <reference types="node" />
import { Stream } from 'stream';
import { Metadata, TaskItemValue } from './criteria';
export type MetadataSchema<Parameters extends ParameterCombination = ParameterCombination> = {
    protocol: 1;
    metadata: Metadata;
    parameters: Parameters;
};
export type StringParam<ParamName extends string> = Record<ParamName, string>;
export type TaskItemValueMap = Record<string, TaskItemValue>;
export type StreamCriteriaSetMatrixBody = {
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
