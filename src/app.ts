import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import * as http from 'http';
import bodyParser from 'body-parser';
import Routes from './_Routes';
import Connect from './connect';
import { RouteConfig } from './Common/common.route.config';
import { UserRoutes } from './User/user.route.config';
import cors from 'cors';

const routes: Array<RouteConfig> = [];

const app: Application = express();
dotenv.config({});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.DEBUG) {
  process.on('unhandledRejection', function (reason) {
    process.exit(1);
  });
} else {
}

app.get('/', (req: Request, res: Response) => {
  res.send('TS App is Running');
});

routes.push(new UserRoutes(app));

const PORT = process.env.PORT;
const db = process.env.DATABASE as string;

Connect({ db });

const server: http.Server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);

  routes.forEach((route: RouteConfig) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
});

// Connect({ db });
// Routes({ app });

// app.listen(PORT, () => {
//   console.log(`server is running on PORT ${PORT}`);
// });
