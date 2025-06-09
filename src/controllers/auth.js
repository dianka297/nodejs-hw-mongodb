import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
} from '../services/auth.js';
import createHttpError from 'http-errors';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Successfully registered a user!',
    data: user, // user без пароля
  });
};

export const loginUserController = async (req, res) => {
  const { accessToken, refreshToken, sessionId } = await loginUser(req.body);

  res
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true, // встанови false для dev без HTTPS
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів
    })
    .cookie('sessionId', sessionId, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true, // встанови false для dev без HTTPS
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      status: 'success',
      message: 'Successfully logged in a user!',
      data: { accessToken },
    });
};

export const logoutUserController = async (req, res) => {
  await logoutUser(req.user._id);

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  res.status(204).send();
};

export const refreshSessionController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token missing');
  }

  const { accessToken, refreshToken: newRefreshToken } = await refreshSession(refreshToken);

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: 'success',
    message: 'Successfully refreshed a session!',
    data: { accessToken },
  });
};
