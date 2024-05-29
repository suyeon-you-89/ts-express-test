import { MenuDocument } from './menu.model';
import Menu from '../Menu/menu.model';
import { IMenu } from '../Menu/menu.interface';
class MenuService {
  async createMenu(data: IMenu) {
    try {
      const menu = Menu.build(data);
      await menu.save();
    } catch (e: any) {
      console.info(e.message);
      throw new Error(e);
    }
  }
  async createTestMenu(data: Array<IMenu>) {
    return Menu.insertMany(data);
  }

  async findMenuByEmail(code: string) {
    return Menu.findOne({
      code
    }).exec();
  }
}

export default new MenuService();
