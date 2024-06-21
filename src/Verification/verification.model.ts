import mongooseService from '@/Common/services/mongoose.service';
import { Timestamp } from 'mongodb';
import { Document, Model, Schema } from 'mongoose';
import { IVerification } from './verifiaction.interface';
import { promisify } from 'util';
import { createHmac, scrypt } from 'crypto';
const jwtSecret: string = process.env.JWT_SECRET || 'mh1H2WPFBVs6Vn8w/2D5WTf4CbPxawoH9vDU90hPfqU=';

const scryptAsync = promisify(scrypt);

type verificationType = 'phone' | 'email';

export interface VerificationDocument extends Document {
  userId: string;
  target: string; // userId hash
  type: string;
  code: string;
  hash: string;
  status: string;
  createdAt: Date;
  sentAt: Date;
  verifiedAt: Date;
}

export interface VerificationModel extends Model<VerificationDocument> {
  build(attr: IVerification): VerificationDocument;
}

const VerificationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    target: { type: String, required: true },
    type: { type: String, required: true, default: 'email' },
    code: { type: String, required: true },
    hash: { type: String, required: true },
    status: { type: String, required: true, default: 'prepared' }, // prepared, sent, verified, deleted
    sentAt: { type: Date, required: false },
    verifiedAt: { type: Date, required: false }
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret) {}
    }
  }
);

VerificationSchema.pre('save', function (done) {
  done();
});

VerificationSchema.statics.build = (attrs: IVerification) => {
  return new Verification(attrs);
};

const Verification = mongooseService
  .getInstance()
  .model<VerificationDocument, VerificationModel>('Verification', VerificationSchema);

export default Verification;
