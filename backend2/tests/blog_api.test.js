const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const helper = require('./blog_helper')
const Blog = require('../model/blog')
const api = supertest(app)

beforeEach(async() => {
    await Blog.deleteMany({})
    // const promises = helper.initialBlogs.map(blog => new Blog(blog).save())
    for(let blog of helper.initialBlogs) await new Blog(blog).save()
    // await Promise.all(promises)
})

describe("getting blogs", () => {
    test('Correct GET of blogs', async() => {
        const response = await api.get('/api/blog').expect(200).expect('Content-Type', "application/json; charset=utf-8")
        expect(response.body.length).toBe(3)
    })
    
    test('The "id" property exists', async() => {
        const blogs = await Blog.find({})
        const promises = blogs.map(blog => expect(blog.id).toBeDefined())
    })
})

describe('adding blog', () => {
    test("a correct blog can be added", async() => {
        await new Blog({
            title: "El programador pragmático",
            author: "Andrew Hunt",
            url: "https://www.amazon.es/dp/8441545871",
            likes: 782
        }).save()
        const blogs = await Blog.find({})
        expect(blogs.length).toBe(helper.initialBlogs.length+1)
    })
    
    test("like value 0 by default", async() => {
        const newBlog = {
            title: "El libro del hacker",
            author: "María Angeles Caballero",
            url: "https://www.amazon.es/dp/8441544336/",
        }
        await api.post('/api/blog').send(newBlog).expect(200)
        const blogs = await Blog.find({})
        misBlogs = blogs.map(blog => {
            return {author: blog.author, url: blog.url, title: blog.title, likes: blog.likes}
        })
        newBlog.likes = "0"
        expect(misBlogs).toContainEqual(newBlog)
    })
    
    test("Invalid POST = Invalid adding", async() => {
        const newBlog = {likes: "10"}
        await api.post('/api/blog').send(newBlog).expect(400)
    })
})

describe('editing blog', () => {
    test('Valid editting of blog', async() => {
        const blogs = await Blog.find({})
        await api.put(`/api/blog/${blogs[0].id}`).send({likes: "50"}).expect(200).expect('Content-Type', 'application/json; charset=utf-8')
    })
})

describe('deletting blog', () => {
    test('Valid deleting of infomation', async() => {
        const blogs = await Blog.find({})
        await api.delete(`/api/blog/${blogs[0].id}`).expect(204)
    })
})

afterAll(async() => {
    mongoose.connection.close()
})