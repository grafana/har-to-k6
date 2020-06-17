const isNaturalNumber = require('is-natural-number')

function sleep(spec) {
  if (isNaturalNumber(spec, { includeZero: true })) {
    const valueInSec = Number((spec / 1000).toPrecision(5))

    return `sleep(${valueInSec});`
  }

  return ''
}

module.exports = sleep
