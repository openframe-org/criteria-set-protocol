import { ValidationError } from './ValidationError';

export class ParameterValidationError extends ValidationError {
  constructor(
    public code: string,
    public path?: string,
    args?: Record<string, unknown>
  ) {
    super('parameter', code, path, args);
  }
}
