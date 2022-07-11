const blogRouter = require('express').Router()
const Blog = require('../model/blog')

blogRouter.get('/', async(_, response) => response.json(await Blog.find({})))

blogRouter.get('/:id', async(request, response) => response.json(await Blog.findById(request.params.id)))

blogRouter.delete('/:id', async(request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async(request, response) => {
    const body = request.body
    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    response.json(await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true}))

})

blogRouter.post('/', async(request, response) => {
    const body = request.body
    if(!body.author && !body.title) response.status(400).end()
    else{
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: !body.likes ? "0": Number.parseInt(body.likes)
        })
        response.json(await blog.save())
    }
})

module.exports = blogRouter