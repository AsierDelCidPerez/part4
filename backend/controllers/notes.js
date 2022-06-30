const notesRouter = require('express').Router()
const Note = require('../model/note')

notesRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
})
  
notesRouter.put('/:id', (request, response, next) => {
    const body = request.body
    const note = {
        content: body.content,
        important: body.important
    }
    Note.findByIdAndUpdate(request.params.id, note, {new: true})
        .then(updatedNote => response.json(updatedNote))
        .catch(err => next(err))
})

notesRouter.post('/', (request, response) => {
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

notesRouter.get('/', (request, response) => {
    Note.find({}).then(res => response.json(res))
})

notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id).then(res => {
        response.json(res)
    }).catch(err => next(err))
})

module.exports = notesRouter