import debug, { IDebugger } from 'debug';
import { NextFunction, Request, Response } from 'express';
import Verification from './verification.model';
import verificationService from './verification.service';
import userService from '@/User/user.service';
import { ErrorCode, Exception } from '@errors/*';
import authService from '@/Auth/auth.service';

const log: IDebugger = debug('auth:controller');

class VerificationController {
  constructor() {}

  async createEmailVerification(req: Request, res: Response, next: NextFunction) {
    const { userId, email } = req.body;
    try {
      const user = await userService.getUserById(userId as string);
      if (user) {
        const verification = await verificationService.createByEmail(user.userId, email || user.email);
        console.log({ verification });
        return res.status(200).json({ success: true, data: verification });
      } else {
        throw new Exception(ErrorCode.InvalidRequest, { message: 'user not found' });
      }
    } catch (e) {
      next(e);
    }
  }

  async verifySignupEmail(req: Request, res: Response, next: NextFunction) {
    const { hash, userId, code } = req.body;
    try {
      console.log({ userId, code, body: req.body });
      const verification = userId
        ? await verificationService.verifyWithUserId(userId, 'email', code)
        : await verificationService.verifyWithHash(hash, 'email', code);
      if (verification) {
        await userService.register(userId, verification.target);
        return res.status(200).json({ success: true });
      } else {
        throw new Exception(ErrorCode.InvalidRequest, { message: 'no verification to verify' });
      }
    } catch (e) {
      next(e);
    }
  }

  async verifyChangeEmail(req: Request, res: Response, next: NextFunction) {
    const { userId, hash, email, code } = req.body;
    try {
      console.log({ userId, hash, email, code });
      const verification = userId
        ? await verificationService.verifyWithUserId(userId, 'email', code, email)
        : await verificationService.verifyWithHash(hash, 'email', code, email);
      console.log({ verification });
      if (verification) {
        await userService.changeEmail(verification.userId, verification.target);
        return res.status(200).json({ success: true });
      } else {
        throw new Exception(ErrorCode.InvalidRequest, { message: 'no verification to verify' });
      }
    } catch (e) {
      next(e);
    }
  }
}

export default new VerificationController();
