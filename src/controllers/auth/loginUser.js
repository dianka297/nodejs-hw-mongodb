// src/controllers/auth/loginUserController.js
import { User } from '../../db/models/user.js';
import { Session } from '../../db/models/session.js';      // 👈 добавили
import httpError from 'http-errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. ищем пользователя
    const user = await User.findOne({ email });
    if (!user) throw httpError(401, 'Invalid credentials');

    // 2. сверяем пароль
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw httpError(401, 'Invalid credentials');

    // 3. создаём JWT
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 4. создаём сессию в БД
    const session = await Session.create({
      userId: user._id,
      accessTokenValidUntil: new Date(Date.now() + 60 * 60 * 1000), // 1 ч
    });

    // 5. шлём cookie с sessionId
    res.cookie('sessionId', session._id.toString(), {
      httpOnly: true,
      secure: true,     // Render - это HTTPS
      sameSite: 'None', // чтобы фронт с другого домена видел cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    });

    // 6. ответ
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};
