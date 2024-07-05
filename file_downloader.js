const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const BOT_TOKEN = process.env.TOKEN;

async function fileDownloader(fileDatas, file_name) {
    let mergedBuffer = null;
    for (const fileData of fileDatas) {
        try {
            const fileDataResponse = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileData.file_id}`);
            const filePath = fileDataResponse.data.result.file_path;
            const downloadUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
            const downloadResponse = await axios({
                url: downloadUrl,
                method: 'GET',
                responseType: 'arraybuffer',
            });
            const fileBuffer = Buffer.from(downloadResponse.data, 'binary');
            if (!mergedBuffer) {
                mergedBuffer = fileBuffer;
            } else {
                mergedBuffer = Buffer.concat([mergedBuffer, fileBuffer]);
            }
        } catch (error) {
            console.log('Error downloading file:', error);
        }
    }
    fs.writeFileSync(`./downloads/${file_name}`, mergedBuffer);
}

module.exports = fileDownloader;