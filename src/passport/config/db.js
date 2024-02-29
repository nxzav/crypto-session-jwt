import mongoose from 'mongoose';
import config from './config.js';

try {
  mongoose.set('useCreateIndex', true);
  mongoose.connect(config.dbURI, { dbName: config.dbName });
} catch (error) {
  mongoose.createConnection(config.dbURI, { dbName: config.dbName });
}
mongoose.connection
  .once('open', () => console.log('DB Running...'))
  .on('error', (e) => {
    throw e;
  });
