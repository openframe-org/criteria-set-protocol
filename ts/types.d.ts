import { IProtocolV1Service } from './v1/services/i-protocol-v1.service';
export type ProtocolVersionServiceMap<Version extends number> = Version extends 1 ? IProtocolV1Service : unknown;
