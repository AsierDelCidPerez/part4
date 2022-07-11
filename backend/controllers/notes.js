const notesRouter = require('express').Router()
const Note = require('../model/note')

notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
})
  
notesRouter.put('/:id', async (request, response) => {
    const body = request.body
    const note = {
        content: body.content,
        important: body.important
    }
    response.json(await Note.findByIdAndUpdate(await request.params.id, note, {new: true}))
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

notesRouter.get('/', async (_, response) => response.json(await Note.find({})))

notesRouter.get('/:id', async (request, response) => response.json(await Note.findById(request.params.id)))

module.exports = notesRouter