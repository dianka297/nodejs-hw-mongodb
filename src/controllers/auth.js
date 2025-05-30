import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db/models/user.js';
import { Session } from '../db/models/session.js'; 
import createHttpError from 'http-errors';
import { ACCESS_SECRET, REFRESH_SECRET } from '../constants/index.js';

export const registerUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });

  return { email: user.email, id: user._id };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const accessToken = jwt.sign({ userId: user._id }, ACCESS_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET, { expiresIn: '1d' });

  const session = await Session.create({ user: user._id, token: refreshToken });

  return {
    accessToken,
    refreshToken,
    _id: session._id,
  };
};

export const logoutUser = async (sessionId) => {
  await Session.findByIdAndDelete(sessionId);
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findById(sessionId);
  if (!session || session.token !== refreshToken) {
    throw createHttpError(401, 'Invalid session');
  }

  const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

  const newAccessToken = jwt.sign({ userId: decoded.userId }, ACCESS_SECRET, { expiresIn: '1h' });
  const newRefreshToken = jwt.sign({ userId: decoded.userId }, REFRESH_SECRET, { expiresIn: '1d' });

  session.token = newRefreshToken;
  await session.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    _id: session._id,
  };
};

