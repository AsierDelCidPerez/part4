const average = require('../utils/for_testing').average

describe('average', () => {
    test('average of a single number', () => {
        expect(average([1])).toBe(1)
    })
    test('average of some numbers', () => {
        expect(average([1, 2, 3, 4, 5])).toBe(3)
    })
    test('average of a void matrix', () => {
        expect(average([])).toBe(0)
    })
})