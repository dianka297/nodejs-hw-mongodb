import dotenv from 'dotenv';
dotenv.config();

export const ACCESS_SECRET = process.env.ACCESS_SECRET || 'default-access-secret';
export const REFRESH_SECRET = process.env.REFRESH_SECRET || 'default-refresh-secret';
export const ONE_DAY = 24 * 60 * 60 * 1000;
