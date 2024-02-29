export const isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: 'Not authorized to see this content' });
  } else return next();
};

export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    next();
  } else {
    return res.status(401).json({ msg: 'You are not an admin.' });
  }
};
