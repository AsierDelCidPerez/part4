const logger = require("./logger")

const errorHandler = (error, request, response, next) => {
    console.log(error)
    if(error.name === 'ValidationError') response.status(400).end()
    else{
        logger.error(error)
    }
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).json({error: 'Not found'})
}

const getTokenFrom = (request, res, next) => {
    const auth = request.get('authorization')
    if(auth && auth.toLowerCase().startsWith('bearer')){
        request.token = auth.substring(7)
    }
    next()
}

const exported = {errorHandler, unknownEndpoint, getTokenFrom} 
module.exports = exported