const string = require('../string')

/*
 * Address without variable
 * No query
 */
function fixed(spec, factor) {
  factor.address = string(spec.address)
}

module.exports = fixed
