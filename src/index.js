import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import config from './config'
//Connect mongodb
mongoose.connect(config.DB_URL)

const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

//Routes
const users = require('./routes/userRoute')
app.use('/users', users)
const articles = require('./routes/articleRoute')
app.use('/articles', articles)

//Start the server
const port = process.env.PORT || 3000

app.listen(port)
console.log('Server listening at',port)