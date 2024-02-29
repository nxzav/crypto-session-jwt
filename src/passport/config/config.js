import dotenv from 'dotenv';

dotenv.config();

export default {
  dbURI: process.env.DB_URI,
  dbName: process.env.DB_NAME,
  sessionSecret: process.env.SESSION_SECRET,
};
