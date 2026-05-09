export abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

export class ValidationError extends BaseError {
  statusCode = 400;

  constructor(private errors: { message: string; field?: string }[]) {
    super('Validation failed');
  }

  serializeErrors() {
    return this.errors;
  }
}

export class NotFoundError extends BaseError {
  statusCode = 404;

  constructor(message: string = 'Resource not found') {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class UnauthorizedError extends BaseError {
  statusCode = 401;

  constructor(message: string = 'Unauthorized') {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class ForbiddenError extends BaseError {
  statusCode = 403;

  constructor(message: string = 'Forbidden') {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}