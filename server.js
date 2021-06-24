const express = require('express')
const fs = require('fs')

var PORT = process.env.PORT || 3000;

const app = express()
require('./routes') (app, fs);

app.listen(PORT, () =>
    console.log(`Listening on http://localhost:${PORT}`)
    
)
