import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';

import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

const { JWT_SECRET } = process.env;

// ------------------ Реєстрація ------------------
export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const { password: _, ...userData } = newUser.toObject();
  return userData;
};

// ------------------ Логін ------------------
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  // Видаляємо попередні сесії
  await Session.deleteMany({ userId: user._id });

  // Генеруємо токени
  const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

  const now = new Date();
  const accessTokenValidUntil = new Date(now.getTime() + 15 * 60 * 1000);
  const refreshTokenValidUntil = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const session = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return {
    accessToken,
    refreshToken,
    sessionId: session._id.toString(),
  };
};

// ------------------ Логаут ------------------
export const logoutUser = async (userId) => {
  await Session.deleteMany({ userId });
};

// ------------------ Оновлення токена ------------------
export const refreshSession = async (refreshToken) => {
  if (!refreshToken) {
    throw createHttpError(401, 'No refresh token');
  }

  let payload;
  try {
    payload = jwt.verify(refreshToken, JWT_SECRET);
  } catch {
    throw createHttpError(401, 'Invalid refresh token');
  }

  const session = await Session.findOne({ userId: payload.id, refreshToken });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Refresh token expired');
  }

  // Видаляємо стару сесію
  await Session.deleteMany({ userId: payload.id });

  // Генеруємо нові токени
  const newAccessToken = jwt.sign({ id: payload.id }, JWT_SECRET, { expiresIn: '15m' });
  const newRefreshToken = jwt.sign({ id: payload.id }, JWT_SECRET, { expiresIn: '30d' });

  const now = new Date();
  const accessTokenValidUntil = new Date(now.getTime() + 15 * 60 * 1000);
  const refreshTokenValidUntil = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const newSession = await Session.create({
    userId: payload.id,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionId: newSession._id.toString(), 
  };
};