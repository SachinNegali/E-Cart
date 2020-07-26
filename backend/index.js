require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
})


const port = process.env.PORT || 8880;

app.listen(port, () => {
    console.log(`APP RUNNING AT ${port}`);
})