import { RoutesInput } from '../Types/route';
import UserController from '../Controllers/User.controller';

export default ({ app }: RoutesInput) => {
  console.log('routes');
  app.post('/api/user', async (req, res) => {
    const user = await UserController.CreateUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });

    return res.send({ user });
  });

  app.get('/api/users', async (req, res) => {
    const users = UserController.GetUsers();
    res.send({ users });
  });
};
