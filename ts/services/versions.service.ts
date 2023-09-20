import { IVersionedService } from './i-versioned.service';
import { ProtocolVersionServiceMap } from '../types';

export class VersionsService {
  constructor(
    protected versions: IVersionedService[]
  ) {}

  public getAll() {
    return this.versions;
  }

  getServiceVersions<ProtocolVersion extends number, ProtocolImplementingService = ProtocolVersionServiceMap<ProtocolVersion>>(protocolVersion: ProtocolVersion): ProtocolImplementingService[] {
    return this.versions.filter((service) => service.supportsProtocol(protocolVersion)) as ProtocolImplementingService[];
  }

  get(version: string) {
    return this.versions.find((service) => service.version === version);
  }

  getLatestVersion() {
    return this.versions[this.versions.length - 1];
  }
}
