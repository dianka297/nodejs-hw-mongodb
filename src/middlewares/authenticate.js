import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const session = await Session.findOne({ userId: id, accessToken: token });
    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    if (session.accessTokenValidUntil < new Date()) {
      return next(createHttpError(401, 'Access token expired'));
    }

    const user = await User.findById(id);
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
