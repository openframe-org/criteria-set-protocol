import { CriteriaTree, Metadata, StreamMatrixResponse, TaskItemValueMap } from '../types';

export interface IProtocolV1Service {
  version: string;
  getCriteriaTree(criteriaSetId: string, rawParameters: Record<string, unknown>): Promise<CriteriaTree>;
  validateParameters<RequestParameters>(criteriaSetId: string, parameters: RequestParameters): void;
  streamMatrix(criteriaSetId: string, rawParameters: Record<string, unknown>, values: TaskItemValueMap): Promise<StreamMatrixResponse>;
  getMatrixMetadataList(): Metadata[];
  getParametersJsonSchema(criteriaSetId: string): Record<string, unknown>;
}
