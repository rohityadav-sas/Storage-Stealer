const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config();

const BOT_TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const uploadUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;

// async function uploadFile(filePaths) {
//     const fileData = [];
//     for (const filePath of filePaths) {
//         const fileStream = fs.createReadStream(filePath);
//         const formdata = FormData();
//         formdata.append('chat_id', CHANNEL_ID);
//         formdata.append('document', fileStream);
//         try {
//             const response = await axios.post(uploadUrl, formdata);
//             fileData.push(response.data.result.document);
//         } catch (error) {
//             console.error(error.response.data.description);
//         }
//     }
//     return fileData;
// }

async function uploadFile(buffers, fileName) {
    const fileData = [];
    let i = 0;
    for (const buffer of buffers) {
        const formdata = FormData();
        formdata.append('chat_id', CHANNEL_ID);
        formdata.append('document', buffer, { filename: `${fileName}.00${i}` });
        i++;
        try {
            const response = await axios.post(uploadUrl, formdata, {
                headers: formdata.getHeaders(),
            }
            );
            fileData.push(response.data.result.document);
        } catch (error) {
            console.error(error.response.data);
        }
    }
    return fileData;
}

module.exports = uploadFile;