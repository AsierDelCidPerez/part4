const palindrome = require('../utils/for_testing').palindrome

describe('palindrome', () => {
    test(`Test for 'a'`, () => {
        expect(palindrome('a')).toBe('a')
    })
    test(`Test for 'React'`, () => {
        expect(palindrome('react')).toBe('tcaer')
    })
    test(`Test for 'releveler'`, () => {
        expect(palindrome('releveler')).toBe('releveler')
    })
})