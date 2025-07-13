import dotenv from 'dotenv';
dotenv.config();

/* ---------- JWT токени сесій ---------- */
export const ACCESS_SECRET  = process.env.ACCESS_SECRET  || 'access-secret';
export const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret';

export const ONE_DAY         = 24 * 60 * 60 * 1000;   // 1 day  (ms)
export const FIFTEEN_MINUTES = 15 * 60 * 1000;        // 15 min (ms)

/* ---------- Сортування ---------- */
export const SORT_ORDER = { ASC: 'asc', DESC: 'desc' };

/* ---------- ✉️  SMTP (Brevo) ---------- */
export const SMTP = {
  HOST:     process.env.SMTP_HOST,
  PORT:     Number(process.env.SMTP_PORT || 587),
  USER:     process.env.SMTP_USER,
  PASSWORD: process.env.SMTP_PASSWORD,
  FROM:     process.env.SMTP_FROM,
};

/* ---------- JWT для «скинути пароль» ---------- */
export const JWT_RESET_SECRET  = process.env.JWT_SECRET;
export const JWT_RESET_EXPIRES = '5m';

/* ---------- Домен фронтенду ---------- */
export const APP_DOMAIN =
  process.env.APP_DOMAIN || 'http://localhost:3000';

/* ---------- ☁️  Cloudinary ---------- */
export const CLOUDINARY = {
  NAME:   process.env.CLOUDINARY_CLOUD_NAME,
  KEY:    process.env.CLOUDINARY_API_KEY,
  SECRET: process.env.CLOUDINARY_API_SECRET,
};

/* ──────── 📂  Локальні каталоги для завантажень ──────── */
export const TEMP_UPLOAD_DIR = 'temp';
export const UPLOAD_DIR = 'public';
