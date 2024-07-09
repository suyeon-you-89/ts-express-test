import { IMenu } from './menu.interface';
import { MenuDocument } from './menu.model';
import Menu from '../Menu/menu.model';

interface PagingOptions {
  pageSize: number;
  pageIndex: number;
}

type SearchOptions = PagingOptions & {
  filter: {};
};
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

  async findMenuByCode(code: string) {
    return Menu.findOne({
      code
    }).exec();
  }

  async searchMenu(options: SearchOptions) {
    const { filter = {}, pageSize, pageIndex } = options;
    const menus = await Menu.find(filter)
      .limit(pageSize * 1)
      .skip(pageIndex * pageSize)
      .exec();
    const count = await Menu.countDocuments();

    return {
      data: menus,
      pageCount: Math.ceil(count / pageSize),
      count: count
    };
  }
}

export default new MenuService();
