import { IVersionedService } from './i-versioned.service';
import { ProtocolVersionServiceMap } from '../types';

/**
 * Service for managing versions of services
 *
 * The VersionsService class is a utility class for services which implement different versions of the protocol, and different versions of their
 * own service. For example, say you have a v1service, v11service, v2service and v21service with versions 1.0, 1.1, 2.0 and 2.1 respectively.
 * The VersionsService class can be used to manage these services:
 *
 * const versionsService = new VersionsService([v1service, v11service, v2service, v21service]);
 * versionsService.getLatestVersion(); // v21service
 * versionsService.getServiceVersions(1); // [v1service, v11service]
 * versionsService.getServiceVersions(2); // [v2service, v21service]
 * versionsService.get('1.1'); // v11service
 */
export class VersionsService {
  /**
   * @param versions An array of services implementing IVersionedService
   */
  constructor(
    protected versions: IVersionedService[]
  ) {}

  /**
   * Get all services
   */
  public getAll() {
    return this.versions;
  }

  /**
   * Retrieve the services which are compatible with the requested protocol version
   */
  getServiceVersions<ProtocolVersion extends number, ProtocolImplementingService = ProtocolVersionServiceMap<ProtocolVersion>>(protocolVersion: ProtocolVersion): ProtocolImplementingService[] {
    return this.versions.filter((service) => service.supportsProtocol(protocolVersion)) as ProtocolImplementingService[];
  }

  /**
   * Retrieve a service by version
   */
  get(version: string) {
    return this.versions.find((service) => service.version === version);
  }

  /**
   * Retrieve the latest service
   */
  getLatestVersion() {
    return this.versions[this.versions.length - 1];
  }
}
