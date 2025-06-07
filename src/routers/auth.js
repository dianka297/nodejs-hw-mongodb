import { Router } from 'express';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  refreshSessionController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import  authenticate  from '../middlewares/authenticate.js';

const router = Router();

// POST /auth/register
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController)
);

// POST /auth/login
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

// POST /auth/refresh
router.post('/refresh', ctrlWrapper(refreshSessionController));

// POST /auth/logout (тільки авторизовані користувачі)
router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

export default router;
