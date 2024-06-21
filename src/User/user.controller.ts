import { Request, Response, NextFunction } from 'express';
import User, { UserDocument } from './user.model';
import authService from '../Auth/auth.service';
import userService from './user.service';
import { Exception } from '../errors/error.exception';
import { ErrorCode } from '../errors/error.code';

class UserController {
  constructor() {}

  async getUsers(req: any, res: Response, next: NextFunction) {
    User.find({}).then((data: Array<UserDocument>) => {
      return res.status(200).json({
        success: true,
        data
      });
    });
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    try {
      if (user) {
        return res.status(200).json({
          success: true,
          data: user
        });
      } else {
        throw new Exception(ErrorCode.InvalidRequest, { message: 'can not found user ' });
      }
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    try {
      userService.deleteUser(userId);
      return res.status(200).json({
        success: true
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message
      });
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    // const userDoc = User.build({ email, password, username });
    console.log(req.body);
    const newUser = await authService.createUser(req.body);

    return res.status(200).json(newUser);
  }
}

export default new UserController();
