const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const cors = require('cors')
const morgan = require('morgan')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)
.then(() => logger.info('Connected to MONGODB'))

app.use(express.json())

app.use(cors())
app.use(morgan('dev'))
app.use(express.static('build'))

app.use('/api/blog', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app