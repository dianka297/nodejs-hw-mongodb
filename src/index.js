import { setupServer } from './server.js';
import  initMongoConnection  from './db/initMongoConnection.js';

// Подключение к MongoDB, затем запуск сервера
async function main() {
  await initMongoConnection(); // Установим соединение с MongoDB
  setupServer();               // Запускаем сервер Express
}

main();
