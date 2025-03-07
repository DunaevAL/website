const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');  // Добавляем CORS
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());  // Разрешаем CORS

app.post('/submit', async (req, res) => {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
        return res.status(400).send('Все поля обязательны!');
    }

    const TELEGRAM_BOT_TOKEN = "7692381900:AAFcXfzhK_f-rrZuqfq7i8WOMQSCiKUzl1o";
    const TELEGRAM_CHAT_ID = "7173006422";
    const telegramURL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramMessage = `📩 *Новая заявка!*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}\n💬 *Сообщение:* ${message}`;

    try {
        await fetch(telegramURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramMessage,
                parse_mode: 'Markdown'
            })
        });
        res.send('Форма успешно отправлена в Telegram!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при отправке в Telegram!');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
