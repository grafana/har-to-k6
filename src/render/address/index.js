const constructed = require('./constructed')
const fixed = require('./fixed')
const resolved = require('./resolved')
const runtime = require('./runtime')

function address (spec, factor) {
  if (spec.state.address.fixed) {
    // Fixed string
    fixed(spec, factor)
  } else if (spec.state.address.constructed) {
    // Constructible at convert time
    constructed(spec, factor)
  } else if (spec.state.address.resolved) {
    // Simple variable resolution needed
    resolved(spec, factor)
  } else {
    // Runtime manipulation needed
    runtime(spec, factor)
  }
}

module.exports = address
