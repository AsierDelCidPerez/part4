const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if(error.name === 'CastError') res.status(400).send({error: 'malformated id'})
    else if(error.name === 'ValidationError') res.status(400).json({error: error.message})
    else if(error.name === 'JsonWebTokenError') res.status(401).json({error: 'Invalid token'})
    next(error)
}

const unknownEndpoint = (req, res, next) => {
    res.status(404).send({error: 'Not found'})
}

module.exports = {errorHandler, unknownEndpoint}