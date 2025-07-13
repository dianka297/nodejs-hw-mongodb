// src/middlewares/upload.js
import multer from 'multer';
import path from 'path';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

// Вказуємо multer, куди тимчасово зберігати файли
const uploadDir = path.resolve(TEMP_UPLOAD_DIR);

export const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

