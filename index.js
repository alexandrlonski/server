require('dotenv').config()
const express = require('express')
const models = require('./models/models')
const sequelize = require('./db')
const cors = require('cors')

const PORT = process.env.PORT || 8080;

const app = express(); //create server
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
 res.status(200).json({message: "WORKING!"})
})

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