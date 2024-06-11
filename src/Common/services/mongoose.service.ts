import mongoose from 'mongoose';
import debug, { IDebugger } from 'debug';
import dotEnv from 'dotenv';
import dbConfig from '../configs/db.config';

console.log(dbConfig);
dotEnv.config({});

const log: IDebugger = debug('app:mongoose-service');

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    serverSelectionTimeoutMS: 5000
    // useFindAndModify: false
  };

  constructor() {
    this.connectWithRetry();
  }

  getInstance() {
    return mongoose;
  }

  connectWithRetry() {
    const DB_URI = dbConfig.url;
    console.log('process.env.DB_HOST', DB_URI);
    console.log('Connecting to MongoDB(Retry when failed)');
    mongoose
      .connect(DB_URI, this.mongooseOptions)
      .then(() => {
        log('MongoDB is connected');
      })
      .catch((err) => {
        const retrySeconds = 5;
        console.log(
          `MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds):`,
          err
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  }
}

export default new MongooseService();
