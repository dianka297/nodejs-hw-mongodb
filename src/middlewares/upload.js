// src/middlewares/upload.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// временная папка tmp/ рядом с корнем проекта
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const uploadDir = path.join(__dirname, '../../tmp');

export const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 МБ
});
