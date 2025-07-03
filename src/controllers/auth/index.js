import dotenv from 'dotenv';
dotenv.config();
console.log('📦 MONGODB_URI =', process.env.MONGODB_URI);

import { initMongoConnection } from '../../db/initMongoConnection.js';
import { setupServer } from '../../server.js'; 

async function startApp() {
  await initMongoConnection();
  setupServer();
}

startApp();

