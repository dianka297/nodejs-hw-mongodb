import { User } from '../../db/models/user.js';
import httpError from 'http-errors';
import bcrypt from 'bcryptjs';

export const registerUserController = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) throw httpError(409, 'Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword });

  res.status(201).json({
    message: 'Registration successful',
    user: { id: newUser._id, email: newUser.email },
  });
};