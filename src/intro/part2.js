import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from '../config/config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const sessionStore = new MongoStore.create({
//   mongooseConnection: connection,
//   collection: `${config.dbName}`,
// });

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: config.dbURI,
    dbName: config.dbName,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Equals 1 day
  },
}));

app.get('/', (req, res, next) => {
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }
  res.send(`<h1>You have visited this page ${req.session.viewCount}</h1>`);
});

app.listen(3000, () => console.log('Running...'));
