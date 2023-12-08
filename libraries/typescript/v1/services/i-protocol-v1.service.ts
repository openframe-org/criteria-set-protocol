import { CriteriaTree, StreamMatrixResponse, TaskItemValueMap, Metadata } from '../types';

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
  getCriteriaTree<Parameters>(criteriaSetId: string, parameters: Parameters, values?: TaskItemValueMap, locale?: string): Promise<CriteriaTree>;

  /**
   * Validate the given parameters for the given criteria set ID
   */
  validateParameters<Parameters>(criteriaSetId: string, parameters: Parameters): void;

  /**
   * Stream the matrix for the given criteria set ID, parameter combination and value map
   */
  streamMatrix<Parameters>(criteriaSetId: string, parameters: Parameters, values?: TaskItemValueMap, locale?: string): Promise<StreamMatrixResponse>;

  /**
   * Get the metadata of all criteria sets supported by this service
   */
  getCriteriaSetMetadataList(): Metadata[];

  /**
   * Get the JSON schema for the given criteria set ID
   */
  getParametersJsonSchema(criteriaSetId: string): Record<string, unknown>;

  /**
   * Get the JSON schema for the given criteria set ID
   */
  getResultsJsonSchema(criteriaSetId: string): Record<string, unknown>;

  /**
   * Get the JSON schema for the given criteria set ID
   */
  getAdditionalDefinitionsJsonSchema(criteriaSetId: string): Record<string, unknown>;
}
