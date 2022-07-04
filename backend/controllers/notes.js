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

notesRouter.post('/', async (request, response) => {
    const body = request.body
    if(!body.content) return response.status(400).json({error: 'Content missing'})
    const note = new Note({
        content: body.content,
        date: new Date(),
        important: body.important || false
    })
    response.json(await note.save())
})

notesRouter.get('/', async (request, response) => response.json(await Note.find({})))

notesRouter.get('/:id', async (request, response, next) => response.json(await Note.findById(request.params.id)))

module.exports = notesRouter