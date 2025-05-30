import dotenv from 'dotenv';
dotenv.config(); // обов'язково перед іншими імпортами

import { initMongoConnection } from './db/initMongoConnection.js';
import setupServer from './server.js';

async function startApp() {
  await initMongoConnection();
  setupServer();
}

startApp();

