import Menu from '../Menu/menu.model';
import { gql } from 'apollo-server-express';

export const schema = gql`
  type Menu {
    code: String
    name: String
    type: String
    path: String
  }
  type Query {
    getMenus: [Menu]
  }
`;
