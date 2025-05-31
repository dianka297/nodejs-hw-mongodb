import dotenv from 'dotenv';
dotenv.config();

export const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access-secret';
export const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret';

export const ONE_DAY = 24 * 60 * 60 * 1000;
export const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
