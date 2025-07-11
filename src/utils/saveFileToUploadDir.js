import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

const UPLOADS_SUBFOLDER = 'uploads'; // ⬅️ создаём подпапку в public

const createDirIfNotExists = async (dir) => {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
};

export const saveFileToUploadDir = async (file) => {
  const tempPath = path.join(TEMP_UPLOAD_DIR, file.filename);
  const finalDir = path.join(UPLOAD_DIR, UPLOADS_SUBFOLDER); // public/uploads
  const uploadPath = path.join(finalDir, file.filename);     // public/uploads/filename

  // ✅ Убедиться, что public/uploads существует
  await createDirIfNotExists(finalDir);

  // ✅ Переместить файл
  await fs.rename(tempPath, uploadPath);

  // ✅ Вернуть публичную ссылку
  return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
};

