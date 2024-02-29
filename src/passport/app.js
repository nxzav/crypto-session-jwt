import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import mongoose from 'mongoose';
// Constants
import config from './config/config.js';
// Routers
import sessionRouter from './routes/index.js';

// App config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session config
const sessionStore = MongoStore.create({
  mongoUrl: config.dbURI,
  dbName: config.dbName,
});

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(req.session);
  console.log({user: req.user});
  next();
});

app.use('/', sessionRouter);

mongoose.connect(config.dbURI, { dbName: config.dbName })
  .then(() => console.log('DB connected'))
  .then(() => app.listen(3000, () => console.log('Running...')))
  .catch((e) => console.error(e));
