const notesRouter = require('express').Router()
const Note = require('../model/note')
const User = require('../model/user')
const jwt = require('jsonwebtoken')

notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
})
  
const getTokenFrom = request => {
    const auth = request.get('authorization')
    if(auth && auth.toLowerCase().startsWith('bearer')){
        return auth.substring(7)
    }
    return null
}

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
    const token = getTokenFrom(request)
    const obj = jwt.verify(token, process.env.SECRET)
    if(!obj){
        return response.status(401).json({error: "Token invalid or missing"})
    }
    const user = await User.findById(obj.id)
    if(!body.content) return response.status(400).json({error: 'Content missing'})
    const note =  new Note({
        content: body.content,
        date: new Date(),
        important: body.important || false,
        user: user.userId
    })
    const result = await note.save()
    // console.log(result)
    user.notes = user.notes.concat(result._id)
    await user.save()
    response.json(note)
})

notesRouter.get('/', async (req, response) => {
    /* const token = getTokenFrom(req)
    const obj = jwt.verify(token, process.env.SECRET)
    if(!obj){
        response.status(401).json({error: 'token missing or invalid'})
    }
    const notes = await Note.find({user: obj.id}) */
    const notes = await Note.find({}).populate('users')
    response.json(notes)
})

notesRouter.get('/:id', async (request, response) => response.json(await Note.findById(request.params.id)))

module.exports = notesRouter