import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { saveFileToUploadDir }   from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary }  from '../utils/saveFileToCloudinary.js';
import { getEnvVar }             from '../utils/getEnvVar.js';

/* ───────── helpers ───────── */
const handlePhoto = async (file) => {
  if (!file) return undefined;

  return getEnvVar('ENABLE_CLOUDINARY') === 'true'
    ? await saveFileToCloudinary(file)
    : await saveFileToUploadDir(file);
};

/* ───────── GET /contacts ───────── */
export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const sort   = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const result = await getContacts(req.user._id, {
      page,
      limit: perPage,
      sort,
      filter,
    });

    const totalPages      = Math.ceil(result.total / result.limit);
    const hasPreviousPage = result.page > 1;
    const hasNextPage     = result.page < totalPages;

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: result.contacts,
        page: result.page,
        perPage: result.limit,
        totalItems: result.total,
        totalPages,
        hasPreviousPage,
        hasNextPage,
      },
    });
  } catch (err) { next(err); }
};

/* ───────── GET /contacts/:id ───────── */
export const getContactByIdController = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId, req.user._id);
    if (!contact) throw createHttpError(404, 'Contact not found');

    res.json({
      status: 200,
      message: 'Successfully found contact!',
      data: contact,
    });
  } catch (err) { next(err); }
};

/* ───────── POST /contacts ───────── */
export const createContactController = async (req, res, next) => {
  try {
    const photoUrl = await handlePhoto(req.file);

    const contact = await createContact(
      { ...req.body, userId: req.user._id, photo: photoUrl },
      req.user._id,
    );

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (err) { next(err); }
};

/* ───────── DELETE /contacts/:id ───────── */
export const deleteContactController = async (req, res, next) => {
  try {
    const contact = await deleteContact(req.params.contactId, req.user._id);
    if (!contact) throw createHttpError(404, 'Contact not found');

    res.status(204).send();
  } catch (err) { next(err); }
};

/* ───────── PUT (upsert) /contacts/:id ───────── */
export const upsertContactController = async (req, res, next) => {
  try {
    const photoUrl = await handlePhoto(req.file);

    const { contact, isNew } = await updateContact(
      req.params.contactId,
      { ...req.body, photo: photoUrl },
      { upsert: true },
      req.user._id,
    );

    if (!contact) throw createHttpError(404, 'Contact not found');

    res.status(isNew ? 201 : 200).json({
      status: isNew ? 201 : 200,
      message: 'Successfully upserted a contact!',
      data: contact,
    });
  } catch (err) { next(err); }
};

/* ───────── PATCH /contacts/:id ───────── */
export const patchContactController = async (req, res, next) => {
  try {
    const photoUrl = await handlePhoto(req.file);

    const { contact } = await updateContact(
      req.params.contactId,
      { ...req.body, photo: photoUrl },
      {},
      req.user._id,
    );

    if (!contact) throw createHttpError(404, 'Contact not found');

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: contact,
    });
  } catch (err) { next(err); }
};



