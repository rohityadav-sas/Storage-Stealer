const fs = require('fs');

function file_info_store(file, fileData) {
    fs.writeFileSync(`./uploaded_files/${file}.json`, JSON.stringify(fileData, null, 2));
}

module.exports = file_info_store;