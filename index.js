require('dotenv').config()
const express = require('express')

const PORT = process.env.PORT || 8080;

const app = express(); //create server

app.listen(PORT, () => console.log(`Server started omn port ${PORT}`))

