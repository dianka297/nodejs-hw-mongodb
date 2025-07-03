import Joi from 'joi';

/* реєстрація */
export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/* логін */
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/* надсилання листа */
export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

/* скидання пароля */
export const resetPwdSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
