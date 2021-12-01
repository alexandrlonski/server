require('dotenv').config()
const express = require('express')
const models = require('./models/models')
const sequelize = require('./db')

const PORT = process.env.PORT || 8080;

const app = express(); //create server

const start = async () => {
    try {
       await sequelize.authenticate() // Connect with database
       await sequelize.sync() // sync with database
       app.listen(PORT, () => console.log(`Server started omn port ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()