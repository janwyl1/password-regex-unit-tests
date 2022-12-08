# Password Regex Unit Test

Testing a password regex using [Vitest](https://vitest.dev/)

For the Parallax frontend training 08/12/2022

Uses boundary value analysis and equivalence partitioning to generate cases

These are just examples, its not an exhaustive list. Logic may be flawed! (its hard)

## Requirements
- At least 10 characters 
- Includes at least 3 of the following 4 types of characters: a lower-
case letter, an upper-case letter, a number, a special character (such as @$!#%*?&)
- No more than 2 identical characters in a row (for example, 111 is not allowed)

## Installation

Clone the repo and run `yarn install`

Run the tests with `yarn test`

Generate test coverage report with `yarn coverage`