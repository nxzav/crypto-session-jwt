import { hashPassword } from '../lib/passwordUtils.js';
import { UserService } from '../repositories/user.repository.js';

export const registerPost = async (req, res) => {
  const userExists = await UserService.getUserByEmail(req.body.email);

  if (userExists) {
    return res.send(
      'User already exists<br><br><a href="/login">Login</a></p>'
    );
  } else {
    const newUser = await UserService.createUser({
      email: req.body.email,
      password: await hashPassword(req.body.password),
      role: 'admin',
    });
    console.log(newUser);
    return res.redirect('/login');
  }
};

export const home = (req, res, next) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
};

export const login = (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="email">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
};

export const register = (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="/register">\
                    Enter Username:<br><input type="text" name="email">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
};

export const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    return res.redirect('/login');
  });
};

export const loginSuccess = (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
};

export const loginFailure = (req, res, next) => {
  res.send('Incorrect user or password.');
};

export const protectedRoute = (req, res, next) => {
  console.log(req.session);
  res.send(
    '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>'
  );
};

export const adminRoute = (req, res, next) => {
  console.log(req.session);
  res.send(
    '<h1>You are an Admin</h1><p><a href="/logout">Logout and reload</a></p>'
  );
};
