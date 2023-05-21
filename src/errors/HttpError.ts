export default class HttpError extends Error {
  public status: number;
  constructor(status: number, message: string, ...args: any) {
    super(...args);
    this.status = status;
    this.message = message;
  }

  public toJSON() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, ...args: any) {
    super(400, message, ...args);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(401, message);
  }
}
export class ForbiddenError extends HttpError {
  constructor(message: string, ...args: any) {
    super(403, message, args);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message, arguments);
  }
}

export class MissingFieldError extends BadRequestError {
  constructor(fieldName: string, ...args: any) {
    super(`${fieldName} is required`, args);
  }
}

export class InternalError extends HttpError {
  constructor(message: string) {
    super(500, message, arguments);
  }
}
