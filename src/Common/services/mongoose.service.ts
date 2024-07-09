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
    serverSelectionTimeoutMS: 5000,
    // bufferCommands?: boolean;
    // /** The name of the database you want to use. If not provided, Mongoose uses the database name from connection string. */
    // /** username for authentication, equivalent to `options.auth.user`. Maintained for backwards compatibility. */
    user: 'root',
    // /** password for authentication, equivalent to `options.auth.password`. Maintained for backwards compatibility. */
    pass: 'root1234!',
    // /** Set to false to disable automatic index creation for all models associated with this connection. */
    autoIndex: true
    // /** Set to `false` to disable Mongoose automatically calling `createCollection()` on every model created on this connection. */
    // autoCreate?: boolean;
  };
  constructor() {
    this.connectWithRetry();
  }

  getInstance() {
    return mongoose;
  }

  connectWithRetry() {
    const DB_URI = dbConfig.url;
    console.log('--------------------->process.env.DB_HOST', DB_URI);
    mongoose
      .connect(DB_URI, this.mongooseOptions)
      .then(() => {
        log('MongoDB is connected');
      })
      .catch((err) => {
        const retrySeconds = 5;
        console.error('----------------------------------------------------- ');
        console.error(
          `MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds):`,
          err
        );
        console.log({ DB_URI });
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  }
}

export default new MongooseService();
