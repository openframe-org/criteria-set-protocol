import { ICriteriaSetService } from './i-criteria-set.service';
import { Metadata } from '../types';

class ManagerService {
  constructor(
    public readonly criteriaSetServices: Record<string, ICriteriaSetService[]> = {}
  ) {
  }

  // Get the criteria sets and versions available to this service
  getCriteriaSetsAndVersions(): Record<string, Metadata[]> {
    return Object.fromEntries(
      Object.entries(this.criteriaSetServices).map(([criteriaSetId, services]) => {
        return [criteriaSetId, services.map((service) => service.getMetadata())];
      })
    );
  }

  // Get the criteria set with the given ID. If no version is requested, return the latest version
  getServiceForCriteriaSet(criteriaSetId: string, version?: string): ICriteriaSetService {
    const services = this.criteriaSetServices?.[criteriaSetId];
    if (!services?.length) {
      throw new Error(`Criteria set ID not found: ${criteriaSetId}`);
    }

    if (!version) {
      return services[services.length - 1];
    }

    const service = services?.find((service) => {
      return service.version === version;
    });

    if (!service) {
      throw new Error(`Criteria set version not found: ${criteriaSetId}/${version}`);
    }

    return service;
  }
}
