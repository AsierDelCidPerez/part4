const favoriteBlog = require('../utils/list_helper').favoriteBlog
const blogs = require('./blogs')

test('favorite blog', () => {
    const resultado = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
    expect(favoriteBlog(blogs)).toEqual(resultado)
})