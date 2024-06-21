import { IUser } from '../User/user.interface';
import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import jwt from 'jsonwebtoken';
import debug, { IDebugger } from 'debug';
import { createHash, createHmac } from 'crypto';
import { Exception } from '@errors/error.exception';
import { ErrorCode } from '@errors/error.code';
import verificationService from '@/Verification/verification.service';
const jwtSecret: string = process.env.JWT_SECRET || 'mh1H2WPFBVs6Vn8w/2D5WTf4CbPxawoH9vDU90hPfqU=';
const tokenExpirationInSeconds = 36000;

const log: IDebugger = debug('auth:controller');

class AuthController {
  constructor() {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.body.userId;
      const password = req.body.password;
      console.log({ userId, password, body: req.body });
      const user = await AuthService.findUserById(userId);
      if (user) {
        // TODO password hash
        if (user.password !== password) {
          throw new Exception(ErrorCode.AuthenticationFailed, { message: 'invalid password' });
          // return res.status(500).send({
          //   success: false,
          //   error: 'password invalid'
          // });
        } else {
          log('jwt Secret', jwtSecret);

          const tokenData = {
            userId,
            employeeId: user.employeeId,
            email: user.email,
            username: user.username,
            roles: ['admin']
          };
          const token = jwt.sign(tokenData, jwtSecret, {
            expiresIn: tokenExpirationInSeconds
          });

          return res.status(200).json({
            success: true,
            data: {
              user: tokenData,
              accessToken: token
            }
          });
        }
      } else {
        throw new Exception(ErrorCode.AuthenticationFailed, { message: 'user not found' });
      }
    } catch (e) {
      next(e);
    }
  }

  async check(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query;
      console.log('check userId >>>>>>>> ' + userId);
      const user = await AuthService.findUserById(userId as string);

      res.status(200).json({
        success: true,
        data: {
          success: user ? false : true,
          userId,
          message: user ? 'already exist' : ''
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, username, password, employeeId, email } = req.body as IUser;

      const user = await AuthService.findUserById(userId);
      log('user', user);
      if (user) {
        throw new Exception(ErrorCode.InvalidRequest, { message: 'userId already exist' });
      } else {
        try {
          const newUser = await AuthService.createUser(req.body);
          console.log({ newUser });
          await verificationService.createByEmail(userId, email);
          const hash = createHmac('sha256', jwtSecret).update(userId).digest('hex');
          return res.status(200).json({
            success: true,
            data: {
              hash
            }
          });
        } catch (e) {
          log('Controller capturing error', e);
          throw new Error('Error while register');
        }
      }
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
