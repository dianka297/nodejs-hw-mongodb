const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Сервер работает! 🚀');
});

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI; // Укажи это в .env

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Подключено к MongoDB');
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Ошибка подключения к MongoDB:', error);
  });
