import express, { Application, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import Connect from './connect';
import { RouteConfig } from './Common/common.route.config';
import { UserRoutes } from './User/user.route.config';

const routes: Array<RouteConfig> = [];

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('TS App is Running');
});

const PORT = process.env.PORT;
const db = process.env.DATABASE as string;

Connect({ db });
routes.push(new UserRoutes(app));

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
