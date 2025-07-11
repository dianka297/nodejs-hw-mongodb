import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

/**
 * Убедись, что папка `UPLOAD_DIR` существует
 */
const createDirIfNotExists = async (dir) => {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
};

export const saveFileToUploadDir = async (file) => {
  const tempPath = path.join(TEMP_UPLOAD_DIR, file.filename);
  const uploadPath = path.join(UPLOAD_DIR, file.filename);

  // ✅ Создаём папку `public/uploads`, если её нет
  await createDirIfNotExists(UPLOAD_DIR);

  // ✅ Перемещаем файл
  await fs.rename(tempPath, uploadPath);

  // ✅ Отдаём публичный путь
  return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
};
