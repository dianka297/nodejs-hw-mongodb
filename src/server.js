import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routers/auth.js';

export function setupServer() {
  const app = express();

  // Middleware
  app.use(cors({
    origin: 'http://localhost:3000', // або твій фронт, якщо є
    credentials: true, // дозволити куки
  }));
  app.use(express.json());
  app.use(cookieParser());

  // Роути
  app.use('/auth', authRouter);

  // Обробка 404
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
  });

  // Обробка помилок
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    res.status(status).json({ message });
  });

  // Старт сервера
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  return app;
}

