import { ErrorCode, Exception } from '@/errors';
import { Document, FilterQuery, Model } from 'mongoose';

export type CustomFilter = {
  [key in string]: any;
};

export default class CommonService<M extends Model<any>, I> {
  model: M | null = null;
  name = 'model name';

  constructor(model: M, name: string) {
    this.model = model;
    this.name = name;
  }

  // async get(filter: InstitutionFilter){
  async get(filter: FilterQuery<I>) {
    try {
      const institution = await this.model?.findOne(filter);
      return institution;
    } catch (e: any) {
      throw new Exception(ErrorCode.NotFound, { message: e?.message, query: filter });
    }
  }

  // async get(filter: InstitutionFilter){
  async getList(filter: FilterQuery<I>) {
    try {
      const list = await this.model?.find(filter);
      return list;
    } catch (e: any) {
      throw new Exception(ErrorCode.NotFound, { message: e?.message, query: filter });
    }
  }

  async count(filter: FilterQuery<I>) {
    try {
      console.log({ filter });
      const count = await this.model?.countDocuments(filter);
      console.log({ count });
      return count;
    } catch (e: any) {
      throw new Exception(ErrorCode.OperationFailed, { message: e?.message, query: filter });
    }
  }

  async create(request: Partial<I>) {
    try {
      if (!this.model) {
        throw new Exception(ErrorCode.ServerFailed, { message: 'model이 설정되지 않았습니다.' });
      }
      const newOne = new this.model(request);
      await newOne.save();
      return newOne;
    } catch (e) {
      throw new Exception(ErrorCode.OperationFailed, { message: `${this.name} 등록에 실패하였습니다.`, cause: e });
    }
  }

  async update(document: Document, newOne: Partial<I>) {
    try {
      await document.updateOne(newOne).exec();
      return document;
    } catch (e) {
      throw new Exception(ErrorCode.OperationFailed, { message: `${this.name} 등록에 실패하였습니다.`, cause: e });
    }
  }
}
