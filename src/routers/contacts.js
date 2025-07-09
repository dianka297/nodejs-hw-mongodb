// routes/contacts.js
// Полностью обновлённый роутер контактов: подключаем authenticate + multer upload

import express from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';

// Middleware
import authenticate from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

/* ───────── Protected routes ───────── */
router.use(authenticate);

// GET /contacts
router.get('/', ctrlWrapper(getContactsController));

// GET /contacts/:contactId
router.get('/:contactId', ctrlWrapper(getContactByIdController));

// POST /contacts — создание контакта с возможной загрузкой фото
router.post(
  '/',
  upload.single('photo'),      // 👈 multer парсит multipart/form-data
  ctrlWrapper(createContactController)
);

// PUT (upsert) /contacts/:contactId
router.put(
  '/:contactId',
  upload.single('photo'),
  ctrlWrapper(upsertContactController)
);

// PATCH /contacts/:contactId
router.patch(
  '/:contactId',
  upload.single('photo'),
  ctrlWrapper(patchContactController)
);

// DELETE /contacts/:contactId
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;

