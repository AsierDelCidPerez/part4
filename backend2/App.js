const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')
const usuarioRouter = require('./controllers/users')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const cors = require('cors')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGODB_URI)
.then(() => logger.info('Connected to MONGODB'))

app.use(middleware.getTokenFrom)

app.use(express.json())

app.use(cors())
app.use(morgan('dev'))
app.use(express.static('build'))

app.use('/api/blogs', blogRouter)
app.use('/api/users', usuarioRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app