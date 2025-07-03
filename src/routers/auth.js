import { Router } from 'express';

/* ---------- Joi-схеми ---------- */
import {
  registerUserSchema,
  loginUserSchema,
  emailSchema,
  resetPwdSchema,
} from '../validation/auth.js';

/* ---------- Контролери ---------- */
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshSessionController,
}from '../index.js';

import { sendResetEmailCtrl } from '../controllers/auth/sendResetEmail.js';
import { resetPasswordCtrl }  from '../controllers/auth/resetPassword.js';

/* ---------- Utils / middlewares ---------- */
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper }  from '../utils/ctrlWrapper.js';
import authenticate      from '../middlewares/authenticate.js';

const router = Router();

/* ---------- BASIC AUTH ---------- */
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post(
  '/refresh',
  ctrlWrapper(refreshSessionController),
);

router.post(
  '/logout',
  authenticate,
  ctrlWrapper(logoutUserController),
);

/* ---------- HW6: RESET PASSWORD ---------- */
router.post(
  '/send-reset-email',
  validateBody(emailSchema),
  ctrlWrapper(sendResetEmailCtrl),
);

router.post(
  '/reset-pwd',
  validateBody(resetPwdSchema),
  ctrlWrapper(resetPasswordCtrl),
);

export default router;

