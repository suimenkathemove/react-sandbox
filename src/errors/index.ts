type StatusCode = 401 | 403 | 404 | 500;
type Message = string;

export class ApiError extends Error {
  readonly statusCode: StatusCode;
  readonly message: Message;

  constructor(statusCode: StatusCode, message: Message) {
    super(message);

    this.name = 'ApiError';

    this.statusCode = statusCode;
    this.message = message;
  }
}
