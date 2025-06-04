import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../helpers/index.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.use(auth);

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.put('/:contactId', ctrlWrapper(upsertContactController));
router.patch('/:contactId', ctrlWrapper(patchContactController));

export default router;
