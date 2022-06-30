const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('./blogs')

test('most blogs test', () => {
    expect(mostBlogs(blogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
})