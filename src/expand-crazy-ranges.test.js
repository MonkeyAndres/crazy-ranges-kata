const { expandRanges } = require('./expand-crazy-ranges')

const scenarios = [
  { input: '1-3', expected: [1, 2, 3] },
  { input: '1-10', expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },

  // PREFIX
  { input: 'A1-A3', expected: ['A1', 'A2', 'A3'] },
  {
    input: 'A1-A10',
    expected: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
  },

  // SUFIX
  { input: '1A-3A', expected: ['1A', '2A', '3A'] },
  {
    input: '1A-10A',
    expected: ['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '9A', '10A'],
  },

  // MULTI-LETTER RANGE
  {
    input: 'A1-B4',
    expected: ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'],
  },
  {
    input: 'A1-C3',
    expected: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'],
  },
  {
    input: '1A-4B',
    expected: ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B'],
  },
  {
    input: '1A-3C',
    expected: ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'],
  },
]

const invalidScenarios = ['1-1A', 'A1-1', 'A1-1A']

describe('expandRanges()', () => {
  for (let { input, expected } of scenarios) {
    it(`Case: "${input}"`, () => {
      const output = expandRanges(input)

      expect(Array.isArray(output)).toBeTruthy()
      expect(output).toHaveLength(expected.length)
      expect(output.sort()).toEqual(expected.sort())
    })
  }

  for (let input of invalidScenarios) {
    it(`Invalid case: "${input}"`, () => {
      expect(() => expandRanges(input)).toThrow()
    })
  }
})
