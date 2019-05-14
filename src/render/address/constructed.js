const string = require('../string')
const URI = require('urijs')

/*
 * Address without variable
 * Query without variable
 */
function constructed (spec, factor) {
  const address = new URI(spec.address)
  query(spec, address)
  factor.address = string(address.toString())
}

function query (spec, address) {
  for (const [ key, items ] of spec.query) {
    for (const { value } of items) {
      address.addQuery(key, value)
    }
  }
}

module.exports = constructed
