const logger = require("./logger")

const errorHandler = (error, request, response, next) => {
    console.log(error)
    if(error.name === 'ValidationError') logger.info(`Error de validación: ${error.message}`)
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).json({error: 'Not found'})
}

const exported = {errorHandler, unknownEndpoint} 
module.exports = exported