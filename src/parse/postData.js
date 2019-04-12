const params = require('./params')

function postData (node, spec) {
  spec.type = node.mimeType
  if (node.text) {
    spec.value = node.text
  } else if (node.params && node.params.length) {
    spec.params = new Map()
    params(node.params, spec.params)
  }
  if (node.comment) {
    spec.comment = node.comment
  }
}

module.exports = postData
