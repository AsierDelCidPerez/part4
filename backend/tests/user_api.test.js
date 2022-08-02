const supertest = require('supertest')
const app = require('../app')
const User = require('../model/user')
const api = supertest(app)
const bcrypt = require('bcrypt')

beforeEach(async() => {
    await User.deleteMany({})
    const passwordHash = bcrypt.hash('sekret', 10)
    const newUser = new User({
        username: 'root', 
        password: passwordHash,
        name: 'administrator'
    })
    await newUser.save()
})

describe('Creating users...', () => {
    test('Creating user with correct info', async() => {
        const usersAtStart = await User.find({})
        const newUser = {
            username: 'rgarcia',
            name: 'Rodrigo',
            password: '1234'
        }
        const resultado = await api.post('/api/users')
                .send(newUser)
                .expect(200)
        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1)
    })

    test('Creating user with used username', async() => {
        const usersAtStart = await User.find({})
        const newUser = {
            username: 'root',
            name: 'Administador 328',
            password: 'sekret852'
        }
        const resultado = await api.post('/api/users')
                .send(newUser)
        // expect(resultado.body).toContain('`username` to be unique')
        const usersAtEnd = await User.find({})
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})