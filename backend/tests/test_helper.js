const Note = require('../model/note')
const initialNotes = [
    {
      content: 'HTML is easy',
      date: new Date(),
      important: false
    },
    {
      content: 'Browser can execute only Javascript',
      date: new Date(),
      important: true
    }
]

const getNonExistingId = async() => {
    const miNote = new Note({content: 'this will be removed soon', date: new Date()})
    await (await miNote.save()).remove()
    return miNote._id.toString()
}

const getNotes = async() => await Note.find({})

module.exports = {getNonExistingId, getNotes}