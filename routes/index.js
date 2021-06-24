const FOLDER = './pdfs/'
const express = require('express');
const path = require("path");
const router = express.Router();
module.exports = function (app, fs) {

    app
        .use(express.static('html'))
        .get('/', function(req, res) {
            res.sendFile(path.join(`./html/`, 'index.html', ))})
        // .get('/', (_, res) => res.json({route: 'root'}))
        .get('/files', (_, res) => {
            const files = fs.readdirSync(FOLDER).filter(f => f.split('.').reverse()[0].toLowerCase() === 'pdf')

            res.json({files})
        })
        .get('/files/:filename', (req, res) => {

            const fileName = `${FOLDER}${req.params.filename}`

            const file = fs.createReadStream(fileName),
                stat = fs.statSync(fileName);


            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename=${fileName}`);

            file.pipe(res);
            
        })
}
