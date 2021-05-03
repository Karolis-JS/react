const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')
const path = require('path')
const mainRouter = require('./routers/router')
require('dotenv').config()


const app = express()
app.listen(8080)
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('connection successful')
    }).catch(e => {
    console.log(e)
    console.log('error while connection to db')
})


app.use(['/'], mainRouter)