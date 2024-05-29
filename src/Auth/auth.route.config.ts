import { Application, Request, Response } from 'express';
import { RouteConfig } from '../Common/common.route.config';
import AuthController from './auth.controller';
export class AuthRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes() {
    this.app.route('/auth/login').post(AuthController.login);
    this.app.route('/auth/signup').post(AuthController.signup);

    return this.app;
  }
}
