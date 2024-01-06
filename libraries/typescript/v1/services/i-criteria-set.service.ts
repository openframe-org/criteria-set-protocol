import { CriteriaTree, Metadata, StreamMatrixResponse, TaskItemValueMap } from '../types';

export interface ICriteriaSetService<ParametersType extends Record<string, any> = Record<string, any>> {
  id: string;
  version: string;

  validateParameters(parameters: ParametersType): Promise<void>;

  getMetadata(): Metadata;

  getCriteriaTree(
    parameters?: ParametersType,
    values?: TaskItemValueMap | null,
    locale?: string | null
  ): CriteriaTree;

  streamMatrix(
    parameters?: ParametersType,
    values?: TaskItemValueMap | null,
    locale?: string | null
  ): StreamMatrixResponse;
}
