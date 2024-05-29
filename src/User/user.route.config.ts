import { RouteConfig } from '../Common/common.route.config';
import express, { Application, Request, Response } from 'express';
import UserController from './user.controller';

export class UserRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes() {
    this.app.route(`/api/users`).get([UserController.getUsers]);
    this.app.route(`/api/user`).post([UserController.createUser]);
    return this.app;
  }
}
