# CrazyRanges Kata

In this kata you'll be implementing a range generator and a range parser. Sound easy huh? Well, we're not talking about normal ranges, the ranges in this kata are special. We can have 3 types of range components:

- Simple numbers: `1, 2, 3, 4, 5...`
- Numbers prefixed with a **single** letter: `A1, A2, A3, C1, C2, C3...`
- Numbers suffixed with a **single** letter: `1A, 2A, 3A, 1C, 2C, 3C...`

Also the ranges follow some special rules:

- Ranges are always a group of 2 of the previous components joined by a `-` character
- They can only be formed with same type components. E.g. `A1-B3`, `1A-3B`
- Ranges are going to contain max 1 letter either suffix or prefix but not both
- Range components are always going to be positive
- Always asume that the starting component is going to be prior to the second one (if you feel brave enough you can skip this rule)

## Expanding ranges

Write a function that could transform a range definition into a list of all the items inside the range.

Requirements:
- For numeric ranges like `1-3` we should generate `[1, 2, 3]`
- For mixed ranges like `A1-A3` we should generate `[A1, A2, A3]`
- For mixed ranges like `A1-B3` we should generate `[A1, A2, A3, B1, B2, B3]`

> You can see more examples in the [written test](./src/expand-crazy-ranges.test.js) for this ranges. Feel free to edit and add your own tests and special cases to ensure that the function is well tested.

If you feel like this katas are too easy for you try implementing a solution differently, maybe use some functional programing or do it with OOP. Furthermore, code quality is valued a lot so try to run your solution as clean as possible following good practices.

## Contract existing ranges

Coming soon!