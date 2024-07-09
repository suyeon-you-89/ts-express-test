import { Request, Response, NextFunction } from 'express';
import menuService from './menu.service';
import Menu, { MenuDocument } from './menu.model';
import { dummyData } from '../app.data.dummy';
import { IMenu } from './menu.interface';
import { FilterQuery } from 'mongoose';

class MenuController {
  constructor() {}

  async createMenu(req: Request, res: Response, next: NextFunction) {
    const newMenu = await menuService.createMenu(req.body);
    return res.status(200).json(newMenu);
  }

  async getMenus(req: Request, res: Response, next: NextFunction) {
    const data = await Menu.find({});
    return res.status(200).json({
      success: true,
      data
    });
  }

  async searchMenus(req: Request, res: Response, next: NextFunction) {
    const result = await menuService.searchMenu(req.body);

    return res.status(200).json({
      success: true,
      data: result
    });
  }

  async createTestMenus(req: Request, res: Response) {
    menuService.createTestMenu(dummyData.menus).then((data: Array<MenuDocument>) => {
      res.status(200).json({
        success: true,
        data
      });
    });
  }
}

export default new MenuController();
