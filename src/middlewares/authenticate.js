import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.token !== token) {
      return next(createHttpError(401, 'Not authorized'));
    }

    req.user = user;
    next();
  } catch {
    next(createHttpError(401, 'Not authorized'));
  }
};

export default auth;

