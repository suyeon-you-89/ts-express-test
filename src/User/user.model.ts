import { UserStatus } from './user.status';
import MongooseService from '../Common/services/mongoose.service';
import { model, Schema, Model, Document } from 'mongoose';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { IUser } from './user.interface';
import { Timestamp } from 'mongodb';

const scryptAsync = promisify(scrypt);
export interface UserDocument extends Document {
  userId: string;
  email: string;
  password: string;
  username: string;
  birth: string;
  phone: string;
  employeeId: string;
  status: string;
  deletedAt: Timestamp;
}

interface UserModel extends Model<UserDocument> {
  build(attrs: IUser): UserDocument;
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    birth: { type: String, required: true },
    phone: { type: String, required: true },
    employeeId: { type: String, required: false },
    status: { type: String, required: false, default: UserStatus.UnAuthorized },
    deletedAt: { type: Date, required: false }
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret) {}
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      }
    }
  }
);

// UserSchema.pre("save", async function (done) {
//   if (this.isModified("password")) {
//     const hashed = await Password.toHash(this.get("password"));
//     this.set("password", hashed);
//   }
//   done();
// });

UserSchema.pre('save', function (done) {
  console.log('pre---->');
  // this.set('password', this.get('password')); 
  this.set('updatedAt', Date.now);
  done();
});

UserSchema.statics.build = (attrs: IUser) => {
  console.log('build--->');
  return new User(attrs);
};

const User = MongooseService.getInstance().model<UserDocument, UserModel>('User', UserSchema);

export default User;
