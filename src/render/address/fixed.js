const string = require('../string')

function fixed (spec, factor) {
  factor.address = string(spec.address)
}

module.exports = fixed
