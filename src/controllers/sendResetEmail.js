import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { User } from '../../db/models/user.js';
import { sendEmail } from '../../utils/email.js';
import { APP_DOMAIN, JWT_RESET_SECRET } from '../../constants/index.js';

export const sendResetEmailCtrl = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw createHttpError(404, 'User not found!');

    const token = jwt.sign({ email }, JWT_RESET_SECRET, { expiresIn: '5m' });
    const link = `${APP_DOMAIN}/reset-password?token=${token}`;

    await sendEmail(
      email,
      'Reset your password',
      `<p>Click <a href="${link}">here</a> to reset your password. Link is valid for 5 minutes.</p>`
    );

    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (err) {
    if (err.responseCode) {
      return next(createHttpError(500, 'Failed to send the email, please try again later.'));
    }
    next(err);
  }
};
