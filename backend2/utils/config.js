require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

const exported = {PORT, MONGODB_URI}

module.exports = exported