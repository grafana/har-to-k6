function sleep(spec) {
  if (spec) {
    const valueInSec = Number((spec / 1000).toPrecision(5))

    return `sleep(${valueInSec})`
  }

  return ''
}

module.exports = sleep
