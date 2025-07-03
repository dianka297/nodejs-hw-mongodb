import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../../db/models/user.js';
import { Session } from '../../db/models/session.js';
import { JWT_RESET_SECRET } from '../../constants/index.js';

export const resetPasswordCtrl = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    let payload;
    try {
      payload = jwt.verify(token, JWT_RESET_SECRET);
    } catch {
      throw createHttpError(401, 'Token is expired or invalid.');
    }

    const user = await User.findOne({ email: payload.email });
    if (!user) throw createHttpError(404, 'User not found!');

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    await Session.deleteMany({ userId: user._id });

    res.status(200).json({
      status: 200,
      message: 'Password has been successfully reset.',
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

