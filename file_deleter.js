const fs = require('fs').promises;

async function fileDeleter(filePaths) {
    for (const filePath of filePaths) {
        try {
            await fs.unlink(filePath);
        }
        catch (err) {
            console.error('Error deleting file:', err);
        }
    }
}

module.exports = fileDeleter;

