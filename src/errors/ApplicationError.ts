export class ApplicationError extends Error {
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
