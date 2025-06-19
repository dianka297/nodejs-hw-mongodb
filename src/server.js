import express from 'express'; 
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';

export function setupServer() {
  const app = express();

  // Middleware
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.use(express.json());
  app.use(cookieParser());

  // Тестовий маршрут для перевірки деплою
  app.post('/ping', (req, res) => {
    res.json({ message: 'pong' });
  });

  // Роутери
  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

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