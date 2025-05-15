const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Настройки
const botToken = '8044638650:AAHaJ4alBinrhhAiLneTcOd9RA1MbEIZlmQ';
const chatIds = [6336261275, 7565339102];

app.use(cors());
app.use(express.json());

app.options('*', (req, res) => {
  res.sendStatus(204);
});

app.post('/', async (req, res) => {
  const input = req.body;

  if (!input) {
    return res.status(400).json({ success: false, error: 'No data received' });
  }

  const escape = (text) => String(text || '').replace(/[<>&]/g, '');

  const message = `
📋 Новая заявка

👤 Имя: ${escape(input.name) || 'Не указано'}
📞 Телефон: ${escape(input.phone) || 'Не указан'}
✉️ Email: ${escape(input.email) || 'Не указан'}
💵 Сумма: ${escape(input.amount) || '0'} ${input.currency || '$'}
🏛 Площадка: ${escape(input.platform) || 'Не указана'}
📅 Дата: ${escape(input.date) || 'Не указана'}
📝 Детали: ${escape(input.details) || 'Не указаны'}

🌐 Язык: ${input.lang === 'en' ? 'Английский' : 'Немецкий'}
🕒 Время: ${new Date().toISOString().replace('T', ' ').split('.')[0]}
  `.trim();

  const results = {};
  let success = true;

  for (const chatId of chatIds) {
    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await axios.post(url, {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      });

      results[chatId] = response.status === 200;
    } catch (error) {
      results[chatId] = false;
      success = false;
      break;
    }
  }

  res.json({ success, results });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
