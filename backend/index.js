const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Note = require('./model/note')

let notes = []

app.use(express.json())
app.use(cors()) // Permite conexiones cruzadas, es decir de diferentes dominios

app.use(express.static('build'))

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if(error.name === 'CastError') res.status(400).send({error: 'malformated id'})
    else if(error.name === 'ValidationError') res.status(400).json({error: error.message})
    next(error)
}

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
    const note = {
        content: body.content,
        important: body.important
    }
    Note.findByIdAndUpdate(request.params.id, note, {new: true})
        .then(updatedNote => response.json(updatedNote))
        .catch(err => next(err))
})

app.get('/', (req, res) => {
    res.send("<h1>Hola mundo</h1>")
})

app.post('/api/notes', (request, response) => {
    const body = request.body
    if(!body.content) return response.status(400).json({error: 'Content missing'})
    const note = new Note({
        content: body.content,
        date: new Date(),
        important: body.important || false
    })
    note.save()
        .then(noteSaved => noteSaved.toJSON())
        .then(formatedNote => response.json(formatedNote))
        .catch(err => next(err))
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(res => response.json(res))
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(res => {
        response.json(res)
    }).catch(err => next(err))
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

const unknownEndpoint = (req, res, next) => {
    res.status(404).send({error: 'Not found'})
}
app.use(unknownEndpoint)

app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () => console.log(`Server running on port ${port}: http://localhost:${port}`))