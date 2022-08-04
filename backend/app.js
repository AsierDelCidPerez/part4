const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
require('express-async-errors')
const logger = require('./utils/logger')
const userRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const {errorHandler, unknownEndpoint} = require('./utils/middleware')
const loginRouter = require('./controllers/login')

logger.info(`connecting to ${config.PORT}`)

mongoose.connect(config.MONGODB_URI)
        .then(() => logger.info('Connected to MONGODB'))
        .catch(err => logger.error(`Error connecting to MongoDB: ${err.message}`))

app.use(express.json())
app.use(cors()) // Permite conexiones cruzadas, es decir de diferentes dominios
app.use(express.static('build'))

app.use('/api/notes', notesRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app