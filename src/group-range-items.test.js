const { groupRangeItems } = require('./group-range-items')

// NOTE: Feel free to enable and disable test to your like

const scenarios = [
  { enabled: true, input: [1, 2, 3], expected: ['1-3'] },
  { enabled: true, input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], expected: ['1-10'] },

  // PREFIX
  { enabled: false, input: ['A1', 'A2', 'A3'], expected: ['A1-A3'] },
  {
    enabled: false,
    input: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
    expected: ['A1-A10'],
  },

  // SUFIX
  { enabled: false, input: ['1A', '2A', '3A'], expected: ['1A-3A'] },
  {
    enabled: false,
    input: ['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '9A', '10A'],
    expected: ['1A-10A'],
  },

  // MULTI-LETTER RANGE
  {
    enabled: false,
    input: ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'],
    expected: ['A1-A4', 'B1-B4'],
  },
  {
    enabled: false,
    input: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'],
    expected: ['A1-A3', 'B1-B3', 'C1-C3'],
  },
  {
    enabled: false,
    input: ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B'],
    expected: ['1A-4A', '1B-4B'],
  },
  {
    enabled: false,
    input: ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'],
    expected: ['1A-3A', '1B-3B', '1C-3C'],
  },

  // FINAL BOSS
  {
    enabled: false,
    input: [
      '10A',
      '11A',
      '12A',

      '13B',

      '20C',

      '1',
      '4',
      '14B',
      '5',
      '9',

      'A13',
    ],
    expected: ['10A-12A', '13B-14B', '20C', '1', '4-5', '9', 'A13'],
  },
]

const invalidScenarios = ['A1-1', 'A1-1', 'A1-1A']

describe('groupRangeItems()', () => {
  for (let { enabled, input, expected } of scenarios) {
    if (!enabled) {
      continue
    }

    it(`Case: "${input}"`, () => {
      const output = groupRangeItems(input)

      expect(Array.isArray(output)).toBeTruthy()
      expect(output).toHaveLength(expected.length)
      expect(output.sort()).toEqual(expected.sort())
    })
  }

  for (let input of invalidScenarios) {
    it(`Invalid case: "${input}"`, () => {
      expect(() => groupRangeItems(input)).toThrow()
    })
  }
})
