export default class AppError {
  public readonly massage: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.massage = message;
    this.statusCode = statusCode;
  }
}
