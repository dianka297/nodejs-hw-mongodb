import createHttpError from 'http-errors';
import { Contact } from '../models/contact.js';

export const checkContactAccess = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return next(createHttpError(401));
  }

  const { contactId } = req.params;
  if (!contactId) {
    return next(createHttpError(403));
  }

  const contact = await Contact.findOne({
    _id: contactId,
    userId: user._id,
  });

  if (!contact) {
    return next(createHttpError(403));
  }

  req.contact = contact;
  next();
};
