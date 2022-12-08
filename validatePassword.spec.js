import { describe, expect, it, vi } from 'vitest';
import validatePassword from './validatePassword';

// Test Cases
// at least 10 characters 
// includes at least 3 of the following 4 types of characters: 
//  a lower-case letter, an upper-case letter, a number, a special character (such as !@#$%^&* ). 
// Not more than 2 identical characters in a row (for example, 111 is not allowed).


describe('Validate Password', () => {

    describe('Test length', () => {
        it('should accept a 10 character length password', () => {
            const password = 'Abc1defgh$'
            expect(validatePassword(password)).toBeTruthy()
        })
    
        it('should accept an 11 character length password', () => {
            const password = 'Abc1defgh$%'
            expect(validatePassword(password)).toBeTruthy()
        })

        it('should reject a 9 character length password', () => {
            const password = 'Abc1defg!'
            expect(validatePassword(password)).toBeFalsy()
        })
    })

    describe('Test allowed character types', () => {
        it('should accept a password containing 4 of 4 character types (uppercase, lowercase, number, special char)', () => {
            const password = 'Abc2defgh&^'
            expect(validatePassword(password)).toBeTruthy()
        })
    
        it('should accept a password containing 3 of 4 character types (lowercase, number, special char)', () => {
            const password = 'abc1defgh!'
            expect(validatePassword(password)).toBeTruthy()
        })

        it('should accept a password containing 3 of 4 character types (uppercase, number, special char)', () => {
            const password = 'Abcdefghi#'
            expect(validatePassword(password)).toBeTruthy()
        })

        it('should accept a password containing 3 of 4 character types (uppercase, lowercase, number)', () => {
            const password = 'Abc1defghi'
            expect(validatePassword(password)).toBeTruthy()
        })

        it('should reject a password containing 2 of 4 character types (uppercase, lowercase)', () => {
            const password = 'ABCDEfghij'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 2 of 4 character types  (uppercase, number)', () => {
            const password = 'ABCDE12345'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 2 of 4 character types (uppercase, special char)', () => {
            const password = 'ABCDE@$!%*'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 2 of 4 character types (lowercase, number)', () => {
            const password = 'abcde12345'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 2 of 4 character types (lowercase, special char)', () => {
            const password = 'abcde?&#£$'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 2 of 4 character types (number, special char)', () => {
            const password = '12345@$!£$'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 1 of 4 character types (uppercase)', () => {
            const password = 'ABCDEFGHIJ'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 1 of 4 character types (lowercase)', () => {
            const password = 'abcdefghij'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 1 of 4 character types (number)', () => {
            const password = '1234567890'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 1 of 4 character types (special char)', () => {
            const password = '@$!%*?&#£$'
            expect(validatePassword(password)).toBeFalsy()
        })
    })

    describe('Test identical characters in a row', () => {
        it('should accept a password containing 2 identical characters in a row (2 of each)', () => {
            const password = 'AAbb11$$Cc'
            expect(validatePassword(password)).toBeTruthy()
        })

        it('should reject a password containing 3 identical characters in a row (3 of same uppercase char)', () => {
            const password = 'AAAbb11^%c'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 3 identical characters in a row (3 of same lowercase char)', () => {
            const password = 'Abbb11@&c*'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 3 identical characters in a row (3 of same number)', () => {
            const password = 'Ab111£?c23'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 3 identical characters in a row (3 of same special char)', () => {
            const password = 'Abc!!!2De*'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 4 identical characters in a row (4 of same uppercase char)', () => {
            const password = 'AAAAbb11$£'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 4 identical characters in a row (4 of same lowercase char)', () => {
            const password = 'Abbbb11*!c#'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 4 identical characters in a row (4 of same number)', () => {
            const password = 'Ab1111$%Cd'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing 4 identical characters in a row (4 of same special char)', () => {
            const password = 'Ab1****Cd!'
            expect(validatePassword(password)).toBeFalsy()
        })
    })

    describe('Test edge cases', () => {
        // These are just examples, not a complete set. Theres a lot of possible edge cases!
        it('should reject a password containing spaces', () => {
            const password = 'Abc1 efgh$'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing special chars outside of allowed list', () => {
            // This should probably pass, as the requirement mentioned "special characters such as...", it didnt provide a complete list of allowed special chars
            // See: https://owasp.org/www-community/password-special-characters for commonly used chars. Should probably support all of those
            const password = 'Abc1defg_(-h$'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing invisible chars', () => {
            // See: https://invisible-characters.com/
            const password = 'Abc1 efgh$'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing non-english chars', () => {
            // Only testing a single Cryillic char here, other languages include Hebrew, Arabic, Greek Chinese, Japanese
            // Many of these aren't ascii characters
            const password = 'А̀Bc1defgh!'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing extended ascii chars', () => {
            // See: https://www.ascii-code.com/
            const password = 'Abc1defg£†'
            expect(validatePassword(password)).toBeFalsy()
        })

        it('should reject a password containing emojis', () => {
            // See: https://www.freecodecamp.org/news/all-emojis-emoji-list-for-copy-and-paste/
            const password = 'Abc1😀!egh@'
            expect(validatePassword(password)).toBeFalsy()
        })


    })
})