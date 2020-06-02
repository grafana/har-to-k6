const item = require('./item')
const order = require('./order')

function items(specs) {
  if (specs.length) {
    specs = [...specs]
    order(specs)
    return specs.map((spec) => item(spec)).join(`\n`)
  } else {
    return null
  }
}

module.exports = items
