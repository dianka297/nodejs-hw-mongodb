import dotenv from 'dotenv';
dotenv.config();

/* ---------- те, що вже було ---------- */
export const ACCESS_SECRET  = process.env.ACCESS_SECRET  || 'access-secret';
export const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret';

export const ONE_DAY         = 24 * 60 * 60 * 1000;
export const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const SORT_ORDER = { ASC: 'asc', DESC: 'desc' };

/* ---------- НОВЕ для Brevo SMTP ---------- */
export const SMTP = {
  HOST:     process.env.SMTP_HOST,
  PORT:     Number(process.env.SMTP_PORT || 587),
  USER:     process.env.SMTP_USER,
  PASSWORD: process.env.SMTP_PASSWORD,
  FROM:     process.env.SMTP_FROM,
};

/* ---------- JWT для листа «скинути пароль» ---------- */
export const JWT_RESET_SECRET = process.env.JWT_SECRET;   // VOQjLdrpG1TWCHhDzv3o
export const JWT_RESET_EXPIRES = '5m';                    // 5 хвилин

/* ---------- Домен фронтенду ---------- */
export const APP_DOMAIN = process.env.APP_DOMAIN || 'http://localhost:3000/auth';

/* ---------- Cloudinary ---------- */
export const CLOUDINARY = {
  NAME:   process.env.CLOUDINARY_CLOUD_NAME,
  KEY:    process.env.CLOUDINARY_API_KEY,
  SECRET: process.env.CLOUDINARY_API_SECRET,
};

