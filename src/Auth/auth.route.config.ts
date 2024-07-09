import { Application, Request, Response } from 'express';
import { RouteConfig } from '../Common/common.route.config';
import AuthController from './auth.controller';
import verificationController from '../Verification/verification.controller';
export class AuthRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes() {
    this.app.route('/auth/sign-in').post(AuthController.login);
    this.app.route('/auth/sign-up').post(AuthController.signup);
    this.app.route('/auth/sign-up/check').get(AuthController.check);
    this.app
      .route('/auth/sign-up/verify-email')
      .post(verificationController.createEmailVerification)
      .put(verificationController.verifySignupEmail);
    return this.app;
  }
}
