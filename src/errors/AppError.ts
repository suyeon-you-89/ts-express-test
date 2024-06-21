class AppError extends Error {
  constructor(message: string, statusCode: any) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
