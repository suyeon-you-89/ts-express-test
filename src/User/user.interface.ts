import { IUser } from '@/Models/User.model';

interface ICreateUserInput {
  email: IUser['email'];
  firstName: IUser['firstName'];
  lastName: IUser['lastName'];
}
