import { RouteConfig } from '../Common/common.route.config';
import express, { Application } from 'express';
import MenuController from './menu.controller';

export class MenuRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, 'MenuRoutes');
  }
  configureRoutes(): express.Application {
    this.app.route(`/api/menus`).get([MenuController.getMenus]).post([MenuController.searchMenus]);
    this.app.route(`/api/menus/dummy`).post([MenuController.createTestMenus]);
    this.app.route(`/api/menu`).post([MenuController.createMenu]);
    return this.app;
  }
}
