// Ре-експортуємо всі контролери, щоб роутер міг імпортувати їх
// одним рядком  ../controllers/auth/index.js
// ---------------------------------------------------------------

/* базові (реєстрація / логін / логаут / refresh) */
export {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshSessionController,
} from '../auth.js';          // ←  файл із базовими контролерами

/* HW-6: e-mail із токеном та скидання пароля */
export { sendResetEmailCtrl } from './sendResetEmail.js';
export { resetPasswordCtrl }  from './resetPassword.js';
