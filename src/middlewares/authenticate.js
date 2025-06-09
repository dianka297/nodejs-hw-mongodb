import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    if (!sessionId) {
      return next(createHttpError(401, 'Session ID missing'));
    }

    const session = await Session.findById(sessionId);
    if (!session || session.accessTokenValidUntil < new Date()) {
      return next(createHttpError(401, 'Session invalid or expired'));
    }

    const user = await User.findById(session.userId);
    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }

    req.user = user;
    req.session = session;
    next();
  } catch {
    next(createHttpError(401, 'Not authorized'));
  }
};

export default authenticate;

