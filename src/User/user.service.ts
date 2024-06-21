import { ErrorCode, Exception } from '@errors/*';
import { IUser, UserFilter } from './user.interface';
import User from './user.model';
import { UserStatus } from './user.status';

class UserService {
  async getUser(filter: UserFilter) {
    try {
      const user = await User.findOne(filter).exec();
      return user;
    } catch (e) {
      throw e;
    }
  }

  async getUserById(userId: string) {
    try {
      const user = this.getUser({ userId });
      return user;
    } catch (e) {
      throw e;
    }
  }

  async deleteUser(userId: string) {
    try {
      const user = await this.getUserById(userId);

      if (user) {
        const res = await User.deleteOne({
          userId
        }).exec();
        console.log({ userId });
      } else {
        throw new Error('invalid');
      }
    } catch (e: any) {
      console.log(e.message);
      throw e;
    }
  }
  async changeEmail(userId: string, email: string) {
    console.log('change email');
    const result = await User.findOneAndUpdate(
      {
        userId
      },
      {
        email
      }
    ).exec();
    console.log({ result });
    return result;
  }
  async register(userId: string, email: string) {
    try {
      console.log('user register ');
      const user = await this.getUser({
        userId,
        email,
        status: UserStatus.UnAuthorized
      });

      if (!user) {
        throw new Exception(ErrorCode.InvalidRequest, { message: 'not found user to change status' });
      }

      const update = await user.updateOne({
        status: UserStatus.Registered
      });

      console.log({ update });
      return update;
    } catch (e) {
      throw e;
    }
  }
}

export default new UserService();
