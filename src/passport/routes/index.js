import { Router } from 'express';
import { authLocal } from '../config/passport.js';
import {
  adminRoute,
  home,
  login,
  loginFailure,
  loginSuccess,
  logout,
  protectedRoute,
  register,
  registerPost,
} from '../controllers/session.controller.js';
import { isAdmin, isAuth } from '../middleware/auth.js';

const router = Router();

// POST Routes
router.post('/login', authLocal);
router.post('/register', registerPost);
// GET Routes
router.get('/', home);
// Register
router.get('/register', register);
// Login
router.get('/login', login);
router.get('/login-success', loginSuccess);
router.get('/login-failure', loginFailure);
// Logs the user out
router.get('/logout', logout);
// Protected route
router.get('/protected-route', isAuth, protectedRoute);
// Admin route
router.get('/admin-route', isAdmin, adminRoute);

export default router;
