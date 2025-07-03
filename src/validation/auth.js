import Joi from 'joi';

/* ---------- старі схеми ---------- */
export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/* ---------- НОВЕ ---------- */
/* тіло для POST /auth/send-reset-email */
export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

/* тіло для POST /auth/reset-pwd */
export const resetPwdSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
