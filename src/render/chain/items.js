const item = require('./item')

function items(specs) {
  if (specs.length) {
    return specs.map((spec) => item(spec)).join(`\n`)
  } else {
    return null
  }
}

module.exports = items
