import { Request, Response, NextFunction } from 'express';
import User, { UserDocument } from './user.model';
import authService from '../Auth/auth.service';

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

  async createUser(req: Request, res: Response, next: NextFunction) {
    // const userDoc = User.build({ email, password, username });
    console.log(req.body);
    const newUser = await authService.createUser(req.body);

    return res.status(200).json(newUser);
  }
}

export default new UserController();
