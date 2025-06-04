import { Contact } from '../db/models/contact.js'; // ✅ виправлений імпорт

export const getContacts = (userId) => {
  return Contact.find({ owner: userId });
};

export const getContactById = (id, userId) => {
  return Contact.findOne({ _id: id, owner: userId });
};

export const createContact = (data, userId) => {
  return Contact.create({ ...data, owner: userId });
};

export const updateContact = (id, data, options = {}, userId) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    data,
    { ...options, new: true }
  ).then((contact) => ({
    contact,
    isNew: options.upsert && !contact,
  }));
};

export const deleteContact = (id, userId) => {
  return Contact.findOneAndDelete({ _id: id, owner: userId });
};

