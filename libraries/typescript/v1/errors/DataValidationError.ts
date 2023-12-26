import { ValidationError } from './ValidationError';

export class DataValidationError extends ValidationError {
  constructor(
    public code: string,
    public path?: string,
    args?: Record<string, unknown>
  ) {
    super('data', code, path, args);
  }
}
