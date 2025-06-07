import dotenv from 'dotenv';
dotenv.config(); 

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js'; // <-- Виправлено

async function startApp() {
  await initMongoConnection();
  setupServer();
}

startApp();

