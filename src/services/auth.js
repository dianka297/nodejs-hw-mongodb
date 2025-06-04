import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';

const { SECRET_KEY } = process.env;

export const registerUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '23h' });
  user.token = token;
  await user.save();

  return { token, user };
};

export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { token: null });
};
