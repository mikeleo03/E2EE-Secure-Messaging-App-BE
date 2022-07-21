export class ServerError extends Error {
  status: number;

  constructor(message = 'Internal server error', status = 500) {
    super();
    this.message = message;
    this.status = status;
  }
}
