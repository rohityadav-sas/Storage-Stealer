const splitFile = require('split-file');

async function fileSplitter(input, output) {
    try {
        const names = await splitFile.splitFileBySize(input, 50 * 1024, output);
        return names;
    }
    catch (err) {
        console.error('Error splitting file:', err);
    }
}


module.exports = fileSplitter;