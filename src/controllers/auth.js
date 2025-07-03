
import createHttpError from 'http-errors';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
} from '../../services/auth.js';
import { ONE_DAY } from '../../constants/index.js';

const isProd = process.env.NODE_ENV === 'production';

/* ---------- POST /auth/register ---------- */
export const registerUserController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,                                 // пароля немає
    });
  } catch (err) {
    next(err);
  }
};

/* ---------- POST /auth/login ---------- */
export const loginUserController = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, sessionId } = await loginUser(req.body);

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: isProd,
        maxAge: ONE_DAY,
      })
      .cookie('sessionId', sessionId, {
        httpOnly: true,
        sameSite: 'strict',
        secure: isProd,
        maxAge: ONE_DAY,
      })
      .json({
        status: 200,
        message: 'Successfully logged in a user!',
        data: { accessToken },
      });
  } catch (err) {
    next(err);
  }
};

/* ---------- POST /auth/logout ---------- */
export const logoutUserController = async (req, res, next) => {
  try {
    await logoutUser(req.user._id);             // видаляємо сесію

    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

/* ---------- POST /auth/refresh ---------- */
export const refreshSessionController = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw createHttpError(401, 'Refresh token missing');

    const {
      accessToken,
      refreshToken: newRefreshToken,
      sessionId,
    } = await refreshSession(refreshToken);

    res
      .cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: isProd,
        maxAge: ONE_DAY,
      })
      .cookie('sessionId', sessionId, {
        httpOnly: true,
        sameSite: 'strict',
        secure: isProd,
        maxAge: ONE_DAY,
      })
      .json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: { accessToken },
      });
  } catch (err) {
    next(err);
  }
};

