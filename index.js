const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3000
app.get('/', (req, res) => {
    console.log("starting")
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(path.join(__dirname, 'dist/index.html'))
    //res.end("refreshed")
})
app.listen(port, () => {
    console.log(`running on ${port}`);
});