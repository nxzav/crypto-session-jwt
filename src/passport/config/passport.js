import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../mongo/models/user.model.js';
import { verifyPassword } from '../lib/passwordUtils.js';
import { UserService } from '../repositories/user.repository.js';

const customFields = {
  usernameField: 'email',
};

passport.use(
  'local',
  new LocalStrategy(customFields, async (email, password, done) => {
    try {
      const user = await UserService.getUserByEmail(email);
      if (!user) return done(null, false, { message: 'User not found' });
      console.log({ password, user });

      const passwordMatch = await verifyPassword(password, user.password);
      if (typeof passwordMatch === 'boolean' && passwordMatch === true)
        return done(null, user);
      console.log({ user, passwordMatch });
      return done(null, false, { message: 'Incorrect password' });
    } catch (error) {
      console.log(error);
      return done(error);
    }
  })
);

passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, user.id);
  });
});

passport.deserializeUser(function (userID, done) {
  UserService.getUserById(userID)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

export const authLocal = passport.authenticate('local', {
  failureRedirect: '/login-failure',
  successRedirect: '/login-success',
});
