import Menu from '../Menu/menu.model';
import { gql } from 'apollo-server-express';

export const schema = gql`
  type Menu {
    code: String
    text: String
    type: String
    url: String
  }
  type Query {
    getMenus: [Menu]
  }
`;
