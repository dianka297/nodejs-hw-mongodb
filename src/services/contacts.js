import { Contact } from '../db/models/contact.js';
import mongoose from 'mongoose';

export const getContacts = async (
  userId,
  {
    page = 1,
    limit = 10,
    sort = { sortBy: '_id', sortOrder: 'asc' },
    filter = {},
  }
) => {
  const skip = (page - 1) * limit;

  const query = { owner: new mongoose.Types.ObjectId(userId), ...filter };
  const sortQuery = { [sort.sortBy]: sort.sortOrder === 'desc' ? -1 : 1 };

  const [contacts, total] = await Promise.all([
    Contact.find(query).sort(sortQuery).skip(skip).limit(limit),
    Contact.countDocuments(query),
  ]);

  return {
    contacts,
    total,
    page: Number(page),
    limit: Number(limit),
  };
};

export const getContactById = (id, userId) => {
  return Contact.findOne({
    _id: id,
    owner: new mongoose.Types.ObjectId(userId),
  });
};

export const createContact = (data, userId) => {
  return Contact.create({
    ...data,
    owner: new mongoose.Types.ObjectId(userId),
  });
};

export const updateContact = (id, data, options = {}, userId) => {
  return Contact.findOneAndUpdate(
    {
      _id: id,
      owner: new mongoose.Types.ObjectId(userId),
    },
    data,
    { ...options, new: true }
  ).then((contact) => ({
    contact,
    isNew: options.upsert && !contact,
  }));
};

export const deleteContact = (id, userId) => {
  return Contact.findOneAndDelete({
    _id: id,
    owner: new mongoose.Types.ObjectId(userId),
  });
};

