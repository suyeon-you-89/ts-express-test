import { Document, Model, Schema } from 'mongoose';
import { IMenu } from './menu.interface';
import mongooseService from '../Common/services/mongoose.service';
import { ObjectId } from 'mongodb';

export interface MenuDocument extends Document {
  code: string;
  text: string;
  type: string;
  url: string;
  ancestors?: string[];
  parent?: string | null;
}

interface MenuModel extends Model<MenuDocument> {
  build(attrs: IMenu): MenuDocument;
}
const MenuSchema: Schema = new Schema(
  {
    code: { type: String, require: true },
    text: { type: String, require: true },
    type: { type: String, require: true },
    url: { type: String, require: true },
    ancestors: { type: Array<String>, require: false, default: [] },
    parent: { type: String, required: false, default: null }
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
