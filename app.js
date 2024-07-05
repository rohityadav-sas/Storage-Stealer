const express = require('express');
const multer = require('multer');
require('dotenv').config();

const splitBuffer = require('./splitBuffer');
const fs = require('fs').promises;
const uploadFile = require('./file_uploader');
const file_info_store = require('./file_info_store');

const app = express();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('fileName'), async (req, res) => {
    const filename = req.file.originalname.split('.')[0];
    const { chunks, chunkSizes } = splitBuffer(req.file.buffer, 50 * 1024);
    const fileData = await uploadFile(chunks, filename);
    await file_info_store(req.file.originalname, fileData);
    res.send('File uploaded successfully');
});


app.listen(process.env.PORT, () => {
    console.log("listening on port 3000");
});

