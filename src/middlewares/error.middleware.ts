import { ErrorCode } from '../errors/error.code';
import { Exception } from '../errors/error.exception';
import { ExceptionType } from '../errors/error.type';
import { NextFunction, Request, Response } from 'express';

// Global Error Handling Middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('handle error from middleware ');
  if (err instanceof Exception) {
    res.status(err.status).send(err);
  } else {
    res.status(500).send({ code: ErrorCode.Unknown, status: 500, success: false } as ExceptionType);
  }
};
