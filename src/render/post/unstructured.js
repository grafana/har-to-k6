const text = require('../text')

function unstructured(spec) {
  return text(spec.post.value || '')
}

module.exports = unstructured
