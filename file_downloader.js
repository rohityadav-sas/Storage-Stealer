const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const BOT_TOKEN = process.env.TOKEN;

async function fileDownloader(fileDatas) {
    for (const fileData of fileDatas) {
        try {
            const fileDataResponse = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileData.file_id}`);
            const filePath = fileDataResponse.data.result.file_path;
            const downloadUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
            const downloadResponse = await axios({
                url: downloadUrl,
                method: 'GET',
                responseType: 'stream',
            });
            const localFilePath = `./output/${fileData.file_name}`;
            const writer = fs.createWriteStream(localFilePath);
            downloadResponse.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }
}

module.exports = fileDownloader;