const string = require('../string')
const { isNil } = require('../../aid')

/*
 * Address without variable
 * Query without variable
 */
function constructed(spec, factor) {
  const address = new URL(spec.address)
  query(spec, address)
  factor.address = string(address.toString())
}

function query(spec, address) {
  for (const [key, items] of spec.query) {
    for (const { value } of items) {
      address.searchParams.append(key, isNil(value) ? '' : value)
    }
  }
}

module.exports = constructed
