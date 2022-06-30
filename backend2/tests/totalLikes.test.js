const totalLikes = require('../utils/list_helper').totalLikes
const blogs = require('./blogs')

describe('total likes', () => {
      test('Likes of a single blog', () => {
        const result = totalLikes([blogs[0]])
        expect(result).toBe(7)
      })

      test('Likes of some blogs', () => {
        const result = totalLikes(blogs)
        expect(result).toBe(36)
      })

      test('Likes of a void array', () => {
        const result = totalLikes([])
        expect(result).toBe(0)
      })
})