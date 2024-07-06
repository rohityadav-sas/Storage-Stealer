const express = require('express');
const multer = require('multer');
require('dotenv').config();

const splitBuffer = require('./splitBuffer');
const fs = require('fs').promises;
const uploadFile = require('./file_uploader');
const fileDownloader = require('./file_downloader');
const file_info_store = require('./file_info_store');
const removeExtension = require('./remove_extension');

const app = express();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', async (req, res) => {
    const files = await fs.readdir('./uploaded_files');
    let fileContent = [];
    if (files.length > 0) {
        for (let file of files) {
            if (file.endsWith('.json')) {
                const data = await fs.readFile(`./uploaded_files/${file}`, 'utf-8');
                fileContent.push(JSON.parse(data));
            }
        }
    }
    res.render('index', { fileContent });
});

app.post('/upload', upload.single('fileName'), async (req, res) => {
    const filename = removeExtension(req.file.originalname);
    const { chunks, chunkSizes } = splitBuffer(req.file.buffer, 3 * 1024 * 1024);
    const fileData = await uploadFile(chunks, filename);
    const fileData2 = {
        [req.file.originalname]: [...fileData]
    }
    await file_info_store(req.file.originalname, fileData2);
    res.send('File uploaded successfully');
});

app.post('/download', async (req, res) => {
    const receivedFiles = req.body;
    const file_name = Object.keys(receivedFiles)[0];
    const fileData = receivedFiles[file_name];
    await fileDownloader(fileData, file_name);
    res.send("Downloaded successfully");
});


app.listen(process.env.PORT, () => {
    console.log("listening on port 3000");
});

