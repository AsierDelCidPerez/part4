const dummy = require('../utils/list_helper').dummy

test('dummy returns 1', () => {
    expect(dummy([342, 32234, 2342354])).toBe(1)
})