const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const helper = require('./blog_helper')
const Blog = require('../model/blog')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const User = require('../model/user')

const getToken = async () => {
    const login = await api.post('/api/login').send({username: helper.newUser.username, password: helper.newUser.password}).expect(200)
    const token = login.body.token
    return `Bearer ${token}`
}

beforeEach(async() => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    // const promises = helper.initialBlogs.map(blog => new Blog(blog).save())
    const respuesta = await api.post('/api/users')
        .send(helper.newUser)
        .expect(200)
    console.log(await User.find({}))
    const token = await getToken()
    console.log(token.substring(7))
    const userGen = jwt.verify(token.substring(7), process.env.SECRET)
    const blog = helper.initialBlogs[0]
    blog.userId = userGen.id
    await api.post('/api/blogs')
            .send(blog)
            .set('Authorization', token)
    const myBlog = helper.initialBlogs[1]
    myBlog.userId = userGen.id
    await api.post('/api/blogs')
            .send(myBlog)
            .set('Authorization', token)
    // await Promise.all(promises)
})

describe("getting blogs", () => {
    test('Correct GET of blogs', async() => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', "application/json; charset=utf-8")
    })
    
    test('The "id" property exists', async() => {
        const blogs = await Blog.find({})
        const promises = blogs.map(blog => expect(blog.id).toBeDefined())
    })
})

describe('adding blog', () => {
    test("a correct blog can be added", async() => {
        const token = await getToken()
        const obj = jwt.verify(token.substring(7), process.env.SECRET)
        const miNewBlog = {
            title: "El programador pragmático",
            author: "Andrew Hunt",
            url: "https://www.amazon.es/dp/8441545871",
            likes: "782"
        }
        await api.post('/api/blogs')
                .send(miNewBlog)
                .set('Authorization', token)
                .expect(200)
        const blogs = await Blog.find({})
    })

    
    test("Unauthorized adding", async() => {
        const newBlog = {
            title: "El libro del hacker",
            author: "María Angeles Caballero",
            url: "https://www.amazon.es/dp/8441544336/"
        }
        await api.post('/api/blog').send(newBlog).expect(404)
    })
})

describe('deletting blog', () => {
    test('Valid deleting of infomation', async() => {
        const blogs = await Blog.find({})
        console.log(blogs[0])
        await api.delete(`/api/blogs/${blogs[0].id}`)
                    .set({Authorization: await getToken()})
                    .expect(204)
    })
    test('Invalid deleting of infomation', async() => {
        const blogs = await Blog.find({})
        await api.delete(`/api/blogs/${blogs[0].id}`).expect(401)
    })
})

afterAll(async() => {
    mongoose.connection.close()
})
