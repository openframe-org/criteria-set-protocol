import { ProtocolVersionServiceMap } from '../types';
export interface IVersionedService {
    version: string;
    supportsProtocol: <ProtocolVersion extends number>(protocolVersion: ProtocolVersion) => this is ProtocolVersionServiceMap<ProtocolVersion>;
}
