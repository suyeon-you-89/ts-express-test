export interface IUser {
  userId: string;
  username: string;
  email: string;
  password: string;
  birth: string;
  phone: string;
  employeeId: string;
}

export interface UserFilter {
  userId?: string;
  status?: string;
  username?: string;
  email?: string;
  birth?: string;
  phone?: string;
  employeeId?: string;
}
// UserSchema.statics.build = (attrs: IUser) => {
//   return new User(attrs);
// };
