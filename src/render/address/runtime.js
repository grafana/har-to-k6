const query = require('./query')
const text = require('../text')
const { variableStart } = require('../../expression')

/*
 * Runtime manipulation needed
 *
 * Any of:
 * - Address with variable at start
 * - Address with variable + query
 * - Query with variable
 */
function runtime(spec, factor) {
  parse(spec.address, factor)
  protocol(spec.address, factor)
  query(spec.query, factor)
  factor.address = `address.toString()`
}

function parse(address, factor) {
  factor.pre.push(`address = new URL(${text(address)});`)
}

function protocol(address, factor) {
  if (variableStart.test(address)) {
    factor.pre.push(
      `
if (!address.protocol) {
  address.protocol = "https";
}
`
    )
  }
}

module.exports = runtime
