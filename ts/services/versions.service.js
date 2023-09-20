"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionsService = void 0;
class VersionsService {
    constructor(versions) {
        this.versions = versions;
    }
    getAll() {
        return this.versions;
    }
    getServiceVersions(protocolVersion) {
        return this.versions.filter((service) => service.supportsProtocol(protocolVersion));
    }
    get(version) {
        return this.versions.find((service) => service.version === version);
    }
    getLatestVersion() {
        return this.versions[this.versions.length - 1];
    }
}
exports.VersionsService = VersionsService;
