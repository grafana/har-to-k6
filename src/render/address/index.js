const constructed = require('./constructed')
const fixed = require('./fixed')
const resolved = require('./resolved')
const runtime = require('./runtime')
const state = require('../../state')

function address (spec, factor) {
  if (state.fixedAddress(spec)) {
    // Fixed string
    fixed(spec, factor)
  } else if (state.constructedAddress(spec)) {
    // Constructible at convert time
    constructed(spec, factor)
  } else if (state.resolvedAddress(spec)) {
    // Simple variable resolution needed
    resolved(spec, factor)
  } else {
    // Runtime manipulation needed
    runtime(spec, factor)
  }
}

module.exports = address
