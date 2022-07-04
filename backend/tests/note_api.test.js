const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)
const Note = require('../model/note')
const notesRouter = require('../controllers/notes')

const initialNotes = [
    {content: 'HTML is easy',    date: new Date(),    important: false,  },  {    content: 'Browser can execute only Javascript',    date: new Date(),    important: true}
]

beforeEach(async () => {
    await Note.deleteMany({})
    initialNotes.forEach(async element => await new Note(element).save());
})

test('Correct Output of API', async () => {
    await api.get('/api/notes')
    .expect(200)
    .expect("Content-type", 'application/json; charset=utf-8')
})

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')
    // console.log(response.body)
    expect(response.body[0].content).toBe('HTML is easy')
  })
test('The BBDD should contains 2 elements', async () => {
    const response = await api.get('/api/notes')
    expect(response.body.length).toBe(2)
})

afterAll(() => {
    mongoose.connection.close()
})