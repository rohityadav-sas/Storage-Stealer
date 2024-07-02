const uploadFile = require('./file_uploader');
const fileSplitter = require('./file_splitter');
const fileDeleter = require('./file_deleter');
const fileMerger = require('./file_merger');
const file_info_store = require('./file_info_store');
const fileDownloader = require('./file_downloader');

const input = 'nature.jpg';
const ouput = './output';

async function main() {
    const files = await fileSplitter(input, ouput)
    const fileData = await uploadFile(files)
    fileDeleter(files);
    file_info_store(input, fileData);
}

main();


