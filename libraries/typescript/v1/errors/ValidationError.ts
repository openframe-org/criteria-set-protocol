import { ValidationErrorType } from './types';

export abstract class ValidationError extends Error {
  public arguments?: Record<string, unknown>;

  protected constructor(
    public errorType: ValidationErrorType,
    public code: string,
    public path?: string,
    args?: Record<string, unknown>
  ) {
    super(`Validation error: ${errorType}`);
    this.arguments = args;
  }

  public toJSON() {
    return {
      errorType: this.errorType,
      code: this.code,
      path: this.path,
      arguments: this.arguments
    };
  }
}
