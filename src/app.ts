import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as http from 'http';

import express, { Request, Response } from 'express';
import { AuthRoutes } from './Auth/auth.route.config';
import { RouteConfig } from './Common/common.route.config';
import { MenuRoutes } from './Menu/menu.router.config';
import { UserRoutes } from './User/user.route.config';
import { resolvers } from './graphql/resolver';
import { schema } from './graphql/schema';
import { errorHandler } from './middlewares/error.middleware';

const routes: Array<RouteConfig> = [];

const startServer = async () => {
  const app = express() as any;

  dotenv.config();

  app.use(express.json());
  const allowedOrigins = ['http://localhost:3030', 'http://localhost:3000', 'https://studio.apollographql.com'];

  const corsOptions = {
    credentials: true,
    origin: function (origin: any, callback: any) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  };

  app.use(cors(corsOptions));

  const PORT = process.env.NODE_DOCKER_PORT || 8080;

  if (process.env.DEBUG) {
    process.on('unhandledRejection', function (reason) {
      process.exit(1);
    });
  }

  routes.push(new UserRoutes(app));
  routes.push(new AuthRoutes(app));
  routes.push(new MenuRoutes(app));

  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.use('/graphql', cors<cors.CorsRequest>(), express.json());

  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome world');
  });

  app.use(errorHandler);
  // registration of handler
  const server: http.Server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);

    routes.forEach((route: RouteConfig) => {
      console.log(`Routes configured for ${route.getName()}`);
    });
  });
};

startServer().catch((e) => console.log('error starting server ---> '));
