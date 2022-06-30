const http = require('http')
const app = require('./App')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => console.log(`Running on: http://localhost:${config.PORT}/`))

