import Menu from '../Menu/menu.model';

export const resolvers = {
  Query: {
    getMenus: async () => {
      const menus = await Menu.find({});
      return menus;
    }
  }
};
