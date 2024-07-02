const sf = require('split-file');

async function fileMerger(files, output) {
    try {
        await sf.mergeFiles(files, output);
    }
    catch (err) {
        console.error('Error merging files:', err);
    }
}

module.exports = fileMerger;