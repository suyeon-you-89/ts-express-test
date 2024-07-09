import { Application } from 'express';
import { RouteConfig } from '../Common/common.route.config';
import verificationController from '../Verification/verification.controller';
import UserController from './user.controller';

export class UserRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes() {
    this.app.route(`/api/users`).get([UserController.getUsers]);
    this.app.route(`/api/user`).post([UserController.createUser]);
    this.app.route(`/api/user/:userId`).get([UserController.getUser]).delete([UserController.deleteUser]);
    this.app
      .route(`/api/user/verify-email`)
      .post([verificationController.createEmailVerification])
      .put([verificationController.verifyChangeEmail]);
    return this.app;
  }
}
