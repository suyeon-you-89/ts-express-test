import User from '../User/user.model';
import { IUser } from '../User/user.interface';
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
      email: email
    }).exec();
  }
}

export default new AuthService();
