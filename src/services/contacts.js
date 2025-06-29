import { Contact } from '../db/models/contact.js';
import mongoose, { Types } from 'mongoose';

/* ───────── GET ALL ───────── */
export const getContacts = async (
  userId,
  { page = 1, limit = 10, sort = { sortBy: '_id', sortOrder: 'asc' }, filter = {} }
) => {
  const skip = (page - 1) * limit;

  /* ключове — фільтруємо по userId */
  const query = { userId: new Types.ObjectId(userId), ...filter };
  const sortQuery = { [sort.sortBy]: sort.sortOrder === 'desc' ? -1 : 1 };

  const [contacts, total] = await Promise.all([
    Contact.find(query).sort(sortQuery).skip(skip).limit(limit),
    Contact.countDocuments(query),
  ]);

  return { contacts, total, page: +page, limit: +limit };
};

/* ───────── GET BY ID ───────── */
export const getContactById = (id, userId) =>
  Contact.findOne({ _id: id, userId: new Types.ObjectId(userId) });

/* ───────── CREATE ───────── */
export const createContact = (data, userId) =>
  Contact.create({ ...data, userId: new Types.ObjectId(userId) });

/* ───────── UPDATE (PUT/PATCH) ───────── */
export const updateContact = (id, data, options = {}, userId) =>
  Contact.findOneAndUpdate(
    { _id: id, userId: new Types.ObjectId(userId) },
    data,
    { ...options, new: true },
  ).then(c => ({ contact: c, isNew: options.upsert && !c }));

/* ───────── DELETE ───────── */
export const deleteContact = (id, userId) =>
  Contact.findOneAndDelete({ _id: id, userId: new Types.ObjectId(userId) });


