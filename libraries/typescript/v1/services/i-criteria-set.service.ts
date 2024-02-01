import { CriteriaTree, Metadata, DataMap, StreamMatrixResponse, TaskItemValueMap } from '../types';

export type TreeAndMapParameters<ParametersType extends Record<string, any> = Record<string, any>> = {
  parameters?: ParametersType,
  values?: TaskItemValueMap | null,
  locale?: string | null,
};

export type MatrixParameters<ParametersType extends Record<string, any> = Record<string, any>> = TreeAndMapParameters<ParametersType> & {
  additional?: any
};


export interface ICriteriaSetService<ParametersType extends Record<string, any> = Record<string, any>> {
  id: string;
  version: string;

  validateParameters(parameters: ParametersType): Promise<void>;

  getMetadata(): Metadata;

  getDataMap(parameters: TreeAndMapParameters<ParametersType>): DataMap;

  getCriteriaTree(parameters: TreeAndMapParameters<ParametersType>): CriteriaTree;

  streamMatrix(parameters: MatrixParameters<ParametersType>): StreamMatrixResponse;
}
