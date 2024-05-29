import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../Models/User.model';


interface ICreateUserInput {
  email: IUser['email'];
  firstName: IUser['firstName'];
  lastName: IUser['lastName'];
}
 class UserController {
  constructor() {}

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

  async function CreateUser({ email, firstName, lastName }: ICreateUserInput): Promise<IUser> {
    return User.create({
      email,
      firstName,
      lastName
    })
      .then((data: IUser) => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

}

export default new UserController();
