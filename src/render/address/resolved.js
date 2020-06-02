const template = require('../template')

/*
 * Address with inner variable
 * No query
 */
function resolved(spec, factor) {
  factor.address = template(spec.address)
}

module.exports = resolved
