import { ErrorCode, Exception } from '@errors/*';
import { createHmac } from 'crypto';
import { IVerification } from './verifiaction.interface';
import Verification, { VerificationDocument } from './verification.model';
import User from '@/User/user.model';

const jwtSecret: string = process.env.JWT_SECRET || 'mh1H2WPFBVs6Vn8w/2D5WTf4CbPxawoH9vDU90hPfqU=';

class VerificationService {
  async get(userId: string, type: string, status: string) {
    try {
      const verification = await Verification.findOne({
        userId,
        type,
        status
      }).exec();
      return verification;
    } catch (e) {
      throw e;
    }
  }

  async verify(verification: VerificationDocument, code: string) {
    if (verification.code === code) {
      console.log({ code });
      await verification.updateOne({ status: 'verified' }).exec();
      console.log({ verification });
      return verification;
    } else {
      throw new Exception(ErrorCode.InvalidRequest, { message: 'code!' });
    }
  }

  async verifyWithHash(hash: string, type: string, code: string, email?: string) {
    console.log('verify verification with hash');
    try {
      console.log({
        hash,
        type,
        target: email,
        status: 'prepared'
      });
      const verification = await Verification.findOne({
        hash,
        type,
        target: email,
        status: 'prepared'
      }).exec();
      console.log({ verification });

      if (verification) {
        const result = await this.verify(verification, code);
        return result;
      } else {
        throw new Exception(ErrorCode.InvalidRequest, { message: 'not found verification' });
      }
    } catch (e) {
      throw e;
    }
  }

  async verifyWithUserId(userId: string, type: string, code: string, email?: string) {
    try {
      console.log('verify verification with userId');
      const verification = await Verification.findOne({
        userId,
        type,
        target: email,
        status: 'prepared'
      }).exec();

      if (verification) {
        const result = await this.verify(verification, code);
        console.log('verified ');
        return result;
      } else {
        throw new Exception(ErrorCode.InvalidRequest, { message: 'not found verification' });
      }
    } catch (e) {
      throw e;
    }
  }

  async deletePrev(data: IVerification) {
    try {
      console.log({ data });
      const { userId, type } = data;
      const res = await Verification.findOneAndUpdate(
        {
          userId,
          type,
          status: 'prepared'
        },
        {
          status: 'replaced'
        }
      ).exec();
      return res;
    } catch (e) {
      throw new Exception(ErrorCode.InvalidRequest, { message: 'cant not change prev verification' });
    }
  }

  async create(data: IVerification) {
    try {
      await this.deletePrev(data);
      const verification = Verification.build(data);
      console.log('build verification');
      console.log({ verification });
      await verification.save();
    } catch (e: any) {
      console.info(e.message);
      throw new Error(e);
    }
  }

  createCode() {
    return 'C' + Math.floor(10000 + Math.random() * 90000);
  }

  createHash(userId: string) {
    const hash = createHmac('sha256', jwtSecret)
      .update(userId as string)
      .digest('hex');
    return hash;
  }

  async createByEmail(userId: string, target: string) {
    const verification: IVerification = {
      userId,
      type: 'email',
      target,
      code: this.createCode(),
      hash: this.createHash(userId)
    };
    this.create(verification);
  }
}

export default new VerificationService();
