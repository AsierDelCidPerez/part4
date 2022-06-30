const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('./blogs')



mostLikes(blogs)
test('Most likes', () => {
    expect(mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
})