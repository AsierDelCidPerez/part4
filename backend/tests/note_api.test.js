const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)
const Note = require('../model/note')
const helper = require('./test_helper')

const initialNotes = [
    {content: 'HTML is easy',    date: new Date(),    important: false,  },  {    content: 'Browser can execute only Javascript',    date: new Date(),    important: true}
]

beforeEach(async () => {
    await Note.deleteMany({})
    await new Note(initialNotes[0]).save()
    await new Note(initialNotes[1]).save()
})

test('Correct Output of API', async () => {
    await api.get('/api/notes')
    .expect(200)
    .expect("Content-type", 'application/json; charset=utf-8')
})

test("note without content CAN'T be added", async () => {
    const newNote = {date: new Date()}
    await api.post("/api/notes").send(newNote).expect(400)
    const notes = await helper.getNotes()
    expect(notes).toHaveLength(initialNotes.length)
})

test('a valid note can be added', async() => {
    const newNote = {
        content: "async/await simlifies the code",
        date: new Date(),
        important: false
    }
    await api.post('/api/notes').send(newNote).expect(200).expect('Content-Type', /application\/json/)
    const contents = (await helper.getNotes()).map(r => r.content)
    expect(contents.map(r => r.content)).toHaveLength(initialNotes.length +1)
})


afterAll(() => mongoose.connection.close())