const text = require('../text')

function unstructured (spec) {
  return text(spec.text || '')
}

module.exports = unstructured
