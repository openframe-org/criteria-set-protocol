import { IVersionedService } from './i-versioned.service';
import { ProtocolVersionServiceMap } from '../types';
export declare class VersionsService {
    protected versions: IVersionedService[];
    constructor(versions: IVersionedService[]);
    getAll(): IVersionedService[];
    getServiceVersions<ProtocolVersion extends number, ProtocolImplementingService = ProtocolVersionServiceMap<ProtocolVersion>>(protocolVersion: ProtocolVersion): ProtocolImplementingService[];
    get(version: string): IVersionedService | undefined;
    getLatestVersion(): IVersionedService;
}
