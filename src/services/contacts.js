import { Contact } from '../models/contacts.js';

export const getContacts = (userId) => {
  return Contact.find({ userId });
};

export const getContactById = (id, userId) => {
  return Contact.findOne({ _id: id, userId });
};

export const createContact = (data, userId) => {
  return Contact.create({ ...data, userId });
};

export const updateContact = (id, data, options = {}, userId) => {
  return Contact.findOneAndUpdate(
    { _id: id, userId },
    data,
    { ...options, new: true }
  ).then((contact) => ({
    contact,
    isNew: options.upsert && !contact,
  }));
};

export const deleteContact = (id, userId) => {
  return Contact.findOneAndDelete({ _id: id, userId });
};


