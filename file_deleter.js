const axios = require('axios');
const fs = require('fs').promises;
require('dotenv').config();

const BOT_TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const deleteUrl = `https://api.telegram.org/bot${BOT_TOKEN}/deleteMessage`;

async function deleteFile(messageIds, file_name) {
    for (const messageId of messageIds) {
        try {
            const response = await axios.post(deleteUrl, {
                chat_id: CHANNEL_ID,
                message_id: messageId.message_id,
            });
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
        }
    }
    await fs.unlink(`./uploaded_files/${file_name}.json`);

}

module.exports = deleteFile;
