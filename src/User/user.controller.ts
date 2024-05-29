import { Request, Response, NextFunction } from 'express';
import userModel from './user.model';
class UserController {
  constructor() {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    userModel.create({});
  }
  async getUsers(req: any, res: Response, next: NextFunction) {
    return res.status(200).json({
      success: true,
      data: [
        {
          name: 'John'
        },
        {
          name: 'Steve'
        }
      ]
    });
  }
}

export default new UserController();
