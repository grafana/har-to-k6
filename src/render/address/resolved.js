const template = require('../template')

function resolved (spec, factor) {
  factor.address = template(spec.address)
}

module.exports = resolved
