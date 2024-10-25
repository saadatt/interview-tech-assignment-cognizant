export class ApiError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly data: unknown
  ) {
    super(message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404, undefined);
  }
}

export class TaskNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Task not found: ${id}`);
  }
}