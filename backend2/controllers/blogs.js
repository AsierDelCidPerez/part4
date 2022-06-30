const blogRouter = require('express').Router()
const Blog = require('../model/blog')

blogRouter.get('/', (request, response) => {
    Blog.find({}).then(blog => response.json(blog))
})

blogRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then(blog => response.json(blog))
    .catch(err => next(err))
})

blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
    .catch(err => next(err))
})

blogRouter.put('/:id', (request, response, next) => {
    const body = request.body
    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
    .then(updatedNote => response.json(updatedNote))
    .catch(err => next(err))
})

blogRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save()
    .then(createdBlog => response.json(createdBlog))
    .catch(err => next(err))
})

module.exports = blogRouter