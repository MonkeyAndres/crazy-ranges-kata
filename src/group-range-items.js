const NUMBER_COMPONENT_REGEXP = /^\d+$/
const PREFIX_COMPONENT_REGEXP = /^([a-z]{1})(\d+)$/i
const SUFFIX_COMPONENT_REGEXP = /^(\d+)([a-z]{1})$/i

const groupBy = (keyExtractor, list) => {
  const groups = list.reduce((acc, item) => {
    const groupKey = keyExtractor(item)

    if (!acc[groupKey]) {
      acc[groupKey] = [item]
    } else {
      acc[groupKey].push(item)
    }

    return acc
  }, {})

  return Object.values(groups)
}

const getBucketKeyForItem = (item) => {
  if (item.prefix) {
    return `prefix-${item.prefix}`
  }

  if (item.suffix) {
    return `suffix-${item.suffix}`
  }

  return 'numbers'
}

const parseRangeItem = (item) => {
  if (NUMBER_COMPONENT_REGEXP.test(item)) {
    return { number: parseInt(item, 10) }
  }

  if (PREFIX_COMPONENT_REGEXP.test(item)) {
    const [, prefix, number] = item.match(PREFIX_COMPONENT_REGEXP)
    return { prefix, number: parseInt(number, 10) }
  }

  if (SUFFIX_COMPONENT_REGEXP.test(item)) {
    const [, number, suffix] = item.match(SUFFIX_COMPONENT_REGEXP)
    return { number: parseInt(number, 10), suffix }
  }
}

const numbersToRange = (numbers) => {
  const sortedNumbers = numbers.sort((a, b) => a - b)

  let rangeStart = sortedNumbers[0]
  let lastRangeItem = sortedNumbers[0]

  return sortedNumbers.reduce((acc, _, index) => {
    const next = sortedNumbers[index + 1]

    if (next === lastRangeItem || next === lastRangeItem + 1) {
      lastRangeItem = next
      return acc
    }

    const oneNumberRange = rangeStart === lastRangeItem
    const range = oneNumberRange
      ? `${lastRangeItem}`
      : [rangeStart, lastRangeItem].join('-')

    rangeStart = next
    lastRangeItem = next

    return [...acc, range]
  }, [])
}

const groupRangeItems = (input) => {
  const bucketedItems = groupBy(getBucketKeyForItem, input.map(parseRangeItem))

  return bucketedItems.flatMap((group) => {
    const groupNumbers = group.map((item) => item.number)
    const numberRanges = numbersToRange(groupNumbers)

    const firstItem = group[0]

    return numberRanges.map((range) =>
      range
        .split('-')
        .map((extreme) => {
          if (firstItem.prefix) {
            return `${firstItem.prefix}${extreme}`
          }

          if (firstItem.suffix) {
            return `${extreme}${firstItem.suffix}`
          }

          return extreme
        })
        .join('-'),
    )
  })
}

module.exports = { groupRangeItems }
