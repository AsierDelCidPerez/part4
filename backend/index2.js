const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "032-58392",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "032-28126",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "032-85211",
    },
    {
        id: 4,
        name: "Mary Popendick",
        number: "032-394214",
    }
]

app.use(cors())
app.use(express.json())
morgan.token('body', function (req, res) { 
    return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req, res)
    ].join(' ')
  })
)

app.get('/info', (request, response) => {
    response.send(`<span>Phonebook has info for ${persons.length} people</span><br/><span>${new Date()}</span>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(person => person.id === id)
    if(note){
        response.json(note)
    }else{
        response.status(400).end()
    }
})

app.post('/api/persons', (request, response) => {
    const getId = () => Math.trunc(Math.random()*10000)
    const validar = persona => {
        if(persons.filter(p => p.name === persona.name).length > 0) return false
        if(persona.name.length === 0 && persona.name.length === 0) return false
        return true
    }
    const body = request.body
    const person = {
        name: body.name,
        number: body.number,
        id: getId()
    }
    console.log(person)

    if(person.name && person.number){
        if(validar(person)){
            persons = persons.concat(person)
            response.json(person)
        }else{
            response.status(400).json({error: "Name must be unique"})
        }
    }else{
        response.status(400).json({error: "You must complete the fields"})
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(n => n.id !== id)
    response.status(204).end()
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/', (request, response) => {
    response.send("<h1>Servidor de Personas</h1>")
})

app.listen(3001, () => console.log(`Server running on: http://localhost:3001`))