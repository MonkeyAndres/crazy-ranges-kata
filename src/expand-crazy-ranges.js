const PREFIX_RANGE_REGEXP = /^([A-Z]{1})([0-9]+)-([A-Z]{1})([0-9]+)/i
const SUFFIX_RANGE_REGEXP = /^([0-9]+)([A-Z]{1})-([0-9]+)([A-Z]{1})/i
const NUMBER_RANGE_REGEXP = /^([0-9]+)-([0-9]+)/i

const generateNumberRange = (from, to) => {
  if (!from || !to) {
    return []
  }

  return Array(to - from + 1)
    .fill()
    .map((_, i) => from + i)
}

const generateLetterRange = (from, to) => {
  if (!from || !to) {
    return []
  }

  const fromCharCode = from.charCodeAt(0)
  const toCharCode = to.charCodeAt(0)

  return Array(toCharCode - fromCharCode + 1)
    .fill()
    .map((_, i) => String.fromCharCode(fromCharCode + i))
}

const cartesianProduct = (list1, list2) =>
  list1.flatMap((item1) => list2.map((item2) => [item1, item2].join('')))

const multiCartesianProduct = (...lists) =>
  lists.filter((l) => l.length > 0).reduce(cartesianProduct)

const generateExpandedRange = (rangeStart, rangeEnd) => {
  const [prefixStart, start, sufixStart] = rangeStart
  const [prefixEnd, end, sufixEnd] = rangeEnd

  const prefixRange = generateLetterRange(prefixStart, prefixEnd)
  const numberRange = generateNumberRange(
    parseInt(start, 10),
    parseInt(end, 10),
  )
  const sufixRange = generateLetterRange(sufixStart, sufixEnd)

  return multiCartesianProduct(prefixRange, numberRange, sufixRange)
}

const expandRanges = (input) => {
  if (PREFIX_RANGE_REGEXP.test(input)) {
    const [, prefixStart, start, prefixEnd, end] =
      input.match(PREFIX_RANGE_REGEXP)

    return generateExpandedRange([prefixStart, start], [prefixEnd, end])
  }

  if (SUFFIX_RANGE_REGEXP.test(input)) {
    const [, start, sufixStart, end, sufixEnd] =
      input.match(SUFFIX_RANGE_REGEXP)

    return generateExpandedRange([, start, sufixStart], [, end, sufixEnd])
  }

  if (NUMBER_RANGE_REGEXP.test(input)) {
    const [, start, end] = input.match(NUMBER_RANGE_REGEXP)

    return generateExpandedRange([, start], [, end])
  }

  throw new Error('Invalid input')
}

module.exports = { expandRanges }
