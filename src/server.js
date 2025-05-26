import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = process.env.PORT || 3000;

const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    })
  );

  app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
  });

app.use('/api', router);

  app.use('*', notFoundHandler); // Обработка 404

  app.use(errorHandler); // Обработка ошибок

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
