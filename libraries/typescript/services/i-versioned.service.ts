import { ProtocolVersionServiceMap } from '../types';

/**
 * Interface for versioned services
 *
 * Services that implement this interface can be managed by the VersionsService
 */
export interface IVersionedService {
  /**
   * The SemVer version of the service
   */
  version: string;

  /**
   * Whether the service supports the given protocol version
   */
  supportsProtocol: <ProtocolVersion extends number>(protocolVersion: ProtocolVersion) => this is ProtocolVersionServiceMap<ProtocolVersion>;
}
