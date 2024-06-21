import User from '../User/user.model';
import { IUser } from '../User/user.interface';
import { UserStatus } from '../User/user.status';
class AuthService {
  async createUser(data: IUser) {
    try {
      const user = User.build(data);
      console.log('build success');
      await user.save();
      console.log('user save');
      console.log(user);
    } catch (e: any) {
      console.info(e.message);
      throw new Error(e);
    }
  }

  async findUserByEmail(email: string) {
    return User.findOne({
      email
    }).exec();
  }
  async findUserById(userId: string) {
    return User.findOne({
      userId
    }).exec();
  }
  async findRegisteredUserById(userId: string) {
    return User.findOne({
      userId,
      status: UserStatus.Registered
    });
  }
}

export default new AuthService();
