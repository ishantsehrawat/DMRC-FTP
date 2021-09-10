const express = require('express');
const fileUpload = require('express-fileupload');
const serveIndex = require('serve-index');
const path = require('path');

const app = express();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,

    // SIZE LIMIT
    // limits: { fileSize: 1024 },
}))

app.set('view engine', 'ejs')

app.get('/upload', async (req, res, next) => {
    res.render('index')
})

app.post('/single', async (req, res, next) => {
    try {
        const file = req.files.mfile
        console.log(file)
        const fileName = new Date().getTime().toString() + path.extname(file.name)
        const savePath = path.join(__dirname, 'public', 'uploads', fileName)
        
// SIZE LIMIT
        // if(file.truncated) {
        //     throw new Error('File size is too big...')
        // }


        await file.mv(savePath)
        res.redirect('/upload')
    } catch (error) {
        console.log(error);
        res.send('Error uploading file')
    }
})

app.post('/multiple', async(req, res , next) => {
    try {
        const files = req.files.mfiles

        // let promises = []
        // files.forEach(file => {
        //     const savePath = path.join(__dirname, 'public', 'upload', file.name)
        //     promises.push(file.mv(savePath))
        // })
        

        const promises = files.map((file) => {
            const fileName = new Date().getTime().toString() + path.extname(file.name)
           const savePath = path.join(__dirname, 'public', 'upload', fileName)
           return file.mv(savePath)
        })

        await Promise.all(promises)
        res.redirect('/upload');
    } catch (error) {
        console.log(error);
        res.send('Error uploading file')
    }
})


// SERVER
// TODO: Download
// TODO: Drag unable
app.use(
    '/download',
    express.static('../../../../../../'),
    serveIndex('../../../../../../', {icons: true})
);

app.listen(5000, () => console.log('rocket on 5000...'));