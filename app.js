const { response } = require('express');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/twitter-routes')
require('dotenv/config')

app.use('/', routes)

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
    mongoose.connect(
        process.env.DB_CONNECT, 
        { useUnifiedTopology: true, useNewUrlParser: true }, 
        () => console.log('Connected to Database')
    )
});