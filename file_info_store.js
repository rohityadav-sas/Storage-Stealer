const fs = require('fs').promises;

async function file_info_store(file, fileData) {
    await fs.writeFile(`./uploaded_files/${file}.json`, JSON.stringify(fileData, null, 2));
}

module.exports = file_info_store;