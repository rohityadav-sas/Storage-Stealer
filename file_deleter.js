const fs = require('fs').promises;

function fileDeleter(filePaths) {
    for (const filePath of filePaths) {
        try {
            fs.unlink(filePath);
        }
        catch (err) {
            console.error('Error deleting file:', err);
        }
    }
}

module.exports = fileDeleter;

