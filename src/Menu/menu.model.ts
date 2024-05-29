import { Document, Model, Schema } from 'mongoose';
import { IMenu } from './menu.interface';
import mongooseService from '../Common/services/mongoose.service';

export interface MenuDocument extends Document {
  code: string;
  name: string;
  type: string;
  path: string;
}

interface MenuModel extends Model<MenuDocument> {
  build(attrs: IMenu): MenuDocument;
}
const MenuSchema: Schema = new Schema(
  {
    code: { type: String, require: true },
    name: { type: String, require: true },
    type: { type: String, require: true },
    path: { type: String, require: true }
  },
  {
    toObject: {
      transform: function (doc, ret) {}
    },
    toJSON: {
      transform: function (doc, ret) {}
    }
  }
);

MenuSchema.statics.build = (attrs: IMenu) => {
  return new Menu(attrs);
};

const Menu = mongooseService.getInstance().model<MenuDocument, MenuModel>('Menu', MenuSchema);

export default Menu;
