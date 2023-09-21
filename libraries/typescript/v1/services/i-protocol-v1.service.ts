import { CriteriaTree, Metadata, StreamMatrixResponse, TaskItemValueMap } from '../types';

/**
 * Interface for services which implement the v1 protocol
 */
export interface IProtocolV1Service {
  /**
   * Specific version of this service, SemVer-formatted
   */
  version: string;

  /**
   * Get the criteria tree for the given criteria set ID and combination of parameters
   */
  getCriteriaTree(criteriaSetId: string, rawParameters: Record<string, unknown>): Promise<CriteriaTree>;

  /**
   * Validate the given parameters for the given criteria set ID
   */
  validateParameters<RequestParameters>(criteriaSetId: string, parameters: RequestParameters): void;

  /**
   * Stream the matrix for the given criteria set ID, parameter combination and value map
   */
  streamMatrix(criteriaSetId: string, rawParameters: Record<string, unknown>, values: TaskItemValueMap): Promise<StreamMatrixResponse>;

  /**
   * Get the metadata of all criteria sets supported by this service
   */
  getCriteriaSetMetadataList(): Metadata[];

  /**
   * Get the JSON schema for the given criteria set ID
   */
  getParametersJsonSchema(criteriaSetId: string): Record<string, unknown>;
}
