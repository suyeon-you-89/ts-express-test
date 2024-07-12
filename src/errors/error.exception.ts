import { ErrorCode } from './error.code';

export class Exception extends Error {
  public status: number = 500;
  public code: string = '';
  public data: any = null;

  constructor(code: string = ErrorCode.Unknown, data: any = null) {
    super(code);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.data = data;
    this.code = code;
    switch (code) {
      case ErrorCode.Unauthorized:
        this.status = 403;
        break;
      case ErrorCode.NotFound:
        this.status = 404;
        break;
      case ErrorCode.Unknown:
      default:
        this.status = 500;
        break;
    }
  }
}
